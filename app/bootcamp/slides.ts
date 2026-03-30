/**
 * Slide definitions for theoretical modules.
 * First slide is always a video intro; remaining slides reinforce key concepts.
 */

export type SlidePoint = {
  key: string;
  icon: string;
};

export type VideoSlide = {
  id: string;
  type: "video";
  titleKey: string;
  subtitleKey: string;
  /** URL to the video file. When undefined, a placeholder is shown. */
  videoUrl?: string;
};

export type ContentSlide = {
  id: string;
  type: "content";
  titleKey: string;
  subtitleKey: string;
  points: SlidePoint[];
  highlightKey: string;
};

export type TheorySlide = VideoSlide | ContentSlide;

const slidesByModule: Record<string, TheorySlide[]> = {
  "basic-foundations": [
    {
      id: "video-intro",
      type: "video",
      titleKey: "slides.basicFoundations.video.title",
      subtitleKey: "slides.basicFoundations.video.subtitle",
      videoUrl: undefined, // Replace with actual URL when video is produced
    },
    {
      id: "what-is-vr",
      type: "content",
      titleKey: "slides.basicFoundations.s1.title",
      subtitleKey: "slides.basicFoundations.s1.subtitle",
      points: [
        { key: "slides.basicFoundations.s1.p1", icon: "🥽" },
        { key: "slides.basicFoundations.s1.p2", icon: "🔄" },
        { key: "slides.basicFoundations.s1.p3", icon: "🎯" },
      ],
      highlightKey: "slides.basicFoundations.s1.highlight",
    },
    {
      id: "why-vr-effective",
      type: "content",
      titleKey: "slides.basicFoundations.s2.title",
      subtitleKey: "slides.basicFoundations.s2.subtitle",
      points: [
        { key: "slides.basicFoundations.s2.p1", icon: "🧪" },
        { key: "slides.basicFoundations.s2.p2", icon: "🛡️" },
        { key: "slides.basicFoundations.s2.p3", icon: "📋" },
      ],
      highlightKey: "slides.basicFoundations.s2.highlight",
    },
    {
      id: "vr-use-cases",
      type: "content",
      titleKey: "slides.basicFoundations.s3.title",
      subtitleKey: "slides.basicFoundations.s3.subtitle",
      points: [
        { key: "slides.basicFoundations.s3.p1", icon: "🏥" },
        { key: "slides.basicFoundations.s3.p2", icon: "🔧" },
        { key: "slides.basicFoundations.s3.p3", icon: "🎓" },
        { key: "slides.basicFoundations.s3.p4", icon: "💼" },
      ],
      highlightKey: "slides.basicFoundations.s3.highlight",
    },
  ],
};

export function getSlidesForModule(moduleSlug: string): TheorySlide[] {
  return slidesByModule[moduleSlug] ?? [];
}
