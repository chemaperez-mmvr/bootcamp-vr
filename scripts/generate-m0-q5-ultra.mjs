/**
 * Regenerate Q5 with Imagen 4 Ultra + refined prompt.
 *
 *   export GEMINI_API_KEY="..."
 *   node scripts/generate-m0-q5-ultra.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "public", "images", "quiz", "m0-q5.png");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable first.");
  process.exit(1);
}

const PROMPT =
  "Photorealistic photograph, not illustration. A hand-held iPad is held over a physical wooden orrery model of the solar system sitting on a classroom desk. The iPad screen is clearly visible from the viewer's angle and shows the live camera feed of the same orrery model below it PLUS crisp augmented-reality overlays drawn on top: a glowing orbital ring around each planet, a small floating text label beside each planet (like \"Mars\", \"Jupiter\"), and faint grid lines anchoring the UI to the physical desk. The real solar system model is slightly out of focus behind the tablet, visibly simpler than the AR-enhanced screen. Natural daylight through a window, warm classroom ambience with blurred bookshelves behind. Realistic photography, sharp tablet screen, shallow depth of field, 50mm lens look, 16:9 aspect ratio.";

async function main() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${API_KEY}`;

  const body = {
    instances: [{ prompt: PROMPT }],
    parameters: { sampleCount: 1, aspectRatio: "16:9" },
  };

  console.log("Generating m0-q5.png with Imagen 4 Ultra...");

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
