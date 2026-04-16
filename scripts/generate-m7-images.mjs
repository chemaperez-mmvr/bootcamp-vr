/**
 * Generate images for Module 7 (VR Educational Apps) using Gemini API (Imagen 4)
 *
 * Usage:
 *   1. Set your API key:  export GEMINI_API_KEY="your-key-here"
 *   2. Run:               node scripts/generate-m7-images.mjs
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
    filename: "hero-vr-educational-apps.png",
    prompt:
      "Wide cinematic photograph of a modern classroom: a teacher sitting at a desk with a laptop showing a grid of VR app icons on screen, a Meta Quest 3 VR headset beside the laptop, several educational app category labels visible on a whiteboard behind the teacher, warm natural lighting from large windows, professional educational photography, diverse group of adult learners in the background trying headsets, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m7-app-types-overview.png",
    prompt:
      "Clean infographic illustration showing five VR educational app types arranged in a horizontal flow with icons: a magnifying glass for Exploration, a gear icon for Simulation, footstep arrows for Guided Training, a clipboard with checkmark for Evaluation, and speech bubbles for Communication, connected by subtle arrows showing a learning progression, bright modern flat design, professional educational style, white background with colorful icons, 16:9 aspect ratio",
  },
  {
    filename: "m7-app-evaluation.png",
    prompt:
      "Photorealistic close-up of a teacher's hands holding a Meta Quest 3 VR headset while looking at a printed checklist on the desk with three sections highlighted in different colors green amber and red, a pen marking items on the checklist, warm classroom lighting from a window, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m7-app-lab-search.png",
    prompt:
      "Photorealistic illustration of a Meta Quest 3 VR headset on a classroom desk with a tablet nearby showing an app store interface with educational app thumbnails, a teacher pointing at the tablet screen, a school shelf with organized headsets in the background, warm natural classroom lighting, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m7-simulation-training.png",
    prompt:
      "Photorealistic photograph of a student wearing a Meta Quest 3 VR headset in a bright modern classroom, their hands extended forward as if manipulating virtual objects, a large screen behind them showing a first-person view of a virtual medical simulation, other students observing and taking notes, warm natural lighting, professional educational photography, diverse adult learners, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m7-before-during-after.png",
    prompt:
      "Clean illustrated infographic showing the before-during-after integration structure for VR in education: left panel showing a teacher briefing students at desks, center panel showing students wearing Meta Quest 3 VR headsets, right panel showing a group debriefing discussion circle, three panels connected by arrows, bright modern flat design style, warm educational tones, professional style, 16:9 aspect ratio",
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
