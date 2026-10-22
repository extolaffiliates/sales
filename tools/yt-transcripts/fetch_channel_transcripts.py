#!/usr/bin/env python3
"""Download transcripts for every video on a YouTube channel (optionally filtered by keyword).

Built on two open-source projects:
  - yt-dlp                 https://github.com/yt-dlp/yt-dlp                 (lists the channel's videos)
  - youtube-transcript-api https://github.com/jdepoix/youtube-transcript-api  (pulls each transcript)

Usage:
  pip install -r tools/yt-transcripts/requirements.txt
  python tools/yt-transcripts/fetch_channel_transcripts.py @nicksaraev --match "cold email" --match outreach
  python tools/yt-transcripts/fetch_channel_transcripts.py https://www.youtube.com/watch?v=VIDEO_ID

Output: one Markdown file per video in research/transcripts/<channel>/, plus an index.md.
Already-downloaded videos are skipped, so re-running only fetches new ones.

YouTube blocks most cloud/datacenter IPs. Run this on your own computer, or set a residential proxy:
  WEBSHARE_PROXY_USERNAME / WEBSHARE_PROXY_PASSWORD   (Webshare "Residential" plan), or
  TRANSCRIPT_PROXY_URL=http://user:pass@host:port      (any HTTP proxy)
"""

import argparse
import os
import re
import sys
import time
from pathlib import Path

import yt_dlp
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.proxies import GenericProxyConfig, WebshareProxyConfig

REPO_ROOT = Path(__file__).resolve().parents[2]


def build_api():
    if os.getenv("WEBSHARE_PROXY_USERNAME"):
        return YouTubeTranscriptApi(proxy_config=WebshareProxyConfig(
            proxy_username=os.environ["WEBSHARE_PROXY_USERNAME"],
            proxy_password=os.environ["WEBSHARE_PROXY_PASSWORD"],
        ))
    if os.getenv("TRANSCRIPT_PROXY_URL"):
        url = os.environ["TRANSCRIPT_PROXY_URL"]
        return YouTubeTranscriptApi(proxy_config=GenericProxyConfig(http_url=url, https_url=url))
    return YouTubeTranscriptApi()


def list_videos(target, limit):
    """Return [{id, title, url}] for a channel handle/URL, playlist URL, or single video URL."""
    if target.startswith("@"):
        target = f"https://www.youtube.com/{target}"
    is_video = "watch?v=" in target or "youtu.be/" in target
    if not is_video and "/playlist" not in target and not target.rstrip("/").endswith(("/videos", "/streams")):
        target = target.rstrip("/") + "/videos"

    opts = {"quiet": True, "no_warnings": True, "skip_download": True, "extract_flat": "in_playlist"}
    if limit:
        opts["playlistend"] = limit
    proxy = os.getenv("TRANSCRIPT_PROXY_URL")
    if proxy:
        opts["proxy"] = proxy
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(target, download=False)

    channel = info.get("channel") or info.get("uploader") or info.get("title") or "youtube"
    entries = [info] if is_video else (info.get("entries") or [])
    videos = [
        {"id": e["id"], "title": e.get("title") or e["id"], "url": f"https://www.youtube.com/watch?v={e['id']}"}
        for e in entries if e and e.get("id")
    ]
    return channel, videos


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:80] or "video"


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("target", help="Channel handle (@nicksaraev), channel/playlist URL, or video URL")
    parser.add_argument("--match", action="append", default=[],
                        help="Only keep videos whose title contains this text (case-insensitive). Repeatable.")
    parser.add_argument("--limit", type=int, default=0, help="Only scan the newest N videos (0 = all)")
    parser.add_argument("--lang", action="append", default=None, help="Preferred transcript language(s), default en")
    parser.add_argument("--out", default=None, help="Output dir (default research/transcripts/<channel>)")
    parser.add_argument("--delay", type=float, default=4, help="Seconds between requests, to avoid rate limits")
    parser.add_argument("--max-blocks", type=int, default=3,
                        help="Stop after this many IP blocks in a row (retrying only extends the ban)")
    args = parser.parse_args()

    channel, videos = list_videos(args.target, args.limit)
    if args.match:
        needles = [m.lower() for m in args.match]
        videos = [v for v in videos if any(n in v["title"].lower() for n in needles)]
    print(f"{channel}: {len(videos)} video(s) to process")

    out_dir = Path(args.out) if args.out else REPO_ROOT / "research" / "transcripts" / slugify(channel)
    out_dir.mkdir(parents=True, exist_ok=True)
    api = build_api()
    langs = args.lang or ["en", "en-US", "en-GB"]

    saved, failed, blocks_in_a_row = 0, [], 0
    for v in videos:
        path = out_dir / f"{slugify(v['title'])}--{v['id']}.md"
        if path.exists():
            continue
        try:
            fetched = api.fetch(v["id"], languages=langs)
        except Exception as exc:  # disabled captions, IP block, private video, ...
            failed.append((v, type(exc).__name__))
            print(f"  FAIL {v['title']} ({type(exc).__name__})")
            blocks_in_a_row = blocks_in_a_row + 1 if type(exc).__name__ in ("RequestBlocked", "IpBlocked") else 0
            if blocks_in_a_row >= args.max_blocks:
                print("YouTube is rate-limiting this IP. Stopping early; wait 1-2 hours (or switch network) and re-run.")
                break
            time.sleep(args.delay)
            continue
        text = " ".join(s.text.replace("\n", " ") for s in fetched.snippets)
        path.write_text(
            f"# {v['title']}\n\n- Channel: {channel}\n- URL: {v['url']}\n"
            f"- Transcript: {'auto-generated' if fetched.is_generated else 'manual'} ({fetched.language_code})\n\n"
            f"{text}\n",
            encoding="utf-8",
        )
        saved += 1
        blocks_in_a_row = 0
        print(f"  OK   {v['title']}")
        time.sleep(args.delay)

    index = sorted(p for p in out_dir.glob("*.md") if p.name != "index.md")
    (out_dir / "index.md").write_text(
        f"# {channel} transcripts\n\n" + "".join(f"- [{p.stem}]({p.name})\n" for p in index), encoding="utf-8"
    )
    print(f"Saved {saved} new transcript(s) to {out_dir} ({len(failed)} failed)")
    if failed and all(err in ("RequestBlocked", "IpBlocked") for _, err in failed):
        print("YouTube is blocking this IP. Run from your own computer or set a residential proxy (see docstring).")
    return 0 if saved or not failed else 1


if __name__ == "__main__":
    sys.exit(main())
