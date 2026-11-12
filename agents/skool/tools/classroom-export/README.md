# Skool classroom export

Exports a Skool classroom the logged-in account can open: every open lesson's notes, video link and resource links, plus the files attached to lessons. Videos are linked, not downloaded. Locked (drip) lessons are listed by title only.

Uses the same login as the `skool` MCP server (`SKOOL_COOKIES`, or `~/.config/skool-mcp/config.json`). Requests are paced (under 2 per second); keep it that way.

```bash
node agents/skool/tools/classroom-export/export.mjs /path/to/raw
```
```bash
python3 -I agents/skool/tools/classroom-export/build.py /path/to/raw /path/to/out
```

`build.py` writes one HTML file per course (upload with content type `text/html` to get a Google Doc) and a zip of attached files per course. Re-running `export.mjs` on the same raw folder only fetches what is missing, so it can be re-run as more lessons unlock.

The export is for internal reference only. The content belongs to the community owner; do not share it outside the team.

Last run: Maker School, 12 Nov 2026, uploaded to Drive at Resources › Informations and Usecases › Nick Saraev › Maker School › Skool Classroom Export (12 Nov 2026).
