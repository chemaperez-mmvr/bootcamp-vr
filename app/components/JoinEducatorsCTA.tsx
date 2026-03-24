import Link from "next/link";
import { IconPeople } from "./icons";

export function JoinEducatorsCTA() {
  return (
    <section className="py-16 sm:py-24 bg-teal-500">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 text-white mb-6">
          <IconPeople className="w-8 h-8" />
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Join Thousands of Educators
        </h2>
        <p className="mt-4 text-teal-100">
          Start your VR education journey today. No technical expertise required.
        </p>
        <Link
          href="/bootcamp"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-base font-medium text-teal-500 bg-white rounded-lg hover:bg-teal-50 transition-colors shadow-sm"
        >
          Start the Bootcamp
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
