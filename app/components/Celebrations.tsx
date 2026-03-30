"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CelebrationContextType = {
  fireConfetti: () => void;
  showXPGain: (amount: number) => void;
  showLevelUp: (levelName: string) => void;
  showBadgeToast: (badge: { icon: string; name: string }) => void;
};

const CelebrationContext = createContext<CelebrationContextType | null>(null);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------------------------------------------ */
/*  Keyframe styles (injected once)                                    */
/* ------------------------------------------------------------------ */

const STYLE_ID = "celebration-keyframes";

const keyframes = `
@keyframes cel-float-up {
  0%   { opacity: 1; transform: translateY(0) scale(1); }
  60%  { opacity: 1; transform: translateY(-80px) scale(1.15); }
  100% { opacity: 0; transform: translateY(-140px) scale(0.9); }
}
@keyframes cel-float-up-reduced {
  0%   { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes cel-scale-pulse {
  0%   { opacity: 0; transform: scale(0.3); }
  50%  { opacity: 1; transform: scale(1.12); }
  70%  { transform: scale(0.95); }
  100% { transform: scale(1); }
}
@keyframes cel-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes cel-sparkle {
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50%      { opacity: 1; transform: scale(1) rotate(180deg); }
}
@keyframes cel-slide-in-right {
  0%   { opacity: 0; transform: translateX(120%); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes cel-slide-out-right {
  0%   { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(120%); }
}
@keyframes cel-bounce-in {
  0%   { transform: scale(0); }
  50%  { transform: scale(1.3); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}
@keyframes cel-border-shimmer {
  0%   { border-color: #fbbf24; }
  33%  { border-color: #f59e0b; }
  66%  { border-color: #fcd34d; }
  100% { border-color: #fbbf24; }
}
@keyframes cel-star-orbit {
  0%   { transform: rotate(0deg) translateX(100px) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); opacity: 0; }
}
`;

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = keyframes;
  document.head.appendChild(style);
}

/* ------------------------------------------------------------------ */
/*  Confetti colors                                                    */
/* ------------------------------------------------------------------ */

const CONFETTI_COLORS = ["#00a8ab", "#fbbf24", "#8b5cf6"];

/* ------------------------------------------------------------------ */
/*  XP Flyup Component                                                 */
/* ------------------------------------------------------------------ */

function XPFlyup({ amount, onDone }: { amount: number; onDone: () => void }) {
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(onDone, reduced ? 1200 : 1800);
    return () => clearTimeout(timer);
  }, [onDone, reduced]);

  return (
    <div
      style={{
        position: "fixed",
        top: "15%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10001,
        pointerEvents: "none",
        animation: reduced
          ? "cel-float-up-reduced 1.2s ease-out forwards"
          : "cel-float-up 1.8s ease-out forwards",
        fontSize: "2.5rem",
        fontWeight: 800,
        color: "#fbbf24",
        textShadow:
          "0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4), 0 2px 4px rgba(0,0,0,0.3)",
        letterSpacing: "0.05em",
        userSelect: "none",
      }}
    >
      +{amount} XP
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Level-Up Overlay Component                                         */
/* ------------------------------------------------------------------ */

const SPARKLE_POSITIONS = [
  { delay: 0, size: 24, offset: 0 },
  { delay: 0.3, size: 18, offset: 60 },
  { delay: 0.6, size: 22, offset: 120 },
  { delay: 0.15, size: 16, offset: 180 },
  { delay: 0.45, size: 20, offset: 240 },
  { delay: 0.75, size: 14, offset: 300 },
];

function LevelUpOverlay({
  levelName,
  onDone,
}: {
  levelName: string;
  onDone: () => void;
}) {
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(onDone, reduced ? 1500 : 3000);
    return () => clearTimeout(timer);
  }, [onDone, reduced]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10002,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        pointerEvents: "auto",
      }}
      onClick={onDone}
      role="dialog"
      aria-label="Level up celebration"
    >
      {/* Orbiting sparkles */}
      {!reduced &&
        SPARKLE_POSITIONS.map((sp, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: sp.size,
              height: sp.size,
              marginTop: -sp.size / 2,
              marginLeft: -sp.size / 2,
              animation: `cel-star-orbit 2.5s ${sp.delay}s ease-in-out infinite`,
              transformOrigin: "center center",
              fontSize: sp.size,
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            ✨
          </div>
        ))}

      {/* LEVEL UP label */}
      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#fbbf24",
          marginBottom: "0.5rem",
          textShadow: "0 0 12px rgba(251,191,36,0.6)",
          animation: reduced ? "none" : "cel-scale-pulse 0.8s ease-out forwards",
        }}
      >
        ⬆ LEVEL UP ⬆
      </div>

      {/* Level name with golden shimmer */}
      <div
        style={{
          fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          textAlign: "center",
          padding: "0 1rem",
          background: "linear-gradient(90deg, #fbbf24 0%, #fde68a 25%, #ffffff 50%, #fde68a 75%, #fbbf24 100%)",
          backgroundSize: "200% auto",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: reduced
            ? "none"
            : "cel-scale-pulse 0.8s ease-out forwards, cel-shimmer 2s linear infinite",
          filter: "drop-shadow(0 0 30px rgba(251,191,36,0.5))",
        }}
      >
        {levelName}
      </div>

      {/* Additional sparkles below */}
      {!reduced && (
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          {["⭐", "🌟", "⭐"].map((star, i) => (
            <span
              key={i}
              style={{
                fontSize: "2rem",
                animation: `cel-sparkle 1.2s ${i * 0.3}s ease-in-out infinite`,
              }}
            >
              {star}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge Toast Component                                              */
/* ------------------------------------------------------------------ */

function BadgeToast({
  badge,
  onDone,
}: {
  badge: { icon: string; name: string };
  onDone: () => void;
}) {
  const [exiting, setExiting] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const exitTimer = setTimeout(
      () => setExiting(true),
      reduced ? 3000 : 3500
    );
    const doneTimer = setTimeout(onDone, reduced ? 3200 : 4000);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone, reduced]);

  return (
    <div
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 10003,
        maxWidth: "24rem",
        width: "calc(100vw - 3rem)",
        borderRadius: "1rem",
        border: "3px solid #fbbf24",
        backgroundColor: "rgba(255, 255, 255, 0.97)",
        boxShadow:
          "0 0 20px rgba(251,191,36,0.3), 0 10px 40px rgba(0,0,0,0.15)",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        animation: reduced
          ? "none"
          : exiting
          ? "cel-slide-out-right 0.5s ease-in forwards"
          : "cel-slide-in-right 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, cel-border-shimmer 1.5s linear infinite",
        cursor: "pointer",
      }}
      onClick={onDone}
      role="alert"
    >
      {/* Badge icon */}
      <div
        style={{
          fontSize: "2.5rem",
          lineHeight: 1,
          flexShrink: 0,
          animation: reduced ? "none" : "cel-bounce-in 0.6s 0.3s ease-out both",
        }}
      >
        {badge.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#d97706",
            marginBottom: "0.15rem",
          }}
        >
          🏆 New Badge!
        </div>
        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#1f2937",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {badge.name}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [xpFlyups, setXpFlyups] = useState<{ id: number; amount: number }[]>(
    []
  );
  const [levelUp, setLevelUp] = useState<string | null>(null);
  const [badgeToast, setBadgeToast] = useState<{
    icon: string;
    name: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const idRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    ensureStyles();
    setMounted(true);
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  /* ---------- fireConfetti ---------- */

  const fireConfetti = useCallback(() => {
    if (prefersReducedMotion()) return;

    const defaults: confetti.Options = {
      colors: CONFETTI_COLORS,
      ticks: 200,
      gravity: 0.9,
      decay: 0.92,
      startVelocity: 35,
      shapes: ["square", "circle"],
      scalar: 1.1,
    };

    // Burst 1 — left
    confetti({
      ...defaults,
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0.15, y: 0.6 },
    });

    // Burst 2 — right (staggered 200ms)
    const t1 = setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 0.85, y: 0.6 },
      });
    }, 200);

    // Burst 3 — center (staggered 400ms)
    const t2 = setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 100,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        startVelocity: 45,
      });
    }, 400);

    // Burst 4 — top shower (staggered 600ms)
    const t3 = setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 60,
        angle: 270,
        spread: 140,
        origin: { x: 0.5, y: -0.1 },
        startVelocity: 25,
        gravity: 1.2,
      });
    }, 600);

    timersRef.current.push(t1, t2, t3);
  }, []);

  /* ---------- showXPGain ---------- */

  const showXPGain = useCallback((amount: number) => {
    const id = ++idRef.current;
    setXpFlyups((prev) => [...prev, { id, amount }]);
  }, []);

  const removeXPFlyup = useCallback((id: number) => {
    setXpFlyups((prev) => prev.filter((f) => f.id !== id));
  }, []);

  /* ---------- showLevelUp ---------- */

  const showLevelUp = useCallback((levelName: string) => {
    setLevelUp(levelName);
  }, []);

  const dismissLevelUp = useCallback(() => {
    setLevelUp(null);
  }, []);

  /* ---------- showBadgeToast ---------- */

  const showBadgeToast = useCallback(
    (badge: { icon: string; name: string }) => {
      setBadgeToast(badge);
    },
    []
  );

  const dismissBadgeToast = useCallback(() => {
    setBadgeToast(null);
  }, []);

  /* ---------- Context value ---------- */

  const value: CelebrationContextType = {
    fireConfetti,
    showXPGain,
    showLevelUp,
    showBadgeToast,
  };

  return (
    <CelebrationContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <>
            {xpFlyups.map((f) => (
              <XPFlyup
                key={f.id}
                amount={f.amount}
                onDone={() => removeXPFlyup(f.id)}
              />
            ))}
            {levelUp !== null && (
              <LevelUpOverlay levelName={levelUp} onDone={dismissLevelUp} />
            )}
            {badgeToast !== null && (
              <BadgeToast badge={badgeToast} onDone={dismissBadgeToast} />
            )}
          </>,
          document.body
        )}
    </CelebrationContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useCelebration(): CelebrationContextType {
  const ctx = useContext(CelebrationContext);
  if (!ctx) {
    throw new Error(
      "useCelebration must be used within a <CelebrationProvider>"
    );
  }
  return ctx;
}
