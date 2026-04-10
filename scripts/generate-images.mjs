/**
 * Batch image generator using Gemini API (Imagen 3)
 *
 * Usage:
 *   1. Set your API key:  export GEMINI_API_KEY="your-key-here"
 *   2. Run:               node scripts/generate-images.mjs
 *
 * Images are saved to public/images/
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable first.");
  console.error("  export GEMINI_API_KEY=\"your-key-here\"");
  process.exit(1);
}

const IMAGES = [
  // --- M1 B4: VR vs AR ---
  {
    filename: "classify-vr-volcano.png",
    prompt:
      "Photorealistic illustration of a student wearing a VR headset fully immersed inside a virtual volcano with glowing lava flows and rocks, the classroom is completely invisible, educational setting, warm orange lighting, clean modern style, 16:9",
  },
  {
    filename: "classify-ar-anatomy-tablet.png",
    prompt:
      "Photorealistic illustration of students in a classroom using tablets showing AR overlays with 3D anatomical labels floating over a real anatomical model on a desk, augmented reality educational app, bright classroom lighting, clean modern style, 16:9",
  },
  {
    filename: "classify-ar-engine-repair.png",
    prompt:
      "Photorealistic illustration of a vocational teacher seeing AR holographic repair instructions and arrows overlaid on a real car engine in a workshop, augmented reality maintenance training, clean modern style, 16:9",
  },
  {
    filename: "classify-vr-human-cell.png",
    prompt:
      "Photorealistic illustration of students wearing VR headsets immersed inside a giant virtual human cell with organelles floating around them, fully virtual biology environment, blue and purple tones, educational setting, clean modern style, 16:9",
  },
  {
    filename: "classify-ar-castle-textbook.png",
    prompt:
      "Photorealistic illustration of students scanning a textbook with tablets and a detailed 3D medieval castle model appearing to float above the book page through augmented reality, classroom setting, clean modern style, 16:9",
  },

  // --- M3 B3: Seeing vs Doing ---
  {
    filename: "classify-seeing-factory-tour.png",
    prompt:
      "Photorealistic illustration of a student wearing a VR headset passively watching a 360-degree guided tour inside a factory, hands at sides not interacting, observing industrial environment, calm neutral lighting, clean modern style, 16:9",
  },
  {
    filename: "classify-doing-operate-machinery.png",
    prompt:
      "Photorealistic illustration of a student wearing a VR headset actively using hand controllers to operate virtual industrial machinery, hands engaged with holographic controls and step-by-step instructions floating nearby, focused and active posture, clean modern style, 16:9",
  },
  {
    filename: "classify-doing-triage-decisions.png",
    prompt:
      "Photorealistic illustration of a nursing student in VR headset making triage decisions in a virtual emergency room, pointing at virtual patients with severity indicators, active decision-making posture, urgent medical environment, clean modern style, 16:9",
  },
  {
    filename: "classify-seeing-circulatory-system.png",
    prompt:
      "Photorealistic illustration of a student wearing a VR headset passively watching a virtual fly-through animation of the human circulatory system with blood vessels and heart, seated and observing, blue and red tones, clean modern style, 16:9",
  },
  {
    filename: "classify-doing-assemble-engine.png",
    prompt:
      "Photorealistic illustration of a vocational student wearing a VR headset actively using hands to grab and place virtual engine parts in correct positions, assembly training simulation with highlighted placement zones, clean modern style, 16:9",
  },

  // --- M3 B5: Exploration vs Simulation ---
  {
    filename: "classify-explore-er-hazards.png",
    prompt:
      "Photorealistic illustration of a student wearing a VR headset walking through a virtual hospital emergency department, looking around and observing, clipboard-style checklist floating nearby to identify safety hazards, exploratory calm environment, clean modern style, 16:9",
  },
  {
    filename: "classify-sim-injection-practice.png",
    prompt:
      "Photorealistic illustration of a nursing student wearing a VR headset practicing an injection on a virtual patient arm, hands holding a virtual syringe with real-time feedback indicators showing correct angle and depth, simulation training, clean modern style, 16:9",
  },
  {
    filename: "classify-sim-fire-evacuation.png",
    prompt:
      "Photorealistic illustration of a student wearing a VR headset performing a fire evacuation simulation, directing virtual people toward illuminated exit signs in a smoke-filled virtual building, urgent active scenario, warm orange lighting, clean modern style, 16:9",
  },
  {
    filename: "classify-explore-archaeology.png",
    prompt:
      "Photorealistic illustration of a student wearing a VR headset walking through a virtual archaeological excavation site with ancient ruins, examining artifacts on the ground, exploratory calm atmosphere, sandy warm tones, clean modern style, 16:9",
  },
  {
    filename: "classify-sim-engine-maintenance.png",
    prompt:
      "Photorealistic illustration of a vocational student wearing a VR headset assembling a virtual engine following numbered step indicators, hands placing parts with precision, virtual tools laid out nearby, technical simulation environment, clean modern style, 16:9",
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

  // Imagen returns predictions[].bytesBase64Encoded
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

    // Small delay to avoid rate limits (free tier = 10 RPM for imagen)
    if (i < IMAGES.length - 1) {
      console.log("  Waiting 8s (rate limit)...");
      await new Promise((r) => setTimeout(r, 8000));
    }
  }

  console.log(`\nDone! ${success} generated, ${fail} failed.`);
}

main();
