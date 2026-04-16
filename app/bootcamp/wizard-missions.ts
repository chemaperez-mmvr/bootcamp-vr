import type { WizardMissionDef } from "./wizard-types";

/* ------------------------------------------------------------------ */
/*  Mission definitions by module                                      */
/* ------------------------------------------------------------------ */

const missionsByModule: Record<string, WizardMissionDef[]> = {
  "getting-vr-ready": [
    /* ============================================================== */
    /*  Mission 1: First Setup                                         */
    /* ============================================================== */
    {
      missionId: "first-setup",
      sectionId: "getting-started",
      titleKey: "wizardMissions.firstSetup.title",
      descriptionKey: "wizardMissions.firstSetup.description",
      iconEmoji: "📦",
      xpReward: 30,
      isBossLevel: false,
      steps: [
        {
          id: "fs-intro",
          stepType: "info",
          contextKey: "wizardMissions.firstSetup.steps.s1.context",
          bodyKey: "wizardMissions.firstSetup.steps.s1.body",
        },
        {
          id: "fs-battery",
          stepType: "choice",
          contextKey: "wizardMissions.firstSetup.steps.s2.context",
          tipKey: "wizardMissions.firstSetup.steps.s2.tip",
          choices: [
            { id: "a", labelKey: "wizardMissions.firstSetup.steps.s2.choices.a", feedbackKey: "wizardMissions.firstSetup.steps.s2.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.firstSetup.steps.s2.choices.b", feedbackKey: "wizardMissions.firstSetup.steps.s2.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.firstSetup.steps.s2.choices.c", feedbackKey: "wizardMissions.firstSetup.steps.s2.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "fs-language",
          stepType: "choice",
          contextKey: "wizardMissions.firstSetup.steps.s3.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.firstSetup.steps.s3.choices.a", feedbackKey: "wizardMissions.firstSetup.steps.s3.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.firstSetup.steps.s3.choices.b", feedbackKey: "wizardMissions.firstSetup.steps.s3.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.firstSetup.steps.s3.choices.c", feedbackKey: "wizardMissions.firstSetup.steps.s3.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "fs-ipd",
          stepType: "choice",
          contextKey: "wizardMissions.firstSetup.steps.s4.context",
          tipKey: "wizardMissions.firstSetup.steps.s4.tip",
          choices: [
            { id: "a", labelKey: "wizardMissions.firstSetup.steps.s4.choices.a", feedbackKey: "wizardMissions.firstSetup.steps.s4.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.firstSetup.steps.s4.choices.b", feedbackKey: "wizardMissions.firstSetup.steps.s4.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.firstSetup.steps.s4.choices.c", feedbackKey: "wizardMissions.firstSetup.steps.s4.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "fs-strap",
          stepType: "choice",
          contextKey: "wizardMissions.firstSetup.steps.s5.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.firstSetup.steps.s5.choices.a", feedbackKey: "wizardMissions.firstSetup.steps.s5.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.firstSetup.steps.s5.choices.b", feedbackKey: "wizardMissions.firstSetup.steps.s5.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.firstSetup.steps.s5.choices.c", feedbackKey: "wizardMissions.firstSetup.steps.s5.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "fs-verify",
          stepType: "confirm",
          contextKey: "wizardMissions.firstSetup.steps.s6.context",
          confirmLabelKey: "wizardMissions.firstSetup.steps.s6.confirm",
        },
      ],
    },

    /* ============================================================== */
    /*  Mission 2: Classroom Setup                                     */
    /* ============================================================== */
    {
      missionId: "classroom-setup",
      sectionId: "classroom-setup",
      titleKey: "wizardMissions.classroomSetup.title",
      descriptionKey: "wizardMissions.classroomSetup.description",
      iconEmoji: "🏫",
      xpReward: 30,
      isBossLevel: false,
      steps: [
        {
          id: "cs-intro",
          stepType: "info",
          contextKey: "wizardMissions.classroomSetup.steps.s1.context",
          bodyKey: "wizardMissions.classroomSetup.steps.s1.body",
        },
        {
          id: "cs-layout",
          stepType: "choice",
          contextKey: "wizardMissions.classroomSetup.steps.s2.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.classroomSetup.steps.s2.choices.a", feedbackKey: "wizardMissions.classroomSetup.steps.s2.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.classroomSetup.steps.s2.choices.b", feedbackKey: "wizardMissions.classroomSetup.steps.s2.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.classroomSetup.steps.s2.choices.c", feedbackKey: "wizardMissions.classroomSetup.steps.s2.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "cs-wifi",
          stepType: "choice",
          contextKey: "wizardMissions.classroomSetup.steps.s3.context",
          tipKey: "wizardMissions.classroomSetup.steps.s3.tip",
          choices: [
            { id: "a", labelKey: "wizardMissions.classroomSetup.steps.s3.choices.a", feedbackKey: "wizardMissions.classroomSetup.steps.s3.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.classroomSetup.steps.s3.choices.b", feedbackKey: "wizardMissions.classroomSetup.steps.s3.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.classroomSetup.steps.s3.choices.c", feedbackKey: "wizardMissions.classroomSetup.steps.s3.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "cs-boundary",
          stepType: "choice",
          contextKey: "wizardMissions.classroomSetup.steps.s4.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.classroomSetup.steps.s4.choices.a", feedbackKey: "wizardMissions.classroomSetup.steps.s4.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.classroomSetup.steps.s4.choices.b", feedbackKey: "wizardMissions.classroomSetup.steps.s4.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.classroomSetup.steps.s4.choices.c", feedbackKey: "wizardMissions.classroomSetup.steps.s4.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "cs-stations",
          stepType: "choice",
          contextKey: "wizardMissions.classroomSetup.steps.s5.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.classroomSetup.steps.s5.choices.a", feedbackKey: "wizardMissions.classroomSetup.steps.s5.feedback.a", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "b", labelKey: "wizardMissions.classroomSetup.steps.s5.choices.b", feedbackKey: "wizardMissions.classroomSetup.steps.s5.feedback.b", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "c", labelKey: "wizardMissions.classroomSetup.steps.s5.choices.c", feedbackKey: "wizardMissions.classroomSetup.steps.s5.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "cs-test",
          stepType: "choice",
          contextKey: "wizardMissions.classroomSetup.steps.s6.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.classroomSetup.steps.s6.choices.a", feedbackKey: "wizardMissions.classroomSetup.steps.s6.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.classroomSetup.steps.s6.choices.b", feedbackKey: "wizardMissions.classroomSetup.steps.s6.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.classroomSetup.steps.s6.choices.c", feedbackKey: "wizardMissions.classroomSetup.steps.s6.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
      ],
    },

    /* ============================================================== */
    /*  Mission 3: Install Apps                                        */
    /* ============================================================== */
    {
      missionId: "install-apps",
      sectionId: "store-install",
      titleKey: "wizardMissions.installApps.title",
      descriptionKey: "wizardMissions.installApps.description",
      iconEmoji: "📲",
      xpReward: 30,
      isBossLevel: false,
      steps: [
        {
          id: "ia-intro",
          stepType: "info",
          contextKey: "wizardMissions.installApps.steps.s1.context",
          bodyKey: "wizardMissions.installApps.steps.s1.body",
        },
        {
          id: "ia-find",
          stepType: "choice",
          contextKey: "wizardMissions.installApps.steps.s2.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.installApps.steps.s2.choices.a", feedbackKey: "wizardMissions.installApps.steps.s2.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.installApps.steps.s2.choices.b", feedbackKey: "wizardMissions.installApps.steps.s2.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.installApps.steps.s2.choices.c", feedbackKey: "wizardMissions.installApps.steps.s2.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "ia-notfound",
          stepType: "choice",
          contextKey: "wizardMissions.installApps.steps.s3.context",
          tipKey: "wizardMissions.installApps.steps.s3.tip",
          choices: [
            { id: "a", labelKey: "wizardMissions.installApps.steps.s3.choices.a", feedbackKey: "wizardMissions.installApps.steps.s3.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.installApps.steps.s3.choices.b", feedbackKey: "wizardMissions.installApps.steps.s3.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.installApps.steps.s3.choices.c", feedbackKey: "wizardMissions.installApps.steps.s3.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "ia-storage",
          stepType: "choice",
          contextKey: "wizardMissions.installApps.steps.s4.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.installApps.steps.s4.choices.a", feedbackKey: "wizardMissions.installApps.steps.s4.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.installApps.steps.s4.choices.b", feedbackKey: "wizardMissions.installApps.steps.s4.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.installApps.steps.s4.choices.c", feedbackKey: "wizardMissions.installApps.steps.s4.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "ia-verify",
          stepType: "confirm",
          contextKey: "wizardMissions.installApps.steps.s5.context",
          confirmLabelKey: "wizardMissions.installApps.steps.s5.confirm",
        },
      ],
    },

    /* ============================================================== */
    /*  Mission 4: Cast & Share                                        */
    /* ============================================================== */
    {
      missionId: "cast-share",
      sectionId: "casting",
      titleKey: "wizardMissions.castShare.title",
      descriptionKey: "wizardMissions.castShare.description",
      iconEmoji: "📺",
      xpReward: 30,
      isBossLevel: false,
      steps: [
        {
          id: "cast-intro",
          stepType: "info",
          contextKey: "wizardMissions.castShare.steps.s1.context",
          bodyKey: "wizardMissions.castShare.steps.s1.body",
        },
        {
          id: "cast-method",
          stepType: "choice",
          contextKey: "wizardMissions.castShare.steps.s2.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.castShare.steps.s2.choices.a", feedbackKey: "wizardMissions.castShare.steps.s2.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.castShare.steps.s2.choices.b", feedbackKey: "wizardMissions.castShare.steps.s2.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.castShare.steps.s2.choices.c", feedbackKey: "wizardMissions.castShare.steps.s2.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "d", labelKey: "wizardMissions.castShare.steps.s2.choices.d", feedbackKey: "wizardMissions.castShare.steps.s2.feedback.d", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "cast-lag",
          stepType: "choice",
          contextKey: "wizardMissions.castShare.steps.s3.context",
          tipKey: "wizardMissions.castShare.steps.s3.tip",
          choices: [
            { id: "a", labelKey: "wizardMissions.castShare.steps.s3.choices.a", feedbackKey: "wizardMissions.castShare.steps.s3.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.castShare.steps.s3.choices.b", feedbackKey: "wizardMissions.castShare.steps.s3.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.castShare.steps.s3.choices.c", feedbackKey: "wizardMissions.castShare.steps.s3.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "cast-audio",
          stepType: "choice",
          contextKey: "wizardMissions.castShare.steps.s4.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.castShare.steps.s4.choices.a", feedbackKey: "wizardMissions.castShare.steps.s4.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.castShare.steps.s4.choices.b", feedbackKey: "wizardMissions.castShare.steps.s4.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.castShare.steps.s4.choices.c", feedbackKey: "wizardMissions.castShare.steps.s4.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "cast-verify",
          stepType: "confirm",
          contextKey: "wizardMissions.castShare.steps.s5.context",
          confirmLabelKey: "wizardMissions.castShare.steps.s5.confirm",
        },
      ],
    },

    /* ============================================================== */
    /*  Mission 5: Pre-Class Checklist                                 */
    /* ============================================================== */
    {
      missionId: "pre-class-check",
      sectionId: "pre-class-checklist",
      titleKey: "wizardMissions.preClassCheck.title",
      descriptionKey: "wizardMissions.preClassCheck.description",
      iconEmoji: "✅",
      xpReward: 30,
      isBossLevel: false,
      steps: [
        {
          id: "pc-intro",
          stepType: "info",
          contextKey: "wizardMissions.preClassCheck.steps.s1.context",
          bodyKey: "wizardMissions.preClassCheck.steps.s1.body",
        },
        {
          id: "pc-charge",
          stepType: "confirm",
          contextKey: "wizardMissions.preClassCheck.steps.s2.context",
          confirmLabelKey: "wizardMissions.preClassCheck.steps.s2.confirm",
        },
        {
          id: "pc-wifi",
          stepType: "confirm",
          contextKey: "wizardMissions.preClassCheck.steps.s3.context",
          confirmLabelKey: "wizardMissions.preClassCheck.steps.s3.confirm",
        },
        {
          id: "pc-boundary",
          stepType: "confirm",
          contextKey: "wizardMissions.preClassCheck.steps.s4.context",
          confirmLabelKey: "wizardMissions.preClassCheck.steps.s4.confirm",
        },
        {
          id: "pc-apps",
          stepType: "confirm",
          contextKey: "wizardMissions.preClassCheck.steps.s5.context",
          confirmLabelKey: "wizardMissions.preClassCheck.steps.s5.confirm",
        },
        {
          id: "pc-trouble",
          stepType: "choice",
          contextKey: "wizardMissions.preClassCheck.steps.s6.context",
          tipKey: "wizardMissions.preClassCheck.steps.s6.tip",
          choices: [
            { id: "a", labelKey: "wizardMissions.preClassCheck.steps.s6.choices.a", feedbackKey: "wizardMissions.preClassCheck.steps.s6.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.preClassCheck.steps.s6.choices.b", feedbackKey: "wizardMissions.preClassCheck.steps.s6.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.preClassCheck.steps.s6.choices.c", feedbackKey: "wizardMissions.preClassCheck.steps.s6.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
      ],
    },

    /* ============================================================== */
    /*  Mission 6: Boss Level — Full VR Class Prep                     */
    /* ============================================================== */
    {
      missionId: "full-prep-boss",
      sectionId: "full-prep-boss",
      titleKey: "wizardMissions.fullPrep.title",
      descriptionKey: "wizardMissions.fullPrep.description",
      iconEmoji: "🏆",
      xpReward: 60,
      isBossLevel: true,
      steps: [
        {
          id: "bp-intro",
          stepType: "info",
          contextKey: "wizardMissions.fullPrep.steps.s1.context",
          bodyKey: "wizardMissions.fullPrep.steps.s1.body",
        },
        {
          id: "bp-night",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s2.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s2.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s2.feedback.a", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s2.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s2.feedback.b", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s2.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s2.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "bp-room",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s3.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s3.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s3.feedback.a", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s3.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s3.feedback.b", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s3.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s3.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "bp-network",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s4.context",
          tipKey: "wizardMissions.fullPrep.steps.s4.tip",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s4.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s4.feedback.a", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s4.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s4.feedback.b", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s4.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s4.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "bp-appissue",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s5.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s5.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s5.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s5.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s5.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s5.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s5.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "bp-briefing",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s6.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s6.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s6.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s6.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s6.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s6.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s6.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "bp-discomfort",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s7.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s7.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s7.feedback.a", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s7.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s7.feedback.b", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s7.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s7.feedback.c", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
          ],
        },
        {
          id: "bp-casting",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s8.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s8.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s8.feedback.a", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s8.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s8.feedback.b", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s8.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s8.feedback.c", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
          ],
        },
        {
          id: "bp-debrief",
          stepType: "choice",
          contextKey: "wizardMissions.fullPrep.steps.s9.context",
          choices: [
            { id: "a", labelKey: "wizardMissions.fullPrep.steps.s9.choices.a", feedbackKey: "wizardMissions.fullPrep.steps.s9.feedback.a", feedbackTone: "partial", isCorrect: false, xpBonus: 2 },
            { id: "b", labelKey: "wizardMissions.fullPrep.steps.s9.choices.b", feedbackKey: "wizardMissions.fullPrep.steps.s9.feedback.b", feedbackTone: "incorrect", isCorrect: false, xpBonus: 0 },
            { id: "c", labelKey: "wizardMissions.fullPrep.steps.s9.choices.c", feedbackKey: "wizardMissions.fullPrep.steps.s9.feedback.c", feedbackTone: "correct", isCorrect: true, xpBonus: 5 },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getWizardMissionsForModule(
  moduleSlug: string
): WizardMissionDef[] {
  return missionsByModule[moduleSlug] ?? [];
}

export function getWizardMissionById(
  moduleSlug: string,
  missionId: string
): WizardMissionDef | undefined {
  return getWizardMissionsForModule(moduleSlug).find(
    (m) => m.missionId === missionId
  );
}
