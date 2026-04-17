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
  imageUrl?: string;
};

export type TheorySlide = VideoSlide | ContentSlide;

const slidesByModule: Record<string, TheorySlide[]> = {
  "basic-foundations": [
    {
      id: "video-intro",
      type: "video",
      titleKey: "slides.basicFoundations.video.title",
      subtitleKey: "slides.basicFoundations.video.subtitle",
      videoUrl: "/videos/m0-intro-{locale}.mp4",
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
      imageUrl: "/images/slides/what-is-vr.jpg",
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
      imageUrl: "/images/slides/why-vr-effective.jpg",
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
      imageUrl: "/images/slides/vr-use-cases.jpg",
    },
    {
      id: "vr-ar-xr",
      type: "content",
      titleKey: "slides.basicFoundations.s4.title",
      subtitleKey: "slides.basicFoundations.s4.subtitle",
      points: [
        { key: "slides.basicFoundations.s4.p1", icon: "🥽" },
        { key: "slides.basicFoundations.s4.p2", icon: "📱" },
        { key: "slides.basicFoundations.s4.p3", icon: "🌐" },
      ],
      highlightKey: "slides.basicFoundations.s4.highlight",
      imageUrl: "/images/slides/vr-ar-xr.png",
    },
  ],
  "getting-vr-ready": [
    {
      id: "getting-started",
      type: "content",
      titleKey: "slides.gettingVrReady.s1.title",
      subtitleKey: "slides.gettingVrReady.s1.subtitle",
      points: [
        { key: "slides.gettingVrReady.s1.p1", icon: "📦" },
        { key: "slides.gettingVrReady.s1.p2", icon: "🔋" },
        { key: "slides.gettingVrReady.s1.p3", icon: "👁️" },
      ],
      highlightKey: "slides.gettingVrReady.s1.highlight",
    },
    {
      id: "classroom-setup",
      type: "content",
      titleKey: "slides.gettingVrReady.s2.title",
      subtitleKey: "slides.gettingVrReady.s2.subtitle",
      points: [
        { key: "slides.gettingVrReady.s2.p1", icon: "🏫" },
        { key: "slides.gettingVrReady.s2.p2", icon: "📶" },
        { key: "slides.gettingVrReady.s2.p3", icon: "🛡️" },
      ],
      highlightKey: "slides.gettingVrReady.s2.highlight",
    },
    {
      id: "store-install",
      type: "content",
      titleKey: "slides.gettingVrReady.s3.title",
      subtitleKey: "slides.gettingVrReady.s3.subtitle",
      points: [
        { key: "slides.gettingVrReady.s3.p1", icon: "🏪" },
        { key: "slides.gettingVrReady.s3.p2", icon: "📲" },
        { key: "slides.gettingVrReady.s3.p3", icon: "💾" },
      ],
      highlightKey: "slides.gettingVrReady.s3.highlight",
    },
    {
      id: "casting",
      type: "content",
      titleKey: "slides.gettingVrReady.s4.title",
      subtitleKey: "slides.gettingVrReady.s4.subtitle",
      points: [
        { key: "slides.gettingVrReady.s4.p1", icon: "📺" },
        { key: "slides.gettingVrReady.s4.p2", icon: "🔗" },
        { key: "slides.gettingVrReady.s4.p3", icon: "🎬" },
      ],
      highlightKey: "slides.gettingVrReady.s4.highlight",
    },
    {
      id: "pre-class-checklist",
      type: "content",
      titleKey: "slides.gettingVrReady.s5.title",
      subtitleKey: "slides.gettingVrReady.s5.subtitle",
      points: [
        { key: "slides.gettingVrReady.s5.p1", icon: "✅" },
        { key: "slides.gettingVrReady.s5.p2", icon: "🔋" },
        { key: "slides.gettingVrReady.s5.p3", icon: "📋" },
      ],
      highlightKey: "slides.gettingVrReady.s5.highlight",
    },
  ],
  "designing-meaningful-learning": [
    {
      id: "video-intro-m2",
      type: "video",
      titleKey: "slides.designingMeaningfulLearning.video.title",
      subtitleKey: "slides.designingMeaningfulLearning.video.subtitle",
      videoUrl: "/videos/m2-intro-{locale}.mp4",
    },
    {
      id: "objectives-that-work",
      type: "content",
      titleKey: "slides.designingMeaningfulLearning.s1.title",
      subtitleKey: "slides.designingMeaningfulLearning.s1.subtitle",
      points: [
        { key: "slides.designingMeaningfulLearning.s1.p1", icon: "🎯" },
        { key: "slides.designingMeaningfulLearning.s1.p2", icon: "🧠" },
        { key: "slides.designingMeaningfulLearning.s1.p3", icon: "🚫" },
      ],
      highlightKey: "slides.designingMeaningfulLearning.s1.highlight",
    },
    {
      id: "writing-objectives",
      type: "content",
      titleKey: "slides.designingMeaningfulLearning.s2.title",
      subtitleKey: "slides.designingMeaningfulLearning.s2.subtitle",
      points: [
        { key: "slides.designingMeaningfulLearning.s2.p1", icon: "✏️" },
        { key: "slides.designingMeaningfulLearning.s2.p2", icon: "📐" },
        { key: "slides.designingMeaningfulLearning.s2.p3", icon: "📏" },
      ],
      highlightKey: "slides.designingMeaningfulLearning.s2.highlight",
    },
    {
      id: "seeing-vs-doing",
      type: "content",
      titleKey: "slides.designingMeaningfulLearning.s3.title",
      subtitleKey: "slides.designingMeaningfulLearning.s3.subtitle",
      points: [
        { key: "slides.designingMeaningfulLearning.s3.p1", icon: "👀" },
        { key: "slides.designingMeaningfulLearning.s3.p2", icon: "🤲" },
        { key: "slides.designingMeaningfulLearning.s3.p3", icon: "📊" },
      ],
      highlightKey: "slides.designingMeaningfulLearning.s3.highlight",
    },
    {
      id: "vr-session-flow",
      type: "content",
      titleKey: "slides.designingMeaningfulLearning.s4.title",
      subtitleKey: "slides.designingMeaningfulLearning.s4.subtitle",
      points: [
        { key: "slides.designingMeaningfulLearning.s4.p1", icon: "📋" },
        { key: "slides.designingMeaningfulLearning.s4.p2", icon: "🥽" },
        { key: "slides.designingMeaningfulLearning.s4.p3", icon: "💬" },
      ],
      highlightKey: "slides.designingMeaningfulLearning.s4.highlight",
    },
    {
      id: "activity-types",
      type: "content",
      titleKey: "slides.designingMeaningfulLearning.s5.title",
      subtitleKey: "slides.designingMeaningfulLearning.s5.subtitle",
      points: [
        { key: "slides.designingMeaningfulLearning.s5.p1", icon: "🔍" },
        { key: "slides.designingMeaningfulLearning.s5.p2", icon: "🔧" },
        { key: "slides.designingMeaningfulLearning.s5.p3", icon: "📝" },
      ],
      highlightKey: "slides.designingMeaningfulLearning.s5.highlight",
    },
  ],
  "classroom-implementation": [
    {
      id: "video-intro-m3",
      type: "video",
      titleKey: "slides.classroomImplementation.video.title",
      subtitleKey: "slides.classroomImplementation.video.subtitle",
      videoUrl: "/videos/m3-intro-{locale}.mp4",
    },
    {
      id: "room-setup-safety",
      type: "content",
      titleKey: "slides.classroomImplementation.s1.title",
      subtitleKey: "slides.classroomImplementation.s1.subtitle",
      points: [
        { key: "slides.classroomImplementation.s1.p1", icon: "🏫" },
        { key: "slides.classroomImplementation.s1.p2", icon: "💡" },
        { key: "slides.classroomImplementation.s1.p3", icon: "🛡️" },
      ],
      highlightKey: "slides.classroomImplementation.s1.highlight",
    },
    {
      id: "student-briefing",
      type: "content",
      titleKey: "slides.classroomImplementation.s2.title",
      subtitleKey: "slides.classroomImplementation.s2.subtitle",
      points: [
        { key: "slides.classroomImplementation.s2.p1", icon: "🗣️" },
        { key: "slides.classroomImplementation.s2.p2", icon: "👥" },
        { key: "slides.classroomImplementation.s2.p3", icon: "📋" },
      ],
      highlightKey: "slides.classroomImplementation.s2.highlight",
    },
    {
      id: "device-readiness",
      type: "content",
      titleKey: "slides.classroomImplementation.s3.title",
      subtitleKey: "slides.classroomImplementation.s3.subtitle",
      points: [
        { key: "slides.classroomImplementation.s3.p1", icon: "🔋" },
        { key: "slides.classroomImplementation.s3.p2", icon: "📶" },
        { key: "slides.classroomImplementation.s3.p3", icon: "🏷️" },
      ],
      highlightKey: "slides.classroomImplementation.s3.highlight",
    },
    {
      id: "running-the-session",
      type: "content",
      titleKey: "slides.classroomImplementation.s4.title",
      subtitleKey: "slides.classroomImplementation.s4.subtitle",
      points: [
        { key: "slides.classroomImplementation.s4.p1", icon: "🎮" },
        { key: "slides.classroomImplementation.s4.p2", icon: "📺" },
        { key: "slides.classroomImplementation.s4.p3", icon: "📝" },
      ],
      highlightKey: "slides.classroomImplementation.s4.highlight",
    },
    {
      id: "rotation-time",
      type: "content",
      titleKey: "slides.classroomImplementation.s5.title",
      subtitleKey: "slides.classroomImplementation.s5.subtitle",
      points: [
        { key: "slides.classroomImplementation.s5.p1", icon: "🔄" },
        { key: "slides.classroomImplementation.s5.p2", icon: "⏱️" },
        { key: "slides.classroomImplementation.s5.p3", icon: "🔌" },
      ],
      highlightKey: "slides.classroomImplementation.s5.highlight",
    },
  ],
  "safety-wellbeing-accessibility": [
    {
      id: "video-intro-m4",
      type: "video",
      titleKey: "slides.safetyWellbeingAccessibility.video.title",
      subtitleKey: "slides.safetyWellbeingAccessibility.video.subtitle",
      videoUrl: "/videos/m4-intro-{locale}.mp4",
    },
    {
      id: "physical-safety-space",
      type: "content",
      titleKey: "slides.safetyWellbeingAccessibility.s1.title",
      subtitleKey: "slides.safetyWellbeingAccessibility.s1.subtitle",
      points: [
        { key: "slides.safetyWellbeingAccessibility.s1.p1", icon: "🛡️" },
        { key: "slides.safetyWellbeingAccessibility.s1.p2", icon: "📏" },
        { key: "slides.safetyWellbeingAccessibility.s1.p3", icon: "⚠️" },
      ],
      highlightKey: "slides.safetyWellbeingAccessibility.s1.highlight",
    },
    {
      id: "supervision-boundaries",
      type: "content",
      titleKey: "slides.safetyWellbeingAccessibility.s2.title",
      subtitleKey: "slides.safetyWellbeingAccessibility.s2.subtitle",
      points: [
        { key: "slides.safetyWellbeingAccessibility.s2.p1", icon: "👁️" },
        { key: "slides.safetyWellbeingAccessibility.s2.p2", icon: "🚧" },
        { key: "slides.safetyWellbeingAccessibility.s2.p3", icon: "👥" },
      ],
      highlightKey: "slides.safetyWellbeingAccessibility.s2.highlight",
    },
    {
      id: "motion-sickness-response",
      type: "content",
      titleKey: "slides.safetyWellbeingAccessibility.s3.title",
      subtitleKey: "slides.safetyWellbeingAccessibility.s3.subtitle",
      points: [
        { key: "slides.safetyWellbeingAccessibility.s3.p1", icon: "🤢" },
        { key: "slides.safetyWellbeingAccessibility.s3.p2", icon: "⏱️" },
        { key: "slides.safetyWellbeingAccessibility.s3.p3", icon: "🆘" },
      ],
      highlightKey: "slides.safetyWellbeingAccessibility.s3.highlight",
    },
    {
      id: "hygiene-equipment",
      type: "content",
      titleKey: "slides.safetyWellbeingAccessibility.s4.title",
      subtitleKey: "slides.safetyWellbeingAccessibility.s4.subtitle",
      points: [
        { key: "slides.safetyWellbeingAccessibility.s4.p1", icon: "🧼" },
        { key: "slides.safetyWellbeingAccessibility.s4.p2", icon: "🔍" },
        { key: "slides.safetyWellbeingAccessibility.s4.p3", icon: "📦" },
      ],
      highlightKey: "slides.safetyWellbeingAccessibility.s4.highlight",
    },
    {
      id: "accessibility-inclusion",
      type: "content",
      titleKey: "slides.safetyWellbeingAccessibility.s5.title",
      subtitleKey: "slides.safetyWellbeingAccessibility.s5.subtitle",
      points: [
        { key: "slides.safetyWellbeingAccessibility.s5.p1", icon: "🤝" },
        { key: "slides.safetyWellbeingAccessibility.s5.p2", icon: "🔄" },
        { key: "slides.safetyWellbeingAccessibility.s5.p3", icon: "📋" },
      ],
      highlightKey: "slides.safetyWellbeingAccessibility.s5.highlight",
    },
  ],
  "briefing-and-debriefing": [
    {
      id: "video-intro-m5",
      type: "video",
      titleKey: "slides.briefingAndDebriefing.video.title",
      subtitleKey: "slides.briefingAndDebriefing.video.subtitle",
      videoUrl: "/videos/m5-intro-{locale}.mp4",
    },
    {
      id: "briefing-essentials",
      type: "content",
      titleKey: "slides.briefingAndDebriefing.s1.title",
      subtitleKey: "slides.briefingAndDebriefing.s1.subtitle",
      points: [
        { key: "slides.briefingAndDebriefing.s1.p1", icon: "🗣️" },
        { key: "slides.briefingAndDebriefing.s1.p2", icon: "🎯" },
        { key: "slides.briefingAndDebriefing.s1.p3", icon: "📋" },
      ],
      highlightKey: "slides.briefingAndDebriefing.s1.highlight",
    },
    {
      id: "what-to-explain",
      type: "content",
      titleKey: "slides.briefingAndDebriefing.s2.title",
      subtitleKey: "slides.briefingAndDebriefing.s2.subtitle",
      points: [
        { key: "slides.briefingAndDebriefing.s2.p1", icon: "✅" },
        { key: "slides.briefingAndDebriefing.s2.p2", icon: "🚫" },
        { key: "slides.briefingAndDebriefing.s2.p3", icon: "💡" },
      ],
      highlightKey: "slides.briefingAndDebriefing.s2.highlight",
    },
    {
      id: "sixty-second-briefing",
      type: "content",
      titleKey: "slides.briefingAndDebriefing.s3.title",
      subtitleKey: "slides.briefingAndDebriefing.s3.subtitle",
      points: [
        { key: "slides.briefingAndDebriefing.s3.p1", icon: "⏱️" },
        { key: "slides.briefingAndDebriefing.s3.p2", icon: "📝" },
        { key: "slides.briefingAndDebriefing.s3.p3", icon: "🚀" },
      ],
      highlightKey: "slides.briefingAndDebriefing.s3.highlight",
    },
    {
      id: "structured-debriefing",
      type: "content",
      titleKey: "slides.briefingAndDebriefing.s4.title",
      subtitleKey: "slides.briefingAndDebriefing.s4.subtitle",
      points: [
        { key: "slides.briefingAndDebriefing.s4.p1", icon: "🔍" },
        { key: "slides.briefingAndDebriefing.s4.p2", icon: "🧠" },
        { key: "slides.briefingAndDebriefing.s4.p3", icon: "📊" },
      ],
      highlightKey: "slides.briefingAndDebriefing.s4.highlight",
    },
    {
      id: "assessment-in-vr",
      type: "content",
      titleKey: "slides.briefingAndDebriefing.s5.title",
      subtitleKey: "slides.briefingAndDebriefing.s5.subtitle",
      points: [
        { key: "slides.briefingAndDebriefing.s5.p1", icon: "🎯" },
        { key: "slides.briefingAndDebriefing.s5.p2", icon: "🧩" },
        { key: "slides.briefingAndDebriefing.s5.p3", icon: "💬" },
      ],
      highlightKey: "slides.briefingAndDebriefing.s5.highlight",
    },
  ],

  /* ================================================================== */
  /*  MODULE 6 — Solving Common VR Problems                             */
  /* ================================================================== */
  "solving-common-vr-problems": [
    {
      id: "video-intro-m6",
      type: "video",
      titleKey: "slides.solvingCommonVrProblems.video.title",
      subtitleKey: "slides.solvingCommonVrProblems.video.subtitle",
      videoUrl: "/videos/m6-intro-{locale}.mp4",
    },
    {
      id: "wifi-connection",
      type: "content",
      titleKey: "slides.solvingCommonVrProblems.s1.title",
      subtitleKey: "slides.solvingCommonVrProblems.s1.subtitle",
      points: [
        { key: "slides.solvingCommonVrProblems.s1.p1", icon: "📶" },
        { key: "slides.solvingCommonVrProblems.s1.p2", icon: "🔄" },
        { key: "slides.solvingCommonVrProblems.s1.p3", icon: "🏫" },
      ],
      highlightKey: "slides.solvingCommonVrProblems.s1.highlight",
    },
    {
      id: "boundary-guardian-problems",
      type: "content",
      titleKey: "slides.solvingCommonVrProblems.s2.title",
      subtitleKey: "slides.solvingCommonVrProblems.s2.subtitle",
      points: [
        { key: "slides.solvingCommonVrProblems.s2.p1", icon: "💡" },
        { key: "slides.solvingCommonVrProblems.s2.p2", icon: "🪞" },
        { key: "slides.solvingCommonVrProblems.s2.p3", icon: "📷" },
      ],
      highlightKey: "slides.solvingCommonVrProblems.s2.highlight",
    },
    {
      id: "headset-not-turning-on",
      type: "content",
      titleKey: "slides.solvingCommonVrProblems.s3.title",
      subtitleKey: "slides.solvingCommonVrProblems.s3.subtitle",
      points: [
        { key: "slides.solvingCommonVrProblems.s3.p1", icon: "🔋" },
        { key: "slides.solvingCommonVrProblems.s3.p2", icon: "🔌" },
        { key: "slides.solvingCommonVrProblems.s3.p3", icon: "🔄" },
      ],
      highlightKey: "slides.solvingCommonVrProblems.s3.highlight",
    },
    {
      id: "casting-issues",
      type: "content",
      titleKey: "slides.solvingCommonVrProblems.s4.title",
      subtitleKey: "slides.solvingCommonVrProblems.s4.subtitle",
      points: [
        { key: "slides.solvingCommonVrProblems.s4.p1", icon: "📺" },
        { key: "slides.solvingCommonVrProblems.s4.p2", icon: "📡" },
        { key: "slides.solvingCommonVrProblems.s4.p3", icon: "🔧" },
      ],
      highlightKey: "slides.solvingCommonVrProblems.s4.highlight",
    },
    {
      id: "troubleshooting-mindset",
      type: "content",
      titleKey: "slides.solvingCommonVrProblems.s5.title",
      subtitleKey: "slides.solvingCommonVrProblems.s5.subtitle",
      points: [
        { key: "slides.solvingCommonVrProblems.s5.p1", icon: "🧘" },
        { key: "slides.solvingCommonVrProblems.s5.p2", icon: "⏱️" },
        { key: "slides.solvingCommonVrProblems.s5.p3", icon: "📋" },
      ],
      highlightKey: "slides.solvingCommonVrProblems.s5.highlight",
    },
  ],
  /* ================================================================== */
  /*  MODULE 7 — VR Educational Apps                                    */
  /* ================================================================== */
  "vr-educational-apps": [
    {
      id: "video-intro-m7",
      type: "video",
      titleKey: "slides.vrEducationalApps.video.title",
      subtitleKey: "slides.vrEducationalApps.video.subtitle",
      videoUrl: "/videos/m7-intro-{locale}.mp4",
    },
    {
      id: "what-is-educational-app",
      type: "content",
      titleKey: "slides.vrEducationalApps.s1.title",
      subtitleKey: "slides.vrEducationalApps.s1.subtitle",
      points: [
        { key: "slides.vrEducationalApps.s1.p1", icon: "🎯" },
        { key: "slides.vrEducationalApps.s1.p2", icon: "🤲" },
        { key: "slides.vrEducationalApps.s1.p3", icon: "🔄" },
      ],
      highlightKey: "slides.vrEducationalApps.s1.highlight",
    },
    {
      id: "where-to-find-apps",
      type: "content",
      titleKey: "slides.vrEducationalApps.s2.title",
      subtitleKey: "slides.vrEducationalApps.s2.subtitle",
      points: [
        { key: "slides.vrEducationalApps.s2.p1", icon: "🏪" },
        { key: "slides.vrEducationalApps.s2.p2", icon: "🧪" },
        { key: "slides.vrEducationalApps.s2.p3", icon: "🌐" },
      ],
      highlightKey: "slides.vrEducationalApps.s2.highlight",
    },
    {
      id: "simulation-apps",
      type: "content",
      titleKey: "slides.vrEducationalApps.s3.title",
      subtitleKey: "slides.vrEducationalApps.s3.subtitle",
      points: [
        { key: "slides.vrEducationalApps.s3.p1", icon: "🧪" },
        { key: "slides.vrEducationalApps.s3.p2", icon: "🛡️" },
        { key: "slides.vrEducationalApps.s3.p3", icon: "🔁" },
      ],
      highlightKey: "slides.vrEducationalApps.s3.highlight",
    },
    {
      id: "choosing-app-by-objective",
      type: "content",
      titleKey: "slides.vrEducationalApps.s4.title",
      subtitleKey: "slides.vrEducationalApps.s4.subtitle",
      points: [
        { key: "slides.vrEducationalApps.s4.p1", icon: "🗺️" },
        { key: "slides.vrEducationalApps.s4.p2", icon: "🔗" },
        { key: "slides.vrEducationalApps.s4.p3", icon: "📋" },
      ],
      highlightKey: "slides.vrEducationalApps.s4.highlight",
    },
    {
      id: "evaluating-app-before-class",
      type: "content",
      titleKey: "slides.vrEducationalApps.s5.title",
      subtitleKey: "slides.vrEducationalApps.s5.subtitle",
      points: [
        { key: "slides.vrEducationalApps.s5.p1", icon: "📝" },
        { key: "slides.vrEducationalApps.s5.p2", icon: "⚙️" },
        { key: "slides.vrEducationalApps.s5.p3", icon: "🏫" },
      ],
      highlightKey: "slides.vrEducationalApps.s5.highlight",
    },
    {
      id: "integrating-apps-in-class",
      type: "content",
      titleKey: "slides.vrEducationalApps.s6.title",
      subtitleKey: "slides.vrEducationalApps.s6.subtitle",
      points: [
        { key: "slides.vrEducationalApps.s6.p1", icon: "📋" },
        { key: "slides.vrEducationalApps.s6.p2", icon: "🥽" },
        { key: "slides.vrEducationalApps.s6.p3", icon: "💬" },
      ],
      highlightKey: "slides.vrEducationalApps.s6.highlight",
    },
  ],
};

export function getSlidesForModule(moduleSlug: string): TheorySlide[] {
  return slidesByModule[moduleSlug] ?? [];
}
