/**
 * Optimize all images in public/images/ — convert PNG/JPG to WebP.
 *
 * Usage:  node scripts/optimize-images.mjs
 *
 * - Converts .png and .jpg/.jpeg to .webp (quality 80)
 * - Resizes images wider than 1600px to max 1600px (preserving aspect ratio)
 * - Deletes originals after successful conversion
 * - Reports per-file and total savings
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.join(__dirname, "..", "public", "images");
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

async function main() {
  const files = fs
    .readdirSync(IMG_DIR)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .sort();

  console.log(`Found ${files.length} images to optimize.\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let converted = 0;
  let failed = 0;

  for (const file of files) {
    const srcPath = path.join(IMG_DIR, file);
    const ext = path.extname(file);
    const baseName = file.replace(/\.(png|jpe?g)$/i, "");
    const destPath = path.join(IMG_DIR, `${baseName}.webp`);

    const originalSize = fs.statSync(srcPath).size;
    totalOriginal += originalSize;

    try {
      let pipeline = sharp(srcPath);

      // Resize if wider than MAX_WIDTH
      const metadata = await pipeline.metadata();
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }

      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(destPath);

      const newSize = fs.statSync(destPath).size;
      totalOptimized += newSize;

      const savings = ((1 - newSize / originalSize) * 100).toFixed(0);
      console.log(
        `  ${file} → ${baseName}.webp  (${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB, -${savings}%)`
      );

      // Delete original
      fs.unlinkSync(srcPath);
      converted++;
    } catch (err) {
      console.error(`  FAILED: ${file} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Converted: ${converted}  |  Failed: ${failed}`);
  console.log(
    `Before: ${(totalOriginal / 1048576).toFixed(1)} MB  →  After: ${(totalOptimized / 1048576).toFixed(1)} MB  (saved ${((1 - totalOptimized / totalOriginal) * 100).toFixed(0)}%)`
  );
}

main();
