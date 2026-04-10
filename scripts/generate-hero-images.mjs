/**
 * Generate hero images for Module 2, Module 3, and Module 4 using Gemini API (Imagen 4)
 *
 * Usage:
 *   1. Set your API key:  export GEMINI_API_KEY="your-key-here"
 *   2. Run:               node scripts/generate-hero-images.mjs
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
    filename: "hero-designing-meaningful-learning.png",
    prompt:
      "Wide cinematic photograph of a teacher standing at a modern whiteboard planning a VR lesson, the whiteboard shows a structured lesson flow diagram with three phases (briefing, VR experience, debriefing) drawn in coloured markers, a Meta Quest 3 headset sits on the desk nearby, warm natural classroom lighting from a window, shallow depth of field focusing on the whiteboard content, professional educational setting, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "hero-classroom-implementation.png",
    prompt:
      "Wide cinematic photograph of a real classroom during an active VR session: in the foreground a group of three students wearing Meta Quest 3 headsets standing in clearly marked floor zones with tape, in the middle ground another group of students sitting and watching a casting screen showing what the VR students see, in the background a teacher circulating and supervising with a clipboard, the room is bright and well-organized with a storage table of headsets visible, realistic diverse students, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "hero-safety-wellbeing-accessibility.png",
    prompt:
      "Wide cinematic photograph of a bright modern classroom focused on VR safety and inclusion: in the foreground a teacher kneeling beside a student who has just removed a Meta Quest 3 headset and is sitting down safely, in the middle ground another student wearing the headset inside a clearly marked floor boundary zone with blue tape, in the background a student without a headset actively taking notes while watching a casting screen, cleaning supplies and microfibre cloths visible on a nearby table, warm natural lighting, diverse students, professional educational photography emphasising care and safety, clean modern style, 16:9 aspect ratio",
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
