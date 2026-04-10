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
        correctOptionId: "d",
        explanationKey: "quiz.basicFoundations.q5.explanation",
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
        correctOptionId: "c",
        explanationKey: "quiz.gettingVrReady.q3.explanation",
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
        correctOptionId: "a",
        explanationKey: "quiz.gettingVrReady.q5.explanation",
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
