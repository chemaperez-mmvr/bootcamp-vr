export type MissionType = "scenario" | "checklist" | "wizard";

export type ScenarioOption = {
  id: string;
  labelKey: string;
  consequenceKey: string;
  isBest: boolean;
  score: number;
  feedbackTone: "danger" | "caution" | "acceptable" | "best";
};

type MissionBase = {
  sectionId: string;
  missionType: MissionType;
};

export type ScenarioMission = MissionBase & {
  missionType: "scenario";
  scenarioKey: string;
  options: ScenarioOption[];
};

export type ChecklistMission = MissionBase & {
  missionType: "checklist";
  promptKey: string;
  itemLabelKeys: string[];
};

export type WizardMission = MissionBase & {
  missionType: "wizard";
  wizardMissionId: string;
};

export type ModuleMission = ScenarioMission | ChecklistMission | WizardMission;

const missionsByModule: Record<string, Record<string, ModuleMission>> = {
  "getting-vr-ready": {
    "getting-started": {
      sectionId: "getting-started",
      missionType: "wizard",
      wizardMissionId: "first-setup",
    },
    "classroom-setup": {
      sectionId: "classroom-setup",
      missionType: "wizard",
      wizardMissionId: "classroom-setup",
    },
    "store-install": {
      sectionId: "store-install",
      missionType: "wizard",
      wizardMissionId: "install-apps",
    },
    "casting": {
      sectionId: "casting",
      missionType: "wizard",
      wizardMissionId: "cast-share",
    },
    "pre-class-checklist": {
      sectionId: "pre-class-checklist",
      missionType: "wizard",
      wizardMissionId: "pre-class-check",
    },
    "full-prep-boss": {
      sectionId: "full-prep-boss",
      missionType: "wizard",
      wizardMissionId: "full-prep-boss",
    },
  },
};

export function getMissionForLesson(moduleSlug: string, sectionId: string): ModuleMission | undefined {
  return missionsByModule[moduleSlug]?.[sectionId];
}
