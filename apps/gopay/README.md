# GoPay self-serve re-KYC demo (unofficial)

Vite + React 19 build of the **GoPay reKYC user flow** — the self-serve journey a consumer
takes to re-confirm their e-KTP identity, plus the verification pipeline behind it. Screens
are rebuilt from the GoPay reKYC Figma file; the business rules come from the
Self-Serve ReKYC (Consumer) PRD.

**Not affiliated with GoPay, Gojek or the GoTo Group.** Everything is mock: no database, no
real auth, no Dukcapil call. State lives in React + `localStorage`.

## Quick start

From the monorepo root:

```bash
pnpm install
pnpm dev:gopay
```

App: http://localhost:5184

Or inside this package:

```bash
pnpm --filter gopay-rekyc-demo dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Vite dev server (port 5184) |
| `pnpm build` | Typecheck + production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest unit tests (verification engine, masking, flow hook) |
| `pnpm fetch:figma` | Re-download `public/figma/*` from the export links in `manifest.json` |

## What's included

The phone frame renders one screen at a time; the panel beside it is a demo harness, not
part of the GoPay design.

- **Home (User genie)** — balance header, e-KTP reminder card, icon grid, bottom nav.
- **Accounts Center** — verified identity, the "confirm your e-KTP data before …" banner,
  connected accounts, child accounts, connected experiences.
- **Your e-KTP data** — the masked on-file record, with "my data is still the same" and
  "I need to update my e-KTP data".
- **Capture onboarding** — e-KTP + selfie steps, DigiSign notice, supervised-by-BI footer.
- **Face verification** — ready sheet, liveness viewfinder, "couldn't verify your face"
  and "way too many attempts" error states.
- **e-KTP capture** — auto-shutter countdown over the card guide.
- **EDD questions** — monthly income and purpose of use, asked only for high-risk profiles.
- **Result screens** — uploading, reviewing, taking longer than usual, pending review and
  upgrade failed, each with the countdown dial, notched card and benefits table.
- **Dira** — the help centre, which is also a re-KYC entry point.

### Deep links

`?screen=<id>` opens one frame directly, e.g.
<http://localhost:5184/?screen=fr-failed>. Valid ids are listed in `SCREENS`
(`src/hooks/useRekyc.tsx`).

## Verification pipeline

`src/lib/rekyc/engine.ts` is the PRD's decision tree, run entirely client-side:

1. **Face recognition gate** — a failed match never reaches e-KTP capture, and four
   failures block retries.
2. **NIK match** — a card belonging to somebody else is rejected locally, without calling
   Dukcapil.
3. **OCR confidence** — below threshold the submission goes to the manual review queue.
4. **Risk scoring** — a high-risk profile collects EDD answers before it can be approved.
5. **Dukcapil** — a confident cached verification is reused; otherwise it is re-run, and a
   failure rejects the submission.
6. **Approval** — the account record, ODD interval, next review date and partner
   notifications are all updated from the approved submission.

Pick an outcome with the **Scenario** radio group in the harness:

| Scenario | Outcome |
| --- | --- |
| Approved | Happy path — data updated, ODD interval extended |
| High risk — EDD | EDD questions, then approval |
| NIK mismatch | Rejected before Dukcapil |
| Manual review | Queued, account untouched until a reviewer acts |
| Dukcapil rejects | Rejected after a failed re-run |
| Face check fails | FR error, then the blocked state after four attempts |

## Design assets

`public/figma/` holds the exported Figma assets and `manifest.json` maps each local file to
its export URL. Those URLs expire about a week after they are generated, so `pnpm
fetch:figma` only works against a fresh export.

Figma ships a few mini spot illustrations as a stack of single-path SVGs rather than one
file. `public/figma/spot-layers.json` records each stack and its insets, and
`node scripts/compose-spots.mjs` flattens them into `spot-<key>.svg`.

Rupa Sans and Rupa Serif are Gojek-licensed and cannot be redistributed, so the demo
substitutes Plus Jakarta Sans and Source Serif 4 at the same metrics. Tokens in
`src/index.css` mirror the `gopay_theme/light` styles published on the Figma file.
