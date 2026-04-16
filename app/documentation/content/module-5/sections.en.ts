/**
 * Module 5 section content (English). Markdown strings keyed by section id.
 * "Briefing and Debriefing: Turning VR into Learning"
 */
export const sectionsEn: Record<string, string> = {
  "foundational-idea": `The VR experience alone does not produce learning. What happens **before** and **after** the headset determines whether learners walk away with lasting understanding or just a vivid memory.

This principle is grounded in well-established frameworks:

- **Experiential Learning Theory (Kolb)** — learning requires a cycle of experience, reflection, conceptualisation, and application
- **Simulation-Based Education** — decades of healthcare and aviation research confirm that structured preparation and reflection are essential
- **Clinical and emergency simulation standards** — briefing and debriefing are mandatory, not optional

---

> "Experience without reflection is just activity. Briefing and debriefing are the mechanisms that turn VR into education."`,

  "pre-vr-briefing": `Briefing is not a VR invention — it is standard practice in every serious simulation discipline. Clinical training, emergency response, and aviation have used structured briefings for decades because they work.

**Why briefing matters**

- **Reduces anxiety** — learners know what to expect before entering the headset
- **Clarifies expectations** — eliminates guessing about what "success" looks like
- **Directs attention** — focuses cognitive resources on the learning objective, not on figuring out controls

---

**The briefing framework: O-R-T-T**

- **Objective** — what the learner will accomplish
- **Rules** — boundaries, safety, what is and is not allowed
- **Time** — how long the experience will last
- **Task** — the specific actions the learner will perform

> "A clear briefing lets learners spend their VR time learning, not guessing."

[IMAGE:classify-objective]`,

  "what-to-explain": `Knowing what to include in a briefing is important, but knowing what to leave out is equally critical. Over-briefing kills curiosity and wastes time.

**What TO explain**

- The learning objective — what they will achieve
- The task — what they need to do inside the environment
- Time available — so they can pace themselves
- Safety rules — how to signal discomfort or exit
- Success criteria — how they will know they did it correctly

---

**What NOT to explain**

- Full technical details of the hardware — keep orientation to 30 seconds
- Every possible action in the environment — let learners discover
- Step-by-step solutions — this removes the learning challenge
- Irrelevant app features — only cover what serves the objective

> "Brief enough to focus, not so much that you steal the discovery."`,

  "sixty-second-briefing": `A great briefing is short, structured, and repeatable. This 60-second template works for any VR learning session.

**The structure**

- **Objective (15 seconds)** — State the goal in one sentence. "Your goal is to correctly identify all safety hazards in the virtual workspace."
- **Task and rules (25 seconds)** — Describe what to do and what boundaries apply. "You will walk through the environment, flag each hazard, and explain why it is dangerous. Do not skip any room."
- **Time and start signal (20 seconds)** — Set the clock and launch. "You have 10 minutes. Focus on accuracy, not speed. If you feel uncomfortable at any point, raise your hand. We will discuss your findings afterward."

---

> "If your briefing takes longer than the VR experience, it is too long."

[IMAGE:briefing-classroom]`,

  "structured-debriefing": `The debriefing is where learning **actually happens**. Without it, even the best VR experience fades into entertainment. Structured debriefing transforms raw experience into transferable understanding.

**Proven debriefing models**

- **GAS (Gather-Analyze-Summarize)** — collect observations, examine why things happened, draw conclusions
- **Plus-Delta** — identify what went well (plus) and what to change (delta)
- **Kolb's Experiential Learning Cycle** — move from concrete experience through reflection and conceptualisation to active experimentation

---

Each model follows the same logic: describe what happened, analyse why, and decide what to do next time. The specific model matters less than having a structure at all.

> "An unstructured debrief is a missed opportunity. A structured one is where learning lives."

[IMAGE:classify-debrief-gather]

[IMAGE:classify-debrief-analyze]`,

  "good-debriefing": `Not all debriefings are equal. The difference between a productive debrief and a wasted one comes down to six characteristics.

**What makes a debriefing effective**

- **Structured** — follows a clear sequence, not improvised conversation
- **Learner-centred** — the learner talks more than the instructor
- **Non-judgmental** — focuses on actions and decisions, not on the person
- **Focused on behaviour** — discusses what was done, not what was felt
- **Connected to objectives** — ties back to the original learning goal
- **Time-boxed** — respects the schedule and avoids going off-topic

---

A debriefing that drifts into general discussion or instructor lecturing loses its power. Keep it tight, keep the learner at the centre, and keep it connected to what they actually did in the experience.

> "The best debriefings feel like a conversation, not a correction."`,

  "core-debriefing-questions": `Four phases of questions move learners from surface recall to deep understanding and real-world application.

**Phase 1 — "What happened?" (Description)**

- What did you see? What occurred first, next, last?
- This phase establishes a shared factual account of the experience.

**Phase 2 — "What did you do?" (Analysis)**

- What actions did you take? What decisions did you make and why?
- This phase examines the reasoning behind behaviour.

**Phase 3 — "What would you do differently?" (Reflection)**

- If you could repeat the experience, what would you change?
- This phase builds self-awareness and future planning.

**Phase 4 — "How does this apply to the real world?" (Transfer)**

- Where would you use this skill or decision in your actual practice?
- This phase bridges the virtual experience to professional reality.

> "Good questions do the teaching. The instructor just asks them."`,

  "debriefing-duration": `How long should a debriefing last? The answer depends on the complexity of the VR experience, but the principle is simple: some reflection is always better than none.

**Time guidelines**

- **Minimum:** 5 minutes — enough for a quick description-analysis-transfer cycle
- **Ideal:** 5–10 minutes — allows all four question phases with genuine discussion
- **Longer sessions:** only for complex, multi-decision scenarios where deeper analysis is warranted

---

**Practical considerations**

- A 10-minute VR experience needs at least 5 minutes of debriefing
- Groups take longer than individuals — plan accordingly
- If time runs short, prioritise the transfer question: "How does this apply to real practice?"

> "Even a two-minute debrief is infinitely better than none. Never skip it."`,

  "instructor-role-debriefing": `During debriefing, the instructor's role shifts fundamentally. You are no longer the expert delivering knowledge — you are the facilitator drawing knowledge out of the learner.

**Key principles**

- **Ask, don't lecture** — pose questions and let learners construct their own understanding
- **Listen more than you talk** — aim for an 80/20 ratio of learner-to-instructor talk time
- **Avoid judging or correcting too early** — let learners self-identify errors before you point them out
- **Encourage multiple perspectives** — in group settings, ask others what they observed or would have done differently

---

The temptation to "fix" mistakes immediately is strong, but premature correction short-circuits the reflection process. When learners discover their own errors, the lesson is deeper and more durable.

> "The best facilitators are the ones who talk the least and ask the most."`,

  "what-to-assess": `VR allows you to assess performance across four distinct areas. Knowing which area to focus on depends on your learning objective.

**1. Skills — Technical execution**

- Accuracy of actions, correct sequence, task completion
- Example: Did the learner perform all steps of the procedure in the right order?

**2. Decision-Making — Cognitive performance**

- Appropriateness of choices, timing of decisions, adaptability when conditions change
- Example: Did the learner choose the correct response when the scenario shifted?

**3. Procedures — Process compliance**

- Correct order, adherence to protocols, recognition and correction of errors
- Example: Did the learner follow the safety checklist without skipping steps?

**4. Attitude and Communication — Professional behaviour**

- Clarity of communication, professional conduct, calmness under pressure
- Example: Did the learner communicate clearly with team members during the scenario?`,
};
