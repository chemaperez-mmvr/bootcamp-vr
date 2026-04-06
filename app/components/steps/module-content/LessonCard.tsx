import { Link } from "@/i18n/navigation";
import type { useTranslations } from "next-intl";
import type { BootcampLesson } from "@/app/bootcamp/catalog";

export function LessonCard({
  lesson,
  index,
  total,
  done,
  moduleSlug,
  onToggle,
  t,
  tDocs,
}: {
  lesson: BootcampLesson;
  index: number;
  total: number;
  done: boolean;
  moduleSlug: string;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>;
  tDocs: ReturnType<typeof useTranslations>;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
            {t("lessonNumber", { current: index + 1, total })} ·{" "}
            {t(`lessonTypes.${lesson.type}`)}
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">
            {tDocs(lesson.titleKey)}
          </h2>
          <p className="mt-2 text-gray-600">{t(lesson.descriptionKey)}</p>
          <p className="mt-2 text-sm text-gray-500">
            {t("duration", { minutes: lesson.durationMin })}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/documentation/module/${moduleSlug}#${lesson.sectionId}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              {t("actions.openDocs")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            done
              ? "text-green-700 bg-green-50 hover:bg-green-100"
              : "text-white bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {done ? t("actions.completed") : t("actions.markDone")}
        </button>
      </div>
    </article>
  );
}
