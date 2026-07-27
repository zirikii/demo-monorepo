# Trim padded image assets

Use when layout CSS is correct but the photo still looks tiny inside a colored square. The file likely has baked-in letterboxing (small photo centered on white/black canvas). Scene7/CDN URLs with `fit=crop` often still return padded files — verify the saved asset, not just the URL.

Requires: `pip install pillow`

## One-shot trim script

Run from repo root; overwrites files in place.

```python
#!/usr/bin/env python3
"""Trim letterboxed card images to full-bleed squares."""
from collections import deque
from pathlib import Path
from PIL import Image

def is_background(r, g, b):
    return (r > 235 and g > 235 and b > 235) or (r < 20 and g < 20 and b < 20)

def content_bbox(im):
    w, h = im.size
    px = im.load()
    visited = [[False] * w for _ in range(h)]
    q = deque()
    for x in range(w):
        q.extend([(x, 0), (x, h - 1)])
    for y in range(1, h - 1):
        q.extend([(0, y), (w - 1, y)])
    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        if is_background(*px[x, y]):
            q.extend([(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)])
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            if not visited[y][x]:
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)
    return minx, miny, maxx + 1, maxy + 1

def trim_to_square(path: Path, size: int = 640):
    im = Image.open(path).convert("RGB")
    box = content_bbox(im)
    cropped = im.crop(box)
    side = max(cropped.size)
    square = Image.new("RGB", (side, side), (255, 255, 255))
    cw, ch = cropped.size
    square.paste(cropped, ((side - cw) // 2, (side - ch) // 2))
    square.resize((size, size), Image.Resampling.LANCZOS).save(path, quality=88, optimize=True)

if __name__ == "__main__":
    import sys
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    for path in sorted(root.glob("*.jpg")):
        trim_to_square(path)
        print(f"trimmed {path.name}")
```

Example:

```bash
python3 trim_script.py apps/changi/public/brand/destinations
```

## Re-fetch alternative

Try CDN crop params before local trim, e.g. `?wid=640&hei=640&fit=crop`. Always open the downloaded file — padding may persist.
