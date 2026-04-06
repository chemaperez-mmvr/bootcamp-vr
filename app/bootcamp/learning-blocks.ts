import type { LearningBlockSetDef } from "./learning-block-types";

/* ------------------------------------------------------------------ */
/*  Learning block definitions by module                               */
/* ------------------------------------------------------------------ */

const P = "learningBlocks.basicFoundations";

const blocksByModule: Record<string, LearningBlockSetDef> = {
  "basic-foundations": {
    moduleSlug: "basic-foundations",
    videoSlideId: "video-intro",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — What is VR?                                        */
      /* ============================================================ */
      {
        blockId: "what-is-vr",
        titleKey: `${P}.b1.title`,
        iconEmoji: "🥽",
        exercise: {
          type: "matching",
          id: "b1-match",
          instructionKey: `${P}.b1.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${P}.b1.exercise.left.p1`, rightKey: `${P}.b1.exercise.right.p1` },
            { id: "p2", leftKey: `${P}.b1.exercise.left.p2`, rightKey: `${P}.b1.exercise.right.p2` },
            { id: "p3", leftKey: `${P}.b1.exercise.left.p3`, rightKey: `${P}.b1.exercise.right.p3` },
            { id: "p4", leftKey: `${P}.b1.exercise.left.p4`, rightKey: `${P}.b1.exercise.right.p4` },
          ],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${P}.b1.scenario.context`,
          questionKey: `${P}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${P}.b1.scenario.choices.a`, feedbackKey: `${P}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${P}.b1.scenario.choices.b`, feedbackKey: `${P}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${P}.b1.scenario.choices.c`, feedbackKey: `${P}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${P}.b1.concepts.c1.context`,
            questionKey: `${P}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${P}.b1.concepts.c1.choices.a`, feedbackKey: `${P}.b1.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${P}.b1.concepts.c1.choices.b`, feedbackKey: `${P}.b1.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${P}.b1.concepts.c1.choices.c`, feedbackKey: `${P}.b1.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${P}.b1.concepts.c2.context`,
            questionKey: `${P}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${P}.b1.concepts.c2.choices.a`, feedbackKey: `${P}.b1.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${P}.b1.concepts.c2.choices.b`, feedbackKey: `${P}.b1.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${P}.b1.concepts.c2.choices.c`, feedbackKey: `${P}.b1.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "what-is-vr",
        microChecks: [
          {
            type: "trueFalse",
            id: "b1-tf",
            statements: [
              { id: "s1", statementKey: `${P}.b1.micro.tf.s1`, isTrue: true, explanationKey: `${P}.b1.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${P}.b1.micro.tf.s2`, isTrue: false, explanationKey: `${P}.b1.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${P}.b1.micro.tf.s3`, isTrue: false, explanationKey: `${P}.b1.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — Why VR works for learning                         */
      /* ============================================================ */
      {
        blockId: "why-vr-works",
        titleKey: `${P}.b2.title`,
        iconEmoji: "🧪",
        exercise: {
          type: "ordering",
          id: "b2-order",
          instructionKey: `${P}.b2.exercise.instruction`,
          scaleStartKey: `${P}.b2.exercise.scaleStart`,
          scaleEndKey: `${P}.b2.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${P}.b2.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${P}.b2.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${P}.b2.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${P}.b2.exercise.i4`, correctPosition: 3 },
          ],
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${P}.b2.scenario.context`,
          questionKey: `${P}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${P}.b2.scenario.choices.a`, feedbackKey: `${P}.b2.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${P}.b2.scenario.choices.b`, feedbackKey: `${P}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${P}.b2.scenario.choices.c`, feedbackKey: `${P}.b2.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${P}.b2.concepts.c1.context`,
            questionKey: `${P}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${P}.b2.concepts.c1.choices.a`, feedbackKey: `${P}.b2.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${P}.b2.concepts.c1.choices.b`, feedbackKey: `${P}.b2.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${P}.b2.concepts.c1.choices.c`, feedbackKey: `${P}.b2.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${P}.b2.concepts.c2.context`,
            questionKey: `${P}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${P}.b2.concepts.c2.choices.a`, feedbackKey: `${P}.b2.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${P}.b2.concepts.c2.choices.b`, feedbackKey: `${P}.b2.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${P}.b2.concepts.c2.choices.c`, feedbackKey: `${P}.b2.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "why-vr-effective",
        microChecks: [
          {
            type: "trueFalse",
            id: "b2-tf",
            statements: [
              { id: "s1", statementKey: `${P}.b2.micro.tf.s1`, isTrue: true, explanationKey: `${P}.b2.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${P}.b2.micro.tf.s2`, isTrue: false, explanationKey: `${P}.b2.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${P}.b2.micro.tf.s3`, isTrue: true, explanationKey: `${P}.b2.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — Real use cases                                     */
      /* ============================================================ */
      {
        blockId: "real-use-cases",
        titleKey: `${P}.b3.title`,
        iconEmoji: "🎓",
        exercise: {
          type: "matching",
          id: "b3-match",
          instructionKey: `${P}.b3.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${P}.b3.exercise.left.p1`, rightKey: `${P}.b3.exercise.right.p1` },
            { id: "p2", leftKey: `${P}.b3.exercise.left.p2`, rightKey: `${P}.b3.exercise.right.p2` },
            { id: "p3", leftKey: `${P}.b3.exercise.left.p3`, rightKey: `${P}.b3.exercise.right.p3` },
            { id: "p4", leftKey: `${P}.b3.exercise.left.p4`, rightKey: `${P}.b3.exercise.right.p4` },
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${P}.b3.scenario.context`,
          questionKey: `${P}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${P}.b3.scenario.choices.a`, feedbackKey: `${P}.b3.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${P}.b3.scenario.choices.b`, feedbackKey: `${P}.b3.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${P}.b3.scenario.choices.c`, feedbackKey: `${P}.b3.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${P}.b3.concepts.c1.context`,
            questionKey: `${P}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${P}.b3.concepts.c1.choices.a`, feedbackKey: `${P}.b3.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${P}.b3.concepts.c1.choices.b`, feedbackKey: `${P}.b3.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${P}.b3.concepts.c1.choices.c`, feedbackKey: `${P}.b3.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${P}.b3.concepts.c2.context`,
            questionKey: `${P}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${P}.b3.concepts.c2.choices.a`, feedbackKey: `${P}.b3.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${P}.b3.concepts.c2.choices.b`, feedbackKey: `${P}.b3.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${P}.b3.concepts.c2.choices.c`, feedbackKey: `${P}.b3.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "vr-use-cases",
        microChecks: [
          {
            type: "classify",
            id: "b3-cls",
            instructionKey: `${P}.b3.micro.cls.instruction`,
            categories: [
              { id: "full", labelKey: `${P}.b3.micro.cls.cat.full` },
              { id: "passive", labelKey: `${P}.b3.micro.cls.cat.passive` },
            ],
            items: [
              { id: "i1", labelKey: `${P}.b3.micro.cls.i1`, correctCategoryId: "full" },
              { id: "i2", labelKey: `${P}.b3.micro.cls.i2`, correctCategoryId: "passive" },
              { id: "i3", labelKey: `${P}.b3.micro.cls.i3`, correctCategoryId: "full" },
              { id: "i4", labelKey: `${P}.b3.micro.cls.i4`, correctCategoryId: "passive" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — VR vs AR vs XR                                    */
      /* ============================================================ */
      {
        blockId: "vr-ar-xr",
        titleKey: `${P}.b4.title`,
        iconEmoji: "🌐",
        exercise: {
          type: "ordering",
          id: "b4-order",
          instructionKey: `${P}.b4.exercise.instruction`,
          scaleStartKey: `${P}.b4.exercise.scaleStart`,
          scaleEndKey: `${P}.b4.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${P}.b4.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${P}.b4.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${P}.b4.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${P}.b4.exercise.i4`, correctPosition: 3 },
            { id: "i5", labelKey: `${P}.b4.exercise.i5`, correctPosition: 4 },
          ],
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${P}.b4.scenario.context`,
          questionKey: `${P}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${P}.b4.scenario.choices.a`, feedbackKey: `${P}.b4.scenario.feedback.a`, feedbackTone: "correct", isCorrect: true },
            { id: "b", labelKey: `${P}.b4.scenario.choices.b`, feedbackKey: `${P}.b4.scenario.feedback.b`, feedbackTone: "partial", isCorrect: false },
            { id: "c", labelKey: `${P}.b4.scenario.choices.c`, feedbackKey: `${P}.b4.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${P}.b4.concepts.c1.context`,
            questionKey: `${P}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${P}.b4.concepts.c1.choices.a`, feedbackKey: `${P}.b4.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${P}.b4.concepts.c1.choices.b`, feedbackKey: `${P}.b4.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${P}.b4.concepts.c1.choices.c`, feedbackKey: `${P}.b4.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${P}.b4.concepts.c2.context`,
            questionKey: `${P}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${P}.b4.concepts.c2.choices.a`, feedbackKey: `${P}.b4.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${P}.b4.concepts.c2.choices.b`, feedbackKey: `${P}.b4.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${P}.b4.concepts.c2.choices.c`, feedbackKey: `${P}.b4.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "vr-ar-xr",
        microChecks: [
          {
            type: "classify",
            id: "b4-cls",
            instructionKey: `${P}.b4.micro.cls.instruction`,
            categories: [
              { id: "vr", labelKey: `${P}.b4.micro.cls.cat.vr` },
              { id: "ar", labelKey: `${P}.b4.micro.cls.cat.ar` },
            ],
            items: [
              { id: "i1", labelKey: `${P}.b4.micro.cls.i1`, correctCategoryId: "vr" },
              { id: "i2", labelKey: `${P}.b4.micro.cls.i2`, correctCategoryId: "ar" },
              { id: "i3", labelKey: `${P}.b4.micro.cls.i3`, correctCategoryId: "ar" },
              { id: "i4", labelKey: `${P}.b4.micro.cls.i4`, correctCategoryId: "vr" },
              { id: "i5", labelKey: `${P}.b4.micro.cls.i5`, correctCategoryId: "ar" },
            ],
          },
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getLearningBlocksForModule(
  moduleSlug: string
): LearningBlockSetDef | undefined {
  return blocksByModule[moduleSlug];
}
