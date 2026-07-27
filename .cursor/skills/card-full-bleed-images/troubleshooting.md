# Troubleshooting

## Symptom → cause → fix

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Small photo in colored square | Padded source file | Trim or re-fetch asset ([trim-assets.md](trim-assets.md)) |
| Thin gap below image | Inline `<img>` baseline | Add `block` or `display: block` |
| Image bleeds past rounded corners | Missing `overflow-hidden` | Add on card and media wrapper |
| Stretched/distorted photo | `object-fill` or no aspect wrapper | Use `object-cover` + aspect-ratio |

## Verification

1. Scroll to the card section in the browser.
2. Confirm the photo touches all four edges of the media area.
3. Check at least two cards (first and one mid-carousel).
4. Hard-refresh if assets were replaced (`Cmd+Shift+R`).

## Quick asset check

If corners of the JPG are pure white `(255,255,255)` but the photo looks tiny in the UI, the file is letterboxed — CSS cannot fix it.
