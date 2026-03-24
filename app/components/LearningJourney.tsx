import Link from "next/link";

const modules = [
  { title: "Fundamentals of VR", time: "30 min" },
  { title: "Hardware & Setup", time: "45 min" },
  { title: "Pedagogical Design", time: "60 min" },
  { title: "Classroom Implementation", time: "45 min" },
] as const;

export function LearningJourney() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Your Learning Journey
            </h2>
            <p className="mt-1 text-muted-foreground">
              Preview what you&apos;ll learn in the Bootcamp.
            </p>
          </div>
          <Link
            href="/bootcamp"
            className="inline-flex items-center gap-1 text-teal-600 font-medium hover:text-teal-700 transition-colors shrink-0"
          >
            View Full Curriculum
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod, i) => (
            <Link
              key={mod.title}
              href="/bootcamp"
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-teal-200 transition-all"
            >
              <span className="text-sm font-medium text-teal-600">Module {i + 1}</span>
              <h3 className="mt-2 text-base font-semibold text-foreground">{mod.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{mod.time}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
