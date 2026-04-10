/**
 * Module 2 section content (English). Markdown strings keyed by section id.
 * "Designing Meaningful Learning with VR"
 */
export const sectionsEn: Record<string, string> = {
  "objectives-that-work": `Not all learning objectives suit VR equally. Knowing which ones benefit from immersion is the first step in designing effective VR experiences.

**Objectives that work WELL in VR**

- **Performing procedures** — step-by-step processes in a safe, repeatable environment
- **Practicing protocols** — standardised sequences rehearsed until automatic
- **Making decisions in context** — assessing situations and choosing actions
- **Responding to realistic situations** — high-stakes moments simulated safely
- **Communicating and interacting** — role-play and teamwork in a shared virtual space

---

**Objectives that work POORLY in VR**

- **Memorisation** — flashcards and spaced repetition are more efficient
- **Passive content consumption** — no advantage over a screen
- **Reading or listening only** — the headset becomes a barrier
- **Simple factual recall** — does not require immersion

> "VR is most effective when learners DO, not when they watch."`,

  "writing-objectives": `VR objectives should describe what the learner **does**, not what they "understand." If the objective could be achieved by watching a video, it is not a VR objective.

**Action verbs for VR objectives**

Use verbs that imply observable, performable actions:

- Perform, Apply, Practice
- Identify (in context), Respond, Decide
- Demonstrate, Execute

Avoid vague verbs like "understand," "learn about," "be aware of," or "appreciate."

---

**Weak vs. strong objectives**

- **Weak:** "Students will understand emergency procedures."
- **Strong:** "Students will perform the correct emergency response sequence in a simulated building evacuation scenario."

- **Weak:** "Students will learn about patient assessment techniques."
- **Strong:** "Students will execute a primary patient assessment on a virtual patient, identifying at least three critical findings within five minutes."`,

  "structure-objective": `A strong VR learning objective has three components that describe exactly what success looks like inside the virtual environment.

**The three components**

1. **Action** — What the learner physically or cognitively does (the verb).
2. **Context** — Where and under what conditions the action takes place.
3. **Criteria** — How you know the action was done correctly.

---

**The formula**

> [Action verb] + [what] + [in what context] + [to what standard]

---

**Examples**

- **Healthcare:** "Perform a primary patient assessment on a virtual trauma patient in an emergency room simulation, correctly identifying all life-threatening conditions within four minutes."
- **Education:** "Deliver a five-minute micro-lesson to a virtual classroom of eight students, adapting your explanation when at least two students show visible signs of confusion."`,

  "seeing-vs-doing": `The difference between **seeing** and **doing** in VR determines whether an experience produces lasting outcomes or is quickly forgotten.

**Seeing — passive observation**

- 360-degree videos, guided tours, fly-through experiences
- The learner watches and absorbs but does not act

---

**Doing — active manipulation**

- Decision-making scenarios, procedural practice, interactive simulations
- The learner manipulates objects, makes choices, and receives feedback

---

A PwC study found that VR learners were trained **4x faster** than classroom learners, felt **275% more confident** applying skills, and were **3.75x more emotionally connected** to the content — all from active, scenario-based VR.

The learning pyramid concept: people retain ~10% of what they read but up to 75% of what they practice. VR at its best operates in that high-retention zone.

[IMAGE:learning-pyramid]

> "The real power of VR is not what students see — it's what they do."`,

  "before-vr": `The **briefing** prepares learners before the headset goes on. In under 60 seconds, state the learning objective, describe the task, set the time limit, and mention what success looks like. Avoid long technical explanations — learners discover features by using them.

> For the complete briefing framework and ready-to-use scripts, see **Module 5: Briefing and Debriefing**.`,

  "during-vr": `The **during VR** phase is where learning happens. The instructor shifts from teaching to facilitating.

**Learner role**

- Perform the task described in the briefing
- Make choices when the scenario branches
- Stay focused on the learning objective

---

**Instructor role**

- Observe via casting; note strengths and errors for debrief
- Offer a brief prompt only if a learner is clearly stuck
- Track time and signal when it is running out

[IMAGE:vr-classroom-session]`,

  "after-vr": `The **debriefing** transforms a VR experience into actual learning.

**Debriefing questions**

- What happened during the experience?
- What decisions did you make?
- What worked well? What did not?
- What would you do differently next time?
- How does this connect to real-life practice?

> "Without debriefing, VR becomes entertainment, not education."

> For structured debriefing models (GAS, Plus-Delta, Kolb) and instructor guidance, see **Module 5: Briefing and Debriefing**.`,

  "durations": `Effective VR sessions are **short and focused**. Extended sessions produce diminishing returns due to fatigue and reduced attention.

**Recommended time allocation**

- **Before VR (briefing):** ~5 minutes. State objective, clarify task, set expectations.
- **During VR (active experience):** 5–15 minutes. The core learning window.
- **After VR (debriefing):** 5–10 minutes. Reflect, discuss, connect to application.
- **Total session:** 15–30 minutes start to finish.

---

**Why shorter is better**

- **Attention:** cognitive focus in VR is intense; after 15 minutes it drops sharply.
- **Comfort:** extended headset use causes eye strain and discomfort, especially for first-time users.`,

  "guided-exploration": `**Guided exploration** is a VR activity where learners explore an environment with a specific observational purpose — not free wandering.

**When to use it**

- Introducing a new topic or environment before formal instruction
- Building contextual understanding of a setting
- Familiarising learners with a space they will later use in a simulation

---

**How it works**

Provide a focus question before the learner enters VR. Example:

- "Walk through the virtual emergency department and identify three potential safety hazards."

The learner explores at their own pace, guided by the question. The debrief focuses on what they observed and what it means. Always give learners something to look for, count, compare, or report on — without a task, exploration becomes virtual tourism.`,

  "simulation-practice": `**Simulation with practice** is the most powerful VR activity type. Learners perform tasks, follow procedures, or make decisions inside an environment that mirrors real-world conditions.

**When to use it**

- Training practical skills that require repetition and feedback
- Learning protocols that must be performed in a specific sequence
- Practising in scenarios where real-world failure would be dangerous or expensive

---

**Why this is the strongest use case**

- **High transfer:** the brain encodes VR practice as something done, not heard about
- **Active learning:** constant decisions, object manipulation, and feedback
- **Measurable outcomes:** accuracy, speed, sequence compliance, and error rate can all be tracked

---

**Example**

Practising a fire evacuation: the learner locates the alarm, alerts occupants, guides them to exits, and accounts for everyone — in the correct order.`,

  "evaluation-skill-check": `**Evaluation and skill check** uses VR as an assessment tool. The learner demonstrates whether they can perform correctly, and their performance is measured.

**When to use it**

- At the end of a learning unit, after learners have already practised the skill
- For certification or competency validation
- As a summative check before moving to real-world application

---

**What to assess**

- **Accuracy:** correct actions, right tools, right technique
- **Sequence compliance:** steps in the correct order
- **Decision quality:** appropriate choices given available information
- **Timing:** task completed within an acceptable time frame`,

  "when-to-use-each": `Choose the VR activity type based on your learning objective — the activity serves the objective, not the other way around.

**Decision framework**

- **Understand context or environment** → **Guided Exploration.** Explore and observe with a focus question.
- **Practice a skill or procedure** → **Simulation with Practice.** Perform tasks, follow protocols, receive feedback.
- **Validate competence** → **Evaluation / Skill Check.** Demonstrate ability under assessment conditions.

---

**The natural sequence**

1. **Guided Exploration** — familiarise with the environment
2. **Simulation with Practice** — actively practise the target skill
3. **Evaluation / Skill Check** — demonstrate competence without guidance

Not every lesson needs all three stages, but knowing the sequence helps design coherent learning paths.

[IMAGE:activity-types-grid]

> "Match the activity type to the learning objective — not the other way around."`,
};
