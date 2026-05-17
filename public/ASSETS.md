# Media assets — Bilawal portfolio

Pending assets are tracked in `lib/assets.ts`. Drop each file at the listed path
and flip `status: "pending"` → `status: "ready"` in that file.

## Required

| Path | Spec | Notes |
|---|---|---|
| `cv/Bilawal-Ullah-Sami-CV.pdf` | A4 PDF, ≤ 2 pages | Linked from the nav + contact section |
| `audio/bilawal.mp3` | ~1.5s mono mp3 | Triggered when "Bilawal" is clicked in hero |
| `reels/notesnap.{mp4,webm}` | 30s, 1080×1920 portrait, h264 / vp9, muted | Autoplay loop in the NoteSnap chapter |
| `reels/arisecode-prompt-1.{mp4,webm}` | 8s, 1920×1080, h264 / vp9, muted | First "try a prompt" chip playback |
| `reels/arisecode-prompt-2.{mp4,webm}` | 8s, 1920×1080, h264 / vp9, muted | Second chip |
| `reels/arisecode-prompt-3.{mp4,webm}` | 8s, 1920×1080, h264 / vp9, muted | Third chip |
| `reels/gesture-control.{mp4,webm}` | 15s, 1920×1080, h264 / vp9, muted | Linked from the Gesture Control card |
| `shots/notesnap/0[1-5].png` | 1170×2532 px | Carousel in the NoteSnap chapter |
| `shots/tally/0[1-5].png` | 1170×2532 px | Carousel in the Tally chapter |
| `shots/arisecode/0[1-3].png` | 1920×1080 px | Fallback carousel for AriseCode |

## Encoding hint

```bash
# MP4 (h264, no audio)
ffmpeg -i src.mov -vcodec libx264 -crf 25 -an -movflags +faststart out.mp4
# WebM (vp9)
ffmpeg -i src.mov -c:v libvpx-vp9 -crf 32 -b:v 0 -an out.webm
```

Until a file lands, the layout renders a brutalist `ASSET PENDING — [spec]`
placeholder card so the page structure is final.
