#!/usr/bin/env python3
"""Archive a Skool community you belong to: every classroom video, resource file and
lesson note, plus the files one author (e.g. the owner) attached to feed posts.

Runs on your own computer. Skool blocks cloud servers, and you log in yourself in the
browser window this opens, so your password never touches the script. See README.md.

    python skool_archive.py makerschool --limit 3            # test on 3 lessons
    python skool_archive.py makerschool --dry-run            # count everything, download nothing
    python skool_archive.py makerschool --posts-author "Nick Saraev" --out "<Google Drive folder>"
"""
from __future__ import annotations

import argparse
import csv
import json
import mimetypes
import re
import shutil
import subprocess
import sys
import threading
import time
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

from playwright.sync_api import TimeoutError as PWTimeout
from playwright.sync_api import sync_playwright

URL_RE = re.compile(r"https?://[^\s\"'<>\\)\]]+")
FILE_EXT = {
    "pdf", "doc", "docx", "xls", "xlsx", "csv", "ppt", "pptx", "key", "pages", "numbers",
    "zip", "rar", "7z", "json", "txt", "md", "rtf", "html", "ipynb", "py", "js", "ts", "sh",
    "png", "jpg", "jpeg", "gif", "webp", "svg", "mp3", "wav", "m4a", "mp4", "mov", "webm",
}
FILE_HOSTS = ("files.skool.com", "assets.skool.com", "amazonaws.com", "cloudfront.net")
# m3u8 streams from these hosts belong to an embed (YouTube, Loom...) we already download by URL
EMBED_STREAM_HOSTS = ("vimeo", "loom", "youtube", "googlevideo", "wistia")
# Metadata keys holding decoration, not content
SKIP_KEYS = ("thumb", "cover", "avatar", "logo", "favicon")
VIDEO_PATTERNS = [
    (re.compile(r"(?:youtube\.com/(?:watch\?(?:.*&)?v=|embed/|shorts/|live/)|youtu\.be/)([\w-]{11})"),
     "https://www.youtube.com/watch?v={}"),
    (re.compile(r"loom\.com/(?:share|embed)/([0-9a-f]{20,})"), "https://www.loom.com/share/{}"),
    (re.compile(r"(?:player\.)?vimeo\.com/(?:video/)?\d+"), None),
    (re.compile(r"wistia\.(?:com|net)/(?:medias|embed(?:/iframe)?)/\w+"), None),
]


def safe(name: str, limit: int = 80) -> str:
    name = re.sub(r'[\\/:*?"<>|\x00-\x1f]+', " ", str(name or ""))
    name = re.sub(r"\s+", " ", name).strip().rstrip(".")
    return name[:limit].strip() or "untitled"


def walk(o, key=""):
    """Yield (key, value) for every dict/list/scalar in a JSON tree."""
    yield key, o
    if isinstance(o, dict):
        for k, v in o.items():
            yield from walk(v, str(k))
    elif isinstance(o, list):
        for v in o:
            yield from walk(v, key)


def dicts(o):
    return (v for _, v in walk(o) if isinstance(v, dict))


def video_url(url: str) -> str | None:
    """Canonical URL if this points at one specific video, else None (never a channel or playlist)."""
    for pattern, template in VIDEO_PATTERNS:
        m = pattern.search(url)
        if m:
            return template.format(m.group(1)) if template else url
    return None


def classify(url: str) -> str | None:
    host = urlparse(url).netloc.lower()
    if video_url(url):
        return "video"
    if "docs.google.com" in host or "drive.google.com" in host:
        return "google"
    ext = Path(urlparse(url).path).suffix.lower().lstrip(".")
    if ext in FILE_EXT or any(h in host for h in FILE_HOSTS):
        return "file"
    if host.endswith("skool.com") or not host:
        return None  # navigation inside Skool
    return "link"


def rich_text(value) -> str:
    """Best-effort plain text from Skool's lesson/post description field."""
    if not isinstance(value, str):
        return ""
    raw = value[4:] if value.startswith("[v2]") else value
    try:
        doc = json.loads(raw)
    except ValueError:
        return value

    def text(node):
        if isinstance(node, list):
            return "".join(text(n) for n in node)
        if not isinstance(node, dict):
            return ""
        own = node.get("text", "") if isinstance(node.get("text"), str) else ""
        inner = text(node.get("content", []))
        block = node.get("type") in ("paragraph", "heading", "listItem", "blockquote", "codeBlock")
        return own + inner + ("\n\n" if block else "")

    return text(doc).strip() or value


class Archiver:
    def __init__(self, args, ctx, page):
        self.args, self.ctx, self.page = args, ctx, page
        self.base = f"{args.base_url.rstrip('/')}/{args.community}"
        self.out = Path(args.out).expanduser()
        self.meta = self.out / "_archive"
        (self.meta / "debug").mkdir(parents=True, exist_ok=True)
        self.state_path = self.meta / "videos-done.json"
        self.videos_done = json.loads(self.state_path.read_text()) if self.state_path.exists() else {}
        self.lock = threading.Lock()
        self.pool = ThreadPoolExecutor(max_workers=args.parallel)
        self.captured: list[str] = []
        page.on("request", lambda r: self.captured.append(r.url) if ".m3u8" in r.url else None)
        self.counts = Counter()
        self.lessons_seen = 0
        new_manifest = not (self.meta / "manifest.csv").exists()
        self.manifest_file = open(self.meta / "manifest.csv", "a", newline="")
        self.manifest = csv.writer(self.manifest_file)
        if new_manifest:
            self.manifest.writerow(["kind", "folder", "title", "url", "videos", "files", "google", "links", "status"])

    # ---------- browser ----------
    def goto(self, url: str) -> dict:
        self.captured.clear()
        for attempt in range(3):
            try:
                self.page.goto(url, wait_until="domcontentloaded", timeout=60000)
                break
            except PWTimeout:
                if attempt == 2:
                    raise
                time.sleep(5)
        try:
            self.page.wait_for_load_state("networkidle", timeout=10000)
        except PWTimeout:
            pass
        time.sleep(self.args.delay)
        raw = self.page.evaluate("() => document.getElementById('__NEXT_DATA__')?.textContent || null")
        return json.loads(raw) if raw else {}

    def trigger_play(self):
        """Start any player on the page so Skool's own stream URL is requested."""
        try:
            videos = self.page.locator("video")
            for i in range(min(videos.count(), 3)):
                videos.nth(i).evaluate("v => { v.muted = true; v.play().catch(() => {}); }", timeout=5000)
            play = self.page.locator('[aria-label*="play" i]').first
            if play.count():
                play.click(timeout=2000)
        except Exception:
            pass
        time.sleep(self.args.video_wait)

    def dom_urls(self) -> list[str]:
        try:
            return self.page.evaluate("""() => [
                ...[...document.querySelectorAll('iframe')].map(e => e.src),
                ...[...document.querySelectorAll('a[href]')].map(e => e.href),
                ...[...document.querySelectorAll('video, video source')].map(e => e.src),
            ].filter(u => u && u.startsWith('http'))""")
        except Exception:
            return []

    def harvest(self, metadata: dict) -> dict[str, list[str]]:
        """Videos, files, Google links and other links for the page currently open."""
        found = {"video": [], "file": [], "google": [], "link": []}

        def add(kind, url):
            if kind and url not in found[kind]:
                found[kind].append(url)

        for key, value in walk(metadata):
            if isinstance(value, str) and not any(s in key.lower() for s in SKIP_KEYS):
                for url in URL_RE.findall(value):
                    url = url.rstrip(".,;")
                    kind = classify(url)
                    add(kind, video_url(url) if kind == "video" else url)
        for url in self.dom_urls():
            kind = classify(url)
            if kind in ("video", "file", "google"):  # page chrome is full of plain links; skip those
                add(kind, video_url(url) if kind == "video" else url)
        streams = [u for u in self.captured if not any(h in urlparse(u).netloc for h in EMBED_STREAM_HOSTS)]
        if streams:
            add("video", streams[0])  # the master playlist loads first
        return found

    # ---------- downloads ----------
    def save_bytes(self, folder: Path, name: str, body: bytes) -> Path:
        folder.mkdir(parents=True, exist_ok=True)
        dest = folder / safe(name, 120)
        stem, suffix, n = dest.stem, dest.suffix, 2
        while dest.exists():
            if dest.stat().st_size == len(body):
                return dest
            dest = folder / f"{stem} ({n}){suffix}"
            n += 1
        dest.write_bytes(body)
        return dest

    def download_file(self, url: str, folder: Path, title: str | None = None) -> Path | None:
        try:
            resp = self.ctx.request.get(url, headers={"Referer": self.base}, timeout=180000)
        except Exception:
            return None
        ctype = resp.headers.get("content-type", "").split(";")[0].strip()
        if not resp.ok or ctype == "text/html":
            return None  # a login or error page, not a file
        disp = resp.headers.get("content-disposition", "")
        m = re.search(r"filename\*=(?:UTF-8'')?([^;]+)", disp) or re.search(r'filename="?([^";]+)', disp)
        name = unquote(m.group(1)) if m else unquote(Path(urlparse(url).path).name) or title or "file"
        if not Path(name).suffix:
            name += mimetypes.guess_extension(ctype) or ""
        return self.save_bytes(folder, name, resp.body())

    def google_export(self, url: str, folder: Path) -> Path | None:
        """Download a Google Doc/Sheet/Slide/Drive file if it is shared publicly."""
        doc = re.search(r"/(document|spreadsheets|presentation)/d/([\w-]+)", url)
        if doc:
            kind, gid = doc.groups()
            fmt = {"document": "docx", "spreadsheets": "xlsx", "presentation": "pptx"}[kind]
            return self.download_file(f"https://docs.google.com/{kind}/d/{gid}/export?format={fmt}", folder)
        file_id = re.search(r"/file/d/([\w-]+)", url)
        gid = file_id.group(1) if file_id else (parse_qs(urlparse(url).query).get("id") or [None])[0]
        if gid:
            return self.download_file(f"https://drive.google.com/uc?export=download&id={gid}", folder)
        return None  # folders and other pages stay as links

    def click_download(self, text: str, folder: Path) -> Path | None:
        """For a resource Skool lists without a URL: click it and keep what it serves."""
        try:
            target = self.page.get_by_text(text, exact=True).first
            if not target.count():
                return None
            with self.page.expect_download(timeout=20000) as info:
                target.click(timeout=5000)
            dl = info.value
            folder.mkdir(parents=True, exist_ok=True)
            dest = folder / safe(dl.suggested_filename, 120)
            dl.save_as(dest)
            return dest
        except Exception:
            return None

    def queue_video(self, url: str, key: str, folder: Path, stem: str, tracker: dict):
        cmd =[sys.executable, "-m", "yt_dlp", "--no-playlist", "--no-overwrites", "--continue",
               "--retries", "10", "--fragment-retries", "10", "-N", "4",
               "-f", "bv*+ba/b", "--merge-output-format", "mp4",
               "--referer", self.args.base_url + "/", "-o", str(folder / f"{stem}.%(ext)s")]
        if "youtube.com" in url:
            if self.args.cookies_from_browser:
                cmd += ["--cookies-from-browser", self.args.cookies_from_browser]
        else:
            cmd += ["--add-header", f"Origin:{self.args.base_url}"]

        def run():
            result = subprocess.run(cmd + [url], capture_output=True, text=True)
            with self.lock:
                if result.returncode == 0:
                    self.videos_done[key] = str(folder / stem)
                    self.state_path.write_text(json.dumps(self.videos_done, indent=1))
                    self.counts["videos downloaded"] += 1
                    print(f"    ✓ video saved: {folder.name}/{stem}")
                else:
                    tracker["ok"] = False
                    self.counts["video failures"] += 1
                    tail = "\n".join((result.stderr or result.stdout).strip().splitlines()[-5:])
                    self.log_failure(f"VIDEO {folder} <- {url}\n{tail}")
                tracker["pending"] -= 1
                self.maybe_done(tracker)

        self.pool.submit(run)

    def maybe_done(self, tracker: dict):
        if tracker["pending"] == 0 and tracker["ok"]:
            (tracker["folder"] / ".done").touch()

    def log_failure(self, text: str):
        with open(self.meta / "failures.log", "a") as f:
            f.write(text.rstrip() + "\n\n")

    # ---------- one page of content ----------
    def save_item(self, kind: str, folder: Path, title: str, url: str, unit: dict, found: dict,
                  resource_titles: list[str]):
        files, google, links = found["file"], found["google"], found["link"]
        rel = str(folder.relative_to(self.out))
        print(f"  {rel}: {len(found['video'])} video, {len(files)} file, {len(google)} google, {len(links)} link")
        for k, v in found.items():
            self.counts[f"{k}s found"] += len(v)
        if self.args.dry_run:
            self.manifest.writerow([kind, rel, title, url, *(len(found[k]) for k in found), "dry-run"])
            return

        folder.mkdir(parents=True, exist_ok=True)
        (folder / f"{kind}.json").write_text(json.dumps(unit, indent=1, ensure_ascii=False))
        tracker = {"pending": 0, "ok": True, "folder": folder}
        res = folder / "resources"
        failed_links = []
        for u in files:
            if self.download_file(u, res):
                self.counts["files downloaded"] += 1
            else:
                tracker["ok"] = False
                failed_links.append(u)
                self.log_failure(f"FILE {rel} <- {u}")
        for u in google:
            if self.google_export(u, res):
                self.counts["google files downloaded"] += 1
            else:
                failed_links.append(u)  # private or a folder: kept as a link for you to open
        for t in resource_titles:
            if self.click_download(t, res):
                self.counts["files downloaded"] += 1

        desc = rich_text(unit.get("metadata", {}).get("desc") or unit.get("metadata", {}).get("content"))
        notes = [f"# {title}", "", f"Source: {url}", ""]
        if desc:
            notes += [desc, ""]
        extra = failed_links + links
        if extra:
            notes += ["## Links to open yourself", ""] + [f"- {u}" for u in extra] + [""]
            with open(self.meta / "links-to-open.md", "a") as f:
                f.write(f"\n### {rel}\n" + "".join(f"- {u}\n" for u in extra))
        (folder / "notes.md").write_text("\n".join(notes))

        jobs = []
        for i, v in enumerate(found["video"]):
            key = f"stream:{unit.get('id')}:{i}" if ".m3u8" in v else v
            if key not in self.videos_done:
                jobs.append((v, key, "video" if len(found["video"]) == 1 else f"video-{i + 1}"))
        with self.lock:
            tracker["pending"] = len(jobs)  # set before any job can finish
            self.maybe_done(tracker)
        for v, key, stem in jobs:
            self.queue_video(v, key, folder, stem, tracker)
        self.manifest.writerow([kind, rel, title, url, *(len(found[k]) for k in found), "queued"])
        self.manifest_file.flush()

    # ---------- classroom ----------
    def find_courses(self, data: dict) -> list[tuple[str, str]]:
        courses = {}
        for d in dicts(data):
            if d.get("unitType") == "course" and isinstance(d.get("name"), str) and isinstance(d.get("metadata"), dict):
                courses.setdefault(d["name"], d["metadata"].get("title") or d["name"])
        links = self.page.evaluate("() => [...document.querySelectorAll('a[href*=\"/classroom/\"]')].map(a => [a.href, a.innerText])")
        for href, text in links:
            m = re.search(rf"/{re.escape(self.args.community)}/classroom/([^/?#]+)", href)
            if m:
                courses.setdefault(m.group(1), (text or "").strip().split("\n")[0] or m.group(1))
        return list(courses.items())

    def classroom(self):
        courses, page_no = [], 1
        while True:
            suffix = "" if page_no == 1 else f"?p={page_no}"
            data = self.goto(f"{self.base}/classroom{suffix}")
            (self.meta / "debug" / f"classroom-{page_no}.json").write_text(json.dumps(data, indent=1))
            new = [c for c in self.find_courses(data) if c not in courses]
            if page_no == 1 and not new:
                input("\nNo courses visible. Log in to Skool in the browser window, open the community's "
                      "Classroom tab, then press Enter here... ")
                data = self.goto(f"{self.base}/classroom")
                new = self.find_courses(data)
                if not new:
                    sys.exit(f"Still no courses found. Send {self.meta / 'debug'} to Claude to adjust the script.")
            if not new:
                break
            courses += new
            page_no += 1
        print(f"Found {len(courses)} courses")
        wanted = [c for c in courses if not self.args.course or self.args.course.lower() in c[1].lower()]
        for i, (slug, title) in enumerate(wanted, 1):
            if self.limit_reached():
                break
            self.course(slug, f"{i:02d} {safe(title)}")

    def course(self, slug: str, folder_name: str):
        print(f"\n== {folder_name}")
        data = self.goto(f"{self.base}/classroom/{slug}")
        (self.meta / "debug" / f"course-{slug}.json").write_text(json.dumps(data, indent=1))
        lessons = self.lesson_tree(data, slug)
        if not lessons:
            self.log_failure(f"COURSE {folder_name}: no lessons found (locked, or the page layout changed)")
            print("  no lessons found (locked?)")
        root = self.out / "Classroom" / folder_name
        for path, unit in lessons:
            if self.limit_reached():
                return
            self.lesson(slug, root.joinpath(*path), unit)

    def lesson_tree(self, data: dict, slug: str) -> list[tuple[list[str], dict]]:
        roots = [d for d in dicts(data) if isinstance(d.get("course"), dict) and isinstance(d.get("children"), list)]
        root = next((r for r in roots if r["course"].get("name") == slug), None)
        if root is None and roots:
            root = max(roots, key=lambda r: len(json.dumps(r)))
        out = []

        def rec(node, path):
            kids = [k for k in node.get("children") or [] if isinstance(k, dict) and isinstance(k.get("course"), dict)]
            for i, k in enumerate(kids, 1):
                unit = k["course"]
                name = f"{i:02d} {safe((unit.get('metadata') or {}).get('title') or unit.get('name'))}"
                if k.get("children") or unit.get("unitType") == "set":
                    rec(k, path + [name])
                else:
                    out.append((path + [name], unit))

        if root:
            rec(root, [])
        if not out:  # fall back to the lesson links in the sidebar
            links = self.page.evaluate("() => [...document.querySelectorAll('a[href*=\"md=\"]')].map(a => [a.href, a.innerText])")
            for i, (href, text) in enumerate(links, 1):
                md = parse_qs(urlparse(href).query).get("md", [None])[0]
                if md and all(u["id"] != md for _, u in out):
                    out.append(([f"{i:02d} {safe(text.split(chr(10))[0])}"], {"id": md, "metadata": {"title": text}}))
        return out

    def lesson(self, slug: str, folder: Path, unit: dict):
        self.lessons_seen += 1
        if (folder / ".done").exists() and not self.args.dry_run:
            return
        url = f"{self.base}/classroom/{slug}?md={unit['id']}"
        data = self.goto(url)
        fresh = next((d for d in dicts(data) if d.get("id") == unit["id"] and isinstance(d.get("metadata"), dict)), unit)
        self.trigger_play()
        metadata = fresh.get("metadata") or {}
        found = self.harvest(metadata)
        titles = []
        resources = metadata.get("resources")
        if isinstance(resources, str):
            try:
                resources = json.loads(resources)
            except ValueError:
                resources = []
        for r in resources if isinstance(resources, list) else []:
            if isinstance(r, dict) and not URL_RE.search(json.dumps(r)):
                t = r.get("title") or r.get("file_name") or r.get("name")
                if t:
                    titles.append(t)
        title = metadata.get("title") or folder.name
        self.save_item("lesson", folder, title, url, fresh, found, titles)

    def limit_reached(self) -> bool:
        return bool(self.args.limit) and self.lessons_seen >= self.args.limit

    # ---------- feed posts by one author ----------
    def posts(self):
        want = re.sub(r"[^a-z0-9]", "", self.args.posts_author.lower())
        folder_root = self.out / f"Posts by {safe(self.args.posts_author)}"
        seen, page_no, matched = set(), 1, 0
        print(f"\n== Feed posts by {self.args.posts_author}")
        while not self.args.max_feed_pages or page_no <= self.args.max_feed_pages:
            data = self.goto(f"{self.base}?p={page_no}")
            if page_no == 1:
                (self.meta / "debug" / "feed-1.json").write_text(json.dumps(data, indent=1))
            posts = [d for d in dicts(data) if self.is_post(d) and d["id"] not in seen]
            if not posts:
                break
            mine = []
            for p in posts:
                seen.add(p["id"])
                user = p["user"]
                author = re.sub(r"[^a-z0-9]", "", " ".join(str(user.get(k) or "") for k in
                                                           ("firstName", "lastName", "name", "displayName")).lower())
                if want in author:
                    mine.append(p)
            print(f"  feed page {page_no}: {len(posts)} posts, {len(mine)} by {self.args.posts_author}")
            for p in mine:
                matched += 1
                self.post(p, folder_root)
            page_no += 1
        print(f"  {matched} posts by {self.args.posts_author} checked")

    @staticmethod
    def is_post(d: dict) -> bool:
        meta = d.get("metadata")
        return (isinstance(meta, dict) and isinstance(d.get("user"), dict) and isinstance(d.get("name"), str)
                and "id" in d and bool(meta.get("title")))

    def post(self, p: dict, folder_root: Path):
        meta = p["metadata"]
        if "http" not in json.dumps(meta) and not meta.get("attachments"):
            return  # nothing attached
        date = str(p.get("createdAt") or "")[:10]
        folder = folder_root / safe(f"{date} {meta['title']}")
        if (folder / ".done").exists() and not self.args.dry_run:
            return
        url = f"{self.base}/{p['name']}"
        self.goto(url)
        self.trigger_play()
        found = self.harvest(meta)
        if any(found.values()):
            self.save_item("post", folder, meta["title"], url, p, found, [])

    def finish(self):
        self.pool.shutdown(wait=True)
        self.manifest_file.close()
        print("\n==== Summary")
        for k, v in sorted(self.counts.items()):
            print(f"  {k}: {v}")
        print(f"\nEverything is in: {self.out}")
        for name in ("failures.log", "links-to-open.md"):
            if (self.meta / name).exists():
                print(f"  see {self.meta / name}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("community", help="community slug from the URL, e.g. makerschool")
    ap.add_argument("--out", default="~/Skool Archive/{community}", help="where to save (e.g. your Google Drive folder)")
    ap.add_argument("--posts-author", default="", help="also save files attached to feed posts by this person")
    ap.add_argument("--course", default="", help="only courses whose title contains this text")
    ap.add_argument("--limit", type=int, default=0, help="stop after this many lessons (for a test run)")
    ap.add_argument("--dry-run", action="store_true", help="list what would be saved, download nothing")
    ap.add_argument("--parallel", type=int, default=2, help="videos downloading at once (default 2)")
    ap.add_argument("--delay", type=float, default=2.0, help="seconds to pause on each page (be gentle)")
    ap.add_argument("--video-wait", type=float, default=4.0, help="seconds to let a player load its stream")
    ap.add_argument("--max-feed-pages", type=int, default=0, help="stop the feed scan after N pages (0 = all)")
    ap.add_argument("--cookies-from-browser", default="", help="e.g. chrome, if YouTube asks you to sign in")
    ap.add_argument("--profile", default=str(Path.home() / ".skool-archiver-profile"), help="browser profile folder")
    ap.add_argument("--headless", action="store_true", help="hide the browser (only once you're logged in)")
    ap.add_argument("--base-url", default="https://www.skool.com", help=argparse.SUPPRESS)
    args = ap.parse_args()
    args.out = args.out.format(community=args.community)

    if not args.dry_run and not shutil.which("ffmpeg"):
        sys.exit("ffmpeg is missing. On a Mac run: brew install ffmpeg")

    with sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(args.profile, headless=args.headless,
                                                    viewport={"width": 1400, "height": 900}, accept_downloads=True)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        arch = Archiver(args, ctx, page)
        try:
            arch.classroom()
            if args.posts_author and not args.limit:
                arch.posts()
        except KeyboardInterrupt:
            print("\nStopping. Run the same command again to pick up where it left off.")
            arch.pool.shutdown(wait=False, cancel_futures=True)
        finally:
            arch.finish()
            ctx.close()


if __name__ == "__main__":
    main()
