import { IconGraduationCap } from "@/app/components/icons";

export function CompletionCard({
  onContinue,
  t,
}: {
  onContinue: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-center animate-content-enter">
      <div className="flex justify-center mb-4">
        <IconGraduationCap className="w-10 h-10 text-teal-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {t("learningBlocks.allBlocksComplete")}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {t("learningBlocks.allBlocksCompleteDesc")}
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        {t("learningBlocks.continueToQuiz")}
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}
