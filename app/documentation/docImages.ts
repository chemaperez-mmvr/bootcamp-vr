/**
 * Documentation image slots: maps [IMAGE:slotId] in section markdown to actual image paths and alt text.
 */

export type DocImageSlot = {
  src: string;
  alt: { en: string; es: string };
};

export type DocImagesByModule = Record<string, DocImageSlot>;

const module0Images: DocImagesByModule = {
  "what-is-vr-student": {
    src: "/images/que-es-vr-estudiante-gafas-vr-aula.jpg",
    alt: {
      en: "Student wearing VR headset in a classroom",
      es: "Estudiante usando gafas VR en un aula",
    },
  },
  "learning-pyramid": {
    src: "/images/learning-pyramid-see-vs-do.jpg",
    alt: {
      en: "Learning pyramid: seeing vs doing — active practice improves retention",
      es: "Pirámide del aprendizaje: ver vs hacer — la práctica activa mejora la retención",
    },
  },
  "standalone-vs-pc": {
    src: "/images/standalone-vs-pc-vr.jpg",
    alt: {
      en: "Comparison between standalone VR and PC-connected VR setups",
      es: "Comparación entre VR standalone y VR conectada a PC",
    },
  },
  "vr-use-cases-grid": {
    src: "/images/vr-use-cases-grid.jpg",
    alt: {
      en: "VR use cases in education: healthcare, vocational training, secondary education, corporate training",
      es: "Casos de uso de VR en educación: salud, formación profesional, educación secundaria, formación corporativa",
    },
  },
  "student-ar": {
    src: "/images/student-ar-glasses.jpg",
    alt: {
      en: "Student using augmented reality glasses with digital content overlaid on the real world",
      es: "Estudiante usando gafas de realidad aumentada con contenido digital superpuesto al mundo real",
    },
  },
  "ar-use-cases": {
    src: "/images/uses-ar.jpg",
    alt: {
      en: "Augmented reality use cases in the classroom: science, vocational training, history, languages",
      es: "Casos de uso de realidad aumentada en el aula: ciencias, formación técnica, historia, idiomas",
    },
  },
};

const module1Images: DocImagesByModule = {
  "types-account": {
    src: "/images/types-account.jpg",
    alt: {
      en: "Meta Quest account types: personal, shared, and institutional",
      es: "Tipos de cuenta Meta Quest: personal, compartida e institucional",
    },
  },
  "quest-3-components": {
    src: "/images/meta-quest-3-components.png",
    alt: {
      en: "Meta Quest 3 package contents: headset, controllers, cable, and box",
      es: "Contenido del paquete de Meta Quest 3: gafas, controladores, cable y caja",
    },
  },
  "quest-3-ipd": {
    src: "/images/quest-3-ipd.jpg",
    alt: {
      en: "Close-up of Meta Quest 3 IPD adjustment wheel between the lenses",
      es: "Detalle de la rueda de ajuste IPD entre las lentes de Meta Quest 3",
    },
  },
};
const module2Images: DocImagesByModule = {};
const module3Images: DocImagesByModule = {};

const docImagesByModuleSlug: Record<string, DocImagesByModule> = {
  "basic-foundations": module0Images,
  "getting-vr-ready": module1Images,
  "designing-meaningful-learning": module2Images,
  "classroom-implementation": module3Images,
};

/**
 * Replaces [IMAGE:slotId] placeholders in markdown with Markdown image syntax ![alt](src).
 * Use before passing content to ReactMarkdown.
 * Uses a new RegExp per call so lastIndex is not shared across sections.
 */
export function resolveDocImages(
  markdown: string,
  moduleSlug: string,
  locale: string
): string {
  const slots = docImagesByModuleSlug[moduleSlug];
  if (!slots) return markdown;

  const lang = locale === "es" ? "es" : "en";
  const imageTagRegex = /\[IMAGE:([a-z0-9-]+)\]/gi;

  return markdown.replace(imageTagRegex, (_, slotId: string) => {
    const slot = slots[slotId];
    if (!slot) return "";
    const alt = slot.alt[lang] ?? slot.alt.en;
    return `![${alt}](${slot.src})`;
  });
}
