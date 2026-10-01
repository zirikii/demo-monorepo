// Turns the potrace output into the cropped navy/white wordmarks, the door mark and favicons.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public/brand");
const traced = readFileSync(process.argv[2], "utf8");
const group = traced.slice(traced.indexOf("<g "), traced.lastIndexOf("</g>") + 4).replace(/\s+/g, " ");

// Crop boxes measured on the 3040×720 trace: the full wordmark and just the door mark.
const WORDMARK = "96 128 2784 479";
const MARK = "96 128 360 479";

function svg(viewBox, fill, width, height) {
  const g = group.replace(/fill="[^"]*"/, `fill="${fill}"`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" role="img" aria-label="SiteMinder">${g}</svg>\n`;
}

writeFileSync(join(out, "siteminder-logo-navy.svg"), svg(WORDMARK, "#00033B", 696, 119.75));
writeFileSync(join(out, "siteminder-logo-white.svg"), svg(WORDMARK, "#FFFFFF", 696, 119.75));
writeFileSync(join(out, "siteminder-mark.svg"), svg(MARK, "#00033B", 90, 120));
writeFileSync(join(out, "siteminder-mark-white.svg"), svg(MARK, "#FFFFFF", 90, 120));

for (const [size, name] of [
  [64, "favicon-64.png"],
  [180, "apple-touch-icon.png"],
]) {
  const mark = await sharp(join(out, "siteminder-mark.svg"), { density: 900 })
    .resize({ height: Math.round(size * 0.8) })
    .png()
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(join(out, name));
}
