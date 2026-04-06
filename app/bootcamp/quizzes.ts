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
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q5.explanation",
      },
      {
        id: "q6",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q6.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q6.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q6.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q6.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q6.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q6.explanation",
      },
      {
        id: "q7",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q7.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q7.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q7.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q7.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q7.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q7.explanation",
      },
      {
        id: "q8",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q8.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q8.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q8.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q8.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q8.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q8.explanation",
      },
      {
        id: "q9",
        type: "judgment",
        questionKey: "quiz.basicFoundations.q9.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q9.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q9.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q9.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q9.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q9.explanation",
      },
      {
        id: "q10",
        type: "multiple-choice",
        questionKey: "quiz.basicFoundations.q10.question",
        options: [
          { id: "a", labelKey: "quiz.basicFoundations.q10.a" },
          { id: "b", labelKey: "quiz.basicFoundations.q10.b" },
          { id: "c", labelKey: "quiz.basicFoundations.q10.c" },
          { id: "d", labelKey: "quiz.basicFoundations.q10.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.basicFoundations.q10.explanation",
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
        correctOptionId: "c",
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
        correctOptionId: "c",
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
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q5.explanation",
      },
      {
        id: "q6",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q6.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q6.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q6.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q6.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q6.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q6.explanation",
      },
      {
        id: "q7",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q7.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q7.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q7.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q7.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q7.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.gettingVrReady.q7.explanation",
      },
      {
        id: "q8",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q8.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q8.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q8.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q8.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q8.d" },
        ],
        correctOptionId: "b",
        explanationKey: "quiz.gettingVrReady.q8.explanation",
      },
      {
        id: "q9",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q9.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q9.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q9.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q9.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q9.d" },
        ],
        correctOptionId: "a",
        explanationKey: "quiz.gettingVrReady.q9.explanation",
      },
      {
        id: "q10",
        type: "judgment",
        questionKey: "quiz.gettingVrReady.q10.question",
        options: [
          { id: "a", labelKey: "quiz.gettingVrReady.q10.a" },
          { id: "b", labelKey: "quiz.gettingVrReady.q10.b" },
          { id: "c", labelKey: "quiz.gettingVrReady.q10.c" },
          { id: "d", labelKey: "quiz.gettingVrReady.q10.d" },
        ],
        correctOptionId: "c",
        explanationKey: "quiz.gettingVrReady.q10.explanation",
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
