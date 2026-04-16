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
    src: "/images/que-es-vr-estudiante-gafas-vr-aula.webp",
    alt: {
      en: "Student wearing VR headset in a classroom",
      es: "Estudiante usando gafas VR en un aula",
    },
  },
  "learning-pyramid": {
    src: "/images/learning-pyramid-see-vs-do.webp",
    alt: {
      en: "Learning pyramid: seeing vs doing — active practice improves retention",
      es: "Pirámide del aprendizaje: ver vs hacer — la práctica activa mejora la retención",
    },
  },
  "standalone-vs-pc": {
    src: "/images/standalone-vs-pc-vr.webp",
    alt: {
      en: "Comparison between standalone VR and PC-connected VR setups",
      es: "Comparación entre VR standalone y VR conectada a PC",
    },
  },
  "vr-use-cases-grid": {
    src: "/images/vr-use-cases-grid.webp",
    alt: {
      en: "VR use cases in education: healthcare, vocational training, secondary education, corporate training",
      es: "Casos de uso de VR en educación: salud, formación profesional, educación secundaria, formación corporativa",
    },
  },
  "student-ar": {
    src: "/images/student-ar-glasses.webp",
    alt: {
      en: "Student using augmented reality glasses with digital content overlaid on the real world",
      es: "Estudiante usando gafas de realidad aumentada con contenido digital superpuesto al mundo real",
    },
  },
  "ar-use-cases": {
    src: "/images/uses-ar.webp",
    alt: {
      en: "Augmented reality use cases in the classroom: science, vocational training, history, languages",
      es: "Casos de uso de realidad aumentada en el aula: ciencias, formación técnica, historia, idiomas",
    },
  },
};

const module1Images: DocImagesByModule = {
  "work-meta-dashboard": {
    src: "/images/work-meta-dashboard.webp",
    alt: {
      en: "Meta Horizon Managed Services admin dashboard — overview with configuration plans and device management",
      es: "Panel de administración de Meta Horizon Managed Services — vista general con planes de configuración y gestión de dispositivos",
    },
  },
  "work-meta-people": {
    src: "/images/work-meta-people.webp",
    alt: {
      en: "People management panel in Meta Horizon Managed Services — users, roles and permissions",
      es: "Panel de personas en Meta Horizon Managed Services — usuarios, roles y permisos",
    },
  },
  "work-meta-templates": {
    src: "/images/work-meta-templates.webp",
    alt: {
      en: "Device configuration templates in Meta Horizon Managed Services",
      es: "Plantillas de configuración de dispositivos en Meta Horizon Managed Services",
    },
  },
  "work-meta-create-group": {
    src: "/images/work-meta-create-group.webp",
    alt: {
      en: "Create device group dialog in Meta Horizon Managed Services",
      es: "Diálogo para crear grupo de dispositivos en Meta Horizon Managed Services",
    },
  },
  "work-meta-add-app": {
    src: "/images/work-meta-add-app.webp",
    alt: {
      en: "Import app dialog in Meta Horizon Managed Services — adding a private app to the organisation",
      es: "Diálogo de importar app en Meta Horizon Managed Services — añadiendo una app privada a la organización",
    },
  },
  "work-meta-apps": {
    src: "/images/work-meta-apps.webp",
    alt: {
      en: "Applications and content management panel in Meta Horizon Managed Services",
      es: "Panel de gestión de aplicaciones y contenido en Meta Horizon Managed Services",
    },
  },
  "work-meta-activate-instructions": {
    src: "/images/work-meta-activate-instructions.webp",
    alt: {
      en: "Device activation instructions panel in Meta Horizon Managed Services — Wi-Fi method steps",
      es: "Panel de instrucciones de activación de dispositivos en Meta Horizon Managed Services — pasos del método Wi-Fi",
    },
  },
  "work-meta-activation-wifi": {
    src: "/images/work-meta-activation-wifi.webp",
    alt: {
      en: "Device activation dialog via Wi-Fi — enter the 6-digit code shown on the headset",
      es: "Diálogo de activación de dispositivo por Wi-Fi — introducir el código de 6 dígitos de las gafas",
    },
  },
  "work-meta-device-linked": {
    src: "/images/work-meta-device-linked.webp",
    alt: {
      en: "Device successfully linked to the organisation in Meta Horizon Managed Services — group and template assignment options",
      es: "Dispositivo vinculado a la organización en Meta Horizon Managed Services — opciones de asignación a grupo y plantilla",
    },
  },
  "work-meta-headset-configured": {
    src: "/images/work-meta-headset-configured.webp",
    alt: {
      en: "Headset view after configuration — assigned apps appear installed and ready",
      es: "Vista del headset tras la configuración — las apps asignadas aparecen instaladas y listas",
    },
  },
  "work-meta-tool-download": {
    src: "/images/work-meta-tool-download.webp",
    alt: {
      en: "Download dialog for the Meta Horizon device configuration tool for PC/Mac",
      es: "Diálogo de descarga de la herramienta de configuración de dispositivos Meta Horizon para PC/Mac",
    },
  },
  "work-meta-cable-connect": {
    src: "/images/work-meta-cable-connect.webp",
    alt: {
      en: "Connect a device dialog — instructions for USB cable setup with headset powered off",
      es: "Diálogo de conectar dispositivo — instrucciones para configuración por cable USB con las gafas apagadas",
    },
  },
  "work-meta-activation-cable": {
    src: "/images/work-meta-activation-cable.webp",
    alt: {
      en: "Device configuration via USB cable — language, Wi-Fi network and automatic setup form",
      es: "Configuración de dispositivo por cable USB — idioma, red Wi-Fi y formulario de configuración automática",
    },
  },
  "work-meta-headset-configured-cable": {
    src: "/images/work-meta-headset-configured-cable.webp",
    alt: {
      en: "Headset view after cable configuration — apps installed automatically without touching the headset",
      es: "Vista del headset tras configuración por cable — apps instaladas automáticamente sin tocar las gafas",
    },
  },
  "quest-3-components": {
    src: "/images/meta-quest-3-components.webp",
    alt: {
      en: "Meta Quest 3 package contents: headset, controllers, cable, and box",
      es: "Contenido del paquete de Meta Quest 3: gafas, controladores, cable y caja",
    },
  },
  "quest-3-ipd": {
    src: "/images/quest-3-ipd.webp",
    alt: {
      en: "Close-up of Meta Quest 3 IPD adjustment wheel between the lenses",
      es: "Detalle de la rueda de ajuste IPD entre las lentes de Meta Quest 3",
    },
  },
  "wifi-quick-access": {
    src: "/images/quickaccess.webp",
    alt: {
      en: "Meta Quest Navigator showing the Quick Access Controls bar",
      es: "Explorador de Meta Quest mostrando la barra de Controles de acceso rápido",
    },
  },
  "wifi-quest-settings": {
    src: "/images/step1-wifi.webp",
    alt: {
      en: "Meta Quest Quick Controls panel with the WiFi button highlighted",
      es: "Panel de Controles de acceso rápido de Meta Quest con el botón Wifi resaltado",
    },
  },
  "guardian-boundary-draw": {
    src: "/images/drawboundry.webp",
    alt: {
      en: "Drawing the Boundary on the floor with the Meta Quest controller",
      es: "Dibujando el Boundary en el suelo con el mando de Meta Quest",
    },
  },
  "boundary-step1": {
    src: "/images/scam-room-guardian.jpeg",
    alt: {
      en: "Meta Quest scanning the room to suggest boundaries automatically",
      es: "Meta Quest escaneando la habitación para sugerir límites automáticamente",
    },
  },
  "casting-classroom-setup": {
    src: "/images/casting-classroom-setup.webp",
    alt: {
      en: "Classroom casting setup: headset, WiFi router, Chromecast and projector connected on the same network",
      es: "Configuración de casting en el aula: gafas, router WiFi, Chromecast y proyector conectados en la misma red",
    },
  },
  "casting-quick-menu": {
    src: "/images/casting-step1.png",
    alt: {
      en: "Meta Quest quick controls menu showing the Cast (Transmitir) button",
      es: "Menú de controles de acceso rápido de Meta Quest con el botón Transmitir",
    },
  },
  "casting-device-selection": {
    src: "/images/casting-step2.webp",
    alt: {
      en: "Cast to dialog showing nearby devices and web casting option",
      es: "Diálogo Transmitir en, mostrando dispositivos cercanos y opción de casting web",
    },
  },
  "casting-meta-app": {
    src: "/images/casting-step3.webp",
    alt: {
      en: "Web casting instructions — go to horizon.meta.com/casting in a browser on the same WiFi",
      es: "Instrucciones de casting web — ir a horizon.meta.com/casting en un navegador en la misma WiFi",
    },
  },
};
const module2Images: DocImagesByModule = {
  "learning-pyramid": {
    src: "/images/learning-pyramid-see-vs-do.webp",
    alt: {
      en: "Learning pyramid: seeing vs doing — active practice dramatically improves retention compared to passive observation",
      es: "Pirámide del aprendizaje: ver vs hacer — la práctica activa mejora drásticamente la retención comparada con la observación pasiva",
    },
  },
  "vr-classroom-session": {
    src: "/images/vr-classroom-student-headset.webp",
    alt: {
      en: "Student using a VR headset during a guided classroom session while the instructor observes",
      es: "Estudiante usando gafas VR durante una sesión guiada en el aula mientras el instructor observa",
    },
  },
  "activity-types-grid": {
    src: "/images/vr-use-cases-grid.webp",
    alt: {
      en: "VR activity types: guided exploration, simulation with practice, and evaluation — mapped to learning objectives",
      es: "Tipos de actividad VR: exploración guiada, simulación con práctica y evaluación — mapeados a objetivos de aprendizaje",
    },
  },
};

const module3Images: DocImagesByModule = {
  "classroom-vr-session": {
    src: "/images/vr-classroom-student-headset.webp",
    alt: {
      en: "Classroom VR session — students using headsets while instructor monitors the activity",
      es: "Sesión VR en el aula — estudiantes usando gafas mientras el instructor supervisa la actividad",
    },
  },
  "vr-use-cases-stations": {
    src: "/images/vr-use-cases-grid.webp",
    alt: {
      en: "Station-based learning: VR experience, observation, and complementary activities running in parallel",
      es: "Aprendizaje por estaciones: experiencia VR, observación y actividades complementarias en paralelo",
    },
  },
};

const module4Images: DocImagesByModule = {
  "vr-student-safety": {
    src: "/images/que-es-vr-estudiante-gafas-vr-aula.webp",
    alt: {
      en: "Student wearing VR headset in a supervised classroom environment with clear boundaries",
      es: "Estudiante usando gafas VR en un aula supervisada con límites claros",
    },
  },
  "space-seated": {
    src: "/images/m4-space-seated.webp",
    alt: {
      en: "Seated VR experience setup — student using a headset while sitting in a chair within a 1x1 metre area",
      es: "Configuración de experiencia VR sentado — estudiante usando visor sentado en una silla en un área de 1x1 metro",
    },
  },
  "space-standing": {
    src: "/images/m4-space-standing.webp",
    alt: {
      en: "Standing VR experience setup — student standing in place within a 2x2 metre clear area",
      es: "Configuración de experiencia VR de pie — estudiante de pie en un área despejada de 2x2 metros",
    },
  },
  "space-roomscale": {
    src: "/images/m4-space-roomscale.webp",
    alt: {
      en: "Room-scale VR experience — student moving freely within a 3x3 metre play area with boundaries marked",
      es: "Experiencia VR a escala de habitación — estudiante moviéndose libremente en un área de juego de 3x3 metros con límites marcados",
    },
  },
  "response-remove-headset": {
    src: "/images/m4-response-remove-headset.webp",
    alt: {
      en: "Instructor gently helping a student remove the VR headset after reporting discomfort",
      es: "Instructor ayudando con cuidado a un estudiante a retirar el visor VR tras reportar malestar",
    },
  },
  "response-sit-rest": {
    src: "/images/m4-response-sit-rest.webp",
    alt: {
      en: "Student sitting down to rest after removing the VR headset, guided by the instructor",
      es: "Estudiante sentándose a descansar tras retirar el visor VR, guiado por el instructor",
    },
  },
  "prevention-short-sessions": {
    src: "/images/m4-prevention-short-sessions.webp",
    alt: {
      en: "Timer showing a short VR session duration — keeping sessions between 5 and 15 minutes to prevent motion sickness",
      es: "Temporizador mostrando una sesión VR corta — manteniendo las sesiones entre 5 y 15 minutos para prevenir mareos",
    },
  },
  "prevention-seated-mode": {
    src: "/images/m4-prevention-seated-mode.webp",
    alt: {
      en: "Student using VR in seated mode as a comfort option to reduce motion sickness risk",
      es: "Estudiante usando VR en modo sentado como opción de confort para reducir el riesgo de mareo",
    },
  },
  "cleaning-supplies": {
    src: "/images/m4-cleaning-supplies.webp",
    alt: {
      en: "VR headset cleaning supplies: non-alcoholic disinfectant wipes, microfibre cloth, and disposable hygiene covers",
      es: "Material de limpieza para visores VR: toallitas desinfectantes sin alcohol, paño de microfibra y cubiertas higiénicas desechables",
    },
  },
  "observer-role": {
    src: "/images/m4-observer-role.webp",
    alt: {
      en: "Student in the active observer role watching a VR session on a screen and taking structured notes",
      es: "Estudiante en el rol de observador activo viendo una sesión VR en pantalla y tomando notas estructuradas",
    },
  },
};

const module5Images: DocImagesByModule = {
  "briefing-classroom": {
    src: "/images/vr-classroom-student-headset.webp",
    alt: {
      en: "Instructor guiding a student through a VR briefing before the immersive experience begins",
      es: "Instructor guiando a un estudiante durante el briefing previo a la experiencia inmersiva",
    },
  },
  "classify-objective": {
    src: "/images/m5-classify-objective.webp",
    alt: {
      en: "Briefing framework visual — instructor explaining the learning objective to students before the VR session",
      es: "Visual del marco de briefing — instructor explicando el objetivo de aprendizaje a los estudiantes antes de la sesión VR",
    },
  },
  "classify-debrief-gather": {
    src: "/images/m5-classify-debrief-gather.webp",
    alt: {
      en: "Gather phase of the GAS debriefing model — students sharing their observations after the VR experience",
      es: "Fase de Recopilar del modelo de debriefing GAS — estudiantes compartiendo sus observaciones tras la experiencia VR",
    },
  },
  "classify-debrief-analyze": {
    src: "/images/m5-classify-debrief-analyze.webp",
    alt: {
      en: "Analyze phase of the GAS debriefing model — instructor and students examining why things happened during the VR session",
      es: "Fase de Analizar del modelo de debriefing GAS — instructor y estudiantes examinando por qué ocurrieron las cosas durante la sesión VR",
    },
  },
};

const module6Images: DocImagesByModule = {
  "quest-3-hardware": {
    src: "/images/meta-quest-3-components.webp",
    alt: {
      en: "Meta Quest 3 components: headset, controllers, and charging cable — reference for troubleshooting",
      es: "Componentes del Meta Quest 3: gafas, controladores y cable de carga — referencia para resolución de problemas",
    },
  },
  "ipd-adjustment": {
    src: "/images/quest-3-ipd.webp",
    alt: {
      en: "Close-up of IPD adjustment wheel on Meta Quest 3 — key fix for blurry or distorted image",
      es: "Detalle de la rueda de ajuste IPD en Meta Quest 3 — solución clave para imagen borrosa o distorsionada",
    },
  },
  "wifi-diagnostic": {
    src: "/images/m6-wifi-diagnostic.webp",
    alt: {
      en: "WiFi diagnostic screen on VR headset showing network status, signal strength, and connection details",
      es: "Pantalla de diagnóstico WiFi en el visor VR mostrando estado de red, intensidad de señal y detalles de conexión",
    },
  },
  "guardian-mirror": {
    src: "/images/m6-guardian-mirror.webp",
    alt: {
      en: "Mirror in a room confusing the VR headset tracking cameras — a common cause of Boundary setup failures",
      es: "Espejo en una habitación confundiendo las cámaras de seguimiento del visor VR — causa frecuente de fallos en la configuración del Boundary",
    },
  },
  "charging-led": {
    src: "/images/m6-charging-led.webp",
    alt: {
      en: "VR headset charging LED indicator — orange means charging, green means fully charged",
      es: "Indicador LED de carga del visor VR — naranja significa cargando, verde significa carga completa",
    },
  },
  "casting-setup": {
    src: "/images/m6-casting-setup.webp",
    alt: {
      en: "Casting troubleshooting setup — headset and receiving device connected to the same WiFi network for screen sharing",
      es: "Configuración para solucionar problemas de casting — visor y dispositivo receptor conectados a la misma red WiFi para compartir pantalla",
    },
  },
  "troubleshoot-mindset": {
    src: "/images/m6-troubleshoot-mindset.webp",
    alt: {
      en: "Instructor staying calm while troubleshooting a VR headset issue during class — demonstrating the composed troubleshooting mindset",
      es: "Instructor manteniendo la calma mientras resuelve un problema del visor VR durante clase — demostrando la mentalidad serena de resolución de problemas",
    },
  },
};

const module7Images: DocImagesByModule = {
  "app-types-overview": {
    src: "/images/m7-app-types-overview.webp",
    alt: {
      en: "Overview of VR educational app types: exploration, simulation, guided training, evaluation, and communication",
      es: "Resumen de tipos de apps VR educativas: exploración, simulación, entrenamiento guiado, evaluación y comunicación",
    },
  },
  "simulation-training": {
    src: "/images/m7-simulation-training.webp",
    alt: {
      en: "Student practising a hands-on procedure in a VR simulation app — learning through safe, repeatable interaction",
      es: "Estudiante practicando un procedimiento práctico en una app de simulación VR — aprendiendo mediante interacción segura y repetible",
    },
  },
  "app-evaluation": {
    src: "/images/m7-app-evaluation.webp",
    alt: {
      en: "Instructor evaluating a VR app against pedagogical, technical, and classroom checklists before using it in class",
      es: "Instructor evaluando una app VR según listas de verificación pedagógicas, técnicas y de aula antes de usarla en clase",
    },
  },
  "before-during-after": {
    src: "/images/m7-before-during-after.webp",
    alt: {
      en: "Before-during-after framework for integrating a VR app into a lesson — preparation, experience, and debriefing phases",
      es: "Marco antes-durante-después para integrar una app VR en una clase — fases de preparación, experiencia y reflexión",
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
 * Inline icons: small images that render inline with text.
 * Used via [ICON:name] in section markdown.
 * Alt text is prefixed with "icon:" so the renderer can detect them.
 */
const docIcons: Record<string, DocImageSlot> = {
  metabutton: {
    src: "/images/metabutton.png",
    alt: { en: "Meta button", es: "Botón Meta" },
  },
  quicksettings: {
    src: "/images/quicksettings.png",
    alt: { en: "Quick controls", es: "Controles de acceso rápido" },
  },
};

/**
 * Replaces [IMAGE:slotId] and [ICON:name] placeholders in markdown.
 * IMAGE → block image: ![alt](src)
 * ICON  → inline icon: ![icon:alt](src)  (prefix detected by renderer)
 */
export function resolveDocImages(
  markdown: string,
  moduleSlug: string,
  locale: string
): string {
  const slots = docImagesByModuleSlug[moduleSlug];
  const lang = locale === "es" ? "es" : "en";

  let result = markdown;

  if (slots) {
    result = result.replace(/\[IMAGE:([a-z0-9-]+)\]/gi, (_, slotId: string) => {
      const slot = slots[slotId];
      if (!slot) return "";
      const alt = slot.alt[lang] ?? slot.alt.en;
      return `![${alt}](${slot.src})`;
    });
  }

  result = result.replace(/\[ICON:([a-z0-9-]+)\]/gi, (_, iconId: string) => {
    const icon = docIcons[iconId];
    if (!icon) return "";
    const alt = icon.alt[lang] ?? icon.alt.en;
    return `![icon:${alt}](${icon.src})`;
  });

  result = result.replace(/\[DETAILS:([^\]]+)\]/g, (_, title: string) =>
    `<details class="doc-details"><summary>${title}</summary>\n`
  );
  result = result.replace(/\[\/DETAILS\]/g, "\n</details>");

  return result;
}
