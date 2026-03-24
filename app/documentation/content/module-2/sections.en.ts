/**
 * Module 2 section content (English). Designing Meaningful Learning with VR.
 * Content aligned with Indice Curso VR – Tema 2.
 */
export const sectionsEn: Record<string, string> = {
  "objectives-that-work": `Not all learning objectives are equally suited to VR. Choosing the right ones makes the difference between a gimmick and real learning.

**Objectives that work WELL in VR**

- **Performing procedures:** step-by-step tasks, protocols, sequences.
- **Practicing protocols:** safety, clinical, or technical procedures in a safe environment.
- **Making decisions in context:** choosing how to act in realistic situations.
- **Responding to realistic situations:** reacting to scenarios that mirror real life.
- **Communicating or interacting:** practising dialogue, teamwork, or customer/patient interaction.

**Objectives that work POORLY in VR**

- Memorization (VR does not replace flashcards or text for pure recall).
- Passive content consumption (long videos or slides are better outside VR).
- Reading or listening only (VR’s strength is doing, not passive intake).
- Simple factual recall (use other tools unless the fact is embedded in a scenario).`,

  "writing-objectives": `VR learning objectives should describe what the learner **does**, not what they “understand” or “see”.

**Use action-oriented verbs**

- **Perform** – carry out a procedure or sequence.
- **Apply** – use a rule or protocol in a situation.
- **Practice** – repeat an action or decision in a safe environment.
- **Identify (in context)** – recognise elements within a scenario.
- **Respond** – react appropriately to a situation.
- **Decide** – make a choice with consequences.
- **Demonstrate** – show that they can do something.
- **Execute** – complete a defined task or protocol.

Avoid vague verbs such as “understand”, “know”, or “learn about” unless you pair them with a concrete, observable action.`,

  "structure-objective": `A strong VR objective has three elements: **action**, **context**, and **criteria** (implicit or explicit).

**Structure**

1. **Action:** what the learner does (verb + object).
2. **Context:** where or under what conditions (e.g. “in a simulated emergency”, “in a virtual lab”).
3. **Criteria:** what “good” looks like (e.g. “correct sequence”, “within time limit”, “without errors”).

**Examples**

- **Weak:** “Students will understand emergency procedures.”
- **Strong:** “Students will perform the correct emergency response sequence in a simulated scenario.”

- **Weak:** “Students will learn about lab safety.”
- **Strong:** “Students will apply lab safety rules by identifying and correcting hazards in a virtual laboratory.”`,

  "seeing-vs-doing": `There is a clear difference between **seeing** something in VR and **doing** it. Learning gains are much higher when students act, not only observe.

**Evidence**

Research on VR training effectiveness shows that retention and transfer improve when learners are active participants. [PwC’s study into VR training effectiveness](https://www.pwc.co.uk/services/technology/immersive-technologies/study-into-vr-training-effectiveness.html) found that VR learners were up to 4x faster to train, 275% more confident applying skills, and 3.75x more emotionally connected to the content than classroom learners. The “Pyramid of Learning” and similar models suggest that doing and practising lead to better retention than watching or hearing.

**Implications for design**

- Prefer activities where students **perform** tasks, make decisions, or follow procedures.
- Use “guided exploration” or “observation” when the goal is context-building or orientation; then move to practice or evaluation.
- Avoid using VR only as a 360° video player if the learning goal is skill or competency.`,

  "before-vr": `**Purpose:** Prepare learners cognitively and pedagogically before they enter VR.

**What happens here**

- The learning objective is explained in simple terms.
- The task is clarified (what they must do, not every feature of the app).
- Time limits are set (e.g. “You have 10 minutes”).
- Success criteria are mentioned (what “done well” looks like).

**What should NOT happen**

- Long technical explanations of the headset or app.
- Full feature walkthroughs (unless essential to the task).
- Overloading with information (keep it short and task-focused).

**Design rule:** A good briefing is short, clear, and task-focused. Aim for under 60 seconds when possible.`,

  "during-vr": `**Purpose:** Ensure that learning happens inside the experience, not only before or after.

**Learner role**

- **Act** – perform the procedure or task.
- **Decide** – make choices with consequences.
- **Follow a task** – stick to the given objective.
- **Engage** with the environment in a purposeful way.

**Instructor role**

- **Observe** performance (e.g. via casting).
- **Guide** only when needed (avoid constant interruption).
- **Control timing** – start and end the VR phase clearly.
- **Avoid** explaining everything; let the scenario and feedback do the work.

**Principles:** Active engagement, guided practice, and clear time boundaries make “during VR” the core of the learning moment.`,

  "after-vr": `**Purpose:** Turn the experience into lasting learning through reflection and transfer.

**Concepts:** Reflection, debriefing, learning transfer, real-world application.

**Typical debriefing questions**

- What happened? (description)
- What did you do? (actions and decisions)
- What worked / didn’t work?
- What would you do differently?
- How does this apply to real life?

**Design rule:** Without debriefing, VR remains an experience; with it, it becomes learning. Always allow time after VR for discussion and transfer.

📎 **Further reading:** [Debriefing in simulation-based education — INACSL Standards](https://www.inacsl.org/healthcare-simulation-standards)`,

  "durations": `Short, focused VR sessions are more effective than long ones. Plan the three phases with clear time blocks.

**Reference durations**

- **Before VR (briefing):** about 5 minutes (can be under 60 seconds for simple tasks).
- **During VR:** 5–15 minutes per turn (adjust by task and age).
- **After VR (debriefing):** 5–10 minutes.

**Principles**

- Prefer several short sessions over one long one.
- Keep “during VR” tight so that non-VR students and rotations remain feasible.
- Reserve debriefing time so it is not skipped when the bell rings.`,

  "guided-exploration": `**Core idea:** Learners explore a virtual environment with a specific observational purpose. They build context and spatial understanding without necessarily performing a procedure.

**Keywords:** Exploration, context-building, orientation, spatial understanding, guided observation.

**Best used when**

- Introducing a topic or place.
- Building context before practice.
- Familiarizing learners with an environment (e.g. virtual hospital, factory, lab).

**Limitation:** If the goal is skill or competency, follow up with simulation or evaluation; exploration alone is often not enough for transfer.`,

  "simulation-practice": `**Core idea:** Learners actively perform tasks or procedures in VR. They make decisions, receive feedback, and repeat until they improve.

**Keywords:** Simulation, practice, feedback, repetition, skill development.

**Best used when**

- Training skills or protocols.
- Learning step-by-step procedures.
- Practising in a safe environment where failure is allowed.

**Why this is one of the strongest VR use cases**

- High transfer to real-world performance.
- Active learning and measurable outcomes.
- Aligns with evidence on learning by doing.`,

  "evaluation-skill-check": `**Core idea:** VR is used to assess whether learners can perform or decide correctly. It provides evidence of competency rather than practice.

**Keywords:** Assessment, competency validation, performance evidence, skill verification.

**Best used when**

- End of a unit or module.
- Certification or competency check.
- You need a record of performance (e.g. correct sequence, time, errors).

**Note:** Design the scenario and criteria in advance so that “pass” or “competent” is clear and consistent.`,

  "when-to-use-each": `Use this decision logic to choose the right type of VR activity for each learning goal.

**By objective**

- **Objective = Understand context, orient, or build familiarity** → **Guided Exploration**
- **Objective = Practice a skill or procedure** → **Simulation with Practice**
- **Objective = Validate competence or assess performance** → **Evaluation / Skill Check**

**In practice**

1. Write a clear, action-based learning objective.
2. Ask: Is the main goal to explore, to practise, or to assess?
3. Choose the activity type and then design briefing, task, and debriefing around it.

This keeps VR aligned with learning outcomes and avoids “using VR for the sake of it.”`,
};
