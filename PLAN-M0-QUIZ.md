# Plan: M0 Basic Foundations Quiz

## Context

M0 (Fundamentos de VR/AR/XR) is a **theoretical** module. Per curriculum, theoretical modules need: Video (2-3 min) + Quiz (10 questions). The video is out of scope (AI-voiced, created separately). This plan covers the **quiz only**.

M1 ("Getting VR Ready") is the only module with a complete bootcamp quiz. We replicate its exact patterns.

## Scope

- 10 quiz questions covering M0 documentation content (8 sections: what-is-vr, why-vr-effective, types-vr-setup, vr-use-cases, what-is-ar, ar-use-cases, when-ar-makes-sense, what-is-xr)
- Quiz definition in `app/bootcamp/quizzes.ts`
- EN translations in `messages/en.json` under `bootcamp.quiz.basicFoundations`
- ES translations in `messages/es.json` under `bootcamp.quiz.basicFoundations`
- No wizard missions needed (theoretical module)
- No changes to catalog/steps/progress (already auto-generated from documentationModules)

## Question Design Principles

From the curriculum: quiz questions should test **understanding**, not rote memorization. The existing M1 quiz uses "judgment" type questions — realistic classroom scenarios where the teacher must decide the best action. M0 is theoretical (VR/AR/XR concepts), so we'll mix:
- **judgment** questions (scenario-based, teacher deciding when/how to use VR/AR/XR) — majority
- **multiple-choice** questions (conceptual understanding) — a few where scenarios don't fit naturally

Coverage plan (10 questions across 8 sections):
1. what-is-vr — Q1: What defines VR vs other tech (conceptual)
2. why-vr-effective — Q2: Why VR works for learning (scenario: choosing VR for a reason)
3. types-vr-setup — Q3: Standalone vs PC-connected (scenario: school purchase decision)
4. vr-use-cases — Q4: Best use case for VR (scenario: teacher planning)
5. vr-use-cases — Q5: "Doing vs watching" principle (judgment)
6. what-is-ar — Q6: AR vs VR distinction (scenario: colleague asks)
7. ar-use-cases — Q7: When AR fits better (scenario: lesson planning)
8. when-ar-makes-sense — Q8: Decision rule AR vs VR (scenario)
9. when-ar-makes-sense — Q9: Collaboration requirement (judgment)
10. what-is-xr — Q10: Why use "XR" as umbrella term (conceptual)

## Tasks

### Task 1: Add quiz definition to quizzes.ts
- File: `app/bootcamp/quizzes.ts`
- Add `"basic-foundations"` entry to `moduleQuizzes` record
- 10 questions, passingScore: 0.7
- Keys follow pattern: `quiz.basicFoundations.q1.question`, `.a`, `.b`, `.c`, `.d`, `.explanation`
- All questions get `explanationKey` (improvement over M1 which has the field but no strings)

### Task 2: Add EN quiz translations to messages/en.json
- Add `basicFoundations` object inside `bootcamp.quiz`
- 10 questions × (question + 4 options + explanation) = 60 strings
- Questions must be classroom-realistic and pedagogically sound

### Task 3: Add ES quiz translations to messages/es.json
- Mirror structure from EN
- Natural Spanish (not machine-translated), adapted to Spanish education context
- Note: M1 ES quiz reorders options (e.g., correct answer is option "c" in ES but "b" in EN for same question) — we must keep option IDs matching `correctOptionId` in quizzes.ts, so option order can differ between languages but the correct ID stays the same

### Task 4: Verify build compiles
- Run `npm run build` to confirm no TypeScript or JSON errors
