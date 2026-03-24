import {
  IconClock,
  IconLayers,
  IconLightbulb,
  IconTarget,
} from "./icons";

const features = [
  {
    icon: IconTarget,
    title: "Goal-Oriented Learning",
    description:
      "Each module is designed with clear objectives to help you achieve practical results quickly.",
  },
  {
    icon: IconLayers,
    title: "Connected Knowledge",
    description:
      "Bootcamp and documentation are seamlessly linked, so you can dive deeper anytime.",
  },
  {
    icon: IconClock,
    title: "Time-Efficient",
    description:
      "Curated content respects your busy schedule with estimated completion times.",
  },
  {
    icon: IconLightbulb,
    title: "Practical Focus",
    description:
      "Learn actionable strategies you can implement in your classroom immediately.",
  },
] as const;

export function DesignedForEducators() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Designed for Busy Educators
          </h2>
          <p className="mt-1 text-muted-foreground max-w-xl mx-auto">
            We understand your time is valuable. Our platform is built with clarity and efficiency in mind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 text-teal-600 mb-4">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
              <p className="mt-1 text-muted-foreground text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
