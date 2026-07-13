#!/usr/bin/env python3
"""Trim letterboxed/padded JPGs to full-bleed squares."""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow required: pip install pillow", file=sys.stderr)
    sys.exit(1)

OUTPUT_SIZE = 640


def is_background(r: int, g: int, b: int) -> bool:
    if r > 235 and g > 235 and b > 235:
        return True
    if r < 20 and g < 20 and b < 20:
        return True
    return False


def content_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    w, h = im.size
    px = im.load()
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(1, h - 1):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        if is_background(*px[x, y]):
            q.extend(((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)))

    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if visited[y][x]:
                continue
            found = True
            minx = min(minx, x)
            miny = min(miny, y)
            maxx = max(maxx, x)
            maxy = max(maxy, y)
    if not found:
        return 0, 0, w, h
    return minx, miny, maxx + 1, maxy + 1


def trim_and_square(path: Path) -> None:
    im = Image.open(path).convert("RGB")
    cropped = im.crop(content_bbox(im))
    cw, ch = cropped.size
    side = max(cw, ch)
    square = Image.new("RGB", (side, side), (255, 255, 255))
    square.paste(cropped, ((side - cw) // 2, (side - ch) // 2))
    square.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.Resampling.LANCZOS).save(
        path, quality=88, optimize=True
    )


def main() -> int:
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <image-directory>", file=sys.stderr)
        return 1
    target_dir = Path(sys.argv[1])
    if not target_dir.is_dir():
        print(f"Not a directory: {target_dir}", file=sys.stderr)
        return 1
    targets = sorted(target_dir.glob("*.jpg"))
    if not targets:
        print(f"No JPGs found in {target_dir}", file=sys.stderr)
        return 1
    for path in targets:
        trim_and_square(path)
        print(f"trimmed {path.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
