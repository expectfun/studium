# Landing loop

Sources for `public/landing/loop.mp4` (13 s, 1120×832, no audio).

1. `still.png`: lesson 1.1's director's cut edited on `openai/gpt-image-2/edit` (`still-prompt.txt`): green dress, birdcage carried by its ring.
2. `plate.png`: the same still with the woman removed (`plate-prompt.txt`).
3. `walk-raw.mp4`: Kling v3 Pro image-to-video from `plate.png`, with her as `@Element1` (`element.png` frontal, `still.png` reference), no end frame (`walk-prompt.txt`, `walk-raw.json`). She walks out of the crowd and past the camera.
4. `bridge-raw.mp4`: Kling v3 Pro, 3 s, from the last frame of the walk to its first frame (`bridge-prompt.txt`, `bridge-raw.json`). This closes the loop.
5. ffmpeg: walk + bridge without its first and last frames, scaled to 1120 wide, luma-only temporal film grain (`noise=c0s=12:c0f=t+u`), CRF 26.
