/**
 * Generate images for Module 5 (Briefing and Debriefing) using Gemini API (Imagen 4)
 *
 * Usage:
 *   1. Set your API key:  export GEMINI_API_KEY="your-key-here"
 *   2. Run:               node scripts/generate-m5-images.mjs
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
    filename: "hero-briefing-and-debriefing.png",
    prompt:
      "Wide cinematic photograph of a bright modern classroom: a teacher standing in front of seated students giving a structured pre-VR briefing, a whiteboard behind the teacher shows a simple four-step framework written in coloured markers (Objective Rules Time Task), Meta Quest 3 VR headsets arranged neatly on a table to the side ready to be distributed, warm natural lighting from large windows, students attentive and focused, diverse group of adult learners, professional educational photography, clean modern style, 16:9 aspect ratio",
  },
  {
    filename: "m5-classify-debrief-gather.png",
    prompt:
      "Photorealistic illustration of students sitting in a circle in a bright classroom after removing their VR headsets, headsets resting on their laps or the desk beside them, a teacher standing and asking questions with an open hand gesture, students are actively sharing observations and raising hands, warm natural classroom lighting, diverse adult learners, educational setting, clean modern style, 16:9",
  },
  {
    filename: "m5-classify-debrief-analyze.png",
    prompt:
      "Photorealistic illustration of a close-up view of a teacher facilitating a group discussion in a classroom, the teacher is listening intently while one student explains their reasoning, a whiteboard behind shows 'Why?' written in marker with arrows connecting ideas, other students are nodding or thinking, warm classroom lighting, diverse adult learners, educational photography, clean modern style, 16:9",
  },
  {
    filename: "m5-classify-objective.png",
    prompt:
      "Photorealistic illustration of a teacher pointing at a large screen displaying a clear learning objective written in bold text, the objective reads 'Identify all safety hazards', students seated and watching attentively, Meta Quest 3 VR headsets visible on a nearby table, bright modern classroom, warm lighting, professional educational photography, clean modern style, 16:9",
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
