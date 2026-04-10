"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { TheorySlide, ContentSlide } from "@/app/bootcamp/slides";
import type {
  LearningBlockSetDef,
  LearningBlockChoice,
} from "@/app/bootcamp/learning-block-types";
import {
  getLearningBlockProgress,
  initLearningBlockProgress,
  saveLearningBlockResult,
  updateLearningBlockPhase,
  incrementMicroCheckRetries,
  completeLearningBlocks,
  type LearningBlockPhase,
} from "@/app/bootcamp/learning-block-progress";
import { VideoSlideContent } from "@/app/components/slides/VideoSlideContent";
import {
  ENCOURAGE_KEYS,
  ENCOURAGE_PROBABILITY,
} from "@/app/bootcamp/tone-styles";
import {
  BlockProgressBar,
  ScenarioCard,
  InsightCard,
  MicroCheckCard,
  MatchingCard,
  OrderingCard,
  CompletionCard,
  MythBustersCard,
  MemoryMatchCard,
  ConceptMapCard,
  TroubleshootingCard,
  ClassroomPlannerCard,
  TriageSortCard,
  FillGapsCard,
  DecisionTreeCard,
  LessonPlanBuilderCard,
  ResourceAllocationCard,
} from "./learning-block";

/* ================================================================== */
/*  Main LearningBlockStep Component                                   */
/* ================================================================== */

export function LearningBlockStep({
  moduleSlug,
  blockSet,
  slides,
  onComplete,
}: {
  moduleSlug: string;
  blockSet: LearningBlockSetDef;
  slides: TheorySlide[];
  onComplete: () => void;
}) {
  const t = useTranslations("bootcamp");
  const totalBlocks = blockSet.blocks.length;

  // Find video slide if defined
  const videoSlide = useMemo(
    () =>
      blockSet.videoSlideId
        ? slides.find((s) => s.id === blockSet.videoSlideId && s.type === "video")
        : null,
    [blockSet.videoSlideId, slides]
  );
  const hasVideo = Boolean(videoSlide);

  // State
  const [videoViewed, setVideoViewed] = useState(!hasVideo);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<LearningBlockPhase>("scenario");
  const [insightEmphasis, setInsightEmphasis] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [encourageKey, setEncourageKey] = useState<string | null>(null);

  // Restore progress on mount
  useEffect(() => {
    const saved = getLearningBlockProgress(moduleSlug);
    if (saved) {
      if (saved.completed) {
        setAllDone(true);
        setVideoViewed(true);
        return;
      }
      setCurrentBlock(saved.currentBlockIndex);
      setCurrentPhase(saved.currentPhase);
      setVideoViewed(true); // If they have progress, they've seen the video
    } else {
      initLearningBlockProgress(moduleSlug);
    }
  }, [moduleSlug]);

  // Helper: show encouragement between blocks
  const maybeEncourage = useCallback(() => {
    if (Math.random() < ENCOURAGE_PROBABILITY) {
      const key =
        ENCOURAGE_KEYS[Math.floor(Math.random() * ENCOURAGE_KEYS.length)];
      setEncourageKey(key);
      setTimeout(() => setEncourageKey(null), 1500);
    }
  }, []);

  // Helper: advance to a phase and persist
  const goToPhase = useCallback(
    (blockIndex: number, phase: LearningBlockPhase) => {
      setCurrentBlock(blockIndex);
      setCurrentPhase(phase);
      setInsightEmphasis(false);
      updateLearningBlockPhase(moduleSlug, blockIndex, phase);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [moduleSlug]
  );

  // Whether current block uses the new exercise system
  const hasExercise = Boolean(blockSet.blocks[currentBlock]?.exercise);

  // Exercise complete handler (matching/ordering passed)
  const handleExercisePass = useCallback(() => {
    const block = blockSet.blocks[currentBlock];
    if (!block) return;

    saveLearningBlockResult(moduleSlug, {
      blockId: block.blockId,
      phase: "scenario",
      wasCorrect: true,
    });

    // Skip insight concept scenarios, go straight to key takeaway then microcheck
    goToPhase(currentBlock, "insight");
  }, [moduleSlug, blockSet.blocks, currentBlock, goToPhase]);

  // Scenario complete handler (legacy A/B/C — used when no exercise)
  const handleScenarioChoice = useCallback(
    (choice: LearningBlockChoice) => {
      const block = blockSet.blocks[currentBlock];
      if (!block) return;

      saveLearningBlockResult(moduleSlug, {
        blockId: block.blockId,
        phase: "scenario",
        choiceId: choice.id,
        wasCorrect: choice.isCorrect,
      });

      goToPhase(currentBlock, "insight");
    },
    [moduleSlug, blockSet.blocks, currentBlock, goToPhase]
  );

  // Insight continue handler
  const handleInsightContinue = useCallback(() => {
    goToPhase(currentBlock, "microcheck");
  }, [currentBlock, goToPhase]);

  // Micro-check pass handler
  const handleMicroCheckPass = useCallback(() => {
    const block = blockSet.blocks[currentBlock];
    if (!block) return;

    saveLearningBlockResult(moduleSlug, {
      blockId: block.blockId,
      phase: "microcheck",
      wasCorrect: true,
    });

    const nextBlock = currentBlock + 1;
    if (nextBlock >= totalBlocks) {
      completeLearningBlocks(moduleSlug);
      setAllDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      maybeEncourage();
      goToPhase(nextBlock, "scenario");
    }
  }, [moduleSlug, blockSet.blocks, currentBlock, totalBlocks, goToPhase, maybeEncourage]);

  // Micro-check fail handler — just count retries, MicroCheckCard handles showing corrections and continuing
  const handleMicroCheckFail = useCallback(() => {
    incrementMicroCheckRetries(moduleSlug);
  }, [moduleSlug]);

  // Resolve current block and its insight slide
  const block = blockSet.blocks[currentBlock];
  const insightSlide = useMemo(
    () =>
      block
        ? (slides.find(
            (s) => s.id === block.insightSlideId && s.type === "content"
          ) as ContentSlide | undefined)
        : undefined,
    [block, slides]
  );

  // Block step indicators (topic dots)
  const blockDots = (
    <div className="flex items-center justify-center gap-2 mb-4">
      {blockSet.blocks.map((b, i) => (
        <div
          key={b.blockId}
          className="flex items-center gap-2"
        >
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              i === currentBlock && !allDone
                ? "bg-teal-100 text-teal-700 ring-2 ring-teal-300"
                : i < currentBlock || allDone
                  ? "bg-teal-50 text-teal-600"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            <span>{i + 1}</span>
            {i < currentBlock || allDone ? (
              <span className="text-teal-500">✓</span>
            ) : null}
          </div>
          {i < blockSet.blocks.length - 1 && (
            <div
              className={`w-4 h-0.5 ${
                i < currentBlock || allDone ? "bg-teal-300" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <BlockProgressBar
        currentBlock={currentBlock}
        totalBlocks={totalBlocks}
        currentPhase={currentPhase}
        hasVideo={hasVideo}
        videoViewed={videoViewed}
        allDone={allDone}
        t={t}
      />

      {/* Block topic dots */}
      {blockDots}

      {/* Encouragement toast */}
      {encourageKey && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-wizard-encourage">
          <div className="px-5 py-2.5 rounded-full bg-white shadow-lg border border-gray-200 text-sm font-semibold text-teal-700">
            {t(encourageKey)}
          </div>
        </div>
      )}

      {/* Video intro (shown once before blocks) */}
      {!videoViewed && videoSlide && videoSlide.type === "video" && (
        <div className="space-y-4 animate-content-enter">
          <VideoSlideContent slide={videoSlide} t={t} />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setVideoViewed(true)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("learningBlocks.continueToNext")}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}

      {/* DEV: Skip button */}
      {videoViewed && !allDone && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (currentPhase === "scenario") handleExercisePass();
              else if (currentPhase === "insight") handleInsightContinue();
              else if (currentPhase === "microcheck") handleMicroCheckPass();
            }}
            className="px-3 py-1 text-xs font-mono text-gray-400 border border-dashed border-gray-300 rounded-lg hover:text-gray-600 hover:border-gray-400 transition-colors"
          >
            Skip {currentPhase} →
          </button>
        </div>
      )}

      {/* Scenario / Exercise phase */}
      {videoViewed && !allDone && currentPhase === "scenario" && block && (
        <>
          {block.exercise?.type === "matching" && (
            <MatchingCard
              key={`matching-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "ordering" && (
            <OrderingCard
              key={`ordering-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "mythBusters" && (
            <MythBustersCard
              key={`myth-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "memoryMatch" && (
            <MemoryMatchCard
              key={`memory-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "conceptMap" && (
            <ConceptMapCard
              key={`cmap-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "troubleshooting" && (
            <TroubleshootingCard
              key={`trouble-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "classroomPlanner" && (
            <ClassroomPlannerCard
              key={`planner-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "triageSort" && (
            <TriageSortCard
              key={`triage-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "fillGaps" && (
            <FillGapsCard
              key={`fill-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "decisionTree" && (
            <DecisionTreeCard
              key={`dtree-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "lessonPlanBuilder" && (
            <LessonPlanBuilderCard
              key={`lesson-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {block.exercise?.type === "resourceAllocation" && (
            <ResourceAllocationCard
              key={`resource-${block.blockId}`}
              exercise={block.exercise}
              onPass={handleExercisePass}
              t={t}
            />
          )}
          {!block.exercise && (
            <ScenarioCard
              key={`scenario-${block.blockId}`}
              block={block}
              onChoiceMade={handleScenarioChoice}
              t={t}
            />
          )}
        </>
      )}

      {/* Insight phase — key takeaway only when exercise exists, full insight when legacy */}
      {videoViewed && !allDone && currentPhase === "insight" && insightSlide && (
        <>
          {block?.exercise ? (
            /* Exercise flow: show only key takeaway, skip concept scenarios */
            <div className="space-y-4 animate-content-enter">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 px-5 py-5 sm:px-6">
                  <h3 className="text-lg font-semibold text-white">
                    {t(insightSlide.titleKey)}
                  </h3>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-amber-600 shrink-0 mt-0.5">💡</span>
                      <div>
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                          {t("learningBlocks.insightKeyTakeaway")}
                        </span>
                        <p className="mt-1 text-sm font-semibold text-amber-900 leading-relaxed">
                          {t(insightSlide.highlightKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleInsightContinue}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {t("learningBlocks.continueToCheck")}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          ) : (
            /* Legacy flow: concept scenarios + key takeaway */
            <InsightCard
              key={`insight-${block?.blockId}-${insightEmphasis}`}
              block={block!}
              slide={insightSlide}
              emphasis={insightEmphasis}
              onContinue={handleInsightContinue}
              t={t}
            />
          )}
        </>
      )}

      {/* Micro-check phase */}
      {videoViewed && !allDone && currentPhase === "microcheck" && block && (
        <MicroCheckCard
          key={`microcheck-${block.blockId}-${insightEmphasis}`}
          questions={block.microChecks}
          onPass={handleMicroCheckPass}
          onFail={handleMicroCheckFail}
          t={t}
        />
      )}

      {/* All blocks complete */}
      {allDone && <CompletionCard onContinue={onComplete} t={t} />}
    </div>
  );
}
