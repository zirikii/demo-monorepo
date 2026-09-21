# GoPay self-serve reKYC (unofficial demo)

A phone-framed walkthrough of the GoPay consumer reKYC flow: Verified Account Center, e-KTP review, face verification, e-KTP capture, enhanced due diligence, and the approval write-back. Not affiliated with GoPay or GoTo.

```bash
pnpm dev:gopay-rekyc
```

Open http://localhost:5184. The demo controls beside the phone force every branch (face failure, NIK mismatch, low OCR confidence, high risk, Dukcapil, upload failure, session expiry).

## What is mocked

There is no camera, Dukcapil, or partner network. Capture steps are timed simulations. `server/rekycApi.ts` exposes the flow over HTTP and stores submissions in `server/data/state.json`.

Each attempt is its own submission. At most one submission per account is approved. Approving a reKYC supersedes the previous approval with `superseded_by_newer_approval` in the same write. A rejected reKYC does not change KYC status, the data in use, or the review date. Partner callbacks carry only `accountId`, `event`, and `timestamp`.

## Deviations from the PRD

The attached Figma file is the visual source, not the mockups embedded in the PRD.

| Topic | PRD | This demo |
| --- | --- | --- |
| Review actions | One CTA: "I need to update my e-KTP data" | Two CTAs, matching frame `1:42790`. "My data is still the same" confirms the data and resets the ODD date. It does not start a session. |
| Occupation, marital status, religion, gender | Shown in full | Masked, matching the Figma strings |
| Typeface | Rupa Sans | Plus Jakarta Sans |

## Figma frames

File `iiYcblHI5JqLt6TDqmZnWW`, page `0:1`.

| Frame | Route |
| --- | --- |
| Home + Genie `1:46718` | `/` |
| Dira reasons `1:48488` | `/dira` |
| Account & safety `1:43185` | `/account-safety` |
| Settings `1:42972` | `/settings` |
| Security meter `1:43470` | `/security` |
| Accounts Center `1:42391` | `/vac` |
| e-KTP review `1:42680` / `1:42790` | `/rekyc/review` |
| Face ready `1:44111`, failure `1:44559`, lockout `1:44512` | `/rekyc/face` |
| Capture onboarding `1:45707` | `/rekyc/onboarding` |
| KTP capture `1:44045` | `/rekyc/ktp` |
| EDD `1:45447` | `/rekyc/edd` |
| Benefits `1:44835` | `/rekyc/result` |

Illustrations in `public/figma/` are crops exported from those frames.
