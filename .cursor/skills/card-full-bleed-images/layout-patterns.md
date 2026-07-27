# Layout patterns

## Tailwind + `<img>` (default)

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

| Element | Required |
|---------|----------|
| Card (`article`) | `overflow-hidden` when corners are rounded |
| Media wrapper | `aspect-square` or `aspect-video` + `overflow-hidden` |
| Image | `block h-full w-full object-cover` |

## Plain CSS equivalent

```css
.card-media {
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.card-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Next.js `Image` with `fill`

Parent must be `position: relative`.

```tsx
<div className="relative aspect-square overflow-hidden">
  <Image
    src={src}
    alt={alt}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 50vw, 208px"
  />
</div>
```

## Background-image fallback

Use when overlays make `<img>` awkward. Prefer `<img>` for accessibility and lazy loading otherwise.

```tsx
<div
  className="aspect-square overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url(${src})` }}
  role="img"
  aria-label={alt}
/>
```

## Avoid

- `object-contain` on card hero images (shows gaps)
- Fixed `width`/`height` on `<img>` without a sized parent
- Missing `overflow-hidden` on card and wrapper when using rounded corners
