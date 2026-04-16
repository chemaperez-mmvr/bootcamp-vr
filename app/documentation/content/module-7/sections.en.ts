/**
 * Module 7 section content (English). Markdown strings keyed by section id.
 * "VR Educational Apps: Types, Uses, and Smart Selection"
 */
export const sectionsEn: Record<string, string> = {
  "what-is-educational-app": `Not every VR app that looks educational actually is. A genuine educational VR app has four defining traits that separate it from games, demos, and 360 videos.

**Four traits of an educational VR app**

- **Learning objectives** — the app targets a specific, measurable outcome
- **Learner action** — the user must do something, not just watch
- **Feedback** — the app responds to what the learner does, showing consequences or corrections
- **Measurable outcomes** — performance can be observed, scored, or recorded

---

**Red flags that an app is NOT educational**

- No clear learning objective — it just "exposes" the learner to content
- Purely entertainment — engagement without purpose
- No feedback mechanism — the learner acts but nothing responds

> "If the app does not require the learner to act, respond, and improve, it is not educational — it is a viewing experience."`,

  "where-to-find-apps": `Finding quality educational VR apps requires knowing where to look. Not all distribution channels are equal, and the best content is often not on the main store shelf.

**Distribution channels**

- **Meta Horizon Store** — the unified Meta storefront for Quest apps. All titles are searchable in one place. Developers can publish apps through an "Early Access" programme for apps still in development
- **Private / institutional apps** — custom-built apps distributed internally by universities, hospitals, or training organisations
- **WebXR experiences** — browser-based VR accessed via a URL inside the headset browser; no installation required

---

> "All educational VR content is now in the Meta Horizon Store — use its search filters and categories before concluding that nothing exists for your subject."`,

  "exploration-apps": `Exploration apps let learners observe, navigate, and discover environments without performing structured tasks. Think virtual field trips, museum walkthroughs, and anatomy explorers.

**The "museum effect" risk**

Without a clear task, exploration becomes passive tourism. Learners look around, say "wow," and retain very little. Always pair an exploration app with a focus question or observation checklist.

- **Weak:** "Explore the Roman forum."
- **Strong:** "Walk through the Roman forum and identify three structures that served a civic function."

---

> "Exploration apps open doors — but only if the learner walks through them with a purpose."

> See **Module 2: Designing Meaningful Learning** for when and how to use guided exploration activities.`,

  "simulation-apps": `Simulation apps reproduce real-world situations where the learner interacts with the environment and experiences consequences. They are the highest-impact category for skill-based training.

**Defining features**

- The environment responds to learner actions
- Mistakes have visible consequences (a patient deteriorates, equipment fails)
- Multiple attempts are possible without real-world risk

---

**Examples**

- Clinical simulations — patient assessment, surgical steps, triage decisions
- Safety training — fire evacuation, chemical spill response
- Industrial procedures — equipment operation, assembly sequences

> "Simulation apps let learners fail safely — and that is exactly why they learn."

> See **Module 2** for the full pedagogical rationale behind simulation-based VR learning.

[IMAGE:simulation-training]`,

  "guided-training-apps": `Guided training apps walk the learner through a sequence step by step, providing immediate feedback at each stage. The path is closed — learners follow the prescribed order.

**Defining features**

- Fixed sequence of steps the learner must complete in order
- Immediate feedback — correct actions are confirmed, errors are flagged
- Built-in scaffolding that reduces as the learner progresses

---

**Best uses**

- Initial learning of a new procedure or protocol
- Standardised training where every learner must follow the same steps
- Certification preparation requiring demonstrated compliance

---

**Guided vs. simulation**

- **Guided training** tells you what to do next — ideal for first-time learning
- **Simulation** lets you figure it out — ideal for practice and transfer

Most effective curricula use guided training first, then simulation for reinforcement.

> "Guided training teaches the steps — simulation proves you know them."`,

  "evaluation-apps": `Evaluation apps record learner actions and produce objective performance data. They function as assessment tools, not teaching tools.

**Defining features**

- Actions are tracked — time, accuracy, sequence, completions
- Metrics are produced — scores, error counts, completion rates
- Results can be exported or reviewed by an instructor

---

**Best uses**

- Competency validation at the end of a training module
- End-of-course practical assessments
- Summative skill checks before real-world application
- Certification or licensing demonstrations

> "Evaluation apps answer one question: can this person perform the skill correctly, without help?"

> See **Module 2** for what to assess in VR and **Module 5** for debriefing after assessment.`,

  "communication-soft-skills-apps": `Communication apps simulate conversations with virtual avatars or AI-driven characters. The learner speaks, chooses responses, or reacts to social cues in a safe environment.

**Defining features**

- Dialogue-based interaction with realistic virtual characters
- Branching conversations where learner choices affect outcomes
- Feedback on communication style, tone, or content

---

**Best uses**

- Communication and interpersonal skills training
- Customer service scenario practice
- Job interview preparation and rehearsal
- Patient or client interaction in healthcare and social work
- Conflict resolution and de-escalation practice

---

**Why VR works for soft skills**

Flat screens remove social pressure — VR restores it. The sense of presence makes the conversation feel real, triggering genuine emotional responses that transfer to actual interactions.

> "You cannot learn to communicate by reading about communication — you learn by practising it with someone who responds."`,

  "choosing-app-by-objective": `Match the app type to your learning objective — never choose an app first and then try to justify it pedagogically.

**Decision map**

- **Introduce a topic or build context** → Exploration app
- **Practise a procedure or physical skill** → Simulation app
- **Learn a protocol step by step** → Guided training app
- **Assess whether a learner can perform** → Evaluation app
- **Train communication or interpersonal skills** → Conversational app

---

**Combining types in a sequence**

A complete learning path might use several app types in order:

1. **Exploration** — orient the learner to the environment
2. **Guided training** — teach the correct procedure
3. **Simulation** — practise without scaffolding
4. **Evaluation** — verify competency

Not every lesson needs all four stages, but knowing the sequence prevents gaps.

> "Start with the objective, then find the app — not the other way around."

[IMAGE:app-types-overview]`,

  "evaluating-app-before-class": `Before using any VR app in class, evaluate it across three dimensions. An app that fails any one of them will create problems in the session.

**Pedagogical checklist**

- What specifically does the student learn?
- What does the student actively do inside the app?
- What feedback does the app provide?
- What evidence of learning does it produce?

---

**Technical checklist**

- How long does the app take to load and launch?
- Is the interface intuitive or does it require extensive explanation?
- How much physical space does the experience require?
- Is the app stable — does it crash, lag, or overheat the headset?

---

**Classroom checklist**

- What is the real duration, including setup and transitions?
- How many students can use it simultaneously?
- Does casting work reliably for observation?
- What is your Plan B if the technology fails?

> "Test every app yourself, in the same conditions your students will face, before you ever use it in class."

[IMAGE:app-evaluation]`,

  "integrating-apps-in-class": `Integrating a VR app into a lesson follows the same before-during-after structure used for any VR activity. The key addition: test the specific app yourself before class, and prepare debriefing questions tailored to what the app teaches.

> See **Module 2** for activity design and **Module 5** for briefing and debriefing frameworks.

[IMAGE:before-during-after]`,

  "tutorial-template": `Use this standard template every time you create a tutorial for a VR app. It ensures consistency and prevents you from forgetting critical information.

**Tutorial template — eight sections**

1. **App type** — exploration, simulation, guided training, evaluation, or conversational
2. **Learning objectives** — what the student will be able to do after using the app
3. **Ideal classroom duration** — total time including briefing and debrief, not just in-headset time
4. **Technical setup** — installation steps, space requirements, controller configuration, casting setup
5. **Step-by-step in-app guide** — numbered sequence of what the learner does inside the app
6. **Common errors** — mistakes learners typically make and how to address them
7. **Activity ideas** — two or three variations for different skill levels or objectives
8. **Quick checklist** — a one-page reference the instructor can hold during the session

---

> "A good tutorial means any instructor can run the session — even if they have never used the app before."`,

  "common-mistakes-apps": `These five mistakes appear repeatedly when educators first integrate VR apps into their teaching. Each one is avoidable with a simple fix.

**Mistake 1: Using an app without a learning objective**
Fix: Define the objective first, then select the app that serves it.

**Mistake 2: Choosing apps that are too long**
Fix: Cap in-headset time at 10–15 minutes; if the app is longer, select a specific section.

**Mistake 3: Not testing the app before class**
Fix: Run the full experience yourself, on the same hardware, the day before.

**Mistake 4: Not preparing students**
Fix: Brief students on what they will do and what success looks like — 60 seconds maximum.

**Mistake 5: Not closing with reflection**
Fix: Always debrief. Ask what happened, what worked, what they would change, and how it connects to real practice.

> "Every one of these mistakes has the same root cause: treating the app as the lesson instead of as a tool within the lesson."`,
};
