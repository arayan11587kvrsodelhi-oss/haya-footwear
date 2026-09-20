/**
 * One-off asset pipeline for HAYA.
 *
 * Source of truth stays `public/images/*.png` (the designer's exports).
 * This script emits responsive AVIF + WebP variants into `public/images/gen/`
 * plus a tiny inline LQIP (base64 WebP, ~24px) manifest at
 * `src/lib/image-manifest.ts`, which the components consume for a blur-up
 * placeholder that avoid4s layout shift and gives an instant first paint.
 *
 * Run: node scripts/optimize-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
/*
 * Source art lives outside `public/` on purpose: it is ~16 MB of PNG exports and
 * must never ship in the production bundle. Only the generated variants in
 * `public/images/gen` are served.
 */
const SRC_DIR = path.join(ROOT, "assets", "source-images");
const OUT_DIR = path.join(ROOT, "public", "images", "gen");
const MANIFEST = path.join(ROOT, "src", "lib", "image-manifest.ts");

/** Widest rendered size per asset. Source art is 1408px wide, so 1408 is the ceiling. */
const WIDTHS = [640, 1024, 1408];

/** Quality tuned so the output is visually indistinguishable at 1x/2x, but far smaller. */
const AVIF_OPTS = { quality: 52, effort: 5 };
const WEBP_OPTS = { quality: 76, effort: 5, smartSubsample: true };

function human(bytes) {
  return (bytes / 1024).toFixed(0) + "KB";
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .sort();

  const manifest = {};
  let srcTotal = 0;
  let outTotal = 0;

  for (const file of files) {
    const name = path.basename(file, ".png");
    const src = path.join(SRC_DIR, file);
    srcTotal += fs.statSync(src).size;

    const meta = await sharp(src).metadata();
    const widths = WIDTHS.filter((w) => w <= meta.width);
    if (widths.length === 0) widths.push(meta.width);

    for (const w of widths) {
      const base = sharp(src).resize({ width: w, withoutEnlargement: true });

      const avifPath = path.join(OUT_DIR, `${name}-${w}.avif`);
      const avif = await base.clone().avif(AVIF_OPTS).toFile(avifPath);

      const webpPath = path.join(OUT_DIR, `${name}-${w}.webp`);
      const webp = await base.clone().webp(WEBP_OPTS).toFile(webpPath);

      outTotal += avif.size + webp.size;
      console.log(
        `  ${name}-${w}  avif ${human(avif.size)}  webp ${human(webp.size)}`
      );
    }

    // Inline blur-up placeholder: 20px wide, heavily compressed, base64 embedded.
    const lqipBuf = await sharp(src)
      .resize({ width: 20, withoutEnlargement: true })
      .webp({ quality: 28, effort: 4 })
      .toBuffer();

    manifest[name] = {
      width: meta.width,
      height: meta.height,
      widths,
      lqip: `data:image/webp;base64,${lqipBuf.toString("base64")}`,
    };

    console.log(`${name}: ${human(fs.statSync(src).size)} png -> responsive set`);
  }

  const banner = `/**
 * GENERATED FILE — do not edit by hand.
 * Produced by \`node scripts/optimize-images.mjs\` from public/images/*.png.
 *
 * \`lqip\` is a ~20px inline WebP used as a blur-up placeholder so imagery paints
 * instantly (no layout shift, no empty boxes) while the full variant decodes.
 */
export type ImageAsset = {
  width: number;
  height: number;
  widths: number[];
  lqip: string;
};

export const IMAGES: Record<string, ImageAsset> = `;

  fs.writeFileSync(
    MANIFEST,
    `${banner}${JSON.stringify(manifest, null, 2)} as const;\n\n` +
    `export function pickAsset(name: keyof typeof IMAGES): ImageAsset {\n` +
    `  return IMAGES[name];\n}\n`,
    "utf8"
  );

  console.log(
    `\nSource PNGs: ${human(srcTotal)}  ->  generated variants: ${human(outTotal)}`
  );
  console.log(`Manifest written to ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
