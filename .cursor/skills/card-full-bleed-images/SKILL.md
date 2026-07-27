---
name: card-full-bleed-images
description: Ensures images in cards, carousels, and media tiles fill the container edge-to-edge with no letterboxing or background gaps. Use when creating or fixing image cards, destination tiles, product cards, gallery items, or when photos look tiny inside a colored card area.
---

# Card full-bleed images

Card photos must touch all four edges of the media area. Fix **layout CSS and source assets** — `object-cover` alone cannot fix padded image files.

## Checklist

```
- [ ] Media wrapper defines size (aspect-ratio or fixed height)
- [ ] Wrapper and card have overflow-hidden (when corners are rounded)
- [ ] Image uses block + h-full w-full object-cover (or framework equivalent)
- [ ] Source assets are full-bleed (no baked-in white/black padding)
- [ ] Visually verified in browser (two cards + hard-refresh if assets changed)
```

## Workflow

1. **Layout first** — apply the patterns in [layout-patterns.md](layout-patterns.md).
2. **Still tiny with gaps?** — inspect the file; padded JPGs need trimming. See [trim-assets.md](trim-assets.md).
3. **Diagnose symptoms** — use [troubleshooting.md](troubleshooting.md).

## Implementation guides

| File | Contents |
|------|----------|
| [layout-patterns.md](layout-patterns.md) | Tailwind, CSS, Next.js `Image`, background-image |
| [trim-assets.md](trim-assets.md) | Pillow flood-fill trim for letterboxed CDN assets |
| [troubleshooting.md](troubleshooting.md) | Symptom → cause → fix, verification steps |
