#!/usr/bin/env node
/**
 * Figma exports some 40x40 mini spot illustrations as a stack of single-path SVGs plus
 * the insets that position them. This flattens each stack back into one 40x40 SVG so
 * the app can render the illustration with a single <img>.
 *
 * Run it after re-exporting assets with scripts/fetch-figma-assets.sh:
 *   node scripts/compose-spots.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FIGMA_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "figma");
const BOX = 40;

const manifest = JSON.parse(readFileSync(join(FIGMA_DIR, "spot-layers.json"), "utf8"));

/** Strips the outer <svg> wrapper and returns its viewBox plus inner markup. */
function parseLayer(file) {
  const raw = readFileSync(join(FIGMA_DIR, file), "utf8");
  const open = raw.match(/<svg\b[^>]*>/);
  if (!open) throw new Error(`${file} has no <svg> element`);
  const viewBox = open[0].match(/viewBox="([^"]+)"/)?.[1];
  const width = open[0].match(/width="([\d.]+)"/)?.[1];
  const height = open[0].match(/height="([\d.]+)"/)?.[1];
  const body = raw.slice(open.index + open[0].length, raw.lastIndexOf("</svg>"));
  return { viewBox: viewBox ?? `0 0 ${width} ${height}`, body };
}

/** Namespaces ids so gradients and filters cannot collide once layers are merged. */
function namespaceIds(markup, prefix) {
  return markup
    .replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/(xlink:href|href)="#([^"]+)"/g, (_, attr, id) => `${attr}="#${prefix}${id}"`);
}

const round = (value) => Number(value.toFixed(3));

for (const [key, spot] of Object.entries(manifest.spots)) {
  const layers = spot.layers.map(({ file, insetPct }, index) => {
    const { viewBox, body } = parseLayer(file);
    const x = round((insetPct.left / 100) * BOX);
    const y = round((insetPct.top / 100) * BOX);
    const width = round(BOX - x - (insetPct.right / 100) * BOX);
    const height = round(BOX - y - (insetPct.bottom / 100) * BOX);
    const inner = namespaceIds(body.trim(), `${key}${index}_`);
    return `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${viewBox}" preserveAspectRatio="none" overflow="visible">${inner}</svg>`;
  });

  const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${BOX}" height="${BOX}" viewBox="0 0 ${BOX} ${BOX}" fill="none">${layers.join("")}</svg>\n`;
  const file = `spot-${key}.svg`;
  writeFileSync(join(FIGMA_DIR, file), out);
  console.log(`wrote ${file} (${spot.layers.length} layers)`);
}
