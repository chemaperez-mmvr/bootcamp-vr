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
  "work-meta-dashboard": {
    src: "/images/work-meta-dashboard.png",
    alt: {
      en: "Work for Meta admin dashboard — overview with configuration plans and device management",
      es: "Panel de administración de Work for Meta — vista general con planes de configuración y gestión de dispositivos",
    },
  },
  "work-meta-people": {
    src: "/images/work-meta-people.png",
    alt: {
      en: "People management panel in Work for Meta — users, roles and permissions",
      es: "Panel de personas en Work for Meta — usuarios, roles y permisos",
    },
  },
  "work-meta-templates": {
    src: "/images/work-meta-templates.png",
    alt: {
      en: "Device configuration templates in Work for Meta",
      es: "Plantillas de configuración de dispositivos en Work for Meta",
    },
  },
  "work-meta-create-group": {
    src: "/images/work-meta-create-group.png",
    alt: {
      en: "Create device group dialog in Work for Meta",
      es: "Diálogo para crear grupo de dispositivos en Work for Meta",
    },
  },
  "work-meta-add-app": {
    src: "/images/work-meta-add-app.png",
    alt: {
      en: "Import app dialog in Work for Meta — adding a private app to the organisation",
      es: "Diálogo de importar app en Work for Meta — añadiendo una app privada a la organización",
    },
  },
  "work-meta-apps": {
    src: "/images/work-meta-apps.png",
    alt: {
      en: "Applications and content management panel in Work for Meta",
      es: "Panel de gestión de aplicaciones y contenido en Work for Meta",
    },
  },
  "work-meta-activate-instructions": {
    src: "/images/work-meta-activate-instructions.png",
    alt: {
      en: "Device activation instructions panel in Work for Meta — Wi-Fi method steps",
      es: "Panel de instrucciones de activación de dispositivos en Work for Meta — pasos del método Wi-Fi",
    },
  },
  "work-meta-activation-wifi": {
    src: "/images/work-meta-activation-wifi.png",
    alt: {
      en: "Device activation dialog via Wi-Fi — enter the 6-digit code shown on the headset",
      es: "Diálogo de activación de dispositivo por Wi-Fi — introducir el código de 6 dígitos de las gafas",
    },
  },
  "work-meta-device-linked": {
    src: "/images/work-meta-device-linked.png",
    alt: {
      en: "Device successfully linked to the organisation in Work for Meta — group and template assignment options",
      es: "Dispositivo vinculado a la organización en Work for Meta — opciones de asignación a grupo y plantilla",
    },
  },
  "work-meta-headset-configured": {
    src: "/images/work-meta-headset-configured.png",
    alt: {
      en: "Headset view after configuration — assigned apps appear installed and ready",
      es: "Vista del headset tras la configuración — las apps asignadas aparecen instaladas y listas",
    },
  },
  "work-meta-tool-download": {
    src: "/images/work-meta-tool-download.png",
    alt: {
      en: "Download dialog for the Meta Horizon device configuration tool for PC/Mac",
      es: "Diálogo de descarga de la herramienta de configuración de dispositivos Meta Horizon para PC/Mac",
    },
  },
  "work-meta-cable-connect": {
    src: "/images/work-meta-cable-connect.png",
    alt: {
      en: "Connect a device dialog — instructions for USB cable setup with headset powered off",
      es: "Diálogo de conectar dispositivo — instrucciones para configuración por cable USB con las gafas apagadas",
    },
  },
  "work-meta-activation-cable": {
    src: "/images/work-meta-activation-cable.png",
    alt: {
      en: "Device configuration via USB cable — language, Wi-Fi network and automatic setup form",
      es: "Configuración de dispositivo por cable USB — idioma, red Wi-Fi y formulario de configuración automática",
    },
  },
  "work-meta-headset-configured-cable": {
    src: "/images/work-meta-headset-configured-cable.png",
    alt: {
      en: "Headset view after cable configuration — apps installed automatically without touching the headset",
      es: "Vista del headset tras configuración por cable — apps instaladas automáticamente sin tocar las gafas",
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
const module2Images: DocImagesByModule = {
  "learning-pyramid": {
    src: "/images/learning-pyramid-see-vs-do.jpg",
    alt: {
      en: "Learning pyramid: seeing vs doing — active practice dramatically improves retention compared to passive observation",
      es: "Pirámide del aprendizaje: ver vs hacer — la práctica activa mejora drásticamente la retención comparada con la observación pasiva",
    },
  },
  "vr-classroom-session": {
    src: "/images/vr-classroom-student-headset.jpg",
    alt: {
      en: "Student using a VR headset during a guided classroom session while the instructor observes",
      es: "Estudiante usando gafas VR durante una sesión guiada en el aula mientras el instructor observa",
    },
  },
  "activity-types-grid": {
    src: "/images/vr-use-cases-grid.jpg",
    alt: {
      en: "VR activity types: guided exploration, simulation with practice, and evaluation — mapped to learning objectives",
      es: "Tipos de actividad VR: exploración guiada, simulación con práctica y evaluación — mapeados a objetivos de aprendizaje",
    },
  },
};

const module3Images: DocImagesByModule = {
  "classroom-vr-session": {
    src: "/images/vr-classroom-student-headset.jpg",
    alt: {
      en: "Classroom VR session — students using headsets while instructor monitors the activity",
      es: "Sesión VR en el aula — estudiantes usando gafas mientras el instructor supervisa la actividad",
    },
  },
  "vr-use-cases-stations": {
    src: "/images/vr-use-cases-grid.jpg",
    alt: {
      en: "Station-based learning: VR experience, observation, and complementary activities running in parallel",
      es: "Aprendizaje por estaciones: experiencia VR, observación y actividades complementarias en paralelo",
    },
  },
};

const module4Images: DocImagesByModule = {
  "vr-student-safety": {
    src: "/images/que-es-vr-estudiante-gafas-vr-aula.jpg",
    alt: {
      en: "Student wearing VR headset in a supervised classroom environment with clear boundaries",
      es: "Estudiante usando gafas VR en un aula supervisada con límites claros",
    },
  },
};

const module5Images: DocImagesByModule = {
  "briefing-classroom": {
    src: "/images/vr-classroom-student-headset.jpg",
    alt: {
      en: "Instructor guiding a student through a VR briefing before the immersive experience begins",
      es: "Instructor guiando a un estudiante durante el briefing previo a la experiencia inmersiva",
    },
  },
};

const module6Images: DocImagesByModule = {
  "quest-3-hardware": {
    src: "/images/meta-quest-3-components.png",
    alt: {
      en: "Meta Quest 3 components: headset, controllers, and charging cable — reference for troubleshooting",
      es: "Componentes del Meta Quest 3: gafas, controladores y cable de carga — referencia para resolución de problemas",
    },
  },
  "ipd-adjustment": {
    src: "/images/quest-3-ipd.jpg",
    alt: {
      en: "Close-up of IPD adjustment wheel on Meta Quest 3 — key fix for blurry or distorted image",
      es: "Detalle de la rueda de ajuste IPD en Meta Quest 3 — solución clave para imagen borrosa o distorsionada",
    },
  },
};

const module7Images: DocImagesByModule = {
  "app-types-overview": {
    src: "/images/vr-use-cases-grid.jpg",
    alt: {
      en: "Overview of VR educational app types: exploration, simulation, guided training, evaluation, and communication",
      es: "Resumen de tipos de apps VR educativas: exploración, simulación, entrenamiento guiado, evaluación y comunicación",
    },
  },
};

const docImagesByModuleSlug: Record<string, DocImagesByModule> = {
  "basic-foundations": module0Images,
  "getting-vr-ready": module1Images,
  "designing-meaningful-learning": module2Images,
  "classroom-implementation": module3Images,
  "safety-wellbeing-accessibility": module4Images,
  "briefing-and-debriefing": module5Images,
  "solving-common-vr-problems": module6Images,
  "vr-educational-apps": module7Images,
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
