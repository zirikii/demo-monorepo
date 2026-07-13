---
name: full-bleed-card-images
description: Ensures images in cards, carousels, and media tiles fill their container edge-to-edge. Use when creating or fixing image cards, destination tiles, product cards, gallery items, or any card UI where a photo should cover the media area without letterboxing or sand/gray gaps.
disable-model-invocation: false
---

# Full-Bleed Card Images

When building cards with images, the photo must fill the media area edge-to-edge. Fix **both** layout CSS and source assets — `object-cover` alone cannot fix padded image files.

## Checklist

```
- [ ] Media wrapper defines size (aspect-ratio or fixed height)
- [ ] Wrapper has overflow-hidden
- [ ] Image uses block + h-full w-full object-cover (or equivalent)
- [ ] Card/article has overflow-hidden if corners are rounded
- [ ] Source assets are full-bleed (no baked-in white/black padding)
- [ ] Visually verified in browser
```

## Layout pattern

**Tailwind (preferred):**

```tsx
<article className="overflow-hidden rounded-2xl">
  <div className="aspect-square overflow-hidden bg-muted">
    <img
      src={item.image}
      alt={item.title}
      className="block h-full w-full object-cover"
      loading="lazy"
    />
  </div>
  <div className="p-3">{/* text */}</div>
</article>
```

**CSS equivalent:** wrapper `aspect-ratio: 1 / 1; overflow: hidden`; img `display: block; width: 100%; height: 100%; object-fit: cover`.

### Required classes

| Element | Why |
|---------|-----|
| `aspect-square` or `aspect-video` | Gives the image a box to fill |
| `overflow-hidden` on wrapper + card | Clips image to rounded corners |
| `block` on `<img>` | Removes inline-image baseline gap |
| `h-full w-full object-cover` | Fills box; crops overflow |

### Avoid

- `object-contain` on card hero images (shows gaps)
- Fixed `width`/`height` on `<img>` without a sized parent
- `bg-*` showing around a tiny centered photo — usually a **source asset** problem, not CSS

## Source assets

If CSS is correct but the image still looks tiny with empty margins:

1. **Inspect the file** — open the JPG/PNG. Padded canvases (small photo centered on white/black) cannot be fixed with CSS.
2. **Re-fetch with crop params** — e.g. CDN `?wid=640&hei=640&fit=crop`.
3. **Trim locally** — run [scripts/trim-images.py](scripts/trim-images.py) or see [reference.md](reference.md).

Scene7/CDN assets often ship with baked-in padding even when `fit=crop` is set. Always verify the saved file, not just the URL.

## Repo example

Changi destination carousel — fixed in this monorepo:

- Component: `apps/changi/src/components/marketing/DestinationsSection.tsx`
- Asset fetch: `apps/changi/scripts/fetch-brand-assets.sh`
- Trim script: `apps/changi/scripts/trim-destination-images.py`

## Verification

Before finishing:

1. Scroll to the card section in the browser.
2. Confirm the photo touches all four edges of the media area.
3. Check at least two cards (first and one mid-carousel).
4. Hard-refresh if assets were replaced (`Cmd+Shift+R`).

## Common failure modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Small photo in colored square | Padded source file | Trim or re-fetch asset |
| Thin gap below image | Inline img baseline | Add `block` or `display: block` |
| Image bleeds past rounded corners | Missing `overflow-hidden` on card/wrapper | Add to both |
| Stretched/distorted photo | `object-fill` or missing aspect wrapper | Use `object-cover` + aspect-ratio |

## Additional resources

- Trim script and asset workflow: [reference.md](reference.md)
