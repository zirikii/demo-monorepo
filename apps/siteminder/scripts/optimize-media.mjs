// Converts downloaded thumbnails (scripts/fetch-brand-assets.sh) into public/brand/media/*.webp.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = process.argv[2];
if (!srcDir) throw new Error("Usage: node scripts/optimize-media.mjs <dir with {id}.jpg>");

const { images } = JSON.parse(readFileSync(join(root, "scripts/media.json"), "utf8"));
for (const image of images) {
  let pipeline = sharp(join(srcDir, `${image.id}.jpg`));
  if (image.crop) pipeline = pipeline.extract(image.crop);
  else pipeline = pipeline.resize({ width: 1280, height: 720, fit: "cover" });
  await pipeline.webp({ quality: 74 }).toFile(join(root, "public/brand/media", image.file));
  console.log(`✓ ${image.file}`);
}
