# YouTube transcript downloader

Pulls real transcripts from YouTube channels into `agents/cold-email/research/transcripts/<channel>/`. The cold email agent is trained on these files.

## Run it on your own computer

YouTube blocks cloud servers, so run this locally:

```bash
git clone https://github.com/extolaffiliates/sales && cd sales
pip install -r agents/cold-email/tools/yt-transcripts/requirements.txt

# All of Nick Saraev's cold-email / outreach videos
python agents/cold-email/tools/yt-transcripts/fetch_channel_transcripts.py @nicksaraev --match "cold email" --match outreach --match "lead gen"

# One specific video
python agents/cold-email/tools/yt-transcripts/fetch_channel_transcripts.py "https://www.youtube.com/watch?v=VIDEO_ID"

git add agents/cold-email/research/transcripts && git commit -m "Add transcripts" && git push
```

Re-running only fetches new videos. To run it from a server instead, set `WEBSHARE_PROXY_USERNAME` and `WEBSHARE_PROXY_PASSWORD` for a Webshare residential proxy, or set `TRANSCRIPT_PROXY_URL`.

Built on [yt-dlp](https://github.com/yt-dlp/yt-dlp), which lists a channel's videos, and [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api), which fetches each transcript.
