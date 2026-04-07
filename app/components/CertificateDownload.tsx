"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const CERT_W = 1600;
const CERT_H = 1130;

function drawCertificate(
  canvas: HTMLCanvasElement,
  name: string,
  dateStr: string,
  t: (key: string) => string
) {
  const ctx = canvas.getContext("2d")!;
  canvas.width = CERT_W;
  canvas.height = CERT_H;

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, CERT_W, CERT_H);

  // Outer border
  ctx.strokeStyle = "#0d9488";
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, CERT_W - 60, CERT_H - 60);

  // Inner border
  ctx.strokeStyle = "#99f6e4";
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, CERT_W - 100, CERT_H - 100);

  // Corner accents
  const corners = [
    [60, 60],
    [CERT_W - 60, 60],
    [60, CERT_H - 60],
    [CERT_W - 60, CERT_H - 60],
  ];
  ctx.fillStyle = "#0d9488";
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Top decorative line
  ctx.strokeStyle = "#14b8a6";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(CERT_W * 0.3, 130);
  ctx.lineTo(CERT_W * 0.7, 130);
  ctx.stroke();

  // "Certificate of Completion"
  ctx.fillStyle = "#0d9488";
  ctx.font = "bold 54px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText(t("certTitle"), CERT_W / 2, 210);

  // Subtitle line
  ctx.strokeStyle = "#99f6e4";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(CERT_W * 0.25, 240);
  ctx.lineTo(CERT_W * 0.75, 240);
  ctx.stroke();

  // "This certifies that"
  ctx.fillStyle = "#6b7280";
  ctx.font = "italic 24px Georgia, serif";
  ctx.fillText(t("certAwardedTo"), CERT_W / 2, 310);

  // Name
  ctx.fillStyle = "#111827";
  ctx.font = "bold 56px Georgia, serif";
  ctx.fillText(name, CERT_W / 2, 400);

  // Name underline
  const nameWidth = Math.max(ctx.measureText(name).width + 80, 400);
  ctx.strokeStyle = "#0d9488";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CERT_W / 2 - nameWidth / 2, 420);
  ctx.lineTo(CERT_W / 2 + nameWidth / 2, 420);
  ctx.stroke();

  // "has successfully completed"
  ctx.fillStyle = "#6b7280";
  ctx.font = "italic 24px Georgia, serif";
  ctx.fillText(t("certCompleted"), CERT_W / 2, 500);

  // Program name
  ctx.fillStyle = "#0d9488";
  ctx.font = "bold 40px Georgia, serif";
  ctx.fillText(t("certProgram"), CERT_W / 2, 570);

  // Program description
  ctx.fillStyle = "#6b7280";
  ctx.font = "20px Georgia, serif";
  ctx.fillText(t("certProgramDesc"), CERT_W / 2, 620);

  // Bottom decorative line
  ctx.strokeStyle = "#14b8a6";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(CERT_W * 0.3, 700);
  ctx.lineTo(CERT_W * 0.7, 700);
  ctx.stroke();

  // Date
  ctx.fillStyle = "#374151";
  ctx.font = "22px Georgia, serif";
  ctx.fillText(dateStr, CERT_W / 2, 780);

  // Bottom branding
  ctx.fillStyle = "#0d9488";
  ctx.font = "bold 28px Georgia, serif";
  ctx.fillText("VR Education Hub", CERT_W / 2, 870);

  ctx.fillStyle = "#9ca3af";
  ctx.font = "16px Georgia, serif";
  ctx.fillText(t("certBranding"), CERT_W / 2, 910);

  // Bottom decorative dots
  ctx.fillStyle = "#99f6e4";
  for (let i = 0; i < 5; i++) {
    const x = CERT_W / 2 + (i - 2) * 30;
    ctx.beginPath();
    ctx.arc(x, 960, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CertificateDownload({
  unlocked,
  enabledCount,
  completedCount,
}: {
  unlocked: boolean;
  enabledCount: number;
  completedCount: number;
}) {
  const t = useTranslations("bootcamp");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !name.trim()) return;

    const date = new Date();
    const dateStr = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    drawCertificate(canvasRef.current, name.trim(), dateStr, (key) =>
      t(`certificate.${key}` as Parameters<typeof t>[0])
    );

    const link = document.createElement("a");
    link.download = "vr-bootcamp-certificate.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }, [name, t]);

  const remaining = enabledCount - completedCount;

  return (
    <>
      <div id="certificate" className="mt-16 scroll-mt-24 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-12">
        {/* Certificate icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20">
          {unlocked ? (
            <svg className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          ) : (
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          )}
        </div>

        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t("certificate.heading")}
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-gray-300">
          {unlocked
            ? t("certificate.unlockedDesc")
            : t("certificate.lockedDesc", { remaining })}
        </p>

        {/* Progress towards certificate */}
        {!unlocked && (
          <div className="mx-auto mt-5 max-w-xs">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>{t("certificate.progress")}</span>
              <span>{completedCount}/{enabledCount}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-500"
                style={{ width: `${enabledCount > 0 ? (completedCount / enabledCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowModal(true)}
          disabled={!unlocked}
          className={`mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
            unlocked
              ? "bg-teal-600 text-white hover:bg-teal-500"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          {unlocked ? (
            <>
              {t("certificate.downloadBtn")}
              <span aria-hidden="true">&#8595;</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              {t("certificate.lockedBtn")}
            </>
          )}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white">
              {t("certificate.modalTitle")}
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {t("certificate.modalDesc")}
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("certificate.namePlaceholder")}
              className="mt-4 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) handleDownload();
              }}
            />

            <div className="mt-5 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {t("certificate.cancel")}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!name.trim()}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                  name.trim()
                    ? "bg-teal-600 text-white hover:bg-teal-500"
                    : "bg-white/10 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t("certificate.downloadBtn")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for certificate generation */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
