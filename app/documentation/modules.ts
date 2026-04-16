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
      { id: "connectivity-data", titleKey: "modules.1.sections.connectivityData", priority: "essential" },
      { id: "settings", titleKey: "modules.1.sections.settings", priority: "essential" },
      { id: "casting", titleKey: "modules.1.sections.casting", priority: "essential" },
      { id: "mobile-connection", titleKey: "modules.1.sections.mobileConnection" },
      { id: "organization-storage", titleKey: "modules.1.sections.organizationStorage" },
      { id: "specifications", titleKey: "modules.1.sections.specifications" },
      { id: "app-lab", titleKey: "modules.1.sections.appLab" },
      { id: "store-install", titleKey: "modules.1.sections.storeInstall", priority: "essential" },
      { id: "apps-in-headset", titleKey: "modules.1.sections.appsInHeadset" },
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
    sections: [
      { id: "objectives-that-work", titleKey: "modules.2.sections.objectivesThatWork", priority: "essential" },
      { id: "writing-objectives", titleKey: "modules.2.sections.writingObjectives", priority: "essential" },
      { id: "structure-objective", titleKey: "modules.2.sections.structureObjective" },
      { id: "seeing-vs-doing", titleKey: "modules.2.sections.seeingVsDoing", priority: "essential" },
      { id: "before-vr", titleKey: "modules.2.sections.beforeVr", priority: "essential" },
      { id: "during-vr", titleKey: "modules.2.sections.duringVr", priority: "essential" },
      { id: "after-vr", titleKey: "modules.2.sections.afterVr", priority: "essential" },
      { id: "durations", titleKey: "modules.2.sections.durations" },
      { id: "guided-exploration", titleKey: "modules.2.sections.guidedExploration", priority: "essential" },
      { id: "simulation-practice", titleKey: "modules.2.sections.simulationPractice", priority: "essential" },
      { id: "evaluation-skill-check", titleKey: "modules.2.sections.evaluationSkillCheck" },
      { id: "when-to-use-each", titleKey: "modules.2.sections.whenToUseEach", priority: "essential" },
    ],
  },
  {
    id: "3",
    slug: "classroom-implementation",
    order: 3,
    titleKey: "modules.3.title",
    descriptionKey: "modules.3.description",
    categoryId: "implementation",
    sections: [
      { id: "room-layout", titleKey: "modules.3.sections.roomLayout", priority: "essential" },
      { id: "student-briefing", titleKey: "modules.3.sections.studentBriefing", priority: "essential" },
      { id: "distributing-headsets", titleKey: "modules.3.sections.distributingHeadsets", priority: "essential" },
      { id: "during-session", titleKey: "modules.3.sections.duringSession", priority: "essential" },
      { id: "rotation-groups", titleKey: "modules.3.sections.rotationGroups", priority: "essential" },
      { id: "time-management", titleKey: "modules.3.sections.timeManagement" },
      { id: "common-issues", titleKey: "modules.3.sections.commonIssues" },
      { id: "safety-in-class", titleKey: "modules.3.sections.safetyInClass", priority: "essential" },
      { id: "first-session-tips", titleKey: "modules.3.sections.firstSessionTips" },
      { id: "wrap-up", titleKey: "modules.3.sections.wrapUp" },
    ],
  },
  {
    id: "4",
    slug: "safety-wellbeing-accessibility",
    order: 4,
    titleKey: "modules.4.title",
    descriptionKey: "modules.4.description",
    categoryId: "safety",
    sections: [
      { id: "physical-safety-wellbeing", titleKey: "modules.4.sections.physicalSafetyWellbeing", priority: "essential" },
      { id: "minimum-space-positioning", titleKey: "modules.4.sections.minimumSpacePositioning", priority: "essential" },
      { id: "supervision-boundaries", titleKey: "modules.4.sections.supervisionBoundaries", priority: "essential" },
      { id: "impacts-disorientation", titleKey: "modules.4.sections.impactsDisorientation", priority: "essential" },
      { id: "motion-sickness-fatigue", titleKey: "modules.4.sections.motionSicknessFatigue", priority: "essential" },
      { id: "hygiene-care-equipment", titleKey: "modules.4.sections.hygieneCareEquipment", priority: "essential" },
      { id: "cleaning-workflows", titleKey: "modules.4.sections.cleaningWorkflows" },
      { id: "accessibility-inclusive-practices", titleKey: "modules.4.sections.accessibilityInclusivePractices", priority: "essential" },
      { id: "students-may-not-use-vr", titleKey: "modules.4.sections.studentsMayNotUseVr" },
      { id: "inclusive-alternatives", titleKey: "modules.4.sections.inclusiveAlternatives" },
      { id: "observer-role", titleKey: "modules.4.sections.observerRole" },
    ],
  },
  {
    id: "5",
    slug: "briefing-and-debriefing",
    order: 5,
    titleKey: "modules.5.title",
    descriptionKey: "modules.5.description",
    categoryId: "assessment",
    sections: [
      { id: "foundational-idea", titleKey: "modules.5.sections.foundationalIdea", priority: "essential" },
      { id: "pre-vr-briefing", titleKey: "modules.5.sections.preVrBriefing", priority: "essential" },
      { id: "what-to-explain", titleKey: "modules.5.sections.whatToExplain", priority: "essential" },
      { id: "sixty-second-briefing", titleKey: "modules.5.sections.sixtySecondBriefing", priority: "essential" },
      { id: "structured-debriefing", titleKey: "modules.5.sections.structuredDebriefing", priority: "essential" },
      { id: "good-debriefing", titleKey: "modules.5.sections.goodDebriefing" },
      { id: "core-debriefing-questions", titleKey: "modules.5.sections.coreDebriefingQuestions", priority: "essential" },
      { id: "debriefing-duration", titleKey: "modules.5.sections.debriefingDuration" },
      { id: "instructor-role-debriefing", titleKey: "modules.5.sections.instructorRoleDebriefing" },
      { id: "what-to-assess", titleKey: "modules.5.sections.whatToAssess", priority: "essential" },
    ],
  },
  {
    id: "6",
    slug: "solving-common-vr-problems",
    order: 6,
    titleKey: "modules.6.title",
    descriptionKey: "modules.6.description",
    categoryId: "troubleshooting",
    sections: [
      { id: "wifi-connection", titleKey: "modules.6.sections.wifiConnection", priority: "essential" },
      { id: "pins-access-codes", titleKey: "modules.6.sections.pinsAccessCodes" },
      { id: "boundary-guardian-problems", titleKey: "modules.6.sections.boundaryGuardianProblems", priority: "essential" },
      { id: "headset-not-turning-on", titleKey: "modules.6.sections.headsetNotTurningOn", priority: "essential" },
      { id: "login-problems", titleKey: "modules.6.sections.loginProblems" },
      { id: "cloud-streaming-lag", titleKey: "modules.6.sections.cloudStreamingLag" },
      { id: "software-update-issues", titleKey: "modules.6.sections.softwareUpdateIssues" },
      { id: "casting-issues", titleKey: "modules.6.sections.castingIssues", priority: "essential" },
      { id: "factory-reset", titleKey: "modules.6.sections.factoryReset" },
      { id: "pairing-controllers", titleKey: "modules.6.sections.pairingControllers" },
      { id: "visual-issues", titleKey: "modules.6.sections.visualIssues" },
      { id: "troubleshooting-mindset", titleKey: "modules.6.sections.troubleshootingMindset", priority: "essential" },
    ],
  },
  {
    id: "7",
    slug: "vr-educational-apps",
    order: 7,
    titleKey: "modules.7.title",
    descriptionKey: "modules.7.description",
    categoryId: "pedagogy",
    sections: [
      { id: "what-is-educational-app", titleKey: "modules.7.sections.whatIsEducationalApp", priority: "essential" },
      { id: "where-to-find-apps", titleKey: "modules.7.sections.whereToFindApps", priority: "essential" },
      { id: "exploration-apps", titleKey: "modules.7.sections.explorationApps" },
      { id: "simulation-apps", titleKey: "modules.7.sections.simulationApps", priority: "essential" },
      { id: "guided-training-apps", titleKey: "modules.7.sections.guidedTrainingApps" },
      { id: "evaluation-apps", titleKey: "modules.7.sections.evaluationApps" },
      { id: "communication-soft-skills-apps", titleKey: "modules.7.sections.communicationSoftSkillsApps" },
      { id: "choosing-app-by-objective", titleKey: "modules.7.sections.choosingAppByObjective", priority: "essential" },
      { id: "evaluating-app-before-class", titleKey: "modules.7.sections.evaluatingAppBeforeClass", priority: "essential" },
      { id: "integrating-apps-in-class", titleKey: "modules.7.sections.integratingAppsInClass", priority: "essential" },
      { id: "tutorial-template", titleKey: "modules.7.sections.tutorialTemplate" },
      { id: "common-mistakes-apps", titleKey: "modules.7.sections.commonMistakesApps" },
    ],
  },
];

export const documentationModules: DocumentationModule[] = modulesData;

export function getModuleBySlug(slug: string): DocumentationModule | undefined {
  return documentationModules.find((m) => m.slug === slug);
}

export function getModuleById(id: string): DocumentationModule | undefined {
  return documentationModules.find((m) => m.id === id);
}
