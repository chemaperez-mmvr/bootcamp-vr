/**
 * Module 7 section content (English). VR Educational Apps: Types, Uses, and Smart Selection.
 */
export const sectionsEn: Record<string, string> = {
  "what-is-educational-app": `Not every VR app is educational. Understanding the difference helps you choose wisely.

**What makes an app "educational"?**

An educational VR app is designed to support specific learning objectives through active engagement. It goes beyond passive viewing — the learner *does* something meaningful.

**How it differs from a game**

- A game prioritizes entertainment and scoring.
- An educational app prioritizes skill development, understanding, or competency.
- Some apps blur the line (gamified learning), but the key question is: *Does the student learn something transferable?*

**How it differs from a 360° video**

- A 360° video is passive — the student watches but doesn't interact.
- An educational app involves interaction, decisions, and actions.
- 360° videos can be useful for context-building, but they are not the strongest VR use case.

**Signs an app is NOT educational**

- No clear learning objective.
- No meaningful interaction (just watching or wandering).
- No feedback on student actions.
- No way to connect the experience to real-world learning.
- Entertainment is the primary purpose.`,

  "where-to-find-apps": `VR educational apps can be found through several channels. Knowing where to look saves time and avoids frustration.

**Official Meta Store**

- The primary marketplace for Meta Quest apps: [Meta Horizon Store](https://www.meta.com/experiences/)
- Apps here have been reviewed and approved by Meta.
- Search for educational categories or use curated lists.
- You can also browse and purchase apps from a computer and they will download to your headset.

**App Lab**

- A secondary distribution channel for Meta Quest: [App Lab on Meta Quest](https://www.meta.com/experiences/section/app-lab/)
- Apps are not fully listed in the main store — you access them via direct link or invitation.
- Widely used in education because many specialized apps launch here first.
- Installation: receive link → accept → app installs on the headset linked to that account.
- You can also discover App Lab apps through third-party directories like [SideQuest](https://sidequestvr.com/).

**Private / Institutional Apps**

- Some organizations develop custom VR apps for internal training.
- These are distributed through [Meta Horizon Managed Services](https://work.meta.com/) or sideloading.
- Typically require institutional accounts and admin setup.

**WebXR Apps**

- VR experiences that run in the headset's web browser — no installation required.
- Built on the [WebXR standard](https://immersiveweb.dev/), supported by most modern VR headsets.
- Growing ecosystem, though performance may be lower than native apps.
- Useful for quick demonstrations or when you can't install apps.
- Explore WebXR experiences at directories like [WebXR Experiments](https://experiments.withgoogle.com/collection/webxr).`,

  "exploration-apps": `Exploration apps let learners observe, navigate, and discover virtual environments.

**What they are**

- Environments designed for observing, exploring, and building spatial understanding.
- Students move through a space with a specific observational purpose.

**Best used for**

- Introducing a topic — give students context before diving into theory.
- Contextualizing learning — place students in an environment they can't visit physically (a historical site, the human body, outer space).
- Activating prior knowledge — let students explore and connect what they already know.

**When to use them**

- Beginning of a unit or lesson.
- With large groups (easy to rotate, low complexity).
- When time is limited — exploration can be short and still effective.

**Common risks**

- **Passive use:** Students wander without purpose. Always pair exploration with a task or guided questions.
- **"Museum effect":** Students look around but don't engage deeply. Give them something specific to find, observe, or answer.`,

  "simulation-apps": `Simulation apps reproduce real-world situations with interaction and consequences. This is the strongest VR use case for education.

**What they are**

- Digital reproductions of realistic scenarios.
- Students interact with the environment and their actions have consequences.
- Designed for practicing skills in a safe, repeatable context.

**Best used for**

- Safe practice — make mistakes without real-world consequences.
- Procedural training — learn step-by-step processes (medical procedures, equipment operation, safety protocols).
- Decision-making — respond to realistic situations where choices matter.

**When to use them**

- When teaching practical skills.
- In professional training (healthcare, industry, emergency services).
- When real-world practice is dangerous, expensive, or logistically impossible.

**Why this is the strongest VR use case**

- High transfer to real-world performance — students practice *doing*, not just watching.
- Active learning — engagement is inherent in the experience.
- Measurable outcomes — performance can be observed and assessed.

**Common risks**

- **Lack of briefing:** Students jump in without understanding the learning goal.
- **No debriefing:** The experience ends without reflection, so learning doesn't stick.`,

  "guided-training-apps": `Guided training apps walk learners through step-by-step processes with immediate feedback.

**What they are**

- Structured, sequential experiences where students follow a defined path.
- Each step provides feedback (correct/incorrect, next instruction).
- The learning path is closed — there's a specific way to complete the task.

**Best used for**

- Initial skill learning — students learn the correct sequence before practicing freely.
- Standards and protocols — ensure students know the "right way" before introducing variations.
- Basic assessment — check if students can follow the correct procedure.

**When to use them**

- First contact with a new procedure or skill.
- When compliance with a specific protocol is required.
- For basic certification or competency checks.

**Relationship to simulation apps**

Guided training is often a precursor to simulation. Students learn the steps (guided training), then practice applying them in realistic scenarios (simulation).`,

  "evaluation-apps": `Evaluation apps use VR to assess whether learners can perform tasks or make correct decisions.

**What they are**

- Apps that record student actions and generate performance data.
- May include automatic metrics (time, accuracy, errors) or structured observation points.
- Results are objective and measurable.

**Best used for**

- Assessing competencies at the end of a learning unit.
- Validating skills before certification or real-world practice.
- Providing evidence of learning for institutional or regulatory purposes.

**When to use them**

- End of a module or training program.
- Practical exams or skill checks.
- When objective, repeatable assessment is needed.

**Key considerations**

- Evaluation apps should measure skills that were actually taught and practiced.
- Combine VR assessment data with debriefing insights for a complete picture.
- Ensure students have had sufficient practice before using VR for evaluation.`,

  "communication-soft-skills-apps": `Communication and soft skills apps simulate interpersonal interactions using avatars or AI-driven characters.

**What they are**

- Simulated conversations with virtual characters.
- Students make communicative choices (what to say, how to respond, tone and body language).
- Designed to practice interpersonal and professional skills.

**Best used for**

- Communication training — practice difficult conversations in a safe space.
- Customer service — handle complaints, requests, and emotional situations.
- Interview preparation — practice job interviews with realistic feedback.
- Patient or client interaction — healthcare, counseling, social work scenarios.

**When to use them**

- When interpersonal skills are a key learning objective.
- When real role-play is difficult to organize or students feel too self-conscious.
- As preparation before real-world interactions.

**Key considerations**

- AI-driven characters vary in quality — test the app thoroughly before using it in class.
- Debrief communication exercises carefully, focusing on *why* certain responses work better than others.`,

  "choosing-app-by-objective": `Choosing the right app type based on your learning objective prevents the common mistake of using a "pretty but useless" app.

**Decision map: Objective → App type**

- **Introduce a topic** → Exploration app
- **Practice a procedure** → Simulation app
- **Learn a protocol step by step** → Guided training app
- **Evaluate skills or competencies** → Evaluation / Skill check app
- **Practice communication** → Conversational / Soft skills app

**Examples by sector**

**Healthcare**
- Exploration: Virtual anatomy lab
- Simulation: Emergency response scenario
- Guided training: Surgical hand hygiene protocol
- Evaluation: Patient triage assessment

**Vocational training (FP)**
- Exploration: Industrial plant tour
- Simulation: Equipment operation practice
- Guided training: Safety procedure walkthrough
- Evaluation: Practical skills certification

**Secondary education**
- Exploration: Historical site visit
- Simulation: Science lab experiment
- Guided training: Step-by-step chemistry procedure

**Corporate training**
- Exploration: Company orientation tour
- Simulation: Crisis management scenario
- Communication: Customer service training`,

  "evaluating-app-before-class": `Before using any VR app in class, evaluate it systematically. This prevents wasted time and frustration.

**Pedagogical checklist**

- **What does the student learn?** Can you clearly state the learning objective the app supports?
- **What does the student actually do?** Is the interaction meaningful or just clicking through screens?
- **What feedback does the student receive?** Does the app tell students if they're doing well or making mistakes?
- **What evidence remains?** Can you capture or observe learning outcomes (scores, recordings, observations)?

**Technical checklist**

- **Loading time:** Does the app load quickly enough for classroom use (under 30 seconds)?
- **Ease of use:** Can students navigate without extensive instructions?
- **Space requirements:** Does the app work in your available space (seated, standing, room-scale)?
- **Stability:** Does the app crash or freeze? Test it fully before class.

**Classroom checklist**

- **Real duration:** How long does one complete run take? Does it fit your session schedule?
- **Number of students:** Can multiple students use it simultaneously or does it require rotation?
- **Casting needed:** Does the app support casting for observers?
- **Backup plan:** What will you do if the app fails? Always have a non-VR alternative ready.`,

  "integrating-apps-in-class": `Moving from "using an app" to "teaching a class with VR" requires intentional integration into the lesson structure.

**Before VR**

- State the learning objective clearly — students should know *why* they're entering VR.
- Explain the task — keep it brief and specific (60-second briefing).
- Do NOT explain every feature of the app — only what's needed for the task.

**During VR**

- **What the instructor observes:** Student engagement, correct/incorrect actions, signs of confusion or discomfort.
- **What other students do:** Active observation via casting, guided questions, complementary tasks.
- **When to intervene:** Only if a student is stuck, confused, or in distress. Avoid interrupting the flow unnecessarily.

**After VR**

- **Debriefing specific to the app type:**
  - Exploration apps → "What did you notice? What surprised you?"
  - Simulation apps → "What decisions did you make? What would you change?"
  - Evaluation apps → "How did you perform? Where do you need more practice?"
- **Transfer activity:** Connect the VR experience to real-world application through discussion, writing, or additional practice.`,

  "tutorial-template": `Every VR app used in your program should have a standardized tutorial. This template makes it easy to document and share app-specific guidance.

**Standard tutorial structure**

1. **App type:** What kind of app is it? (exploration, simulation, guided training, evaluation, communication)
2. **Learning objectives:** What objectives does this app support?
3. **Ideal classroom duration:** How long should students spend in the app per session?
4. **Technical preparation:** What needs to be set up before class? (downloads, accounts, settings, space)
5. **Step-by-step guide:** Basic instructions for using the app in class.
6. **Common errors:** Known issues, bugs, or confusing points — and how to handle them.
7. **Activity ideas:** Suggested learning activities built around the app.
8. **Quick checklist:** A scannable pre-class verification list.

**Example tutorial outline**

- Introduction — What is this app and why use it?
- Preparation — Technical setup and requirements.
- Basic use — Core features and navigation.
- Advanced use (optional) — Features for experienced users.
- Model activity — A complete lesson plan using this app.
- Assessment — How to evaluate student performance with this app.

This template ensures consistency across all apps in your VR program and makes it easy for new instructors to get started.`,

  "common-mistakes-apps": `Avoid these common mistakes when using VR apps in education. They're easy to make but equally easy to prevent.

**Using apps without a clear objective**

The app looks impressive, but if there's no learning goal, it's entertainment, not education. Always start with the objective, then choose the app.

**Using apps that are too long**

If a single app session takes 30+ minutes, it probably doesn't fit a typical classroom rotation. Look for experiences that can be completed in 5–15 minutes.

**Not testing the app before class**

Surprises during class waste time and damage credibility. Always do a full run-through of any app before using it with students.

**Not preparing students**

Jumping into VR without a briefing leads to confusion, aimless exploration, and missed learning. A 60-second briefing prevents this.

**Not closing with reflection**

Without debriefing, the VR experience stays as an isolated event with no lasting learning impact. Even a 2-minute debrief is better than nothing.

**Choosing novelty over fit**

The newest or most visually impressive app isn't always the best choice. Prioritize apps that align with your specific learning objectives, even if they look simpler.`,
};
