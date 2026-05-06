export type QuizQuestionType = "multiple-choice" | "true-false" | "judgment";

export type QuizOption = {
  id: string;
  labelKey: string;
};

export type QuizQuestion = {
  id: string;
  type: QuizQuestionType;
  questionKey: string;
  options: QuizOption[];
  correctOptionId: string;
  explanationKey?: string;
  /** Optional illustration shown above the options, path relative to /public. */
  imageUrl?: string;
  /** Optional alt text translation key for the image. */
  imageAltKey?: string;
};

export type ModuleQuiz = {
  moduleSlug: string;
  passingScore: number;
  questions: QuizQuestion[];
};

const trueFalseOptions = (prefix: string): QuizOption[] => [
  { id: "true", labelKey: `${prefix}.true` },
  { id: "false", labelKey: `${prefix}.false` },
];

const moduleQuizzes: Record<string, ModuleQuiz> = {
  "basic-foundations": {
    moduleSlug: "basic-foundations",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        questionKey: "quiz.basicFoundations.q1.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q1.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q1.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q1.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q1.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q1.explanation",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q2.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q2.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q2.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q2.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q2.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.basicFoundations.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q3.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q3.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q3.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q3.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q3.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q3.explanation",
        imageUrl: "/images/quiz/m0-q3.png",
        imageAltKey: "quiz.basicFoundations.q3.imageAlt",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q4.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q4.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q4.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q4.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q4.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.basicFoundations.q4.explanation",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q5.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q5.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q5.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q5.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q5.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q5.explanation",
        imageUrl: "/images/quiz/m0-q5.png",
        imageAltKey: "quiz.basicFoundations.q5.imageAlt",
      },
    ],
  },
  "getting-vr-ready": {
    moduleSlug: "getting-vr-ready",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q1.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q1.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q1.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q1.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q1.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q1.explanation",
        imageUrl: "/images/quiz/m1-q1.webp",
        imageAltKey: "quiz.gettingVrReady.q1.imageAlt",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q2.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q2.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q2.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q2.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q2.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q3.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q3.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q3.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q3.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q3.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q3.explanation",
        imageUrl: "/images/quiz/m1-q3.webp",
        imageAltKey: "quiz.gettingVrReady.q3.imageAlt",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q4.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q4.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q4.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q4.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q4.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q4.explanation",
        imageUrl: "/images/quiz/m1-q4.webp",
        imageAltKey: "quiz.gettingVrReady.q4.imageAlt",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q5.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q5.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q5.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q5.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q5.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q5.explanation",
        imageUrl: "/images/quiz/m1-q5.webp",
        imageAltKey: "quiz.gettingVrReady.q5.imageAlt",
      },
    ],
  },
  "designing-meaningful-learning": {
    moduleSlug: "designing-meaningful-learning",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "judgment",
        questionKey: "quiz.designingMeaningfulLearning.q1.question",
        options: [
          { id: "a", labelKey: "quiz.designingMeaningfulLearning.q1.a" },
          { id: "b", labelKey: "quiz.designingMeaningfulLearning.q1.b" },
          { id: "c", labelKey: "quiz.designingMeaningfulLearning.q1.c" },
          { id: "d", labelKey: "quiz.designingMeaningfulLearning.q1.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.designingMeaningfulLearning.q1.explanation",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.designingMeaningfulLearning.q2.question",
        options: [
          { id: "a", labelKey: "quiz.designingMeaningfulLearning.q2.a" },
          { id: "b", labelKey: "quiz.designingMeaningfulLearning.q2.b" },
          { id: "c", labelKey: "quiz.designingMeaningfulLearning.q2.c" },
          { id: "d", labelKey: "quiz.designingMeaningfulLearning.q2.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.designingMeaningfulLearning.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.designingMeaningfulLearning.q3.question",
        options: [
          { id: "a", labelKey: "quiz.designingMeaningfulLearning.q3.a" },
          { id: "b", labelKey: "quiz.designingMeaningfulLearning.q3.b" },
          { id: "c", labelKey: "quiz.designingMeaningfulLearning.q3.c" },
          { id: "d", labelKey: "quiz.designingMeaningfulLearning.q3.d" },
        ],
        correctOptionId: "d",
        explanationKey: "quiz.designingMeaningfulLearning.q3.explanation",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.designingMeaningfulLearning.q4.question",
        options: [
          { id: "a", labelKey: "quiz.designingMeaningfulLearning.q4.a" },
          { id: "b", labelKey: "quiz.designingMeaningfulLearning.q4.b" },
          { id: "c", labelKey: "quiz.designingMeaningfulLearning.q4.c" },
          { id: "d", labelKey: "quiz.designingMeaningfulLearning.q4.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.designingMeaningfulLearning.q4.explanation",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.designingMeaningfulLearning.q5.question",
        options: [
          { id: "a", labelKey: "quiz.designingMeaningfulLearning.q5.a" },
          { id: "b", labelKey: "quiz.designingMeaningfulLearning.q5.b" },
          { id: "c", labelKey: "quiz.designingMeaningfulLearning.q5.c" },
          { id: "d", labelKey: "quiz.designingMeaningfulLearning.q5.d" },
        ],
        correctOptionId: "a",
        explanationKey: "quiz.designingMeaningfulLearning.q5.explanation",
      },
    ],
  },
  "classroom-implementation": {
    moduleSlug: "classroom-implementation",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "judgment",
        questionKey: "quiz.classroomImplementation.q1.question",
        options: [
          { id: "a", labelKey: "quiz.classroomImplementation.q1.a" },
          { id: "b", labelKey: "quiz.classroomImplementation.q1.b" },
          { id: "c", labelKey: "quiz.classroomImplementation.q1.c" },
          { id: "d", labelKey: "quiz.classroomImplementation.q1.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.classroomImplementation.q1.explanation",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.classroomImplementation.q2.question",
        options: [
          { id: "a", labelKey: "quiz.classroomImplementation.q2.a" },
          { id: "b", labelKey: "quiz.classroomImplementation.q2.b" },
          { id: "c", labelKey: "quiz.classroomImplementation.q2.c" },
          { id: "d", labelKey: "quiz.classroomImplementation.q2.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.classroomImplementation.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.classroomImplementation.q3.question",
        options: [
          { id: "a", labelKey: "quiz.classroomImplementation.q3.a" },
          { id: "b", labelKey: "quiz.classroomImplementation.q3.b" },
          { id: "c", labelKey: "quiz.classroomImplementation.q3.c" },
          { id: "d", labelKey: "quiz.classroomImplementation.q3.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.classroomImplementation.q3.explanation",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.classroomImplementation.q4.question",
        options: [
          { id: "a", labelKey: "quiz.classroomImplementation.q4.a" },
          { id: "b", labelKey: "quiz.classroomImplementation.q4.b" },
          { id: "c", labelKey: "quiz.classroomImplementation.q4.c" },
          { id: "d", labelKey: "quiz.classroomImplementation.q4.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.classroomImplementation.q4.explanation",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.classroomImplementation.q5.question",
        options: [
          { id: "a", labelKey: "quiz.classroomImplementation.q5.a" },
          { id: "b", labelKey: "quiz.classroomImplementation.q5.b" },
          { id: "c", labelKey: "quiz.classroomImplementation.q5.c" },
          { id: "d", labelKey: "quiz.classroomImplementation.q5.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.classroomImplementation.q5.explanation",
      },
    ],
  },
  "safety-wellbeing-accessibility": {
    moduleSlug: "safety-wellbeing-accessibility",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "judgment",
        questionKey: "quiz.safetyWellbeingAccessibility.q1.question",
        options: [
          { id: "a", labelKey: "quiz.safetyWellbeingAccessibility.q1.a" },
          { id: "b", labelKey: "quiz.safetyWellbeingAccessibility.q1.b" },
          { id: "c", labelKey: "quiz.safetyWellbeingAccessibility.q1.c" },
          { id: "d", labelKey: "quiz.safetyWellbeingAccessibility.q1.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.safetyWellbeingAccessibility.q1.explanation",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.safetyWellbeingAccessibility.q2.question",
        options: [
          { id: "a", labelKey: "quiz.safetyWellbeingAccessibility.q2.a" },
          { id: "b", labelKey: "quiz.safetyWellbeingAccessibility.q2.b" },
          { id: "c", labelKey: "quiz.safetyWellbeingAccessibility.q2.c" },
          { id: "d", labelKey: "quiz.safetyWellbeingAccessibility.q2.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.safetyWellbeingAccessibility.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.safetyWellbeingAccessibility.q3.question",
        options: [
          { id: "a", labelKey: "quiz.safetyWellbeingAccessibility.q3.a" },
          { id: "b", labelKey: "quiz.safetyWellbeingAccessibility.q3.b" },
          { id: "c", labelKey: "quiz.safetyWellbeingAccessibility.q3.c" },
          { id: "d", labelKey: "quiz.safetyWellbeingAccessibility.q3.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.safetyWellbeingAccessibility.q3.explanation",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.safetyWellbeingAccessibility.q4.question",
        options: [
          { id: "a", labelKey: "quiz.safetyWellbeingAccessibility.q4.a" },
          { id: "b", labelKey: "quiz.safetyWellbeingAccessibility.q4.b" },
          { id: "c", labelKey: "quiz.safetyWellbeingAccessibility.q4.c" },
          { id: "d", labelKey: "quiz.safetyWellbeingAccessibility.q4.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.safetyWellbeingAccessibility.q4.explanation",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.safetyWellbeingAccessibility.q5.question",
        options: [
          { id: "a", labelKey: "quiz.safetyWellbeingAccessibility.q5.a" },
          { id: "b", labelKey: "quiz.safetyWellbeingAccessibility.q5.b" },
          { id: "c", labelKey: "quiz.safetyWellbeingAccessibility.q5.c" },
          { id: "d", labelKey: "quiz.safetyWellbeingAccessibility.q5.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.safetyWellbeingAccessibility.q5.explanation",
      },
    ],
  },
  "briefing-and-debriefing": {
    moduleSlug: "briefing-and-debriefing",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "judgment",
        questionKey: "quiz.briefingAndDebriefing.q1.question",
        options: [
          { id: "a", labelKey: "quiz.briefingAndDebriefing.q1.a" },
          { id: "b", labelKey: "quiz.briefingAndDebriefing.q1.b" },
          { id: "c", labelKey: "quiz.briefingAndDebriefing.q1.c" },
          { id: "d", labelKey: "quiz.briefingAndDebriefing.q1.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.briefingAndDebriefing.q1.explanation",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.briefingAndDebriefing.q2.question",
        options: [
          { id: "a", labelKey: "quiz.briefingAndDebriefing.q2.a" },
          { id: "b", labelKey: "quiz.briefingAndDebriefing.q2.b" },
          { id: "c", labelKey: "quiz.briefingAndDebriefing.q2.c" },
          { id: "d", labelKey: "quiz.briefingAndDebriefing.q2.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.briefingAndDebriefing.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.briefingAndDebriefing.q3.question",
        options: [
          { id: "a", labelKey: "quiz.briefingAndDebriefing.q3.a" },
          { id: "b", labelKey: "quiz.briefingAndDebriefing.q3.b" },
          { id: "c", labelKey: "quiz.briefingAndDebriefing.q3.c" },
          { id: "d", labelKey: "quiz.briefingAndDebriefing.q3.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.briefingAndDebriefing.q3.explanation",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.briefingAndDebriefing.q4.question",
        options: [
          { id: "a", labelKey: "quiz.briefingAndDebriefing.q4.a" },
          { id: "b", labelKey: "quiz.briefingAndDebriefing.q4.b" },
          { id: "c", labelKey: "quiz.briefingAndDebriefing.q4.c" },
          { id: "d", labelKey: "quiz.briefingAndDebriefing.q4.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.briefingAndDebriefing.q4.explanation",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.briefingAndDebriefing.q5.question",
        options: [
          { id: "a", labelKey: "quiz.briefingAndDebriefing.q5.a" },
          { id: "b", labelKey: "quiz.briefingAndDebriefing.q5.b" },
          { id: "c", labelKey: "quiz.briefingAndDebriefing.q5.c" },
          { id: "d", labelKey: "quiz.briefingAndDebriefing.q5.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.briefingAndDebriefing.q5.explanation",
      },
    ],
  },
  /* ================================================================== */
  /*  MODULE 6 — Solving Common VR Problems                             */
  /* ================================================================== */
  "solving-common-vr-problems": {
    moduleSlug: "solving-common-vr-problems",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "judgment",
        questionKey: "quiz.solvingCommonVrProblems.q1.question",
        options: [
          { id: "a", labelKey: "quiz.solvingCommonVrProblems.q1.a" },
          { id: "b", labelKey: "quiz.solvingCommonVrProblems.q1.b" },
          { id: "c", labelKey: "quiz.solvingCommonVrProblems.q1.c" },
          { id: "d", labelKey: "quiz.solvingCommonVrProblems.q1.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.solvingCommonVrProblems.q1.explanation",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.solvingCommonVrProblems.q2.question",
        options: [
          { id: "a", labelKey: "quiz.solvingCommonVrProblems.q2.a" },
          { id: "b", labelKey: "quiz.solvingCommonVrProblems.q2.b" },
          { id: "c", labelKey: "quiz.solvingCommonVrProblems.q2.c" },
          { id: "d", labelKey: "quiz.solvingCommonVrProblems.q2.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.solvingCommonVrProblems.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.solvingCommonVrProblems.q3.question",
        options: [
          { id: "a", labelKey: "quiz.solvingCommonVrProblems.q3.a" },
          { id: "b", labelKey: "quiz.solvingCommonVrProblems.q3.b" },
          { id: "c", labelKey: "quiz.solvingCommonVrProblems.q3.c" },
          { id: "d", labelKey: "quiz.solvingCommonVrProblems.q3.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.solvingCommonVrProblems.q3.explanation",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.solvingCommonVrProblems.q4.question",
        options: [
          { id: "a", labelKey: "quiz.solvingCommonVrProblems.q4.a" },
          { id: "b", labelKey: "quiz.solvingCommonVrProblems.q4.b" },
          { id: "c", labelKey: "quiz.solvingCommonVrProblems.q4.c" },
          { id: "d", labelKey: "quiz.solvingCommonVrProblems.q4.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.solvingCommonVrProblems.q4.explanation",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.solvingCommonVrProblems.q5.question",
        options: [
          { id: "a", labelKey: "quiz.solvingCommonVrProblems.q5.a" },
          { id: "b", labelKey: "quiz.solvingCommonVrProblems.q5.b" },
          { id: "c", labelKey: "quiz.solvingCommonVrProblems.q5.c" },
          { id: "d", labelKey: "quiz.solvingCommonVrProblems.q5.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.solvingCommonVrProblems.q5.explanation",
      },
    ],
  },
  /* ================================================================== */
  /*  MODULE 7 — VR Educational Apps                                    */
  /* ================================================================== */
  "vr-educational-apps": {
    moduleSlug: "vr-educational-apps",
    passingScore: 0.7,
    questions: [
      {
        id: "q1",
        type: "judgment",
        questionKey: "quiz.vrEducationalApps.q1.question",
        options: [
          { id: "a", labelKey: "quiz.vrEducationalApps.q1.a" },
          { id: "b", labelKey: "quiz.vrEducationalApps.q1.b" },
          { id: "c", labelKey: "quiz.vrEducationalApps.q1.c" },
          { id: "d", labelKey: "quiz.vrEducationalApps.q1.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.vrEducationalApps.q1.explanation",
      },
      {
        id: "q2",
        type: "judgment",
        questionKey: "quiz.vrEducationalApps.q2.question",
        options: [
          { id: "a", labelKey: "quiz.vrEducationalApps.q2.a" },
          { id: "b", labelKey: "quiz.vrEducationalApps.q2.b" },
          { id: "c", labelKey: "quiz.vrEducationalApps.q2.c" },
          { id: "d", labelKey: "quiz.vrEducationalApps.q2.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.vrEducationalApps.q2.explanation",
      },
      {
        id: "q3",
        type: "judgment",
        questionKey: "quiz.vrEducationalApps.q3.question",
        options: [
          { id: "a", labelKey: "quiz.vrEducationalApps.q3.a" },
          { id: "b", labelKey: "quiz.vrEducationalApps.q3.b" },
          { id: "c", labelKey: "quiz.vrEducationalApps.q3.c" },
          { id: "d", labelKey: "quiz.vrEducationalApps.q3.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.vrEducationalApps.q3.explanation",
      },
      {
        id: "q4",
        type: "judgment",
        questionKey: "quiz.vrEducationalApps.q4.question",
        options: [
          { id: "a", labelKey: "quiz.vrEducationalApps.q4.a" },
          { id: "b", labelKey: "quiz.vrEducationalApps.q4.b" },
          { id: "c", labelKey: "quiz.vrEducationalApps.q4.c" },
          { id: "d", labelKey: "quiz.vrEducationalApps.q4.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.vrEducationalApps.q4.explanation",
      },
      {
        id: "q5",
        type: "judgment",
        questionKey: "quiz.vrEducationalApps.q5.question",
        options: [
          { id: "a", labelKey: "quiz.vrEducationalApps.q5.a" },
          { id: "b", labelKey: "quiz.vrEducationalApps.q5.b" },
          { id: "c", labelKey: "quiz.vrEducationalApps.q5.c" },
          { id: "d", labelKey: "quiz.vrEducationalApps.q5.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.vrEducationalApps.q5.explanation",
      },
    ],
  },
};

export function getQuizForModule(moduleSlug: string): ModuleQuiz | undefined {
  return moduleQuizzes[moduleSlug];
}

export function calculateQuizScore(
  moduleSlug: string,
  answers: Record<string, string>
): { score: number; total: number; percent: number; passed: boolean } {
  const quiz = moduleQuizzes[moduleSlug];
  if (!quiz) return { score: 0, total: 0, percent: 0, passed: false };

  const total = quiz.questions.length;
  const score = quiz.questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctOptionId ? 1 : 0),
    0
  );
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);
  return { score, total, percent, passed: score / total >= quiz.passingScore };
}
