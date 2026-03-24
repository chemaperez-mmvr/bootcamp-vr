"use client";

import { Children, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const MAX_BLUR_PX = 14;
const HERO_VIDEO_SRC = "/hero-video.mp4";

// Suaviza la progresión (ease-out: empieza rápido y se suaviza al final)
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function HeroSection({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (prefersReducedMotion) {
      if (background) {
        background.style.transform = "none";
        background.style.filter = "none";
      }
      return;
    }

    const updateEffects = () => {
      const section = sectionRef.current;
      const bg = backgroundRef.current;
      if (!section || !bg) return;
      const rect = section.getBoundingClientRect();
      const height = rect.height;
      const top = rect.top;
      // Progreso 0 = hero recién visible; 1 = hero completamente salido por arriba → blur máximo
      const raw = height > 0 ? Math.min(1, Math.max(0, -top / height)) : 0;
      const scrollY = window.scrollY;
      const blurPx = easeOutCubic(raw) * MAX_BLUR_PX;

      bg.style.transform = `translateY(${scrollY * 0.35}px)`;
      bg.style.filter = `blur(${blurPx}px)`;
      rafRef.current = null;
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(updateEffects);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center -mt-16 pt-24 sm:pt-32 lg:pt-48 pb-24 sm:pb-32 lg:pb-48 overflow-hidden">
        {/* Capa de fondo: video en bucle con parallax y blur progresivo al hacer scroll */}
        <div
          ref={backgroundRef}
          className="absolute left-0 right-0 w-full overflow-hidden will-change-[transform,filter]"
          style={{
            height: "calc(150% + 64px)",
            top: "calc(-25% - 64px)",
          }}
          aria-hidden
        >
          {prefersReducedMotion ? (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-top"
              style={{ backgroundImage: `url(/hero-vr.jpg)` }}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-top"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-white/40" aria-hidden />
        <div className="absolute inset-0 bg-black/5" aria-hidden />
        {/* Forma ondulada blanca en la parte inferior, animada como ola */}
        <div
          className="absolute inset-x-0 bottom-0 w-full pointer-events-none overflow-hidden"
          style={{ height: "clamp(80px, 12vw, 140px)" }}
          aria-hidden
        >
          <svg
            className="absolute bottom-0 w-[200%] h-full hero-wave-animate"
            viewBox="0 0 600 80"
            preserveAspectRatio="none"
          >
            <path
              fill="white"
              d="M0,40 Q75,0 150,40 Q225,80 300,40 Q375,0 450,40 Q525,80 600,40 L600,80 L0,80 Z"
            />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white hero-content-stagger" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)" }}>
            {Children.map(Children.toArray(children), (child, i) => {
              const delayMs = [0, 150, 250, 400][i] ?? 0;
              return (
                <div
                  key={i}
                  className="hero-entrance-item"
                  style={{ animationDelay: `${delayMs}ms` }}
                >
                  {child}
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}
