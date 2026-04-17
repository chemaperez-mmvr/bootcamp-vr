/**
 * Generate quiz images for Module 0 using Gemini Imagen 4 (portrait 3:4)
 * so they fill the side column without cropping.
 *
 * Usage:
 *   export GEMINI_API_KEY="..."
 *   node scripts/generate-m0-quiz-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "quiz");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable first.");
  process.exit(1);
}

const IMAGES = [
  {
    filename: "m0-q3.png",
    model: "imagen-4.0-ultra-generate-001",
    aspectRatio: "3:4",
    prompt:
      "Photorealistic photograph split into TWO STACKED HORIZONTAL PANELS, one on top of the other, portrait 3:4 composition, same bright modern classroom setting with natural window light. TOP panel: a female student sitting at a desk holds a tablet over a physical human skeleton anatomy model; the tablet screen and small holographic 3D bone labels are clearly visible overlaid on the real skeleton — augmented reality tablet overlay. BOTTOM panel: a male student nearby wears a Meta Quest 3 VR headset with hands extended forward, surrounded by soft teal volumetric light and faint holographic cellular shapes suggesting he is fully immersed inside a microscopic cell — virtual reality immersion. Clean horizontal divider line between both scenes. Professional educational photography, shallow depth of field, 3:4 aspect ratio, realistic, cinematic lighting.",
  },
  {
    filename: "m0-q5.png",
    model: "imagen-4.0-ultra-generate-001",
    aspectRatio: "3:4",
    prompt:
      "Photorealistic photograph, portrait 3:4 composition. A female student in a modern classroom holds an iPad vertically over a physical wooden orrery model of the solar system on a desk. The tablet screen clearly shows the same orrery below PLUS crisp augmented reality overlays: glowing orbital rings around each planet, small floating text labels beside planets, faint UI grid anchored to the desk. The real orrery is visible below the tablet, slightly out of focus. Natural daylight through a window, warm classroom atmosphere with blurred bookshelves, shallow depth of field, 50mm lens look, realistic, 3:4 aspect ratio.",
  },
];

async function generateImage(entry, index) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${entry.model}:predict?key=${API_KEY}`;

  const body = {
    instances: [{ prompt: entry.prompt }],
    parameters: { sampleCount: 1, aspectRatio: entry.aspectRatio },
  };

  console.log(`[${index + 1}/${IMAGES.length}] Generating: ${entry.filename} (${entry.aspectRatio})...`);

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
