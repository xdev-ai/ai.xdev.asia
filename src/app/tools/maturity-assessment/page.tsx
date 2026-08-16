"use client";

/* xDev AI Maturity Assessment Tool: ten-question self-assessment across five governed
   AI-SDLC dimensions (spec, gate, evidence, review, deploy). Fully client-side: no
   database, results stay in the visitor's own localStorage.
   Layout: Tailwind CSS, mobile-first, matches the blog design system. */
import { ArrowRight, RotateCcw, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLang } from "@/i18n/LanguageContext";
import Link from "next/link";;

type Dim = "spec" | "gate" | "evidence" | "review" | "deploy";

type Question = {
  dim: Dim;
  text: string;
  options: string[];
};

const LOCAL_KEY = "xdev-ai:maturity";

type Stored = { scores: number[]; answeredAt: string };

function loadStored(): Stored | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (Array.isArray(parsed.scores) && parsed.scores.length === 10) return parsed;
    return null;
  } catch {
    return null;
  }
}

function stageOf(total: number) {
  if (total >= 36) return 3;
  if (total >= 28) return 2;
  if (total >= 20) return 1;
  return 0;
}

export default function MaturityTool() {
  const { t, locale } = useLang();
  const m = t.maturity;

  const [step, setStep] = useState<"hero" | "quiz" | "result">("hero");
  const [q, setQ] = useState(0);
  const [picks, setPicks] = useState<number[]>(() => Array(10).fill(-1));
  const [stored, setStored] = useState<Stored | null>(loadStored);
  const [shareCopied, setShareCopied] = useState(false);

  const questions = m.questions as unknown as Question[];
  const stages = m.stages as unknown as string[];
  const dimLabels = m.dimensionLabels as unknown as Record<Dim, string>;

  const total = useMemo(
    () => picks.reduce((acc, p) => acc + (p < 0 ? 0 : p + 1), 0),
    [picks],
  );
  const stageIdx = stageOf(total);

  useEffect(() => {
    if (stored && step === "hero") setStep("result");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title =
      localeLabel() +
      (step === "result"
        ? ` — ${m.yourResult}`
        : step === "quiz"
          ? ` — ${m.questionOf.replace("{n}", String(q + 1))}`
          : " — xDev AI");
    return () => {
      document.title = "xDev AI — governed AI delivery";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, q]);

  function localeLabel() {
    return locale === "vi" ? "Đánh giá Maturity" : "Maturity Assessment";
  }

  function pick(opt: number) {
    const next = [...picks];
    next[q] = opt;
    setPicks(next);
    if (q + 1 >= 10) {
      const scores = next.map((p) => (p < 0 ? 0 : p + 1));
      const data: Stored = { scores, answeredAt: new Date().toISOString() };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
      setStored(data);
      setStep("result");
    } else {
      setTimeout(() => setQ(q + 1), 180);
    }
  }

  function restart() {
    localStorage.removeItem(LOCAL_KEY);
    setStored(null);
    setPicks(Array(10).fill(-1));
    setQ(0);
    setStep("quiz");
    window.scrollTo({ top: 0 });
  }

  async function share() {
    const stageName = stages[stageIdx];
    const label =
      locale === "vi"
        ? `Đánh giá xDev AI: ${stageName} (${total}/30)`
        : `xDev AI Maturity Assessment: ${stageName} (${total}/30)`;
    try {
      await navigator.clipboard.writeText(`${label} — https://ai.xdev.asia/tools/maturity-assessment`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  }

  const dimBreakdown = useMemo(() => {
    const dims: Dim[] = ["spec", "gate", "evidence", "review", "deploy"];
    return dims.map((d) => {
      const qs = questions
        .map((question, i) => ({ question, i }))
        .filter(({ question }) => question.dim === d);
      const score = qs.reduce((acc, { i }) => acc + (picks[i] < 0 ? 0 : picks[i] + 1), 0);
      return { dim: d, score, max: qs.length * 4 };
    });
  }, [picks, questions]);

  return (
    <div className="min-h-screen bg-[#eef4f2] text-[#0f243f]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[#b5c6c9] bg-[#eef4f2]/95 backdrop-blur">
        <div className="mx-auto flex h-14 items-center justify-between gap-3 px-4 md:h-16 md:px-8">
          <Link className="flex items-center gap-2.5" href="/">
            <ShieldTraceMark className="size-8 text-[#0a6e7f]" decorative />
            <span className="leading-tight">
              <strong className="block text-[15px] tracking-tight">xDev AI</strong>
              <em className="block text-[10px] uppercase tracking-[0.18em] text-[#0a6e7f]/70">Maturity Tool</em>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <Link className="hidden text-sm underline-offset-4 hover:underline sm:inline" href="/blog">
              {m.learnMore}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        {/* ===== Hero ===== */}
        {step === "hero" && (
          <section>
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]">
              <span className="inline-block size-2 rounded-full bg-[#0a6e7f]/60" />
              {m.eyebrow}
            </p>
            <h1 className="text-balance text-[clamp(2.2rem,7vw,3.8rem)] font-semibold leading-[1.08] tracking-tight">
              {m.heroTitle1}
              <br />
              <i className="text-[#0a6e7f]">{m.heroTitle2}</i>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#2e4854]">{m.heroCopy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded bg-[#0f243f] px-5 py-3 text-sm font-medium text-[#eaf3f4] hover:bg-[#143553]"
                onClick={() => { setStep("quiz"); window.scrollTo({ top: 0 }); }}
              >
                {m.start} <ArrowRight size={16} />
              </button>
              {stored && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-[#2e4854] underline-offset-4 hover:underline"
                  onClick={() => setStep("result")}
                >
                  {m.yourResult}
                </button>
              )}
            </div>
            <div className="mt-10 grid grid-cols-1 divide-y divide-[#b5c6c9] gap-3 border-y border-[#b5c6c9] sm:grid-cols-5 sm:divide-y-0">
              {(["spec", "gate", "evidence", "review", "deploy"] as Dim[]).map((d) => (
                <div key={d} className="py-3 sm:py-2 sm:border-r sm:border-[#b5c6c9] last:border-0">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-[#0a6e7f]/70">
                    {Object.keys(dimLabels).indexOf(d) + 1 < 10 ? `0${Object.keys(dimLabels).indexOf(d) + 1}` : Object.keys(dimLabels).indexOf(d) + 1}
                  </span>
                  <strong className="text-sm">{dimLabels[d]}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== Quiz ===== */}
        {step === "quiz" && (
          <section>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]">
              {dimLabels[questions[q].dim]}
            </p>
            <div className="mb-1 h-1 overflow-hidden rounded bg-[#b5c6c9]/60">
              <div className="h-full rounded bg-[#0f243f] transition-all duration-300" style={{ width: `${((q + 1) / 10) * 100}%` }} />
            </div>
            <p className="mb-6 font-mono text-[11px] tracking-[0.18em] text-[#2e4854]">
              {m.questionOf.replace("{n}", String(q + 1))}
            </p>
            <h2 className="text-balance text-xl font-semibold leading-snug tracking-tight md:text-2xl">
              {questions[q].text}
            </h2>
            <div className="mt-8 grid gap-3">
              {questions[q].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  className={`rounded border px-4 py-3.5 text-left text-[14px] leading-relaxed transition-all active:scale-[0.99] ${
                    picks[q] === i
                      ? "border-[#0a6e7f] bg-[#0a6e7f]/10 text-[#0f243f]"
                      : "border-[#b5c6c9] bg-white text-[#2e4854] hover:border-[#0a6e7f]/50"
                  }`}
                >
                  <span className="mr-3 font-mono text-xs text-[#0a6e7f]/70">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ===== Result ===== */}
        {step === "result" && (
          <section>
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]">
              <span className="inline-block size-2 rounded-full bg-amber-400" />
              {m.yourResult}
            </p>
            <div className="rounded border border-[#b5c6c9] bg-white p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#2e4854]">{m.totalScore}</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight text-[#0f243f]">
                {total} <span className="text-lg font-normal text-[#2e4854]">{m.outOf.replace("30", "40")}</span>
              </p>
              <p className="mt-4 rounded bg-[#0f243f] px-4 py-3 text-[15px] font-medium text-[#eaf3f4]">
                {stages[stageIdx]}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-[#2e4854]">{m.stageDescriptions[stageIdx]}</p>
              <p className="mt-6 mb-2 text-[11px] uppercase tracking-[0.18em] text-[#0a6e7f]">
                Score per dimension
              </p>
              <div className="grid gap-2">
                {dimBreakdown.map((d) => (
                  <div key={d.dim} className="flex items-center gap-3">
                    <span className="w-24 text-[13px] text-[#2e4854]">{dimLabels[d.dim]}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded bg-[#b5c6c9]/60">
                      <div className="h-full rounded bg-[#0a6e7f] transition-all" style={{ width: `${(d.score / d.max) * 100}%` }} />
                    </div>
                    <span className="w-16 text-right font-mono text-[12px] text-[#2e4854]">
                      {d.score}/{d.max}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-[#dde7e4] pt-5">
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-[#0a6e7f]">Recommendations</p>
                {m.recommendations.map((r, i) => (
                  <p key={i} className="flex gap-3 text-[14px] leading-relaxed text-[#2e4854]">
                    <span className="font-mono text-xs text-[#0a6e7f]/70">{i + 1}.</span>
                    {r}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded bg-[#0f243f] px-5 py-2.5 text-sm font-medium text-[#eaf3f4] hover:bg-[#143553]"
                  onClick={restart}
                >
                  <RotateCcw size={15} /> {m.restart}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded border border-[#0a6e7f]/40 px-5 py-2.5 text-sm text-[#0a6e7f] hover:bg-[#0a6e7f]/10"
                  onClick={share}
                >
                  <Share2 size={15} /> {shareCopied ? "Copied" : m.shareResult}
                </button>
              </div>
              <p className="mt-4 text-[12px] text-[#4a6470]">{m.savedNotice}</p>
            </div>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0a6e7f] hover:underline"
              href={m.learnMoreUrl}
            >
              {m.learnMore} <ArrowRight size={15} />
            </Link>
          </section>
        )}
      </main>

      <footer className="border-t border-[#b5c6c9] bg-white py-8">
        <div className="mx-auto flex flex-col items-center justify-between gap-3 px-4 text-[12px] text-[#2e4854] md:flex-row md:px-8">
          <span className="font-mono tracking-[0.18em]">© 2026 xDev AI · ai.xdev.asia</span>
          <span>No database, no tracking: results stay on your device.</span>
        </div>
      </footer>
    </div>
  );
}
