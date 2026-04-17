/**
 * Regenerate Q3 with a more engaging cinematic composition (portrait 3:4).
 *
 *   export GEMINI_API_KEY="..."
 *   node scripts/generate-m0-q3.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "public", "images", "quiz", "m0-q3.png");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable first.");
  process.exit(1);
}

const PROMPT =
  "Cinematic photograph, portrait 3:4 composition, split into TWO STACKED PANELS separated by a thin clean horizontal divider. TOP panel (warm golden daylight tones): extreme close-up shot of a student's hands holding a tablet over a physical anatomical skeleton model on a wooden desk — the tablet screen clearly shows the same skeleton PLUS floating holographic 3D bone labels and glowing red anatomical annotations layered over the real bones visible beneath. The student's face is partially visible with a focused, curious expression. Warm amber sunset light streaming through a window creates dramatic side lighting. BOTTOM panel (cool teal and cyan dramatic tones): a student wearing a sleek black VR headset with their hands extended forward in wonder, face slightly tilted upward, surrounded by vivid glowing cyan and turquoise holographic microscopic cellular structures floating around them like particles. Dark moody background. Rim lighting from the VR content illuminates the student's face. Feels immersive and dramatic. Both panels convey strong emotion and engagement. Photorealistic, high production value, shallow depth of field, cinematic color grading, 3:4 aspect ratio.";

async function main() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${API_KEY}`;

  const body = {
    instances: [{ prompt: PROMPT }],
    parameters: { sampleCount: 1, aspectRatio: "3:4" },
  };

  console.log("Generating m0-q3.png (engaging cinematic)...");

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
    console.error("No image returned. Response:", JSON.stringify(json).slice(0, 500));
    process.exit(1);
  }

  const buffer = Buffer.from(prediction.bytesBase64Encoded, "base64");
  fs.writeFileSync(OUT_PATH, buffer);
  console.log(`Saved: ${OUT_PATH} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
