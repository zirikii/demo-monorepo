#!/usr/bin/env node
// Derives every file in public/brand/ from the official AGL lockup PNG.
//
// agl.com.au and its CDN are unreachable from the restricted build environment, so the official
// transparent lockup was supplied directly and lives in brand-source/. Re-run with `pnpm brand`.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "brand-source/agl-logo-source.png");
const out = join(root, "public/brand");

async function rgba() {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

/** The wordmark is neutral black; the rays are saturated blue/cyan. Saturation separates them. */
function isWordmarkPixel(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b) < 40 && Math.max(r, g, b) < 170;
}

async function writeVariant(file, transform, { height }) {
  const { data, info } = await rgba();
  const copy = Buffer.from(data);
  for (let i = 0; i < copy.length; i += 4) transform(copy, i);
  await sharp(copy, { raw: info })
    .trim({ threshold: 1 })
    .resize({ height, fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(join(out, file));
  console.log(`→ ${file}`);
}

async function writeSquareMark(file, size) {
  const { data, info } = await rgba();
  const copy = Buffer.from(data);
  for (let i = 0; i < copy.length; i += 4) {
    if (isWordmarkPixel(copy[i], copy[i + 1], copy[i + 2])) copy[i + 3] = 0;
  }
  const trimmed = await sharp(copy, { raw: info }).trim({ threshold: 1 }).png().toBuffer();
  const inner = Math.round(size * 0.86);
  await sharp(trimmed)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.floor((size - inner) / 2),
      bottom: Math.ceil((size - inner) / 2),
      left: Math.floor((size - inner) / 2),
      right: Math.ceil((size - inner) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(join(out, file));
  console.log(`→ ${file}`);
}

await mkdir(out, { recursive: true });

await writeVariant("logo.png", () => {}, { height: 240 });
await writeVariant(
  "logo-white.png",
  (px, i) => {
    if (isWordmarkPixel(px[i], px[i + 1], px[i + 2])) {
      px[i] = 255;
      px[i + 1] = 255;
      px[i + 2] = 255;
    }
  },
  { height: 240 },
);
await writeSquareMark("mark.png", 256);
await writeSquareMark("favicon.png", 64);
await writeSquareMark("apple-touch-icon.png", 180);

const manifest = {
  derived: new Date().toISOString().slice(0, 10),
  disclaimer:
    "Unofficial demo assets. AGL brand artwork is used for visual fidelity only. Not affiliated with or endorsed by AGL Energy Limited.",
  canonicalSource: "https://www.agl.com.au/",
  note: "agl.com.au is unreachable from the restricted build environment. The official transparent AGL lockup was supplied directly (brand-source/agl-logo-source.png); every file here is derived from it by scripts/derive-brand-assets.mjs.",
  files: [
    { file: "logo.png", description: "Full AGL lockup (gradient rays + black wordmark), trimmed. Site header." },
    { file: "logo-white.png", description: "Reversed lockup — wordmark recoloured to white for dark surfaces." },
    { file: "mark.png", description: "Rays-only brandmark (wordmark removed by saturation mask), 256px square." },
    { file: "favicon.png", description: "Rays-only brandmark, 64px square. Browser tab icon." },
    { file: "apple-touch-icon.png", description: "Rays-only brandmark, 180px square." },
  ],
  palette: {
    raysDeepBlue: "#0046bd",
    raysCyan: "#00e1ee",
    raysLightCyan: "#42e8f1",
    wordmark: "#000000",
  },
};
await writeFile(join(out, "brand-assets.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log("→ brand-assets.json");
