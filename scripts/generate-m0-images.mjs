/**
 * Generate images for Module 0 (Basic Foundations) using Gemini API (Imagen 4)
 *
 * Usage:
 *   1. Set your API key:  export GEMINI_API_KEY="your-key-here"
 *   2. Run:               node scripts/generate-m0-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "slides");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable first.");
  console.error('  export GEMINI_API_KEY="your-key-here"');
  process.exit(1);
}

const IMAGES = [
  {
    filename: "vr-ar-xr.png",
    prompt:
      "Cinematic photograph of a modern bright classroom for adult learners. On the left, a woman sits at a desk fully immersed wearing a sleek black VR headset, her hands extended as if exploring a virtual world, surrounded by soft teal volumetric light suggesting a digital environment. On the right of the same room, a man holds a tablet over an open textbook on his desk, the tablet screen showing 3D anatomical models floating above the real book. Between them, a teacher stands at a whiteboard smiling. Natural daylight from large windows, warm educational atmosphere, professional photography, shallow depth of field, 16:9 aspect ratio, realistic.",
  },
];

async function generateImage(entry, index) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

  const body = {
    instances: [{ prompt: entry.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
    },
  };

  console.log(`[${index + 1}/${IMAGES.length}] Generating: ${entry.filename}...`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  const json = await res.json();

  const prediction = json.predictions?.[0];
  if (!prediction?.bytesBase64Encoded) {
    console.error(`  WARNING: No image returned for ${entry.filename}`);
    console.error("  Response:", JSON.stringify(json).slice(0, 500));
    return false;
  }

  const buffer = Buffer.from(prediction.bytesBase64Encoded, "base64");
  const outPath = path.join(OUT_DIR, entry.filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`  Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
  return true;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let success = 0;
  let fail = 0;

  for (let i = 0; i < IMAGES.length; i++) {
    try {
      const ok = await generateImage(IMAGES[i], i);
      if (ok) success++;
      else fail++;
    } catch (err) {
      console.error(`  FAILED: ${IMAGES[i].filename} — ${err.message}`);
      fail++;
    }

    if (i < IMAGES.length - 1) {
      console.log("  Waiting 8s (rate limit)...");
      await new Promise((r) => setTimeout(r, 8000));
    }
  }

  console.log(`\nDone! ${success} generated, ${fail} failed.`);
}

main();
