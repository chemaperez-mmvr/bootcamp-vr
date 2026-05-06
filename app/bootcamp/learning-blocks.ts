import type { LearningBlockSetDef } from "./learning-block-types";

/* ------------------------------------------------------------------ */
/*  Learning block definitions by module                               */
/* ------------------------------------------------------------------ */

const P = "learningBlocks.basicFoundations";

const Q = "learningBlocks.gettingVrReady";

const R = "learningBlocks.designingMeaningfulLearning";

const S = "learningBlocks.classroomImplementation";

const T = "learningBlocks.safetyWellbeingAccessibility";

const U = "learningBlocks.briefingAndDebriefing";

const V = "learningBlocks.solvingCommonVrProblems";

const W = "learningBlocks.vrEducationalApps";

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
          type: "mythBusters",
          id: "b1-myth",
          instructionKey: `${P}.b1.exercise.instruction`,
          statements: [
            { id: "s1", statementKey: `${P}.b1.exercise.s1.statement`, isTrue: true, explanationKey: `${P}.b1.exercise.s1.explanation` },
            { id: "s2", statementKey: `${P}.b1.exercise.s2.statement`, isTrue: false, explanationKey: `${P}.b1.exercise.s2.explanation` },
            { id: "s3", statementKey: `${P}.b1.exercise.s3.statement`, isTrue: false, explanationKey: `${P}.b1.exercise.s3.explanation` },
            { id: "s4", statementKey: `${P}.b1.exercise.s4.statement`, isTrue: true, explanationKey: `${P}.b1.exercise.s4.explanation` },
            { id: "s5", statementKey: `${P}.b1.exercise.s5.statement`, isTrue: false, explanationKey: `${P}.b1.exercise.s5.explanation` },
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
              { id: "s1", statementKey: `${P}.b1.micro.tf.s1.statement`, isTrue: true, explanationKey: `${P}.b1.micro.tf.s1.explanation`, imageUrl: "/images/slides/tf-vr-replaces-reality.jpg" },
              { id: "s2", statementKey: `${P}.b1.micro.tf.s2.statement`, isTrue: false, explanationKey: `${P}.b1.micro.tf.s2.explanation`, imageUrl: "/images/slides/tf-360-passive.jpg" },
              { id: "s3", statementKey: `${P}.b1.micro.tf.s3.statement`, isTrue: false, explanationKey: `${P}.b1.micro.tf.s3.explanation`, imageUrl: "/images/slides/tf-waving-unseen.jpg" },
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
          type: "matching",
          id: "b2-match",
          instructionKey: `${P}.b2.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${P}.b2.exercise.p1.term`, rightKey: `${P}.b2.exercise.p1.def`, iconName: "Eye" },
            { id: "p2", leftKey: `${P}.b2.exercise.p2.term`, rightKey: `${P}.b2.exercise.p2.def`, iconName: "PersonStanding" },
            { id: "p3", leftKey: `${P}.b2.exercise.p3.term`, rightKey: `${P}.b2.exercise.p3.def`, iconName: "Zap" },
            { id: "p4", leftKey: `${P}.b2.exercise.p4.term`, rightKey: `${P}.b2.exercise.p4.def`, iconName: "MapPin" },
            { id: "p5", leftKey: `${P}.b2.exercise.p5.term`, rightKey: `${P}.b2.exercise.p5.def`, iconName: "Heart" },
            { id: "p6", leftKey: `${P}.b2.exercise.p6.term`, rightKey: `${P}.b2.exercise.p6.def`, iconName: "Waves" },
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
              { id: "s1", statementKey: `${P}.b2.micro.tf.s1.statement`, isTrue: true, explanationKey: `${P}.b2.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${P}.b2.micro.tf.s2.statement`, isTrue: false, explanationKey: `${P}.b2.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${P}.b2.micro.tf.s3.statement`, isTrue: true, explanationKey: `${P}.b2.micro.tf.s3.explanation` },
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
              { id: "i1", labelKey: `${P}.b3.micro.cls.i1`, correctCategoryId: "full", imageUrl: "/images/vr-chemistry-experiment.webp" },
              { id: "i2", labelKey: `${P}.b3.micro.cls.i2`, correctCategoryId: "passive", imageUrl: "/images/vr-marine-life-classroom.webp" },
              { id: "i3", labelKey: `${P}.b3.micro.cls.i3`, correctCategoryId: "full", imageUrl: "/images/vr-nursing-triage.webp" },
              { id: "i4", labelKey: `${P}.b3.micro.cls.i4`, correctCategoryId: "passive", imageUrl: "/images/vr-passive-lecture.webp" },
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
          type: "conceptMap",
          id: "b4-cmap",
          instructionKey: `${P}.b4.exercise.instruction`,
          nodes: [
            { id: "xr", labelKey: `${P}.b4.exercise.nodes.xr`, x: 0.5, y: 0.22, descriptionKey: `${P}.b4.exercise.desc.xr` },
            { id: "vr", labelKey: `${P}.b4.exercise.nodes.vr`, x: 0.17, y: 0.72, descriptionKey: `${P}.b4.exercise.desc.vr` },
            { id: "ar", labelKey: `${P}.b4.exercise.nodes.ar`, x: 0.5, y: 0.72, descriptionKey: `${P}.b4.exercise.desc.ar` },
            { id: "mr", labelKey: `${P}.b4.exercise.nodes.mr`, x: 0.83, y: 0.72, descriptionKey: `${P}.b4.exercise.desc.mr` },
          ],
          validConnections: [
            { fromId: "xr", toId: "vr", labelKey: `${P}.b4.exercise.conn.xrVr` },
            { fromId: "xr", toId: "ar", labelKey: `${P}.b4.exercise.conn.xrAr` },
            { fromId: "xr", toId: "mr", labelKey: `${P}.b4.exercise.conn.xrMr` },
            { fromId: "mr", toId: "ar", labelKey: `${P}.b4.exercise.conn.arMr` },
          ],
          invalidExplanations: [
            { fromId: "vr", toId: "ar", reasonKey: `${P}.b4.exercise.invalid.vrAr` },
            { fromId: "vr", toId: "mr", reasonKey: `${P}.b4.exercise.invalid.vrMr` },
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
              { id: "i1", labelKey: `${P}.b4.micro.cls.i1`, correctCategoryId: "vr", imageUrl: "/images/classify-vr-volcano.webp" },
              { id: "i2", labelKey: `${P}.b4.micro.cls.i2`, correctCategoryId: "ar", imageUrl: "/images/classify-ar-anatomy-tablet.webp" },
              { id: "i3", labelKey: `${P}.b4.micro.cls.i3`, correctCategoryId: "ar", imageUrl: "/images/classify-ar-engine-repair.webp" },
              { id: "i4", labelKey: `${P}.b4.micro.cls.i4`, correctCategoryId: "vr", imageUrl: "/images/classify-vr-human-cell.webp" },
              { id: "i5", labelKey: `${P}.b4.micro.cls.i5`, correctCategoryId: "ar", imageUrl: "/images/classify-ar-castle-textbook.webp" },
            ],
          },
        ],
      },
    ],
  },

  "getting-vr-ready": {
    moduleSlug: "getting-vr-ready",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — Initial Quest 3 Setup                              */
      /* ============================================================ */
      {
        blockId: "getting-started",
        titleKey: `${Q}.b1.title`,
        iconEmoji: "📦",
        exercise: {
          type: "troubleshooting",
          id: "b1-trouble",
          instructionKey: `${Q}.b1.exercise.instruction`,
          scenarioKey: `${Q}.b1.exercise.scenario`,
          scenarioImageUrl: "/images/quest3-black-screen.webp",
          startNodeId: "n1",
          nodes: [
            {
              id: "n1", promptKey: `${Q}.b1.exercise.n1.prompt`,
              options: [
                { id: "a", labelKey: `${Q}.b1.exercise.n1.a.label`, nextNodeId: "n2", feedbackKey: `${Q}.b1.exercise.n1.a.feedback`, isCorrect: true },
                { id: "b", labelKey: `${Q}.b1.exercise.n1.b.label`, nextNodeId: null, feedbackKey: `${Q}.b1.exercise.n1.b.feedback`, isCorrect: false },
                { id: "c", labelKey: `${Q}.b1.exercise.n1.c.label`, nextNodeId: null, feedbackKey: `${Q}.b1.exercise.n1.c.feedback`, isCorrect: false },
              ],
            },
            {
              id: "n2", promptKey: `${Q}.b1.exercise.n2.prompt`,
              imageUrl: "/images/quest3-charging-led.webp",
              options: [
                { id: "a", labelKey: `${Q}.b1.exercise.n2.a.label`, nextNodeId: null, feedbackKey: `${Q}.b1.exercise.n2.a.feedback`, isCorrect: false },
                { id: "b", labelKey: `${Q}.b1.exercise.n2.b.label`, nextNodeId: "n3", feedbackKey: `${Q}.b1.exercise.n2.b.feedback`, isCorrect: true },
                { id: "c", labelKey: `${Q}.b1.exercise.n2.c.label`, nextNodeId: null, feedbackKey: `${Q}.b1.exercise.n2.c.feedback`, isCorrect: false },
              ],
            },
            {
              id: "n3", promptKey: `${Q}.b1.exercise.n3.prompt`,
              imageUrl: "/images/quest3-meta-logo-wifi.webp",
              options: [
                { id: "a", labelKey: `${Q}.b1.exercise.n3.a.label`, nextNodeId: null, feedbackKey: `${Q}.b1.exercise.n3.a.feedback`, isCorrect: true },
                { id: "b", labelKey: `${Q}.b1.exercise.n3.b.label`, nextNodeId: null, feedbackKey: `${Q}.b1.exercise.n3.b.feedback`, isCorrect: false },
              ],
            },
          ],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${Q}.b1.scenario.context`,
          questionKey: `${Q}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${Q}.b1.scenario.choices.a`, feedbackKey: `${Q}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${Q}.b1.scenario.choices.b`, feedbackKey: `${Q}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${Q}.b1.scenario.choices.c`, feedbackKey: `${Q}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${Q}.b1.concepts.c1.context`,
            questionKey: `${Q}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b1.concepts.c1.choices.a`, feedbackKey: `${Q}.b1.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${Q}.b1.concepts.c1.choices.b`, feedbackKey: `${Q}.b1.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${Q}.b1.concepts.c1.choices.c`, feedbackKey: `${Q}.b1.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${Q}.b1.concepts.c2.context`,
            questionKey: `${Q}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b1.concepts.c2.choices.a`, feedbackKey: `${Q}.b1.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${Q}.b1.concepts.c2.choices.b`, feedbackKey: `${Q}.b1.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${Q}.b1.concepts.c2.choices.c`, feedbackKey: `${Q}.b1.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "getting-started",
        microChecks: [
          {
            type: "trueFalse",
            id: "b1-tf",
            statements: [
              { id: "s1", statementKey: `${Q}.b1.micro.tf.s1.statement`, isTrue: true, explanationKey: `${Q}.b1.micro.tf.s1.explanation`, imageUrl: "/images/slides/tf-ipd-individual.jpg" },
              { id: "s2", statementKey: `${Q}.b1.micro.tf.s2.statement`, isTrue: false, explanationKey: `${Q}.b1.micro.tf.s2.explanation`, imageUrl: "/images/slides/tf-quest-out-of-box.jpg" },
              { id: "s3", statementKey: `${Q}.b1.micro.tf.s3.statement`, isTrue: true, explanationKey: `${Q}.b1.micro.tf.s3.explanation`, imageUrl: "/images/slides/tf-charging-overnight.jpg" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — Classroom Setup                                    */
      /* ============================================================ */
      {
        blockId: "classroom-setup",
        titleKey: `${Q}.b2.title`,
        iconEmoji: "🏫",
        exercise: {
          type: "classroomPlanner",
          id: "b2-planner",
          instructionKey: `${Q}.b2.exercise.instruction`,
          gridCols: 6,
          gridRows: 4,
          items: [
            { id: "teacher", labelKey: `${Q}.b2.exercise.items.teacher`, emoji: "🧑‍🏫", width: 1, height: 1 },
            { id: "vr1", labelKey: `${Q}.b2.exercise.items.vrStation`, emoji: "🥽", width: 1, height: 1 },
            { id: "vr2", labelKey: `${Q}.b2.exercise.items.vrStation2`, emoji: "🥽", width: 1, height: 1 },
            { id: "screen", labelKey: `${Q}.b2.exercise.items.screen`, emoji: "📺", width: 2, height: 1 },
            { id: "charger", labelKey: `${Q}.b2.exercise.items.charger`, emoji: "🔌", width: 1, height: 1 },
          ],
          zones: [
            { id: "front", labelKey: `${Q}.b2.exercise.zones.front`, descriptionKey: `${Q}.b2.exercise.zones.frontDesc`, requiredItemIds: ["teacher", "screen"], col: 0, row: 0, width: 6, height: 1 },
            { id: "vrArea", labelKey: `${Q}.b2.exercise.zones.vrArea`, descriptionKey: `${Q}.b2.exercise.zones.vrAreaDesc`, requiredItemIds: ["vr1", "vr2"], col: 2, row: 2, width: 4, height: 2 },
            { id: "support", labelKey: `${Q}.b2.exercise.zones.support`, descriptionKey: `${Q}.b2.exercise.zones.supportDesc`, requiredItemIds: ["charger"], col: 0, row: 2, width: 2, height: 2 },
          ],
          obstacles: [
            { id: "window", emoji: "🪟", labelKey: `${Q}.b2.exercise.obstacles.window`, col: 5, row: 0, width: 1, height: 1 },
            { id: "door", emoji: "🚪", labelKey: `${Q}.b2.exercise.obstacles.door`, col: 0, row: 1, width: 1, height: 1 },
          ],
          clearanceRule: {
            itemIds: ["vr1", "vr2"],
            cells: 1,
            violationKey: `${Q}.b2.exercise.hints.vrClearance`,
          },
          successJustificationKeys: [
            `${Q}.b2.exercise.justification.supervision`,
            `${Q}.b2.exercise.justification.cables`,
            `${Q}.b2.exercise.justification.evacuation`,
          ],
          itemMistakeHints: {
            teacher: `${Q}.b2.exercise.hints.teacher`,
            vr1: `${Q}.b2.exercise.hints.vrStation`,
            vr2: `${Q}.b2.exercise.hints.vrStation`,
            screen: `${Q}.b2.exercise.hints.screen`,
            charger: `${Q}.b2.exercise.hints.charger`,
          },
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${Q}.b2.scenario.context`,
          questionKey: `${Q}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${Q}.b2.scenario.choices.a`, feedbackKey: `${Q}.b2.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${Q}.b2.scenario.choices.b`, feedbackKey: `${Q}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${Q}.b2.scenario.choices.c`, feedbackKey: `${Q}.b2.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${Q}.b2.concepts.c1.context`,
            questionKey: `${Q}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b2.concepts.c1.choices.a`, feedbackKey: `${Q}.b2.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${Q}.b2.concepts.c1.choices.b`, feedbackKey: `${Q}.b2.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${Q}.b2.concepts.c1.choices.c`, feedbackKey: `${Q}.b2.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${Q}.b2.concepts.c2.context`,
            questionKey: `${Q}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b2.concepts.c2.choices.a`, feedbackKey: `${Q}.b2.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${Q}.b2.concepts.c2.choices.b`, feedbackKey: `${Q}.b2.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${Q}.b2.concepts.c2.choices.c`, feedbackKey: `${Q}.b2.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "classroom-setup",
        microChecks: [
          {
            type: "classify",
            id: "b2-cls",
            instructionKey: `${Q}.b2.micro.cls.instruction`,
            categories: [
              { id: "essential", labelKey: `${Q}.b2.micro.cls.cat.essential` },
              { id: "optional", labelKey: `${Q}.b2.micro.cls.cat.optional` },
            ],
            items: [
              { id: "i1", labelKey: `${Q}.b2.micro.cls.i1`, correctCategoryId: "essential", imageUrl: "/images/classify-essential-guardian-boundary.webp" },
              { id: "i2", labelKey: `${Q}.b2.micro.cls.i2`, correctCategoryId: "optional", imageUrl: "/images/classify-optional-printed-labels.webp" },
              { id: "i3", labelKey: `${Q}.b2.micro.cls.i3`, correctCategoryId: "essential", imageUrl: "/images/classify-essential-wifi-test.webp" },
              { id: "i4", labelKey: `${Q}.b2.micro.cls.i4`, correctCategoryId: "optional", imageUrl: "/images/classify-optional-background-music.webp" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — Installing Apps                                    */
      /* ============================================================ */
      {
        blockId: "store-install",
        titleKey: `${Q}.b3.title`,
        iconEmoji: "📲",
        exercise: {
          type: "matching",
          id: "b3-match",
          instructionKey: `${Q}.b3.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${Q}.b3.exercise.left.p1`, rightKey: `${Q}.b3.exercise.right.p1` },
            { id: "p2", leftKey: `${Q}.b3.exercise.left.p2`, rightKey: `${Q}.b3.exercise.right.p2` },
            { id: "p3", leftKey: `${Q}.b3.exercise.left.p3`, rightKey: `${Q}.b3.exercise.right.p3` },
            { id: "p4", leftKey: `${Q}.b3.exercise.left.p4`, rightKey: `${Q}.b3.exercise.right.p4` },
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${Q}.b3.scenario.context`,
          questionKey: `${Q}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${Q}.b3.scenario.choices.a`, feedbackKey: `${Q}.b3.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${Q}.b3.scenario.choices.b`, feedbackKey: `${Q}.b3.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${Q}.b3.scenario.choices.c`, feedbackKey: `${Q}.b3.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${Q}.b3.concepts.c1.context`,
            questionKey: `${Q}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b3.concepts.c1.choices.a`, feedbackKey: `${Q}.b3.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${Q}.b3.concepts.c1.choices.b`, feedbackKey: `${Q}.b3.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${Q}.b3.concepts.c1.choices.c`, feedbackKey: `${Q}.b3.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${Q}.b3.concepts.c2.context`,
            questionKey: `${Q}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b3.concepts.c2.choices.a`, feedbackKey: `${Q}.b3.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${Q}.b3.concepts.c2.choices.b`, feedbackKey: `${Q}.b3.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${Q}.b3.concepts.c2.choices.c`, feedbackKey: `${Q}.b3.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "store-install",
        microChecks: [
          {
            type: "trueFalse",
            id: "b3-tf",
            statements: [
              { id: "s1", statementKey: `${Q}.b3.micro.tf.s1.statement`, isTrue: true, explanationKey: `${Q}.b3.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${Q}.b3.micro.tf.s2.statement`, isTrue: false, explanationKey: `${Q}.b3.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${Q}.b3.micro.tf.s3.statement`, isTrue: true, explanationKey: `${Q}.b3.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — Casting & Sharing                                  */
      /* ============================================================ */
      {
        blockId: "casting",
        titleKey: `${Q}.b4.title`,
        iconEmoji: "📺",
        exercise: {
          type: "triageSort",
          id: "b4-triage",
          instructionKey: `${Q}.b4.exercise.instruction`,
          categories: [
            { id: "before", labelKey: `${Q}.b4.exercise.cat.before`, color: "red" },
            { id: "dayBefore", labelKey: `${Q}.b4.exercise.cat.dayBefore`, color: "amber" },
            { id: "weekly", labelKey: `${Q}.b4.exercise.cat.weekly`, color: "green" },
          ],
          items: [
            { id: "i1", labelKey: `${Q}.b4.exercise.i1`, correctCategoryId: "before" },
            { id: "i2", labelKey: `${Q}.b4.exercise.i2`, correctCategoryId: "weekly" },
            { id: "i3", labelKey: `${Q}.b4.exercise.i3`, correctCategoryId: "before" },
            { id: "i4", labelKey: `${Q}.b4.exercise.i4`, correctCategoryId: "dayBefore" },
            { id: "i5", labelKey: `${Q}.b4.exercise.i5`, correctCategoryId: "dayBefore" },
            { id: "i6", labelKey: `${Q}.b4.exercise.i6`, correctCategoryId: "weekly" },
          ],
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${Q}.b4.scenario.context`,
          questionKey: `${Q}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${Q}.b4.scenario.choices.a`, feedbackKey: `${Q}.b4.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${Q}.b4.scenario.choices.b`, feedbackKey: `${Q}.b4.scenario.feedback.b`, feedbackTone: "partial", isCorrect: false },
            { id: "c", labelKey: `${Q}.b4.scenario.choices.c`, feedbackKey: `${Q}.b4.scenario.feedback.c`, feedbackTone: "correct", isCorrect: true },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${Q}.b4.concepts.c1.context`,
            questionKey: `${Q}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b4.concepts.c1.choices.a`, feedbackKey: `${Q}.b4.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${Q}.b4.concepts.c1.choices.b`, feedbackKey: `${Q}.b4.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${Q}.b4.concepts.c1.choices.c`, feedbackKey: `${Q}.b4.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${Q}.b4.concepts.c2.context`,
            questionKey: `${Q}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b4.concepts.c2.choices.a`, feedbackKey: `${Q}.b4.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${Q}.b4.concepts.c2.choices.b`, feedbackKey: `${Q}.b4.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${Q}.b4.concepts.c2.choices.c`, feedbackKey: `${Q}.b4.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "casting",
        microChecks: [
          {
            type: "classify",
            id: "b4-cls",
            instructionKey: `${Q}.b4.micro.cls.instruction`,
            categories: [
              { id: "wired", labelKey: `${Q}.b4.micro.cls.cat.wired` },
              { id: "wireless", labelKey: `${Q}.b4.micro.cls.cat.wireless` },
            ],
            items: [
              { id: "i1", labelKey: `${Q}.b4.micro.cls.i1`, correctCategoryId: "wireless" },
              { id: "i2", labelKey: `${Q}.b4.micro.cls.i2`, correctCategoryId: "wired" },
              { id: "i3", labelKey: `${Q}.b4.micro.cls.i3`, correctCategoryId: "wireless" },
              { id: "i4", labelKey: `${Q}.b4.micro.cls.i4`, correctCategoryId: "wired" },
              { id: "i5", labelKey: `${Q}.b4.micro.cls.i5`, correctCategoryId: "wireless" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 5 — Pre-Class Checklist                                */
      /* ============================================================ */
      {
        blockId: "pre-class-checklist",
        titleKey: `${Q}.b5.title`,
        iconEmoji: "📋",
        exercise: {
          type: "ordering",
          id: "b5-order",
          instructionKey: `${Q}.b5.exercise.instruction`,
          scaleStartKey: `${Q}.b5.exercise.scaleStart`,
          scaleEndKey: `${Q}.b5.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${Q}.b5.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${Q}.b5.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${Q}.b5.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${Q}.b5.exercise.i4`, correctPosition: 3 },
            { id: "i5", labelKey: `${Q}.b5.exercise.i5`, correctPosition: 4 },
          ],
        },
        scenario: {
          id: "b5-s0",
          contextKey: `${Q}.b5.scenario.context`,
          questionKey: `${Q}.b5.scenario.question`,
          choices: [
            { id: "a", labelKey: `${Q}.b5.scenario.choices.a`, feedbackKey: `${Q}.b5.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${Q}.b5.scenario.choices.b`, feedbackKey: `${Q}.b5.scenario.feedback.b`, feedbackTone: "partial", isCorrect: false },
            { id: "c", labelKey: `${Q}.b5.scenario.choices.c`, feedbackKey: `${Q}.b5.scenario.feedback.c`, feedbackTone: "correct", isCorrect: true },
          ],
        },
        conceptScenarios: [
          {
            id: "b5-c1",
            contextKey: `${Q}.b5.concepts.c1.context`,
            questionKey: `${Q}.b5.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b5.concepts.c1.choices.a`, feedbackKey: `${Q}.b5.concepts.c1.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${Q}.b5.concepts.c1.choices.b`, feedbackKey: `${Q}.b5.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${Q}.b5.concepts.c1.choices.c`, feedbackKey: `${Q}.b5.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b5-c2",
            contextKey: `${Q}.b5.concepts.c2.context`,
            questionKey: `${Q}.b5.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${Q}.b5.concepts.c2.choices.a`, feedbackKey: `${Q}.b5.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${Q}.b5.concepts.c2.choices.b`, feedbackKey: `${Q}.b5.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${Q}.b5.concepts.c2.choices.c`, feedbackKey: `${Q}.b5.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "pre-class-checklist",
        microChecks: [
          {
            type: "trueFalse",
            id: "b5-tf",
            statements: [
              { id: "s1", statementKey: `${Q}.b5.micro.tf.s1.statement`, isTrue: true, explanationKey: `${Q}.b5.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${Q}.b5.micro.tf.s2.statement`, isTrue: false, explanationKey: `${Q}.b5.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${Q}.b5.micro.tf.s3.statement`, isTrue: true, explanationKey: `${Q}.b5.micro.tf.s3.explanation` },
            ],
          },
        ],
      },
    ],
  },

  "designing-meaningful-learning": {
    moduleSlug: "designing-meaningful-learning",
    videoSlideId: "video-intro-m2",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — Objectives That Work                               */
      /* ============================================================ */
      {
        blockId: "objectives-that-work",
        titleKey: `${R}.b1.title`,
        iconEmoji: "🎯",
        exercise: {
          type: "fillGaps",
          id: "b1-fill",
          instructionKey: `${R}.b1.exercise.instruction`,
          templateKey: `${R}.b1.exercise.template`,
          blanks: [
            { id: "blank1", correctWordKey: `${R}.b1.exercise.blank1` },
            { id: "blank2", correctWordKey: `${R}.b1.exercise.blank2` },
            { id: "blank3", correctWordKey: `${R}.b1.exercise.blank3` },
          ],
          distractorKeys: [`${R}.b1.exercise.distractor1`, `${R}.b1.exercise.distractor2`],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${R}.b1.scenario.context`,
          questionKey: `${R}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${R}.b1.scenario.choices.a`, feedbackKey: `${R}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${R}.b1.scenario.choices.b`, feedbackKey: `${R}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${R}.b1.scenario.choices.c`, feedbackKey: `${R}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${R}.b1.concepts.c1.context`,
            questionKey: `${R}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${R}.b1.concepts.c1.choices.a`, feedbackKey: `${R}.b1.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${R}.b1.concepts.c1.choices.b`, feedbackKey: `${R}.b1.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${R}.b1.concepts.c1.choices.c`, feedbackKey: `${R}.b1.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${R}.b1.concepts.c2.context`,
            questionKey: `${R}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${R}.b1.concepts.c2.choices.a`, feedbackKey: `${R}.b1.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${R}.b1.concepts.c2.choices.b`, feedbackKey: `${R}.b1.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${R}.b1.concepts.c2.choices.c`, feedbackKey: `${R}.b1.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "objectives-that-work",
        microChecks: [
          {
            type: "classify",
            id: "b1-cls",
            instructionKey: `${R}.b1.micro.cls.instruction`,
            categories: [
              { id: "vr", labelKey: `${R}.b1.micro.cls.cat.vr` },
              { id: "novr", labelKey: `${R}.b1.micro.cls.cat.novr` },
            ],
            items: [
              { id: "i1", labelKey: `${R}.b1.micro.cls.i1`, correctCategoryId: "vr" },
              { id: "i2", labelKey: `${R}.b1.micro.cls.i2`, correctCategoryId: "novr" },
              { id: "i3", labelKey: `${R}.b1.micro.cls.i3`, correctCategoryId: "vr" },
              { id: "i4", labelKey: `${R}.b1.micro.cls.i4`, correctCategoryId: "novr" },
              { id: "i5", labelKey: `${R}.b1.micro.cls.i5`, correctCategoryId: "vr" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — Writing VR Objectives                              */
      /* ============================================================ */
      {
        blockId: "writing-objectives",
        titleKey: `${R}.b2.title`,
        iconEmoji: "✏️",
        exercise: {
          type: "lessonPlanBuilder",
          id: "b2-lesson",
          instructionKey: `${R}.b2.exercise.instruction`,
          steps: [
            {
              id: "objective", labelKey: `${R}.b2.exercise.s1.label`, descriptionKey: `${R}.b2.exercise.s1.desc`,
              options: [
                { id: "a", labelKey: `${R}.b2.exercise.s1.a.label`, descriptionKey: `${R}.b2.exercise.s1.a.desc`, quality: "best", feedbackKey: `${R}.b2.exercise.s1.a.feedback` },
                { id: "b", labelKey: `${R}.b2.exercise.s1.b.label`, descriptionKey: `${R}.b2.exercise.s1.b.desc`, quality: "good", feedbackKey: `${R}.b2.exercise.s1.b.feedback` },
                { id: "c", labelKey: `${R}.b2.exercise.s1.c.label`, descriptionKey: `${R}.b2.exercise.s1.c.desc`, quality: "poor", feedbackKey: `${R}.b2.exercise.s1.c.feedback` },
              ],
            },
            {
              id: "app", labelKey: `${R}.b2.exercise.s2.label`, descriptionKey: `${R}.b2.exercise.s2.desc`,
              options: [
                { id: "a", labelKey: `${R}.b2.exercise.s2.a.label`, descriptionKey: `${R}.b2.exercise.s2.a.desc`, quality: "poor", feedbackKey: `${R}.b2.exercise.s2.a.feedback` },
                { id: "b", labelKey: `${R}.b2.exercise.s2.b.label`, descriptionKey: `${R}.b2.exercise.s2.b.desc`, quality: "best", feedbackKey: `${R}.b2.exercise.s2.b.feedback` },
                { id: "c", labelKey: `${R}.b2.exercise.s2.c.label`, descriptionKey: `${R}.b2.exercise.s2.c.desc`, quality: "good", feedbackKey: `${R}.b2.exercise.s2.c.feedback` },
              ],
            },
            {
              id: "activity", labelKey: `${R}.b2.exercise.s3.label`, descriptionKey: `${R}.b2.exercise.s3.desc`,
              options: [
                { id: "a", labelKey: `${R}.b2.exercise.s3.a.label`, descriptionKey: `${R}.b2.exercise.s3.a.desc`, quality: "good", feedbackKey: `${R}.b2.exercise.s3.a.feedback` },
                { id: "b", labelKey: `${R}.b2.exercise.s3.b.label`, descriptionKey: `${R}.b2.exercise.s3.b.desc`, quality: "poor", feedbackKey: `${R}.b2.exercise.s3.b.feedback` },
                { id: "c", labelKey: `${R}.b2.exercise.s3.c.label`, descriptionKey: `${R}.b2.exercise.s3.c.desc`, quality: "best", feedbackKey: `${R}.b2.exercise.s3.c.feedback` },
              ],
            },
            {
              id: "assessment", labelKey: `${R}.b2.exercise.s4.label`, descriptionKey: `${R}.b2.exercise.s4.desc`,
              options: [
                { id: "a", labelKey: `${R}.b2.exercise.s4.a.label`, descriptionKey: `${R}.b2.exercise.s4.a.desc`, quality: "best", feedbackKey: `${R}.b2.exercise.s4.a.feedback` },
                { id: "b", labelKey: `${R}.b2.exercise.s4.b.label`, descriptionKey: `${R}.b2.exercise.s4.b.desc`, quality: "poor", feedbackKey: `${R}.b2.exercise.s4.b.feedback` },
                { id: "c", labelKey: `${R}.b2.exercise.s4.c.label`, descriptionKey: `${R}.b2.exercise.s4.c.desc`, quality: "good", feedbackKey: `${R}.b2.exercise.s4.c.feedback` },
              ],
            },
          ],
          minGoodChoices: 3,
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${R}.b2.scenario.context`,
          questionKey: `${R}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${R}.b2.scenario.choices.a`, feedbackKey: `${R}.b2.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${R}.b2.scenario.choices.b`, feedbackKey: `${R}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${R}.b2.scenario.choices.c`, feedbackKey: `${R}.b2.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${R}.b2.concepts.c1.context`,
            questionKey: `${R}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${R}.b2.concepts.c1.choices.a`, feedbackKey: `${R}.b2.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${R}.b2.concepts.c1.choices.b`, feedbackKey: `${R}.b2.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${R}.b2.concepts.c1.choices.c`, feedbackKey: `${R}.b2.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${R}.b2.concepts.c2.context`,
            questionKey: `${R}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${R}.b2.concepts.c2.choices.a`, feedbackKey: `${R}.b2.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${R}.b2.concepts.c2.choices.b`, feedbackKey: `${R}.b2.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${R}.b2.concepts.c2.choices.c`, feedbackKey: `${R}.b2.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "writing-objectives",
        microChecks: [
          {
            type: "trueFalse",
            id: "b2-tf",
            statements: [
              { id: "s1", statementKey: `${R}.b2.micro.tf.s1.statement`, isTrue: true, explanationKey: `${R}.b2.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${R}.b2.micro.tf.s2.statement`, isTrue: false, explanationKey: `${R}.b2.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${R}.b2.micro.tf.s3.statement`, isTrue: true, explanationKey: `${R}.b2.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — Seeing vs. Doing                                   */
      /* ============================================================ */
      {
        blockId: "seeing-vs-doing",
        titleKey: `${R}.b3.title`,
        iconEmoji: "👁️",
        exercise: {
          type: "decisionTree",
          id: "b3-dtree",
          instructionKey: `${R}.b3.exercise.instruction`,
          scenarioKey: `${R}.b3.exercise.scenario`,
          scenarioImageUrl: "/images/vr-water-cycle-lesson.webp",
          startNodeId: "n1",
          nodes: [
            {
              id: "n1", promptKey: `${R}.b3.exercise.n1.prompt`,
              options: [
                { id: "a", labelKey: `${R}.b3.exercise.n1.a.label`, nextNodeId: "n2", feedbackKey: `${R}.b3.exercise.n1.a.feedback`, quality: "good" },
                { id: "b", labelKey: `${R}.b3.exercise.n1.b.label`, nextNodeId: "n2", feedbackKey: `${R}.b3.exercise.n1.b.feedback`, quality: "poor" },
                { id: "c", labelKey: `${R}.b3.exercise.n1.c.label`, nextNodeId: "n2", feedbackKey: `${R}.b3.exercise.n1.c.feedback`, quality: "okay" },
              ],
            },
            {
              id: "n2", promptKey: `${R}.b3.exercise.n2.prompt`,
              options: [
                { id: "a", labelKey: `${R}.b3.exercise.n2.a.label`, nextNodeId: "n3", feedbackKey: `${R}.b3.exercise.n2.a.feedback`, quality: "okay" },
                { id: "b", labelKey: `${R}.b3.exercise.n2.b.label`, nextNodeId: "n3", feedbackKey: `${R}.b3.exercise.n2.b.feedback`, quality: "good" },
                { id: "c", labelKey: `${R}.b3.exercise.n2.c.label`, nextNodeId: "n3", feedbackKey: `${R}.b3.exercise.n2.c.feedback`, quality: "poor" },
              ],
            },
            {
              id: "n3", promptKey: `${R}.b3.exercise.n3.prompt`, isEnd: true,
              endFeedbackKey: `${R}.b3.exercise.n3.endFeedback`,
              endIsGood: true,
              options: [],
            },
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${R}.b3.scenario.context`,
          questionKey: `${R}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${R}.b3.scenario.choices.a`, feedbackKey: `${R}.b3.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${R}.b3.scenario.choices.b`, feedbackKey: `${R}.b3.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${R}.b3.scenario.choices.c`, feedbackKey: `${R}.b3.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${R}.b3.concepts.c1.context`,
            questionKey: `${R}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${R}.b3.concepts.c1.choices.a`, feedbackKey: `${R}.b3.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${R}.b3.concepts.c1.choices.b`, feedbackKey: `${R}.b3.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${R}.b3.concepts.c1.choices.c`, feedbackKey: `${R}.b3.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${R}.b3.concepts.c2.context`,
            questionKey: `${R}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${R}.b3.concepts.c2.choices.a`, feedbackKey: `${R}.b3.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${R}.b3.concepts.c2.choices.b`, feedbackKey: `${R}.b3.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${R}.b3.concepts.c2.choices.c`, feedbackKey: `${R}.b3.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "seeing-vs-doing",
        microChecks: [
          {
            type: "classify",
            id: "b3-cls",
            instructionKey: `${R}.b3.micro.cls.instruction`,
            categories: [
              { id: "seeing", labelKey: `${R}.b3.micro.cls.cat.seeing` },
              { id: "doing", labelKey: `${R}.b3.micro.cls.cat.doing` },
            ],
            items: [
              { id: "i1", labelKey: `${R}.b3.micro.cls.i1`, correctCategoryId: "seeing", imageUrl: "/images/classify-seeing-factory-tour.webp" },
              { id: "i2", labelKey: `${R}.b3.micro.cls.i2`, correctCategoryId: "doing", imageUrl: "/images/classify-doing-operate-machinery.webp" },
              { id: "i3", labelKey: `${R}.b3.micro.cls.i3`, correctCategoryId: "doing", imageUrl: "/images/classify-doing-triage-decisions.webp" },
              { id: "i4", labelKey: `${R}.b3.micro.cls.i4`, correctCategoryId: "seeing", imageUrl: "/images/classify-seeing-circulatory-system.webp" },
              { id: "i5", labelKey: `${R}.b3.micro.cls.i5`, correctCategoryId: "doing", imageUrl: "/images/classify-doing-assemble-engine.webp" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — The VR Session Flow                                */
      /* ============================================================ */
      {
        blockId: "vr-session-flow",
        titleKey: `${R}.b4.title`,
        iconEmoji: "🔄",
        exercise: {
          type: "resourceAllocation",
          id: "b4-resource",
          instructionKey: `${R}.b4.exercise.instruction`,
          scenarioKey: `${R}.b4.exercise.scenario`,
          resources: [
            { id: "intro", labelKey: `${R}.b4.exercise.res.intro`, min: 2, max: 15, unit: "min", idealMin: 3, idealMax: 7 },
            { id: "vrTime", labelKey: `${R}.b4.exercise.res.vr`, min: 5, max: 30, unit: "min", idealMin: 10, idealMax: 20 },
            { id: "debrief", labelKey: `${R}.b4.exercise.res.debrief`, min: 2, max: 15, unit: "min", idealMin: 5, idealMax: 10 },
            { id: "transition", labelKey: `${R}.b4.exercise.res.transition`, min: 2, max: 10, unit: "min", idealMin: 3, idealMax: 5 },
          ],
          totalBudget: 40,
          totalBudgetUnit: "min",
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${R}.b4.scenario.context`,
          questionKey: `${R}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${R}.b4.scenario.choices.a`, feedbackKey: `${R}.b4.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${R}.b4.scenario.choices.b`, feedbackKey: `${R}.b4.scenario.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
            { id: "c", labelKey: `${R}.b4.scenario.choices.c`, feedbackKey: `${R}.b4.scenario.feedback.c`, feedbackTone: "correct", isCorrect: true },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${R}.b4.concepts.c1.context`,
            questionKey: `${R}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${R}.b4.concepts.c1.choices.a`, feedbackKey: `${R}.b4.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${R}.b4.concepts.c1.choices.b`, feedbackKey: `${R}.b4.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${R}.b4.concepts.c1.choices.c`, feedbackKey: `${R}.b4.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${R}.b4.concepts.c2.context`,
            questionKey: `${R}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${R}.b4.concepts.c2.choices.a`, feedbackKey: `${R}.b4.concepts.c2.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${R}.b4.concepts.c2.choices.b`, feedbackKey: `${R}.b4.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${R}.b4.concepts.c2.choices.c`, feedbackKey: `${R}.b4.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "vr-session-flow",
        microChecks: [
          {
            type: "trueFalse",
            id: "b4-tf",
            statements: [
              { id: "s1", statementKey: `${R}.b4.micro.tf.s1.statement`, isTrue: true, explanationKey: `${R}.b4.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${R}.b4.micro.tf.s2.statement`, isTrue: false, explanationKey: `${R}.b4.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${R}.b4.micro.tf.s3.statement`, isTrue: true, explanationKey: `${R}.b4.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 5 — VR Activity Types                                  */
      /* ============================================================ */
      {
        blockId: "activity-types",
        titleKey: `${R}.b5.title`,
        iconEmoji: "🧩",
        exercise: {
          type: "matching",
          id: "b5-match",
          instructionKey: `${R}.b5.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${R}.b5.exercise.left.p1`, rightKey: `${R}.b5.exercise.right.p1` },
            { id: "p2", leftKey: `${R}.b5.exercise.left.p2`, rightKey: `${R}.b5.exercise.right.p2` },
            { id: "p3", leftKey: `${R}.b5.exercise.left.p3`, rightKey: `${R}.b5.exercise.right.p3` },
            { id: "p4", leftKey: `${R}.b5.exercise.left.p4`, rightKey: `${R}.b5.exercise.right.p4` },
          ],
        },
        scenario: {
          id: "b5-s0",
          contextKey: `${R}.b5.scenario.context`,
          questionKey: `${R}.b5.scenario.question`,
          choices: [
            { id: "a", labelKey: `${R}.b5.scenario.choices.a`, feedbackKey: `${R}.b5.scenario.feedback.a`, feedbackTone: "correct", isCorrect: true },
            { id: "b", labelKey: `${R}.b5.scenario.choices.b`, feedbackKey: `${R}.b5.scenario.feedback.b`, feedbackTone: "partial", isCorrect: false },
            { id: "c", labelKey: `${R}.b5.scenario.choices.c`, feedbackKey: `${R}.b5.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b5-c1",
            contextKey: `${R}.b5.concepts.c1.context`,
            questionKey: `${R}.b5.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${R}.b5.concepts.c1.choices.a`, feedbackKey: `${R}.b5.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${R}.b5.concepts.c1.choices.b`, feedbackKey: `${R}.b5.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${R}.b5.concepts.c1.choices.c`, feedbackKey: `${R}.b5.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b5-c2",
            contextKey: `${R}.b5.concepts.c2.context`,
            questionKey: `${R}.b5.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${R}.b5.concepts.c2.choices.a`, feedbackKey: `${R}.b5.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${R}.b5.concepts.c2.choices.b`, feedbackKey: `${R}.b5.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${R}.b5.concepts.c2.choices.c`, feedbackKey: `${R}.b5.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "activity-types",
        microChecks: [
          {
            type: "classify",
            id: "b5-cls",
            instructionKey: `${R}.b5.micro.cls.instruction`,
            categories: [
              { id: "exploration", labelKey: `${R}.b5.micro.cls.cat.exploration` },
              { id: "simulation", labelKey: `${R}.b5.micro.cls.cat.simulation` },
            ],
            items: [
              { id: "i1", labelKey: `${R}.b5.micro.cls.i1`, correctCategoryId: "exploration", imageUrl: "/images/classify-explore-er-hazards.webp" },
              { id: "i2", labelKey: `${R}.b5.micro.cls.i2`, correctCategoryId: "simulation", imageUrl: "/images/classify-sim-injection-practice.webp" },
              { id: "i3", labelKey: `${R}.b5.micro.cls.i3`, correctCategoryId: "simulation", imageUrl: "/images/classify-sim-fire-evacuation.webp" },
              { id: "i4", labelKey: `${R}.b5.micro.cls.i4`, correctCategoryId: "exploration", imageUrl: "/images/classify-explore-archaeology.webp" },
              { id: "i5", labelKey: `${R}.b5.micro.cls.i5`, correctCategoryId: "simulation", imageUrl: "/images/classify-sim-engine-maintenance.webp" },
            ],
          },
        ],
      },
    ],
  },
  "classroom-implementation": {
    moduleSlug: "classroom-implementation",
    videoSlideId: "video-intro-m3",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — Preparing Your Space                               */
      /* ============================================================ */
      {
        blockId: "room-setup-safety",
        titleKey: `${S}.b1.title`,
        iconEmoji: "🏫",
        exercise: {
          type: "classroomPlanner",
          id: "b1-planner",
          instructionKey: `${S}.b1.exercise.instruction`,
          gridCols: 6,
          gridRows: 5,
          items: [
            { id: "teacher", labelKey: `${S}.b1.exercise.items.teacher`, emoji: "🧑‍🏫", width: 1, height: 1 },
            { id: "vrStation1", labelKey: `${S}.b1.exercise.items.vrStation1`, emoji: "🥽", width: 1, height: 1 },
            { id: "vrStation2", labelKey: `${S}.b1.exercise.items.vrStation2`, emoji: "🥽", width: 1, height: 1 },
            { id: "observation", labelKey: `${S}.b1.exercise.items.observation`, emoji: "👀", width: 1, height: 1 },
            { id: "storage", labelKey: `${S}.b1.exercise.items.storage`, emoji: "🗄️", width: 1, height: 1 },
            { id: "screen", labelKey: `${S}.b1.exercise.items.screen`, emoji: "📺", width: 2, height: 1 },
          ],
          zones: [
            { id: "front", labelKey: `${S}.b1.exercise.zones.front`, requiredItemIds: ["teacher", "screen"], col: 0, row: 1, width: 6, height: 1 },
            { id: "vrZone", labelKey: `${S}.b1.exercise.zones.vrZone`, requiredItemIds: ["vrStation1", "vrStation2"], col: 2, row: 3, width: 4, height: 2 },
            { id: "sideZone", labelKey: `${S}.b1.exercise.zones.sideZone`, requiredItemIds: ["observation", "storage"], col: 1, row: 3, width: 1, height: 2 },
          ],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${S}.b1.scenario.context`,
          questionKey: `${S}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${S}.b1.scenario.choices.a`, feedbackKey: `${S}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${S}.b1.scenario.choices.b`, feedbackKey: `${S}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${S}.b1.scenario.choices.c`, feedbackKey: `${S}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${S}.b1.concepts.c1.context`,
            questionKey: `${S}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${S}.b1.concepts.c1.choices.a`, feedbackKey: `${S}.b1.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${S}.b1.concepts.c1.choices.b`, feedbackKey: `${S}.b1.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${S}.b1.concepts.c1.choices.c`, feedbackKey: `${S}.b1.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${S}.b1.concepts.c2.context`,
            questionKey: `${S}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${S}.b1.concepts.c2.choices.a`, feedbackKey: `${S}.b1.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${S}.b1.concepts.c2.choices.b`, feedbackKey: `${S}.b1.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${S}.b1.concepts.c2.choices.c`, feedbackKey: `${S}.b1.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "room-setup-safety",
        microChecks: [
          {
            type: "classify",
            id: "b1-cls",
            instructionKey: `${S}.b1.micro.cls.instruction`,
            categories: [
              { id: "essential", labelKey: `${S}.b1.micro.cls.cat.essential` },
              { id: "optional", labelKey: `${S}.b1.micro.cls.cat.optional` },
            ],
            items: [
              { id: "i1", labelKey: `${S}.b1.micro.cls.i1`, correctCategoryId: "essential" },
              { id: "i2", labelKey: `${S}.b1.micro.cls.i2`, correctCategoryId: "optional" },
              { id: "i3", labelKey: `${S}.b1.micro.cls.i3`, correctCategoryId: "essential" },
              { id: "i4", labelKey: `${S}.b1.micro.cls.i4`, correctCategoryId: "optional" },
              { id: "i5", labelKey: `${S}.b1.micro.cls.i5`, correctCategoryId: "essential" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — Briefing Students                                  */
      /* ============================================================ */
      {
        blockId: "student-briefing",
        titleKey: `${S}.b2.title`,
        iconEmoji: "🗣️",
        exercise: {
          type: "ordering",
          id: "b2-order",
          instructionKey: `${S}.b2.exercise.instruction`,
          scaleStartKey: `${S}.b2.exercise.scaleStart`,
          scaleEndKey: `${S}.b2.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${S}.b2.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${S}.b2.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${S}.b2.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${S}.b2.exercise.i4`, correctPosition: 3 },
            { id: "i5", labelKey: `${S}.b2.exercise.i5`, correctPosition: 4 },
          ],
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${S}.b2.scenario.context`,
          questionKey: `${S}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${S}.b2.scenario.choices.a`, feedbackKey: `${S}.b2.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${S}.b2.scenario.choices.b`, feedbackKey: `${S}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${S}.b2.scenario.choices.c`, feedbackKey: `${S}.b2.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${S}.b2.concepts.c1.context`,
            questionKey: `${S}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${S}.b2.concepts.c1.choices.a`, feedbackKey: `${S}.b2.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${S}.b2.concepts.c1.choices.b`, feedbackKey: `${S}.b2.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${S}.b2.concepts.c1.choices.c`, feedbackKey: `${S}.b2.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${S}.b2.concepts.c2.context`,
            questionKey: `${S}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${S}.b2.concepts.c2.choices.a`, feedbackKey: `${S}.b2.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${S}.b2.concepts.c2.choices.b`, feedbackKey: `${S}.b2.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${S}.b2.concepts.c2.choices.c`, feedbackKey: `${S}.b2.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "student-briefing",
        microChecks: [
          {
            type: "trueFalse",
            id: "b2-tf",
            statements: [
              { id: "s1", statementKey: `${S}.b2.micro.tf.s1.statement`, isTrue: true, explanationKey: `${S}.b2.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${S}.b2.micro.tf.s2.statement`, isTrue: false, explanationKey: `${S}.b2.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${S}.b2.micro.tf.s3.statement`, isTrue: true, explanationKey: `${S}.b2.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — Device Readiness                                   */
      /* ============================================================ */
      {
        blockId: "device-readiness",
        titleKey: `${S}.b3.title`,
        iconEmoji: "📱",
        exercise: {
          type: "triageSort",
          id: "b3-triage",
          instructionKey: `${S}.b3.exercise.instruction`,
          categories: [
            { id: "weekly", labelKey: `${S}.b3.exercise.cat.weekly`, color: "green" },
            { id: "nightBefore", labelKey: `${S}.b3.exercise.cat.nightBefore`, color: "amber" },
            { id: "justBefore", labelKey: `${S}.b3.exercise.cat.justBefore`, color: "red" },
          ],
          items: [
            { id: "i1", labelKey: `${S}.b3.exercise.i1`, correctCategoryId: "weekly" },
            { id: "i2", labelKey: `${S}.b3.exercise.i2`, correctCategoryId: "nightBefore" },
            { id: "i3", labelKey: `${S}.b3.exercise.i3`, correctCategoryId: "nightBefore" },
            { id: "i4", labelKey: `${S}.b3.exercise.i4`, correctCategoryId: "justBefore" },
            { id: "i5", labelKey: `${S}.b3.exercise.i5`, correctCategoryId: "justBefore" },
            { id: "i6", labelKey: `${S}.b3.exercise.i6`, correctCategoryId: "weekly" },
            { id: "i7", labelKey: `${S}.b3.exercise.i7`, correctCategoryId: "nightBefore" },
            { id: "i8", labelKey: `${S}.b3.exercise.i8`, correctCategoryId: "justBefore" },
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${S}.b3.scenario.context`,
          questionKey: `${S}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${S}.b3.scenario.choices.a`, feedbackKey: `${S}.b3.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${S}.b3.scenario.choices.b`, feedbackKey: `${S}.b3.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${S}.b3.scenario.choices.c`, feedbackKey: `${S}.b3.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${S}.b3.concepts.c1.context`,
            questionKey: `${S}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${S}.b3.concepts.c1.choices.a`, feedbackKey: `${S}.b3.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${S}.b3.concepts.c1.choices.b`, feedbackKey: `${S}.b3.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${S}.b3.concepts.c1.choices.c`, feedbackKey: `${S}.b3.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${S}.b3.concepts.c2.context`,
            questionKey: `${S}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${S}.b3.concepts.c2.choices.a`, feedbackKey: `${S}.b3.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${S}.b3.concepts.c2.choices.b`, feedbackKey: `${S}.b3.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${S}.b3.concepts.c2.choices.c`, feedbackKey: `${S}.b3.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "device-readiness",
        microChecks: [
          {
            type: "trueFalse",
            id: "b3-tf",
            statements: [
              { id: "s1", statementKey: `${S}.b3.micro.tf.s1.statement`, isTrue: true, explanationKey: `${S}.b3.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${S}.b3.micro.tf.s2.statement`, isTrue: false, explanationKey: `${S}.b3.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${S}.b3.micro.tf.s3.statement`, isTrue: true, explanationKey: `${S}.b3.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — Running the Session                                */
      /* ============================================================ */
      {
        blockId: "running-the-session",
        titleKey: `${S}.b4.title`,
        iconEmoji: "🎮",
        exercise: {
          type: "decisionTree",
          id: "b4-dtree",
          instructionKey: `${S}.b4.exercise.instruction`,
          scenarioKey: `${S}.b4.exercise.scenario`,
          startNodeId: "n1",
          nodes: [
            {
              id: "n1", promptKey: `${S}.b4.exercise.n1.prompt`,
              options: [
                { id: "a", labelKey: `${S}.b4.exercise.n1.a.label`, nextNodeId: "n2", feedbackKey: `${S}.b4.exercise.n1.a.feedback`, quality: "good" },
                { id: "b", labelKey: `${S}.b4.exercise.n1.b.label`, nextNodeId: "n2", feedbackKey: `${S}.b4.exercise.n1.b.feedback`, quality: "poor" },
                { id: "c", labelKey: `${S}.b4.exercise.n1.c.label`, nextNodeId: "n2", feedbackKey: `${S}.b4.exercise.n1.c.feedback`, quality: "okay" },
              ],
            },
            {
              id: "n2", promptKey: `${S}.b4.exercise.n2.prompt`,
              options: [
                { id: "a", labelKey: `${S}.b4.exercise.n2.a.label`, nextNodeId: "n3", feedbackKey: `${S}.b4.exercise.n2.a.feedback`, quality: "poor" },
                { id: "b", labelKey: `${S}.b4.exercise.n2.b.label`, nextNodeId: "n3", feedbackKey: `${S}.b4.exercise.n2.b.feedback`, quality: "good" },
                { id: "c", labelKey: `${S}.b4.exercise.n2.c.label`, nextNodeId: "n3", feedbackKey: `${S}.b4.exercise.n2.c.feedback`, quality: "okay" },
              ],
            },
            {
              id: "n3", promptKey: `${S}.b4.exercise.n3.prompt`, isEnd: true,
              endFeedbackKey: `${S}.b4.exercise.n3.endFeedback`,
              endIsGood: true,
              options: [],
            },
          ],
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${S}.b4.scenario.context`,
          questionKey: `${S}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${S}.b4.scenario.choices.a`, feedbackKey: `${S}.b4.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${S}.b4.scenario.choices.b`, feedbackKey: `${S}.b4.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${S}.b4.scenario.choices.c`, feedbackKey: `${S}.b4.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${S}.b4.concepts.c1.context`,
            questionKey: `${S}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${S}.b4.concepts.c1.choices.a`, feedbackKey: `${S}.b4.concepts.c1.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${S}.b4.concepts.c1.choices.b`, feedbackKey: `${S}.b4.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${S}.b4.concepts.c1.choices.c`, feedbackKey: `${S}.b4.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${S}.b4.concepts.c2.context`,
            questionKey: `${S}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${S}.b4.concepts.c2.choices.a`, feedbackKey: `${S}.b4.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${S}.b4.concepts.c2.choices.b`, feedbackKey: `${S}.b4.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${S}.b4.concepts.c2.choices.c`, feedbackKey: `${S}.b4.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "running-the-session",
        microChecks: [
          {
            type: "classify",
            id: "b4-cls",
            instructionKey: `${S}.b4.micro.cls.instruction`,
            categories: [
              { id: "student", labelKey: `${S}.b4.micro.cls.cat.student` },
              { id: "instructor", labelKey: `${S}.b4.micro.cls.cat.instructor` },
            ],
            items: [
              { id: "i1", labelKey: `${S}.b4.micro.cls.i1`, correctCategoryId: "student" },
              { id: "i2", labelKey: `${S}.b4.micro.cls.i2`, correctCategoryId: "instructor" },
              { id: "i3", labelKey: `${S}.b4.micro.cls.i3`, correctCategoryId: "student" },
              { id: "i4", labelKey: `${S}.b4.micro.cls.i4`, correctCategoryId: "instructor" },
              { id: "i5", labelKey: `${S}.b4.micro.cls.i5`, correctCategoryId: "student" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 5 — Rotation & Time Management                        */
      /* ============================================================ */
      {
        blockId: "rotation-time",
        titleKey: `${S}.b5.title`,
        iconEmoji: "🔄",
        exercise: {
          type: "resourceAllocation",
          id: "b5-resource",
          instructionKey: `${S}.b5.exercise.instruction`,
          scenarioKey: `${S}.b5.exercise.scenario`,
          resources: [
            { id: "briefing", labelKey: `${S}.b5.exercise.res.briefing`, min: 1, max: 15, unit: "min", idealMin: 3, idealMax: 5 },
            { id: "rotation1", labelKey: `${S}.b5.exercise.res.rotation1`, min: 5, max: 20, unit: "min", idealMin: 10, idealMax: 12 },
            { id: "rotation2", labelKey: `${S}.b5.exercise.res.rotation2`, min: 5, max: 20, unit: "min", idealMin: 10, idealMax: 12 },
            { id: "rotation3", labelKey: `${S}.b5.exercise.res.rotation3`, min: 5, max: 20, unit: "min", idealMin: 10, idealMax: 12 },
            { id: "transitions", labelKey: `${S}.b5.exercise.res.transitions`, min: 2, max: 10, unit: "min", idealMin: 4, idealMax: 6 },
            { id: "wrapUp", labelKey: `${S}.b5.exercise.res.wrapUp`, min: 2, max: 10, unit: "min", idealMin: 3, idealMax: 5 },
          ],
          totalBudget: 50,
          totalBudgetUnit: "min",
        },
        scenario: {
          id: "b5-s0",
          contextKey: `${S}.b5.scenario.context`,
          questionKey: `${S}.b5.scenario.question`,
          choices: [
            { id: "a", labelKey: `${S}.b5.scenario.choices.a`, feedbackKey: `${S}.b5.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${S}.b5.scenario.choices.b`, feedbackKey: `${S}.b5.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${S}.b5.scenario.choices.c`, feedbackKey: `${S}.b5.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b5-c1",
            contextKey: `${S}.b5.concepts.c1.context`,
            questionKey: `${S}.b5.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${S}.b5.concepts.c1.choices.a`, feedbackKey: `${S}.b5.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${S}.b5.concepts.c1.choices.b`, feedbackKey: `${S}.b5.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${S}.b5.concepts.c1.choices.c`, feedbackKey: `${S}.b5.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b5-c2",
            contextKey: `${S}.b5.concepts.c2.context`,
            questionKey: `${S}.b5.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${S}.b5.concepts.c2.choices.a`, feedbackKey: `${S}.b5.concepts.c2.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${S}.b5.concepts.c2.choices.b`, feedbackKey: `${S}.b5.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${S}.b5.concepts.c2.choices.c`, feedbackKey: `${S}.b5.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "rotation-time",
        microChecks: [
          {
            type: "trueFalse",
            id: "b5-tf",
            statements: [
              { id: "s1", statementKey: `${S}.b5.micro.tf.s1.statement`, isTrue: true, explanationKey: `${S}.b5.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${S}.b5.micro.tf.s2.statement`, isTrue: false, explanationKey: `${S}.b5.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${S}.b5.micro.tf.s3.statement`, isTrue: true, explanationKey: `${S}.b5.micro.tf.s3.explanation` },
            ],
          },
        ],
      },
    ],
  },
  "safety-wellbeing-accessibility": {
    moduleSlug: "safety-wellbeing-accessibility",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — Physical Safety & Space                            */
      /* ============================================================ */
      {
        blockId: "physical-safety-space",
        titleKey: `${T}.b1.title`,
        iconEmoji: "🛡️",
        exercise: {
          type: "matching",
          id: "b1-match",
          instructionKey: `${T}.b1.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${T}.b1.exercise.p1.term`, rightKey: `${T}.b1.exercise.p1.def` },
            { id: "p2", leftKey: `${T}.b1.exercise.p2.term`, rightKey: `${T}.b1.exercise.p2.def` },
            { id: "p3", leftKey: `${T}.b1.exercise.p3.term`, rightKey: `${T}.b1.exercise.p3.def` },
            { id: "p4", leftKey: `${T}.b1.exercise.p4.term`, rightKey: `${T}.b1.exercise.p4.def` },
          ],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${T}.b1.scenario.context`,
          questionKey: `${T}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${T}.b1.scenario.choices.a`, feedbackKey: `${T}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${T}.b1.scenario.choices.b`, feedbackKey: `${T}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${T}.b1.scenario.choices.c`, feedbackKey: `${T}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${T}.b1.concepts.c1.context`,
            questionKey: `${T}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${T}.b1.concepts.c1.choices.a`, feedbackKey: `${T}.b1.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${T}.b1.concepts.c1.choices.b`, feedbackKey: `${T}.b1.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${T}.b1.concepts.c1.choices.c`, feedbackKey: `${T}.b1.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${T}.b1.concepts.c2.context`,
            questionKey: `${T}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${T}.b1.concepts.c2.choices.a`, feedbackKey: `${T}.b1.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${T}.b1.concepts.c2.choices.b`, feedbackKey: `${T}.b1.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${T}.b1.concepts.c2.choices.c`, feedbackKey: `${T}.b1.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "physical-safety-space",
        microChecks: [
          {
            type: "classify",
            id: "b1-cls",
            instructionKey: `${T}.b1.micro.cls.instruction`,
            categories: [
              { id: "seated", labelKey: `${T}.b1.micro.cls.cat.seated` },
              { id: "standing", labelKey: `${T}.b1.micro.cls.cat.standing` },
              { id: "roomscale", labelKey: `${T}.b1.micro.cls.cat.roomscale` },
            ],
            items: [
              { id: "i1", labelKey: `${T}.b1.micro.cls.i1`, correctCategoryId: "seated", imageUrl: "/images/m4-space-seated.webp" },
              { id: "i2", labelKey: `${T}.b1.micro.cls.i2`, correctCategoryId: "roomscale", imageUrl: "/images/m4-space-roomscale.webp" },
              { id: "i3", labelKey: `${T}.b1.micro.cls.i3`, correctCategoryId: "standing", imageUrl: "/images/m4-space-standing.webp" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — Supervision & Boundaries                           */
      /* ============================================================ */
      {
        blockId: "supervision-boundaries",
        titleKey: `${T}.b2.title`,
        iconEmoji: "👁️",
        exercise: {
          type: "mythBusters",
          id: "b2-myth",
          instructionKey: `${T}.b2.exercise.instruction`,
          statements: [
            { id: "s1", statementKey: `${T}.b2.exercise.s1.statement`, isTrue: false, explanationKey: `${T}.b2.exercise.s1.explanation` },
            { id: "s2", statementKey: `${T}.b2.exercise.s2.statement`, isTrue: true, explanationKey: `${T}.b2.exercise.s2.explanation` },
            { id: "s3", statementKey: `${T}.b2.exercise.s3.statement`, isTrue: false, explanationKey: `${T}.b2.exercise.s3.explanation` },
            { id: "s4", statementKey: `${T}.b2.exercise.s4.statement`, isTrue: true, explanationKey: `${T}.b2.exercise.s4.explanation` },
            { id: "s5", statementKey: `${T}.b2.exercise.s5.statement`, isTrue: false, explanationKey: `${T}.b2.exercise.s5.explanation` },
          ],
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${T}.b2.scenario.context`,
          questionKey: `${T}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${T}.b2.scenario.choices.a`, feedbackKey: `${T}.b2.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${T}.b2.scenario.choices.b`, feedbackKey: `${T}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${T}.b2.scenario.choices.c`, feedbackKey: `${T}.b2.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${T}.b2.concepts.c1.context`,
            questionKey: `${T}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${T}.b2.concepts.c1.choices.a`, feedbackKey: `${T}.b2.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${T}.b2.concepts.c1.choices.b`, feedbackKey: `${T}.b2.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${T}.b2.concepts.c1.choices.c`, feedbackKey: `${T}.b2.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${T}.b2.concepts.c2.context`,
            questionKey: `${T}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${T}.b2.concepts.c2.choices.a`, feedbackKey: `${T}.b2.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${T}.b2.concepts.c2.choices.b`, feedbackKey: `${T}.b2.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${T}.b2.concepts.c2.choices.c`, feedbackKey: `${T}.b2.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "supervision-boundaries",
        microChecks: [
          {
            type: "trueFalse",
            id: "b2-tf",
            statements: [
              { id: "s1", statementKey: `${T}.b2.micro.tf.s1.statement`, isTrue: true, explanationKey: `${T}.b2.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${T}.b2.micro.tf.s2.statement`, isTrue: false, explanationKey: `${T}.b2.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${T}.b2.micro.tf.s3.statement`, isTrue: true, explanationKey: `${T}.b2.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — Motion Sickness & Response Protocol                */
      /* ============================================================ */
      {
        blockId: "motion-sickness-response",
        titleKey: `${T}.b3.title`,
        iconEmoji: "🤢",
        exercise: {
          type: "ordering",
          id: "b3-order",
          instructionKey: `${T}.b3.exercise.instruction`,
          scaleStartKey: `${T}.b3.exercise.scaleStart`,
          scaleEndKey: `${T}.b3.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${T}.b3.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${T}.b3.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${T}.b3.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${T}.b3.exercise.i4`, correctPosition: 3 },
            { id: "i5", labelKey: `${T}.b3.exercise.i5`, correctPosition: 4 },
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${T}.b3.scenario.context`,
          questionKey: `${T}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${T}.b3.scenario.choices.a`, feedbackKey: `${T}.b3.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${T}.b3.scenario.choices.b`, feedbackKey: `${T}.b3.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${T}.b3.scenario.choices.c`, feedbackKey: `${T}.b3.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${T}.b3.concepts.c1.context`,
            questionKey: `${T}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${T}.b3.concepts.c1.choices.a`, feedbackKey: `${T}.b3.concepts.c1.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${T}.b3.concepts.c1.choices.b`, feedbackKey: `${T}.b3.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${T}.b3.concepts.c1.choices.c`, feedbackKey: `${T}.b3.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${T}.b3.concepts.c2.context`,
            questionKey: `${T}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${T}.b3.concepts.c2.choices.a`, feedbackKey: `${T}.b3.concepts.c2.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${T}.b3.concepts.c2.choices.b`, feedbackKey: `${T}.b3.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${T}.b3.concepts.c2.choices.c`, feedbackKey: `${T}.b3.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "motion-sickness-response",
        microChecks: [
          {
            type: "classify",
            id: "b3-cls",
            instructionKey: `${T}.b3.micro.cls.instruction`,
            categories: [
              { id: "prevention", labelKey: `${T}.b3.micro.cls.cat.prevention` },
              { id: "response", labelKey: `${T}.b3.micro.cls.cat.response` },
            ],
            items: [
              { id: "i1", labelKey: `${T}.b3.micro.cls.i1`, correctCategoryId: "prevention", imageUrl: "/images/m4-prevention-short-sessions.webp" },
              { id: "i2", labelKey: `${T}.b3.micro.cls.i2`, correctCategoryId: "response", imageUrl: "/images/m4-response-remove-headset.webp" },
              { id: "i3", labelKey: `${T}.b3.micro.cls.i3`, correctCategoryId: "prevention", imageUrl: "/images/m4-prevention-seated-mode.webp" },
              { id: "i4", labelKey: `${T}.b3.micro.cls.i4`, correctCategoryId: "response", imageUrl: "/images/m4-response-sit-rest.webp" },
              { id: "i5", labelKey: `${T}.b3.micro.cls.i5`, correctCategoryId: "prevention" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — Hygiene & Equipment Care                           */
      /* ============================================================ */
      {
        blockId: "hygiene-equipment",
        titleKey: `${T}.b4.title`,
        iconEmoji: "🧼",
        exercise: {
          type: "triageSort",
          id: "b4-triage",
          instructionKey: `${T}.b4.exercise.instruction`,
          categories: [
            { id: "between", labelKey: `${T}.b4.exercise.cat.between`, color: "green" },
            { id: "endOfDay", labelKey: `${T}.b4.exercise.cat.endOfDay`, color: "amber" },
            { id: "never", labelKey: `${T}.b4.exercise.cat.never`, color: "red" },
          ],
          items: [
            { id: "i1", labelKey: `${T}.b4.exercise.i1`, correctCategoryId: "between" },
            { id: "i2", labelKey: `${T}.b4.exercise.i2`, correctCategoryId: "endOfDay" },
            { id: "i3", labelKey: `${T}.b4.exercise.i3`, correctCategoryId: "never" },
            { id: "i4", labelKey: `${T}.b4.exercise.i4`, correctCategoryId: "between" },
            { id: "i5", labelKey: `${T}.b4.exercise.i5`, correctCategoryId: "endOfDay" },
            { id: "i6", labelKey: `${T}.b4.exercise.i6`, correctCategoryId: "never" },
            { id: "i7", labelKey: `${T}.b4.exercise.i7`, correctCategoryId: "between" },
            { id: "i8", labelKey: `${T}.b4.exercise.i8`, correctCategoryId: "endOfDay" },
          ],
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${T}.b4.scenario.context`,
          questionKey: `${T}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${T}.b4.scenario.choices.a`, feedbackKey: `${T}.b4.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${T}.b4.scenario.choices.b`, feedbackKey: `${T}.b4.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${T}.b4.scenario.choices.c`, feedbackKey: `${T}.b4.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${T}.b4.concepts.c1.context`,
            questionKey: `${T}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${T}.b4.concepts.c1.choices.a`, feedbackKey: `${T}.b4.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${T}.b4.concepts.c1.choices.b`, feedbackKey: `${T}.b4.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${T}.b4.concepts.c1.choices.c`, feedbackKey: `${T}.b4.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${T}.b4.concepts.c2.context`,
            questionKey: `${T}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${T}.b4.concepts.c2.choices.a`, feedbackKey: `${T}.b4.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${T}.b4.concepts.c2.choices.b`, feedbackKey: `${T}.b4.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${T}.b4.concepts.c2.choices.c`, feedbackKey: `${T}.b4.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "hygiene-equipment",
        microChecks: [
          {
            type: "trueFalse",
            id: "b4-tf",
            statements: [
              { id: "s1", statementKey: `${T}.b4.micro.tf.s1.statement`, isTrue: false, explanationKey: `${T}.b4.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${T}.b4.micro.tf.s2.statement`, isTrue: true, explanationKey: `${T}.b4.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${T}.b4.micro.tf.s3.statement`, isTrue: true, explanationKey: `${T}.b4.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 5 — Accessibility & Inclusion                          */
      /* ============================================================ */
      {
        blockId: "accessibility-inclusion",
        titleKey: `${T}.b5.title`,
        iconEmoji: "🤝",
        exercise: {
          type: "decisionTree",
          id: "b5-dtree",
          instructionKey: `${T}.b5.exercise.instruction`,
          scenarioKey: `${T}.b5.exercise.scenario`,
          scenarioImageUrl: "/images/m4-observer-role.webp",
          startNodeId: "n1",
          nodes: [
            {
              id: "n1", promptKey: `${T}.b5.exercise.n1.prompt`,
              options: [
                { id: "a", labelKey: `${T}.b5.exercise.n1.a.label`, nextNodeId: "n2", feedbackKey: `${T}.b5.exercise.n1.a.feedback`, quality: "good" },
                { id: "b", labelKey: `${T}.b5.exercise.n1.b.label`, nextNodeId: "n2", feedbackKey: `${T}.b5.exercise.n1.b.feedback`, quality: "poor" },
                { id: "c", labelKey: `${T}.b5.exercise.n1.c.label`, nextNodeId: "n2", feedbackKey: `${T}.b5.exercise.n1.c.feedback`, quality: "poor" },
              ],
            },
            {
              id: "n2", promptKey: `${T}.b5.exercise.n2.prompt`,
              options: [
                { id: "a", labelKey: `${T}.b5.exercise.n2.a.label`, nextNodeId: "n3", feedbackKey: `${T}.b5.exercise.n2.a.feedback`, quality: "poor" },
                { id: "b", labelKey: `${T}.b5.exercise.n2.b.label`, nextNodeId: "n3", feedbackKey: `${T}.b5.exercise.n2.b.feedback`, quality: "good" },
                { id: "c", labelKey: `${T}.b5.exercise.n2.c.label`, nextNodeId: "n3", feedbackKey: `${T}.b5.exercise.n2.c.feedback`, quality: "okay" },
              ],
            },
            {
              id: "n3", promptKey: `${T}.b5.exercise.n3.prompt`, isEnd: true,
              endFeedbackKey: `${T}.b5.exercise.n3.endFeedback`,
              endIsGood: true,
              options: [],
            },
          ],
        },
        scenario: {
          id: "b5-s0",
          contextKey: `${T}.b5.scenario.context`,
          questionKey: `${T}.b5.scenario.question`,
          choices: [
            { id: "a", labelKey: `${T}.b5.scenario.choices.a`, feedbackKey: `${T}.b5.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${T}.b5.scenario.choices.b`, feedbackKey: `${T}.b5.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${T}.b5.scenario.choices.c`, feedbackKey: `${T}.b5.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b5-c1",
            contextKey: `${T}.b5.concepts.c1.context`,
            questionKey: `${T}.b5.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${T}.b5.concepts.c1.choices.a`, feedbackKey: `${T}.b5.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${T}.b5.concepts.c1.choices.b`, feedbackKey: `${T}.b5.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${T}.b5.concepts.c1.choices.c`, feedbackKey: `${T}.b5.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b5-c2",
            contextKey: `${T}.b5.concepts.c2.context`,
            questionKey: `${T}.b5.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${T}.b5.concepts.c2.choices.a`, feedbackKey: `${T}.b5.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${T}.b5.concepts.c2.choices.b`, feedbackKey: `${T}.b5.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${T}.b5.concepts.c2.choices.c`, feedbackKey: `${T}.b5.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "accessibility-inclusion",
        microChecks: [
          {
            type: "classify",
            id: "b5-cls",
            instructionKey: `${T}.b5.micro.cls.instruction`,
            categories: [
              { id: "vrUser", labelKey: `${T}.b5.micro.cls.cat.vrUser` },
              { id: "observer", labelKey: `${T}.b5.micro.cls.cat.observer` },
            ],
            items: [
              { id: "i1", labelKey: `${T}.b5.micro.cls.i1`, correctCategoryId: "vrUser" },
              { id: "i2", labelKey: `${T}.b5.micro.cls.i2`, correctCategoryId: "observer" },
              { id: "i3", labelKey: `${T}.b5.micro.cls.i3`, correctCategoryId: "observer" },
              { id: "i4", labelKey: `${T}.b5.micro.cls.i4`, correctCategoryId: "vrUser" },
              { id: "i5", labelKey: `${T}.b5.micro.cls.i5`, correctCategoryId: "observer" },
            ],
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /*  MODULE 5 — Briefing and Debriefing                                */
  /* ================================================================== */
  "briefing-and-debriefing": {
    moduleSlug: "briefing-and-debriefing",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — Briefing Fundamentals & O-R-T-T                    */
      /* ============================================================ */
      {
        blockId: "briefing-essentials",
        titleKey: `${U}.b1.title`,
        iconEmoji: "🗣️",
        exercise: {
          type: "ordering",
          id: "b1-order",
          instructionKey: `${U}.b1.exercise.instruction`,
          scaleStartKey: `${U}.b1.exercise.scaleStart`,
          scaleEndKey: `${U}.b1.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${U}.b1.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${U}.b1.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${U}.b1.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${U}.b1.exercise.i4`, correctPosition: 3 },
          ],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${U}.b1.scenario.context`,
          questionKey: `${U}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${U}.b1.scenario.choices.a`, feedbackKey: `${U}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${U}.b1.scenario.choices.b`, feedbackKey: `${U}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${U}.b1.scenario.choices.c`, feedbackKey: `${U}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${U}.b1.concepts.c1.context`,
            questionKey: `${U}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${U}.b1.concepts.c1.choices.a`, feedbackKey: `${U}.b1.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${U}.b1.concepts.c1.choices.b`, feedbackKey: `${U}.b1.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${U}.b1.concepts.c1.choices.c`, feedbackKey: `${U}.b1.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${U}.b1.concepts.c2.context`,
            questionKey: `${U}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${U}.b1.concepts.c2.choices.a`, feedbackKey: `${U}.b1.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${U}.b1.concepts.c2.choices.b`, feedbackKey: `${U}.b1.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${U}.b1.concepts.c2.choices.c`, feedbackKey: `${U}.b1.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "briefing-essentials",
        microChecks: [
          {
            type: "trueFalse",
            id: "b1-tf",
            statements: [
              { id: "s1", statementKey: `${U}.b1.micro.tf.s1.statement`, isTrue: true, explanationKey: `${U}.b1.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${U}.b1.micro.tf.s2.statement`, isTrue: false, explanationKey: `${U}.b1.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${U}.b1.micro.tf.s3.statement`, isTrue: true, explanationKey: `${U}.b1.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — What to Explain (and What Not to)                  */
      /* ============================================================ */
      {
        blockId: "what-to-explain",
        titleKey: `${U}.b2.title`,
        iconEmoji: "🎯",
        exercise: {
          type: "triageSort",
          id: "b2-triage",
          instructionKey: `${U}.b2.exercise.instruction`,
          categories: [
            { id: "mustExplain", labelKey: `${U}.b2.exercise.cat.mustExplain`, color: "green" },
            { id: "letDiscover", labelKey: `${U}.b2.exercise.cat.letDiscover`, color: "amber" },
            { id: "neverMention", labelKey: `${U}.b2.exercise.cat.neverMention`, color: "red" },
          ],
          items: [
            { id: "i1", labelKey: `${U}.b2.exercise.i1`, correctCategoryId: "mustExplain" },
            { id: "i2", labelKey: `${U}.b2.exercise.i2`, correctCategoryId: "mustExplain" },
            { id: "i3", labelKey: `${U}.b2.exercise.i3`, correctCategoryId: "mustExplain" },
            { id: "i4", labelKey: `${U}.b2.exercise.i4`, correctCategoryId: "letDiscover" },
            { id: "i5", labelKey: `${U}.b2.exercise.i5`, correctCategoryId: "letDiscover" },
            { id: "i6", labelKey: `${U}.b2.exercise.i6`, correctCategoryId: "neverMention" },
            { id: "i7", labelKey: `${U}.b2.exercise.i7`, correctCategoryId: "neverMention" },
            { id: "i8", labelKey: `${U}.b2.exercise.i8`, correctCategoryId: "mustExplain" },
          ],
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${U}.b2.scenario.context`,
          questionKey: `${U}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${U}.b2.scenario.choices.a`, feedbackKey: `${U}.b2.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${U}.b2.scenario.choices.b`, feedbackKey: `${U}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${U}.b2.scenario.choices.c`, feedbackKey: `${U}.b2.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${U}.b2.concepts.c1.context`,
            questionKey: `${U}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${U}.b2.concepts.c1.choices.a`, feedbackKey: `${U}.b2.concepts.c1.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${U}.b2.concepts.c1.choices.b`, feedbackKey: `${U}.b2.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${U}.b2.concepts.c1.choices.c`, feedbackKey: `${U}.b2.concepts.c1.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${U}.b2.concepts.c2.context`,
            questionKey: `${U}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${U}.b2.concepts.c2.choices.a`, feedbackKey: `${U}.b2.concepts.c2.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${U}.b2.concepts.c2.choices.b`, feedbackKey: `${U}.b2.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${U}.b2.concepts.c2.choices.c`, feedbackKey: `${U}.b2.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "what-to-explain",
        microChecks: [
          {
            type: "trueFalse",
            id: "b2-tf",
            statements: [
              { id: "s1", statementKey: `${U}.b2.micro.tf.s1.statement`, isTrue: false, explanationKey: `${U}.b2.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${U}.b2.micro.tf.s2.statement`, isTrue: true, explanationKey: `${U}.b2.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${U}.b2.micro.tf.s3.statement`, isTrue: false, explanationKey: `${U}.b2.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — The 60-Second Briefing                             */
      /* ============================================================ */
      {
        blockId: "sixty-second-briefing",
        titleKey: `${U}.b3.title`,
        iconEmoji: "⏱️",
        exercise: {
          type: "fillGaps",
          id: "b3-fill",
          instructionKey: `${U}.b3.exercise.instruction`,
          templateKey: `${U}.b3.exercise.template`,
          blanks: [
            { id: "blank1", correctWordKey: `${U}.b3.exercise.blank1` },
            { id: "blank2", correctWordKey: `${U}.b3.exercise.blank2` },
            { id: "blank3", correctWordKey: `${U}.b3.exercise.blank3` },
            { id: "blank4", correctWordKey: `${U}.b3.exercise.blank4` },
          ],
          distractorKeys: [
            `${U}.b3.exercise.distractor1`,
            `${U}.b3.exercise.distractor2`,
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${U}.b3.scenario.context`,
          questionKey: `${U}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${U}.b3.scenario.choices.a`, feedbackKey: `${U}.b3.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${U}.b3.scenario.choices.b`, feedbackKey: `${U}.b3.scenario.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
            { id: "c", labelKey: `${U}.b3.scenario.choices.c`, feedbackKey: `${U}.b3.scenario.feedback.c`, feedbackTone: "correct", isCorrect: true },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${U}.b3.concepts.c1.context`,
            questionKey: `${U}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${U}.b3.concepts.c1.choices.a`, feedbackKey: `${U}.b3.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${U}.b3.concepts.c1.choices.b`, feedbackKey: `${U}.b3.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${U}.b3.concepts.c1.choices.c`, feedbackKey: `${U}.b3.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${U}.b3.concepts.c2.context`,
            questionKey: `${U}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${U}.b3.concepts.c2.choices.a`, feedbackKey: `${U}.b3.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${U}.b3.concepts.c2.choices.b`, feedbackKey: `${U}.b3.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${U}.b3.concepts.c2.choices.c`, feedbackKey: `${U}.b3.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "sixty-second-briefing",
        microChecks: [
          {
            type: "classify",
            id: "b3-cls",
            instructionKey: `${U}.b3.micro.cls.instruction`,
            categories: [
              { id: "objective", labelKey: `${U}.b3.micro.cls.cat.objective` },
              { id: "taskRules", labelKey: `${U}.b3.micro.cls.cat.taskRules` },
              { id: "timeStart", labelKey: `${U}.b3.micro.cls.cat.timeStart` },
            ],
            items: [
              { id: "i1", labelKey: `${U}.b3.micro.cls.i1`, correctCategoryId: "objective" },
              { id: "i2", labelKey: `${U}.b3.micro.cls.i2`, correctCategoryId: "taskRules" },
              { id: "i3", labelKey: `${U}.b3.micro.cls.i3`, correctCategoryId: "taskRules" },
              { id: "i4", labelKey: `${U}.b3.micro.cls.i4`, correctCategoryId: "timeStart" },
              { id: "i5", labelKey: `${U}.b3.micro.cls.i5`, correctCategoryId: "objective" },
              { id: "i6", labelKey: `${U}.b3.micro.cls.i6`, correctCategoryId: "timeStart" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — Structured Debriefing (GAS Model)                  */
      /* ============================================================ */
      {
        blockId: "structured-debriefing",
        titleKey: `${U}.b4.title`,
        iconEmoji: "💬",
        exercise: {
          type: "ordering",
          id: "b4-order",
          instructionKey: `${U}.b4.exercise.instruction`,
          scaleStartKey: `${U}.b4.exercise.scaleStart`,
          scaleEndKey: `${U}.b4.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${U}.b4.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${U}.b4.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${U}.b4.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${U}.b4.exercise.i4`, correctPosition: 3 },
            { id: "i5", labelKey: `${U}.b4.exercise.i5`, correctPosition: 4 },
          ],
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${U}.b4.scenario.context`,
          questionKey: `${U}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${U}.b4.scenario.choices.a`, feedbackKey: `${U}.b4.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${U}.b4.scenario.choices.b`, feedbackKey: `${U}.b4.scenario.feedback.b`, feedbackTone: "partial", isCorrect: false },
            { id: "c", labelKey: `${U}.b4.scenario.choices.c`, feedbackKey: `${U}.b4.scenario.feedback.c`, feedbackTone: "correct", isCorrect: true },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${U}.b4.concepts.c1.context`,
            questionKey: `${U}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${U}.b4.concepts.c1.choices.a`, feedbackKey: `${U}.b4.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${U}.b4.concepts.c1.choices.b`, feedbackKey: `${U}.b4.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${U}.b4.concepts.c1.choices.c`, feedbackKey: `${U}.b4.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${U}.b4.concepts.c2.context`,
            questionKey: `${U}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${U}.b4.concepts.c2.choices.a`, feedbackKey: `${U}.b4.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${U}.b4.concepts.c2.choices.b`, feedbackKey: `${U}.b4.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${U}.b4.concepts.c2.choices.c`, feedbackKey: `${U}.b4.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "structured-debriefing",
        microChecks: [
          {
            type: "classify",
            id: "b4-cls",
            instructionKey: `${U}.b4.micro.cls.instruction`,
            categories: [
              { id: "gather", labelKey: `${U}.b4.micro.cls.cat.gather` },
              { id: "analyze", labelKey: `${U}.b4.micro.cls.cat.analyze` },
              { id: "summarize", labelKey: `${U}.b4.micro.cls.cat.summarize` },
            ],
            items: [
              { id: "i1", labelKey: `${U}.b4.micro.cls.i1`, correctCategoryId: "gather" },
              { id: "i2", labelKey: `${U}.b4.micro.cls.i2`, correctCategoryId: "analyze" },
              { id: "i3", labelKey: `${U}.b4.micro.cls.i3`, correctCategoryId: "summarize" },
              { id: "i4", labelKey: `${U}.b4.micro.cls.i4`, correctCategoryId: "gather" },
              { id: "i5", labelKey: `${U}.b4.micro.cls.i5`, correctCategoryId: "analyze" },
              { id: "i6", labelKey: `${U}.b4.micro.cls.i6`, correctCategoryId: "summarize" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 5 — Assessment in VR                                   */
      /* ============================================================ */
      {
        blockId: "assessment-in-vr",
        titleKey: `${U}.b5.title`,
        iconEmoji: "📋",
        exercise: {
          type: "matching",
          id: "b5-match",
          instructionKey: `${U}.b5.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${U}.b5.exercise.p1.term`, rightKey: `${U}.b5.exercise.p1.def` },
            { id: "p2", leftKey: `${U}.b5.exercise.p2.term`, rightKey: `${U}.b5.exercise.p2.def` },
            { id: "p3", leftKey: `${U}.b5.exercise.p3.term`, rightKey: `${U}.b5.exercise.p3.def` },
            { id: "p4", leftKey: `${U}.b5.exercise.p4.term`, rightKey: `${U}.b5.exercise.p4.def` },
          ],
        },
        scenario: {
          id: "b5-s0",
          contextKey: `${U}.b5.scenario.context`,
          questionKey: `${U}.b5.scenario.question`,
          choices: [
            { id: "a", labelKey: `${U}.b5.scenario.choices.a`, feedbackKey: `${U}.b5.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${U}.b5.scenario.choices.b`, feedbackKey: `${U}.b5.scenario.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
            { id: "c", labelKey: `${U}.b5.scenario.choices.c`, feedbackKey: `${U}.b5.scenario.feedback.c`, feedbackTone: "correct", isCorrect: true },
          ],
        },
        conceptScenarios: [
          {
            id: "b5-c1",
            contextKey: `${U}.b5.concepts.c1.context`,
            questionKey: `${U}.b5.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${U}.b5.concepts.c1.choices.a`, feedbackKey: `${U}.b5.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${U}.b5.concepts.c1.choices.b`, feedbackKey: `${U}.b5.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${U}.b5.concepts.c1.choices.c`, feedbackKey: `${U}.b5.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b5-c2",
            contextKey: `${U}.b5.concepts.c2.context`,
            questionKey: `${U}.b5.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${U}.b5.concepts.c2.choices.a`, feedbackKey: `${U}.b5.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${U}.b5.concepts.c2.choices.b`, feedbackKey: `${U}.b5.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${U}.b5.concepts.c2.choices.c`, feedbackKey: `${U}.b5.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "assessment-in-vr",
        microChecks: [
          {
            type: "classify",
            id: "b5-cls",
            instructionKey: `${U}.b5.micro.cls.instruction`,
            categories: [
              { id: "skills", labelKey: `${U}.b5.micro.cls.cat.skills` },
              { id: "decisions", labelKey: `${U}.b5.micro.cls.cat.decisions` },
              { id: "procedures", labelKey: `${U}.b5.micro.cls.cat.procedures` },
              { id: "communication", labelKey: `${U}.b5.micro.cls.cat.communication` },
            ],
            items: [
              { id: "i1", labelKey: `${U}.b5.micro.cls.i1`, correctCategoryId: "skills" },
              { id: "i2", labelKey: `${U}.b5.micro.cls.i2`, correctCategoryId: "decisions" },
              { id: "i3", labelKey: `${U}.b5.micro.cls.i3`, correctCategoryId: "procedures" },
              { id: "i4", labelKey: `${U}.b5.micro.cls.i4`, correctCategoryId: "communication" },
              { id: "i5", labelKey: `${U}.b5.micro.cls.i5`, correctCategoryId: "decisions" },
            ],
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /*  MODULE 6 — Solving Common VR Problems                             */
  /* ================================================================== */
  "solving-common-vr-problems": {
    moduleSlug: "solving-common-vr-problems",
    videoSlideId: "video-intro-m6",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — WiFi Connection Troubleshooting                    */
      /* ============================================================ */
      {
        blockId: "wifi-connection",
        titleKey: `${V}.b1.title`,
        iconEmoji: "📶",
        exercise: {
          type: "troubleshooting",
          id: "b1-troubleshoot",
          instructionKey: `${V}.b1.exercise.instruction`,
          scenarioKey: `${V}.b1.exercise.scenario`,
          scenarioImageUrl: "/images/m6-wifi-diagnostic.webp",
          startNodeId: "n1",
          nodes: [
            {
              id: "n1",
              promptKey: `${V}.b1.exercise.n1.prompt`,
              options: [
                { id: "a", labelKey: `${V}.b1.exercise.n1.a.label`, nextNodeId: "n2", feedbackKey: `${V}.b1.exercise.n1.a.feedback`, isCorrect: true },
                { id: "b", labelKey: `${V}.b1.exercise.n1.b.label`, nextNodeId: null, feedbackKey: `${V}.b1.exercise.n1.b.feedback`, isCorrect: false },
                { id: "c", labelKey: `${V}.b1.exercise.n1.c.label`, nextNodeId: null, feedbackKey: `${V}.b1.exercise.n1.c.feedback`, isCorrect: false },
              ],
            },
            {
              id: "n2",
              promptKey: `${V}.b1.exercise.n2.prompt`,
              options: [
                { id: "a", labelKey: `${V}.b1.exercise.n2.a.label`, nextNodeId: null, feedbackKey: `${V}.b1.exercise.n2.a.feedback`, isCorrect: false },
                { id: "b", labelKey: `${V}.b1.exercise.n2.b.label`, nextNodeId: "n3", feedbackKey: `${V}.b1.exercise.n2.b.feedback`, isCorrect: true },
                { id: "c", labelKey: `${V}.b1.exercise.n2.c.label`, nextNodeId: null, feedbackKey: `${V}.b1.exercise.n2.c.feedback`, isCorrect: false },
              ],
            },
            {
              id: "n3",
              promptKey: `${V}.b1.exercise.n3.prompt`,
              options: [
                { id: "a", labelKey: `${V}.b1.exercise.n3.a.label`, nextNodeId: null, feedbackKey: `${V}.b1.exercise.n3.a.feedback`, isCorrect: true },
                { id: "b", labelKey: `${V}.b1.exercise.n3.b.label`, nextNodeId: null, feedbackKey: `${V}.b1.exercise.n3.b.feedback`, isCorrect: false },
              ],
            },
          ],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${V}.b1.scenario.context`,
          questionKey: `${V}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${V}.b1.scenario.choices.a`, feedbackKey: `${V}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${V}.b1.scenario.choices.b`, feedbackKey: `${V}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${V}.b1.scenario.choices.c`, feedbackKey: `${V}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${V}.b1.concepts.c1.context`,
            questionKey: `${V}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${V}.b1.concepts.c1.choices.a`, feedbackKey: `${V}.b1.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${V}.b1.concepts.c1.choices.b`, feedbackKey: `${V}.b1.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${V}.b1.concepts.c1.choices.c`, feedbackKey: `${V}.b1.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${V}.b1.concepts.c2.context`,
            questionKey: `${V}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${V}.b1.concepts.c2.choices.a`, feedbackKey: `${V}.b1.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${V}.b1.concepts.c2.choices.b`, feedbackKey: `${V}.b1.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${V}.b1.concepts.c2.choices.c`, feedbackKey: `${V}.b1.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "wifi-connection",
        microChecks: [
          {
            type: "trueFalse",
            id: "b1-tf",
            statements: [
              { id: "s1", statementKey: `${V}.b1.micro.tf.s1.statement`, isTrue: true, explanationKey: `${V}.b1.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${V}.b1.micro.tf.s2.statement`, isTrue: false, explanationKey: `${V}.b1.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${V}.b1.micro.tf.s3.statement`, isTrue: true, explanationKey: `${V}.b1.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — Boundary Problems                                  */
      /* ============================================================ */
      {
        blockId: "boundary-guardian-problems",
        titleKey: `${V}.b2.title`,
        iconEmoji: "💡",
        exercise: {
          type: "ordering",
          id: "b2-order",
          instructionKey: `${V}.b2.exercise.instruction`,
          scaleStartKey: `${V}.b2.exercise.scaleStart`,
          scaleEndKey: `${V}.b2.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${V}.b2.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${V}.b2.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${V}.b2.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${V}.b2.exercise.i4`, correctPosition: 3 },
            { id: "i5", labelKey: `${V}.b2.exercise.i5`, correctPosition: 4 },
          ],
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${V}.b2.scenario.context`,
          questionKey: `${V}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${V}.b2.scenario.choices.a`, feedbackKey: `${V}.b2.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${V}.b2.scenario.choices.b`, feedbackKey: `${V}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${V}.b2.scenario.choices.c`, feedbackKey: `${V}.b2.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${V}.b2.concepts.c1.context`,
            questionKey: `${V}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${V}.b2.concepts.c1.choices.a`, feedbackKey: `${V}.b2.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${V}.b2.concepts.c1.choices.b`, feedbackKey: `${V}.b2.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${V}.b2.concepts.c1.choices.c`, feedbackKey: `${V}.b2.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${V}.b2.concepts.c2.context`,
            questionKey: `${V}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${V}.b2.concepts.c2.choices.a`, feedbackKey: `${V}.b2.concepts.c2.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${V}.b2.concepts.c2.choices.b`, feedbackKey: `${V}.b2.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${V}.b2.concepts.c2.choices.c`, feedbackKey: `${V}.b2.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "boundary-guardian-problems",
        microChecks: [
          {
            type: "trueFalse",
            id: "b2-tf",
            statements: [
              { id: "s1", statementKey: `${V}.b2.micro.tf.s1.statement`, isTrue: true, explanationKey: `${V}.b2.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${V}.b2.micro.tf.s2.statement`, isTrue: false, explanationKey: `${V}.b2.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${V}.b2.micro.tf.s3.statement`, isTrue: true, explanationKey: `${V}.b2.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — Headset Won't Turn On                              */
      /* ============================================================ */
      {
        blockId: "headset-not-turning-on",
        titleKey: `${V}.b3.title`,
        iconEmoji: "🔋",
        exercise: {
          type: "decisionTree",
          id: "b3-dtree",
          instructionKey: `${V}.b3.exercise.instruction`,
          scenarioKey: `${V}.b3.exercise.scenario`,
          scenarioImageUrl: "/images/m6-charging-led.webp",
          startNodeId: "n1",
          nodes: [
            {
              id: "n1",
              promptKey: `${V}.b3.exercise.n1.prompt`,
              options: [
                { id: "a", labelKey: `${V}.b3.exercise.n1.a.label`, nextNodeId: "n2", feedbackKey: `${V}.b3.exercise.n1.a.feedback`, quality: "good" },
                { id: "b", labelKey: `${V}.b3.exercise.n1.b.label`, nextNodeId: "n2", feedbackKey: `${V}.b3.exercise.n1.b.feedback`, quality: "okay" },
                { id: "c", labelKey: `${V}.b3.exercise.n1.c.label`, nextNodeId: "n2", feedbackKey: `${V}.b3.exercise.n1.c.feedback`, quality: "poor" },
              ],
            },
            {
              id: "n2",
              promptKey: `${V}.b3.exercise.n2.prompt`,
              options: [
                { id: "a", labelKey: `${V}.b3.exercise.n2.a.label`, nextNodeId: "n3", feedbackKey: `${V}.b3.exercise.n2.a.feedback`, quality: "good" },
                { id: "b", labelKey: `${V}.b3.exercise.n2.b.label`, nextNodeId: "n3", feedbackKey: `${V}.b3.exercise.n2.b.feedback`, quality: "okay" },
                { id: "c", labelKey: `${V}.b3.exercise.n2.c.label`, nextNodeId: "n3", feedbackKey: `${V}.b3.exercise.n2.c.feedback`, quality: "poor" },
              ],
            },
            {
              id: "n3",
              promptKey: `${V}.b3.exercise.n3.prompt`,
              isEnd: true,
              endIsGood: true,
              endFeedbackKey: `${V}.b3.exercise.n3.endFeedback`,
              options: [],
            },
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${V}.b3.scenario.context`,
          questionKey: `${V}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${V}.b3.scenario.choices.a`, feedbackKey: `${V}.b3.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${V}.b3.scenario.choices.b`, feedbackKey: `${V}.b3.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${V}.b3.scenario.choices.c`, feedbackKey: `${V}.b3.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${V}.b3.concepts.c1.context`,
            questionKey: `${V}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${V}.b3.concepts.c1.choices.a`, feedbackKey: `${V}.b3.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${V}.b3.concepts.c1.choices.b`, feedbackKey: `${V}.b3.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${V}.b3.concepts.c1.choices.c`, feedbackKey: `${V}.b3.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${V}.b3.concepts.c2.context`,
            questionKey: `${V}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${V}.b3.concepts.c2.choices.a`, feedbackKey: `${V}.b3.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${V}.b3.concepts.c2.choices.b`, feedbackKey: `${V}.b3.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${V}.b3.concepts.c2.choices.c`, feedbackKey: `${V}.b3.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "headset-not-turning-on",
        microChecks: [
          {
            type: "classify",
            id: "b3-cls",
            instructionKey: `${V}.b3.micro.cls.instruction`,
            categories: [
              { id: "charging", labelKey: `${V}.b3.micro.cls.cat.charging` },
              { id: "fullyCharged", labelKey: `${V}.b3.micro.cls.cat.fullyCharged` },
              { id: "problem", labelKey: `${V}.b3.micro.cls.cat.problem` },
            ],
            items: [
              { id: "i1", labelKey: `${V}.b3.micro.cls.i1`, correctCategoryId: "charging" },
              { id: "i2", labelKey: `${V}.b3.micro.cls.i2`, correctCategoryId: "fullyCharged" },
              { id: "i3", labelKey: `${V}.b3.micro.cls.i3`, correctCategoryId: "problem" },
              { id: "i4", labelKey: `${V}.b3.micro.cls.i4`, correctCategoryId: "charging" },
              { id: "i5", labelKey: `${V}.b3.micro.cls.i5`, correctCategoryId: "problem" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — Casting & Screen Sharing Issues                    */
      /* ============================================================ */
      {
        blockId: "casting-issues",
        titleKey: `${V}.b4.title`,
        iconEmoji: "📺",
        exercise: {
          type: "triageSort",
          id: "b4-triage",
          instructionKey: `${V}.b4.exercise.instruction`,
          categories: [
            { id: "network", labelKey: `${V}.b4.exercise.cat.network`, color: "green" },
            { id: "compatibility", labelKey: `${V}.b4.exercise.cat.compatibility`, color: "amber" },
            { id: "settings", labelKey: `${V}.b4.exercise.cat.settings`, color: "red" },
          ],
          items: [
            { id: "i1", labelKey: `${V}.b4.exercise.i1`, correctCategoryId: "network" },
            { id: "i2", labelKey: `${V}.b4.exercise.i2`, correctCategoryId: "compatibility" },
            { id: "i3", labelKey: `${V}.b4.exercise.i3`, correctCategoryId: "network" },
            { id: "i4", labelKey: `${V}.b4.exercise.i4`, correctCategoryId: "compatibility" },
            { id: "i5", labelKey: `${V}.b4.exercise.i5`, correctCategoryId: "settings" },
            { id: "i6", labelKey: `${V}.b4.exercise.i6`, correctCategoryId: "network" },
            { id: "i7", labelKey: `${V}.b4.exercise.i7`, correctCategoryId: "settings" },
            { id: "i8", labelKey: `${V}.b4.exercise.i8`, correctCategoryId: "compatibility" },
          ],
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${V}.b4.scenario.context`,
          questionKey: `${V}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${V}.b4.scenario.choices.a`, feedbackKey: `${V}.b4.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${V}.b4.scenario.choices.b`, feedbackKey: `${V}.b4.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${V}.b4.scenario.choices.c`, feedbackKey: `${V}.b4.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${V}.b4.concepts.c1.context`,
            questionKey: `${V}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${V}.b4.concepts.c1.choices.a`, feedbackKey: `${V}.b4.concepts.c1.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${V}.b4.concepts.c1.choices.b`, feedbackKey: `${V}.b4.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${V}.b4.concepts.c1.choices.c`, feedbackKey: `${V}.b4.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${V}.b4.concepts.c2.context`,
            questionKey: `${V}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${V}.b4.concepts.c2.choices.a`, feedbackKey: `${V}.b4.concepts.c2.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${V}.b4.concepts.c2.choices.b`, feedbackKey: `${V}.b4.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${V}.b4.concepts.c2.choices.c`, feedbackKey: `${V}.b4.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "casting-issues",
        microChecks: [
          {
            type: "trueFalse",
            id: "b4-tf",
            statements: [
              { id: "s1", statementKey: `${V}.b4.micro.tf.s1.statement`, isTrue: true, explanationKey: `${V}.b4.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${V}.b4.micro.tf.s2.statement`, isTrue: false, explanationKey: `${V}.b4.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${V}.b4.micro.tf.s3.statement`, isTrue: true, explanationKey: `${V}.b4.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 5 — The Troubleshooting Mindset                        */
      /* ============================================================ */
      {
        blockId: "troubleshooting-mindset",
        titleKey: `${V}.b5.title`,
        iconEmoji: "🧘",
        exercise: {
          type: "mythBusters",
          id: "b5-myths",
          instructionKey: `${V}.b5.exercise.instruction`,
          statements: [
            { id: "s1", statementKey: `${V}.b5.exercise.s1.statement`, isTrue: false, explanationKey: `${V}.b5.exercise.s1.explanation` },
            { id: "s2", statementKey: `${V}.b5.exercise.s2.statement`, isTrue: false, explanationKey: `${V}.b5.exercise.s2.explanation` },
            { id: "s3", statementKey: `${V}.b5.exercise.s3.statement`, isTrue: true, explanationKey: `${V}.b5.exercise.s3.explanation` },
            { id: "s4", statementKey: `${V}.b5.exercise.s4.statement`, isTrue: true, explanationKey: `${V}.b5.exercise.s4.explanation` },
            { id: "s5", statementKey: `${V}.b5.exercise.s5.statement`, isTrue: false, explanationKey: `${V}.b5.exercise.s5.explanation` },
          ],
        },
        scenario: {
          id: "b5-s0",
          contextKey: `${V}.b5.scenario.context`,
          questionKey: `${V}.b5.scenario.question`,
          choices: [
            { id: "a", labelKey: `${V}.b5.scenario.choices.a`, feedbackKey: `${V}.b5.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${V}.b5.scenario.choices.b`, feedbackKey: `${V}.b5.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${V}.b5.scenario.choices.c`, feedbackKey: `${V}.b5.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b5-c1",
            contextKey: `${V}.b5.concepts.c1.context`,
            questionKey: `${V}.b5.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${V}.b5.concepts.c1.choices.a`, feedbackKey: `${V}.b5.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${V}.b5.concepts.c1.choices.b`, feedbackKey: `${V}.b5.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${V}.b5.concepts.c1.choices.c`, feedbackKey: `${V}.b5.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b5-c2",
            contextKey: `${V}.b5.concepts.c2.context`,
            questionKey: `${V}.b5.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${V}.b5.concepts.c2.choices.a`, feedbackKey: `${V}.b5.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${V}.b5.concepts.c2.choices.b`, feedbackKey: `${V}.b5.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${V}.b5.concepts.c2.choices.c`, feedbackKey: `${V}.b5.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "troubleshooting-mindset",
        microChecks: [
          {
            type: "classify",
            id: "b5-cls",
            instructionKey: `${V}.b5.micro.cls.instruction`,
            categories: [
              { id: "goodPractice", labelKey: `${V}.b5.micro.cls.cat.goodPractice` },
              { id: "commonMistake", labelKey: `${V}.b5.micro.cls.cat.commonMistake` },
              { id: "planB", labelKey: `${V}.b5.micro.cls.cat.planB` },
            ],
            items: [
              { id: "i1", labelKey: `${V}.b5.micro.cls.i1`, correctCategoryId: "commonMistake" },
              { id: "i2", labelKey: `${V}.b5.micro.cls.i2`, correctCategoryId: "goodPractice" },
              { id: "i3", labelKey: `${V}.b5.micro.cls.i3`, correctCategoryId: "planB" },
              { id: "i4", labelKey: `${V}.b5.micro.cls.i4`, correctCategoryId: "commonMistake" },
              { id: "i5", labelKey: `${V}.b5.micro.cls.i5`, correctCategoryId: "goodPractice" },
              { id: "i6", labelKey: `${V}.b5.micro.cls.i6`, correctCategoryId: "planB" },
            ],
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /*  MODULE 7 — VR Educational Apps                                    */
  /* ================================================================== */
  "vr-educational-apps": {
    moduleSlug: "vr-educational-apps",
    videoSlideId: "video-intro-m7",
    blocks: [
      /* ============================================================ */
      /*  Block 1 — What Is an Educational App (mythBusters)           */
      /* ============================================================ */
      {
        blockId: "what-is-educational-app",
        titleKey: `${W}.b1.title`,
        iconEmoji: "🎯",
        exercise: {
          type: "mythBusters",
          id: "b1-myths",
          instructionKey: `${W}.b1.exercise.instruction`,
          statements: [
            { id: "s1", statementKey: `${W}.b1.exercise.s1.statement`, isTrue: false, explanationKey: `${W}.b1.exercise.s1.explanation` },
            { id: "s2", statementKey: `${W}.b1.exercise.s2.statement`, isTrue: true, explanationKey: `${W}.b1.exercise.s2.explanation` },
            { id: "s3", statementKey: `${W}.b1.exercise.s3.statement`, isTrue: false, explanationKey: `${W}.b1.exercise.s3.explanation` },
            { id: "s4", statementKey: `${W}.b1.exercise.s4.statement`, isTrue: true, explanationKey: `${W}.b1.exercise.s4.explanation` },
            { id: "s5", statementKey: `${W}.b1.exercise.s5.statement`, isTrue: false, explanationKey: `${W}.b1.exercise.s5.explanation` },
          ],
        },
        scenario: {
          id: "b1-s0",
          contextKey: `${W}.b1.scenario.context`,
          questionKey: `${W}.b1.scenario.question`,
          choices: [
            { id: "a", labelKey: `${W}.b1.scenario.choices.a`, feedbackKey: `${W}.b1.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${W}.b1.scenario.choices.b`, feedbackKey: `${W}.b1.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${W}.b1.scenario.choices.c`, feedbackKey: `${W}.b1.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b1-c1",
            contextKey: `${W}.b1.concepts.c1.context`,
            questionKey: `${W}.b1.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${W}.b1.concepts.c1.choices.a`, feedbackKey: `${W}.b1.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${W}.b1.concepts.c1.choices.b`, feedbackKey: `${W}.b1.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${W}.b1.concepts.c1.choices.c`, feedbackKey: `${W}.b1.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b1-c2",
            contextKey: `${W}.b1.concepts.c2.context`,
            questionKey: `${W}.b1.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${W}.b1.concepts.c2.choices.a`, feedbackKey: `${W}.b1.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${W}.b1.concepts.c2.choices.b`, feedbackKey: `${W}.b1.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${W}.b1.concepts.c2.choices.c`, feedbackKey: `${W}.b1.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "what-is-educational-app",
        microChecks: [
          {
            type: "trueFalse",
            id: "b1-tf",
            statements: [
              { id: "s1", statementKey: `${W}.b1.micro.tf.s1.statement`, isTrue: true, explanationKey: `${W}.b1.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${W}.b1.micro.tf.s2.statement`, isTrue: false, explanationKey: `${W}.b1.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${W}.b1.micro.tf.s3.statement`, isTrue: true, explanationKey: `${W}.b1.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 2 — Where to Find Apps (matching)                      */
      /* ============================================================ */
      {
        blockId: "where-to-find-apps",
        titleKey: `${W}.b2.title`,
        iconEmoji: "🏪",
        exercise: {
          type: "matching",
          id: "b2-match",
          instructionKey: `${W}.b2.exercise.instruction`,
          pairs: [
            { id: "p1", leftKey: `${W}.b2.exercise.p1.left`, rightKey: `${W}.b2.exercise.p1.right` },
            { id: "p2", leftKey: `${W}.b2.exercise.p2.left`, rightKey: `${W}.b2.exercise.p2.right` },
            { id: "p3", leftKey: `${W}.b2.exercise.p3.left`, rightKey: `${W}.b2.exercise.p3.right` },
            { id: "p4", leftKey: `${W}.b2.exercise.p4.left`, rightKey: `${W}.b2.exercise.p4.right` },
            { id: "p5", leftKey: `${W}.b2.exercise.p5.left`, rightKey: `${W}.b2.exercise.p5.right` },
          ],
        },
        scenario: {
          id: "b2-s0",
          contextKey: `${W}.b2.scenario.context`,
          questionKey: `${W}.b2.scenario.question`,
          choices: [
            { id: "a", labelKey: `${W}.b2.scenario.choices.a`, feedbackKey: `${W}.b2.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${W}.b2.scenario.choices.b`, feedbackKey: `${W}.b2.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${W}.b2.scenario.choices.c`, feedbackKey: `${W}.b2.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b2-c1",
            contextKey: `${W}.b2.concepts.c1.context`,
            questionKey: `${W}.b2.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${W}.b2.concepts.c1.choices.a`, feedbackKey: `${W}.b2.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${W}.b2.concepts.c1.choices.b`, feedbackKey: `${W}.b2.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${W}.b2.concepts.c1.choices.c`, feedbackKey: `${W}.b2.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b2-c2",
            contextKey: `${W}.b2.concepts.c2.context`,
            questionKey: `${W}.b2.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${W}.b2.concepts.c2.choices.a`, feedbackKey: `${W}.b2.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${W}.b2.concepts.c2.choices.b`, feedbackKey: `${W}.b2.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${W}.b2.concepts.c2.choices.c`, feedbackKey: `${W}.b2.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "where-to-find-apps",
        microChecks: [
          {
            type: "classify",
            id: "b2-cls",
            instructionKey: `${W}.b2.micro.cls.instruction`,
            categories: [
              { id: "freeAccess", labelKey: `${W}.b2.micro.cls.cat.freeAccess` },
              { id: "institutional", labelKey: `${W}.b2.micro.cls.cat.institutional` },
              { id: "devSetup", labelKey: `${W}.b2.micro.cls.cat.devSetup` },
            ],
            items: [
              { id: "i1", labelKey: `${W}.b2.micro.cls.i1`, correctCategoryId: "freeAccess" },
              { id: "i2", labelKey: `${W}.b2.micro.cls.i2`, correctCategoryId: "institutional" },
              { id: "i3", labelKey: `${W}.b2.micro.cls.i3`, correctCategoryId: "freeAccess" },
              { id: "i4", labelKey: `${W}.b2.micro.cls.i4`, correctCategoryId: "devSetup" },
              { id: "i5", labelKey: `${W}.b2.micro.cls.i5`, correctCategoryId: "institutional" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 3 — Simulation Apps (decisionTree)                     */
      /* ============================================================ */
      {
        blockId: "simulation-apps",
        titleKey: `${W}.b3.title`,
        iconEmoji: "🧪",
        exercise: {
          type: "decisionTree",
          id: "b3-dtree",
          instructionKey: `${W}.b3.exercise.instruction`,
          scenarioKey: `${W}.b3.exercise.scenario`,
          scenarioImageUrl: "/images/m7-simulation-training.webp",
          startNodeId: "n1",
          nodes: [
            {
              id: "n1",
              promptKey: `${W}.b3.exercise.n1.prompt`,
              options: [
                { id: "a", labelKey: `${W}.b3.exercise.n1.a.label`, nextNodeId: "n2", feedbackKey: `${W}.b3.exercise.n1.a.feedback`, quality: "okay" },
                { id: "b", labelKey: `${W}.b3.exercise.n1.b.label`, nextNodeId: "n2", feedbackKey: `${W}.b3.exercise.n1.b.feedback`, quality: "good" },
                { id: "c", labelKey: `${W}.b3.exercise.n1.c.label`, nextNodeId: "n2", feedbackKey: `${W}.b3.exercise.n1.c.feedback`, quality: "poor" },
              ],
            },
            {
              id: "n2",
              promptKey: `${W}.b3.exercise.n2.prompt`,
              options: [
                { id: "a", labelKey: `${W}.b3.exercise.n2.a.label`, nextNodeId: "n3", feedbackKey: `${W}.b3.exercise.n2.a.feedback`, quality: "good" },
                { id: "b", labelKey: `${W}.b3.exercise.n2.b.label`, nextNodeId: "n3", feedbackKey: `${W}.b3.exercise.n2.b.feedback`, quality: "okay" },
                { id: "c", labelKey: `${W}.b3.exercise.n2.c.label`, nextNodeId: "n3", feedbackKey: `${W}.b3.exercise.n2.c.feedback`, quality: "poor" },
              ],
            },
            {
              id: "n3",
              promptKey: `${W}.b3.exercise.n3.prompt`,
              isEnd: true,
              endIsGood: true,
              endFeedbackKey: `${W}.b3.exercise.n3.endFeedback`,
              options: [],
            },
          ],
        },
        scenario: {
          id: "b3-s0",
          contextKey: `${W}.b3.scenario.context`,
          questionKey: `${W}.b3.scenario.question`,
          choices: [
            { id: "a", labelKey: `${W}.b3.scenario.choices.a`, feedbackKey: `${W}.b3.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${W}.b3.scenario.choices.b`, feedbackKey: `${W}.b3.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${W}.b3.scenario.choices.c`, feedbackKey: `${W}.b3.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b3-c1",
            contextKey: `${W}.b3.concepts.c1.context`,
            questionKey: `${W}.b3.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${W}.b3.concepts.c1.choices.a`, feedbackKey: `${W}.b3.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${W}.b3.concepts.c1.choices.b`, feedbackKey: `${W}.b3.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${W}.b3.concepts.c1.choices.c`, feedbackKey: `${W}.b3.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b3-c2",
            contextKey: `${W}.b3.concepts.c2.context`,
            questionKey: `${W}.b3.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${W}.b3.concepts.c2.choices.a`, feedbackKey: `${W}.b3.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${W}.b3.concepts.c2.choices.b`, feedbackKey: `${W}.b3.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${W}.b3.concepts.c2.choices.c`, feedbackKey: `${W}.b3.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "simulation-apps",
        microChecks: [
          {
            type: "trueFalse",
            id: "b3-tf",
            statements: [
              { id: "s1", statementKey: `${W}.b3.micro.tf.s1.statement`, isTrue: true, explanationKey: `${W}.b3.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${W}.b3.micro.tf.s2.statement`, isTrue: false, explanationKey: `${W}.b3.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${W}.b3.micro.tf.s3.statement`, isTrue: true, explanationKey: `${W}.b3.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 4 — Choosing App by Objective (ordering)               */
      /* ============================================================ */
      {
        blockId: "choosing-app-by-objective",
        titleKey: `${W}.b4.title`,
        iconEmoji: "🗺️",
        exercise: {
          type: "ordering",
          id: "b4-order",
          instructionKey: `${W}.b4.exercise.instruction`,
          scaleStartKey: `${W}.b4.exercise.scaleStart`,
          scaleEndKey: `${W}.b4.exercise.scaleEnd`,
          items: [
            { id: "i1", labelKey: `${W}.b4.exercise.i1`, correctPosition: 0 },
            { id: "i2", labelKey: `${W}.b4.exercise.i2`, correctPosition: 1 },
            { id: "i3", labelKey: `${W}.b4.exercise.i3`, correctPosition: 2 },
            { id: "i4", labelKey: `${W}.b4.exercise.i4`, correctPosition: 3 },
          ],
        },
        scenario: {
          id: "b4-s0",
          contextKey: `${W}.b4.scenario.context`,
          questionKey: `${W}.b4.scenario.question`,
          choices: [
            { id: "a", labelKey: `${W}.b4.scenario.choices.a`, feedbackKey: `${W}.b4.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${W}.b4.scenario.choices.b`, feedbackKey: `${W}.b4.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${W}.b4.scenario.choices.c`, feedbackKey: `${W}.b4.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b4-c1",
            contextKey: `${W}.b4.concepts.c1.context`,
            questionKey: `${W}.b4.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${W}.b4.concepts.c1.choices.a`, feedbackKey: `${W}.b4.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${W}.b4.concepts.c1.choices.b`, feedbackKey: `${W}.b4.concepts.c1.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${W}.b4.concepts.c1.choices.c`, feedbackKey: `${W}.b4.concepts.c1.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
          {
            id: "b4-c2",
            contextKey: `${W}.b4.concepts.c2.context`,
            questionKey: `${W}.b4.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${W}.b4.concepts.c2.choices.a`, feedbackKey: `${W}.b4.concepts.c2.feedback.a`, feedbackTone: "partial", isCorrect: false },
              { id: "b", labelKey: `${W}.b4.concepts.c2.choices.b`, feedbackKey: `${W}.b4.concepts.c2.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${W}.b4.concepts.c2.choices.c`, feedbackKey: `${W}.b4.concepts.c2.feedback.c`, feedbackTone: "correct", isCorrect: true },
            ],
          },
        ],
        insightSlideId: "choosing-app-by-objective",
        microChecks: [
          {
            type: "classify",
            id: "b4-cls",
            instructionKey: `${W}.b4.micro.cls.instruction`,
            categories: [
              { id: "exploration", labelKey: `${W}.b4.micro.cls.cat.exploration` },
              { id: "simulation", labelKey: `${W}.b4.micro.cls.cat.simulation` },
              { id: "guidedTraining", labelKey: `${W}.b4.micro.cls.cat.guidedTraining` },
            ],
            items: [
              { id: "i1", labelKey: `${W}.b4.micro.cls.i1`, correctCategoryId: "exploration" },
              { id: "i2", labelKey: `${W}.b4.micro.cls.i2`, correctCategoryId: "simulation" },
              { id: "i3", labelKey: `${W}.b4.micro.cls.i3`, correctCategoryId: "guidedTraining" },
              { id: "i4", labelKey: `${W}.b4.micro.cls.i4`, correctCategoryId: "exploration" },
              { id: "i5", labelKey: `${W}.b4.micro.cls.i5`, correctCategoryId: "simulation" },
              { id: "i6", labelKey: `${W}.b4.micro.cls.i6`, correctCategoryId: "guidedTraining" },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 5 — Evaluating App Before Class (triageSort)           */
      /* ============================================================ */
      {
        blockId: "evaluating-app-before-class",
        titleKey: `${W}.b5.title`,
        iconEmoji: "📝",
        exercise: {
          type: "triageSort",
          id: "b5-triage",
          instructionKey: `${W}.b5.exercise.instruction`,
          categories: [
            { id: "pedagogical", labelKey: `${W}.b5.exercise.cat.pedagogical`, color: "green" },
            { id: "technical", labelKey: `${W}.b5.exercise.cat.technical`, color: "amber" },
            { id: "classroom", labelKey: `${W}.b5.exercise.cat.classroom`, color: "red" },
          ],
          items: [
            { id: "i1", labelKey: `${W}.b5.exercise.i1`, correctCategoryId: "pedagogical" },
            { id: "i2", labelKey: `${W}.b5.exercise.i2`, correctCategoryId: "pedagogical" },
            { id: "i3", labelKey: `${W}.b5.exercise.i3`, correctCategoryId: "pedagogical" },
            { id: "i4", labelKey: `${W}.b5.exercise.i4`, correctCategoryId: "technical" },
            { id: "i5", labelKey: `${W}.b5.exercise.i5`, correctCategoryId: "technical" },
            { id: "i6", labelKey: `${W}.b5.exercise.i6`, correctCategoryId: "technical" },
            { id: "i7", labelKey: `${W}.b5.exercise.i7`, correctCategoryId: "classroom" },
            { id: "i8", labelKey: `${W}.b5.exercise.i8`, correctCategoryId: "classroom" },
            { id: "i9", labelKey: `${W}.b5.exercise.i9`, correctCategoryId: "classroom" },
          ],
        },
        scenario: {
          id: "b5-s0",
          contextKey: `${W}.b5.scenario.context`,
          questionKey: `${W}.b5.scenario.question`,
          choices: [
            { id: "a", labelKey: `${W}.b5.scenario.choices.a`, feedbackKey: `${W}.b5.scenario.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
            { id: "b", labelKey: `${W}.b5.scenario.choices.b`, feedbackKey: `${W}.b5.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${W}.b5.scenario.choices.c`, feedbackKey: `${W}.b5.scenario.feedback.c`, feedbackTone: "partial", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b5-c1",
            contextKey: `${W}.b5.concepts.c1.context`,
            questionKey: `${W}.b5.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${W}.b5.concepts.c1.choices.a`, feedbackKey: `${W}.b5.concepts.c1.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${W}.b5.concepts.c1.choices.b`, feedbackKey: `${W}.b5.concepts.c1.feedback.b`, feedbackTone: "incorrect", isCorrect: false },
              { id: "c", labelKey: `${W}.b5.concepts.c1.choices.c`, feedbackKey: `${W}.b5.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b5-c2",
            contextKey: `${W}.b5.concepts.c2.context`,
            questionKey: `${W}.b5.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${W}.b5.concepts.c2.choices.a`, feedbackKey: `${W}.b5.concepts.c2.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${W}.b5.concepts.c2.choices.b`, feedbackKey: `${W}.b5.concepts.c2.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${W}.b5.concepts.c2.choices.c`, feedbackKey: `${W}.b5.concepts.c2.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "evaluating-app-before-class",
        microChecks: [
          {
            type: "trueFalse",
            id: "b5-tf",
            statements: [
              { id: "s1", statementKey: `${W}.b5.micro.tf.s1.statement`, isTrue: true, explanationKey: `${W}.b5.micro.tf.s1.explanation` },
              { id: "s2", statementKey: `${W}.b5.micro.tf.s2.statement`, isTrue: false, explanationKey: `${W}.b5.micro.tf.s2.explanation` },
              { id: "s3", statementKey: `${W}.b5.micro.tf.s3.statement`, isTrue: true, explanationKey: `${W}.b5.micro.tf.s3.explanation` },
            ],
          },
        ],
      },

      /* ============================================================ */
      /*  Block 6 — Integrating Apps in Class (fillGaps)               */
      /* ============================================================ */
      {
        blockId: "integrating-apps-in-class",
        titleKey: `${W}.b6.title`,
        iconEmoji: "💬",
        exercise: {
          type: "fillGaps",
          id: "b6-fill",
          instructionKey: `${W}.b6.exercise.instruction`,
          templateKey: `${W}.b6.exercise.template`,
          blanks: [
            { id: "blank1", correctWordKey: `${W}.b6.exercise.blank1` },
            { id: "blank2", correctWordKey: `${W}.b6.exercise.blank2` },
            { id: "blank3", correctWordKey: `${W}.b6.exercise.blank3` },
            { id: "blank4", correctWordKey: `${W}.b6.exercise.blank4` },
            { id: "blank5", correctWordKey: `${W}.b6.exercise.blank5` },
          ],
          distractorKeys: [
            `${W}.b6.exercise.distractor1`,
            `${W}.b6.exercise.distractor2`,
          ],
        },
        scenario: {
          id: "b6-s0",
          contextKey: `${W}.b6.scenario.context`,
          questionKey: `${W}.b6.scenario.question`,
          choices: [
            { id: "a", labelKey: `${W}.b6.scenario.choices.a`, feedbackKey: `${W}.b6.scenario.feedback.a`, feedbackTone: "partial", isCorrect: false },
            { id: "b", labelKey: `${W}.b6.scenario.choices.b`, feedbackKey: `${W}.b6.scenario.feedback.b`, feedbackTone: "correct", isCorrect: true },
            { id: "c", labelKey: `${W}.b6.scenario.choices.c`, feedbackKey: `${W}.b6.scenario.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
          ],
        },
        conceptScenarios: [
          {
            id: "b6-c1",
            contextKey: `${W}.b6.concepts.c1.context`,
            questionKey: `${W}.b6.concepts.c1.question`,
            choices: [
              { id: "a", labelKey: `${W}.b6.concepts.c1.choices.a`, feedbackKey: `${W}.b6.concepts.c1.feedback.a`, feedbackTone: "incorrect", isCorrect: false },
              { id: "b", labelKey: `${W}.b6.concepts.c1.choices.b`, feedbackKey: `${W}.b6.concepts.c1.feedback.b`, feedbackTone: "correct", isCorrect: true },
              { id: "c", labelKey: `${W}.b6.concepts.c1.choices.c`, feedbackKey: `${W}.b6.concepts.c1.feedback.c`, feedbackTone: "partial", isCorrect: false },
            ],
          },
          {
            id: "b6-c2",
            contextKey: `${W}.b6.concepts.c2.context`,
            questionKey: `${W}.b6.concepts.c2.question`,
            choices: [
              { id: "a", labelKey: `${W}.b6.concepts.c2.choices.a`, feedbackKey: `${W}.b6.concepts.c2.feedback.a`, feedbackTone: "correct", isCorrect: true },
              { id: "b", labelKey: `${W}.b6.concepts.c2.choices.b`, feedbackKey: `${W}.b6.concepts.c2.feedback.b`, feedbackTone: "partial", isCorrect: false },
              { id: "c", labelKey: `${W}.b6.concepts.c2.choices.c`, feedbackKey: `${W}.b6.concepts.c2.feedback.c`, feedbackTone: "incorrect", isCorrect: false },
            ],
          },
        ],
        insightSlideId: "integrating-apps-in-class",
        microChecks: [
          {
            type: "classify",
            id: "b6-cls",
            instructionKey: `${W}.b6.micro.cls.instruction`,
            categories: [
              { id: "before", labelKey: `${W}.b6.micro.cls.cat.before` },
              { id: "during", labelKey: `${W}.b6.micro.cls.cat.during` },
              { id: "after", labelKey: `${W}.b6.micro.cls.cat.after` },
            ],
            items: [
              { id: "i1", labelKey: `${W}.b6.micro.cls.i1`, correctCategoryId: "before" },
              { id: "i2", labelKey: `${W}.b6.micro.cls.i2`, correctCategoryId: "during" },
              { id: "i3", labelKey: `${W}.b6.micro.cls.i3`, correctCategoryId: "after" },
              { id: "i4", labelKey: `${W}.b6.micro.cls.i4`, correctCategoryId: "before" },
              { id: "i5", labelKey: `${W}.b6.micro.cls.i5`, correctCategoryId: "during" },
              { id: "i6", labelKey: `${W}.b6.micro.cls.i6`, correctCategoryId: "after" },
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
