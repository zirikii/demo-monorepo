// Downloads each event's CDN artwork and writes resized WebP copies to public/brand/events/.
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const { source, events } = JSON.parse(readFileSync(join(here, "event-images.json"), "utf8"));
const outDir = join(here, "..", "public", "brand", "events");
mkdirSync(outDir, { recursive: true });

const SIZES = { tile: { width: 720, quality: 74 }, banner: { width: 1600, quality: 72 } };

for (const [slug, ids] of Object.entries(events)) {
  for (const [kind, id] of Object.entries(ids)) {
    const res = await fetch(source.replace("{id}", String(id)));
    if (!res.ok) throw new Error(`sfx${id}.jpg → HTTP ${res.status}`);
    const { width, quality } = SIZES[kind];
    await sharp(Buffer.from(await res.arrayBuffer()))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(join(outDir, `${slug}-${kind}.webp`));
    console.log(`${slug}-${kind}.webp ← sfx${id}.jpg`);
  }
}
