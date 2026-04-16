/**
 * Generate images for Module 6 (Solving Common VR Problems) using Gemini API (Imagen 4)
 *
 * Usage:
 *   1. Set your API key:  export GEMINI_API_KEY="your-key-here"
 *   2. Run:               node scripts/generate-m6-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable first.");
  console.error('  export GEMINI_API_KEY="your-key-here"');
  process.exit(1);
}

const IMAGES = [
  {
    filename: "hero-solving-common-vr-problems.png",
    prompt:
      "Wide cinematic photograph of a bright modern classroom: a teacher calmly troubleshooting a Meta Quest 3 VR headset at a desk while students work in the background with other headsets, a small toolkit and USB-C cables visible on the desk, several Meta Quest 3 headsets visible some working some being diagnosed, warm natural lighting from large windows, professional educational photography, diverse group of adult learners, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m6-wifi-diagnostic.png",
    prompt:
      "Photorealistic close-up of a teacher holding a Meta Quest 3 VR headset, pointing at the side panel where Quick Settings would appear, a bright classroom desk in the background with other headsets, a small WiFi router visible on a shelf, warm natural lighting, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m6-guardian-mirror.png",
    prompt:
      "Photorealistic illustration of a bright modern classroom with a full-length mirror on one wall, a Meta Quest 3 VR headset in the foreground on a desk with its external cameras visible, a teacher placing a curtain over the mirror to block reflections, warm natural lighting, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m6-charging-led.png",
    prompt:
      "Close-up photorealistic view of a Meta Quest 3 VR headset on a classroom desk with a USB-C cable plugged into its charging port, a small orange LED indicator light glowing on the headset, another headset nearby with a green LED, warm lighting from a classroom window, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m6-casting-setup.png",
    prompt:
      "Photorealistic illustration of a modern classroom with a large TV screen showing a first-person VR view of a virtual science lab, a Meta Quest 3 headset worn by a student in the foreground, other students seated watching the TV screen attentively, a small Chromecast dongle visible plugged into the TV, warm natural classroom lighting, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m6-troubleshoot-mindset.png",
    prompt:
      "Photorealistic illustration of a calm confident teacher standing in a bright modern classroom, some students wearing Meta Quest 3 VR headsets while others work on a paper worksheet at their desks as a backup activity, one broken headset set aside on the teacher desk with a small sticky note, the teacher smiling and gesturing to the class, warm natural lighting, professional educational photography, diverse students, clean modern style, 16:9 aspect ratio",
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
