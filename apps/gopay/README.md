# GoPay reKYC (unofficial demo)

A phone-sized walkthrough of GoPay’s self-serve consumer reKYC flow. It is **not** affiliated with GoPay, Gojek, or GoTo.

The screens follow the [GoPay reKYC user flow Figma](https://www.figma.com/design/iiYcblHI5JqLt6TDqmZnWW/GoPay-reKYC-User-Flow). Copy and layout for the e-KTP review, update onboarding, face check, capture countdown, and EDD questions come from that file. Product rules (a new submission per attempt, one live approval, NIK mismatch, Dukcapil failure without downgrade) come from the Self Serve ReKYC consumer PRD.

## Run

```bash
pnpm dev:gopay
```

Open http://localhost:5184. The demo is already signed in as **Budi Pratama** (`hanz@gmail.com`, `+628187888188`). No password.

## Walk the flow

1. Settings → **Verified Account Center** → **Verified Identity**.
2. Review the masked e-KTP. **See more data** reveals RT/RW, kelurahan, kecamatan, religion, and gender.
3. **My data is still the same** runs a face check, then reschedules the next review without writing a new identity.
4. **I need to update my e-KTP data** runs the face check, then the update onboarding and e-KTP capture. The face photo is reused, so there is no second selfie.
5. Help → **I need to update my e-KTP data**, or **Chat with Dira**, also opens the review.

The panel beside the phone sets the capture outcome: happy update, NIK mismatch, manual review, high-risk EDD, Dukcapil rejection, or a failing face check. It also lists submissions (initial KYC and reKYC), filters by type, and lets a reviewer approve or reject a row. Mark the review overdue and turn **block enforcement** on to see the blocking screen.

State is stored in `localStorage` under `gopay-rekyc-demo`.

## Scripts

```bash
pnpm --filter gopay-rekyc-demo test
pnpm --filter gopay-rekyc-demo lint
pnpm --filter gopay-rekyc-demo build
```
