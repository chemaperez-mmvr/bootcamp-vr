import type { useTranslations } from "next-intl";
import type { LearningBlockPhase } from "@/app/bootcamp/learning-block-progress";

export function BlockProgressBar({
  currentBlock,
  totalBlocks,
  currentPhase,
  hasVideo,
  videoViewed,
  allDone,
  t,
}: {
  currentBlock: number;
  totalBlocks: number;
  currentPhase: LearningBlockPhase;
  hasVideo: boolean;
  videoViewed: boolean;
  allDone: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const phaseWeight = { scenario: 0, insight: 0.33, microcheck: 0.66 };
  const videoStep = hasVideo ? 1 : 0;
  const totalSteps = videoStep + totalBlocks;

  let progress: number;
  if (allDone) {
    progress = 100;
  } else if (hasVideo && !videoViewed) {
    progress = 0;
  } else {
    const blockProgress = currentBlock + (phaseWeight[currentPhase] ?? 0);
    progress = ((videoStep + blockProgress) / totalSteps) * 100;
  }

  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-500 shrink-0 tabular-nums">
        {allDone
          ? t("learningBlocks.allBlocksComplete")
          : t("learningBlocks.blockProgress", {
              current: currentBlock + 1,
              total: totalBlocks,
            })}
      </span>
    </div>
  );
}
