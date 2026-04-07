/**
 * Documentation modules: each module is one page with anchorable sections (sub-points).
 * Used for the doc index (collapsible modules + sections) and for the module page.
 */

export type SectionPriority = "essential" | "reference";

export type ModuleSection = {
  id: string;
  titleKey: string;
  content?: string;
  /** Sections tagged "essential" are must-reads for newcomers; unset defaults to "reference". */
  priority?: SectionPriority;
};

/** Matches category ids used in docs sidebar (e.g. fundamentals, hardware) for the tag label */
export type ModuleCategoryId =
  | "fundamentals"
  | "hardware"
  | "pedagogy"
  | "implementation"
  | "assessment"
  | "troubleshooting"
  | "safety";

export type DocumentationModule = {
  id: string;
  slug: string;
  order: number;
  titleKey: string;
  descriptionKey: string;
  /** Category id for the tag (maps to docs.vrFundamentals etc.) */
  categoryId: ModuleCategoryId;
  sections: ModuleSection[];
};

const modulesData: DocumentationModule[] = [
  {
    id: "0",
    slug: "basic-foundations",
    order: 0,
    titleKey: "modules.0.title",
    descriptionKey: "modules.0.description",
    categoryId: "fundamentals",
    sections: [
      { id: "what-is-vr", titleKey: "modules.0.sections.whatIsVr", priority: "essential" },
      { id: "why-vr-effective", titleKey: "modules.0.sections.whyVrEffective", priority: "essential" },
      { id: "types-vr-setup", titleKey: "modules.0.sections.typesVrSetup" },
      { id: "vr-use-cases", titleKey: "modules.0.sections.vrUseCases", priority: "essential" },
      { id: "what-is-ar", titleKey: "modules.0.sections.whatIsAr" },
      { id: "ar-use-cases", titleKey: "modules.0.sections.arUseCases" },
      { id: "when-ar-makes-sense", titleKey: "modules.0.sections.whenArMakesSense" },
      { id: "what-is-xr", titleKey: "modules.0.sections.whatIsXr" },
    ],
  },
  {
    id: "1",
    slug: "getting-vr-ready",
    order: 1,
    titleKey: "modules.1.title",
    descriptionKey: "modules.1.description",
    categoryId: "hardware",
    sections: [
      { id: "account-types", titleKey: "modules.1.sections.accountTypes" },
      { id: "personal-account", titleKey: "modules.1.sections.personalAccount" },
      { id: "institutional-account", titleKey: "modules.1.sections.institutionalAccount" },
      { id: "getting-started", titleKey: "modules.1.sections.gettingStarted", priority: "essential" },
      { id: "classroom-setup", titleKey: "modules.1.sections.classroomSetup", priority: "essential" },
      { id: "settings", titleKey: "modules.1.sections.settings" },
      { id: "mobile-connection", titleKey: "modules.1.sections.mobileConnection" },
      { id: "organization-storage", titleKey: "modules.1.sections.organizationStorage" },
      { id: "specifications", titleKey: "modules.1.sections.specifications" },
      { id: "app-lab", titleKey: "modules.1.sections.appLab" },
      { id: "store-install", titleKey: "modules.1.sections.storeInstall", priority: "essential" },
      { id: "apps-in-headset", titleKey: "modules.1.sections.appsInHeadset" },
      { id: "casting", titleKey: "modules.1.sections.casting", priority: "essential" },
      { id: "connectivity-data", titleKey: "modules.1.sections.connectivityData" },
      { id: "cleaning", titleKey: "modules.1.sections.cleaning" },
      { id: "accessories", titleKey: "modules.1.sections.accessories" },
      { id: "pre-class-checklist", titleKey: "modules.1.sections.preClassChecklist", priority: "essential" },
    ],
  },
  {
    id: "2",
    slug: "designing-meaningful-learning",
    order: 2,
    titleKey: "modules.2.title",
    descriptionKey: "modules.2.description",
    categoryId: "pedagogy",
    sections: [],
  },
  {
    id: "3",
    slug: "classroom-implementation",
    order: 3,
    titleKey: "modules.3.title",
    descriptionKey: "modules.3.description",
    categoryId: "implementation",
    sections: [],
  },
  {
    id: "4",
    slug: "safety-wellbeing-accessibility",
    order: 4,
    titleKey: "modules.4.title",
    descriptionKey: "modules.4.description",
    categoryId: "safety",
    sections: [],
  },
  {
    id: "5",
    slug: "briefing-and-debriefing",
    order: 5,
    titleKey: "modules.5.title",
    descriptionKey: "modules.5.description",
    categoryId: "assessment",
    sections: [],
  },
  {
    id: "6",
    slug: "solving-common-vr-problems",
    order: 6,
    titleKey: "modules.6.title",
    descriptionKey: "modules.6.description",
    categoryId: "troubleshooting",
    sections: [],
  },
  {
    id: "7",
    slug: "vr-educational-apps",
    order: 7,
    titleKey: "modules.7.title",
    descriptionKey: "modules.7.description",
    categoryId: "pedagogy",
    sections: [],
  },
];

export const documentationModules: DocumentationModule[] = modulesData;

export function getModuleBySlug(slug: string): DocumentationModule | undefined {
  return documentationModules.find((m) => m.slug === slug);
}

export function getModuleById(id: string): DocumentationModule | undefined {
  return documentationModules.find((m) => m.id === id);
}
