# Full-Bleed Card Images — Reference

## Trim padded JPEGs

Generic script (accepts a directory of JPGs):

```bash
python3 .cursor/skills/full-bleed-card-images/scripts/trim-images.py path/to/images/
```

Requires: `pip install pillow`

Changi-specific (destinations under `apps/changi/public/brand/destinations/`):

```bash
python3 apps/changi/scripts/trim-destination-images.py
```

Run after `apps/changi/scripts/fetch-brand-assets.sh` — Scene7 `fit=crop` URLs can still return letterboxed files.

## Next.js `Image` equivalent

```tsx
<div className="relative aspect-square overflow-hidden">
  <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 50vw, 208px" />
</div>
```

Parent must be `position: relative` when using `fill`.

## Background-image fallback

When `<img>` is awkward (dynamic overlays):

```tsx
<div
  className="aspect-square overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url(${src})` }}
  role="img"
  aria-label={alt}
/>
```

Prefer `<img>` for accessibility and lazy loading unless overlays require otherwise.
