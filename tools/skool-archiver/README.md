# Skool archiver

Saves a Skool community you belong to into a folder, such as your Google Drive:

- every classroom video (Skool's own player, YouTube, Loom, Vimeo, Wistia) as MP4
- every lesson resource file (PDFs, templates, blueprints, images), plus public Google Docs, Sheets and Slides as Office files
- lesson notes (`notes.md`) and the raw lesson data (`lesson.json`)
- with `--posts-author`, the files and videos one person attached to feed posts. Other posts and all comments are skipped.

It runs on your own computer: Skool blocks cloud servers. You log in yourself in the browser window it opens, so the script never sees your password.

## Setup on a Mac (once)

1. Install Homebrew from [brew.sh](https://brew.sh) if you don't have it.
2. Install [Google Drive for desktop](https://www.google.com/drive/download/) and sign in. Your Drive then shows up as a folder on your Mac.
3. In Terminal:

```bash
brew install python ffmpeg git
```

```bash
git clone https://github.com/extolaffiliates/sales && cd sales
```

```bash
python3 -m venv .venv && source .venv/bin/activate
```

```bash
pip install -r tools/skool-archiver/requirements.txt && python -m playwright install chromium
```

## Run it

**1. Test run on 3 lessons.** A browser window opens. The first time, log in to Skool in that window, go to the community's Classroom tab, then press Enter in Terminal. The login is remembered for next time.

```bash
python tools/skool-archiver/skool_archive.py makerschool --limit 3
```

Check `~/Skool Archive/makerschool`: each lesson folder should have `video.mp4`, a `resources` folder and `notes.md`.

**2. Count everything without downloading** (optional; tells you how big the job is):

```bash
python tools/skool-archiver/skool_archive.py makerschool --dry-run --posts-author "Nick Saraev"
```

**3. Full run, saving straight into Google Drive.** Find your Drive folder name with `ls ~/Library/CloudStorage/` and replace `GoogleDrive-you@gmail.com` below:

```bash
python tools/skool-archiver/skool_archive.py makerschool --posts-author "Nick Saraev" --out "$HOME/Library/CloudStorage/GoogleDrive-you@gmail.com/My Drive/Maker School"
```

Leave the Mac awake and plugged in (`caffeinate -i` in front of the command keeps it awake). If it stops for any reason, run the same command again: it skips everything already saved.

## What you get

```
Maker School/
  Classroom/01 <Course>/01 <Module>/01 <Lesson>/
      video.mp4   resources/   notes.md   lesson.json
  Posts by Nick Saraev/<date> <post title>/
      resources/   video.mp4   notes.md
  _archive/
      manifest.csv        one row per lesson/post with counts
      links-to-open.md    private Google files, Notion pages and other links to save by hand
      failures.log        anything that failed, with the reason
      debug/              the raw page data, for fixing the script
```

## Options

| Option | What it does |
|---|---|
| `--course "Text"` | Only courses whose title contains this text |
| `--parallel 3` | Videos downloading at once (default 2) |
| `--delay 3` | Seconds to pause on each page (default 2). Go slower if Skool starts refusing pages. |
| `--cookies-from-browser chrome` | Use if YouTube says "sign in to confirm you're not a bot" |
| `--headless` | Hide the browser window (only after you've logged in once) |

## If something is missing

The script reads Skool's own page data, and Skool can change it. If a lesson shows `0 video` but has one, or files are missing, zip the `_archive` folder (including `debug`) and send it to Claude to adjust the script.

Keep the archive private: the course content belongs to its creator.
