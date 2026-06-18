import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Activity, Check, ChevronRight, CircleDot, Cpu, Flame,
  Globe2, Hash, Play, Radio, Sparkles, Swords, Terminal, Timer, Trophy, Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeArena — The Online Judge for Competitive Engineers" },
      { name: "description", content: "Solve 3,000+ algorithm problems, race in weekly contests, and climb a real-time global leaderboard. Built for engineers who ship." },
    ],
  }),
  component: Landing,
});

/* ---------- Live submission ticker data (stable across SSR/CSR) ---------- */
const LIVE_FEED = [
  { user: "alex_t",     country: "🇩🇪", problem: "Median of Two Sorted Arrays",  lang: "C++",    verdict: "AC",  ms: 4   },
  { user: "kira.dev",   country: "🇯🇵", problem: "Trapping Rain Water",          lang: "Rust",   verdict: "AC",  ms: 2   },
  { user: "m_patel",    country: "🇮🇳", problem: "Sliding Window Maximum",       lang: "Python", verdict: "TLE", ms: 2000},
  { user: "noor",       country: "🇪🇬", problem: "Word Ladder II",               lang: "Go",     verdict: "AC",  ms: 38  },
  { user: "lee.k",      country: "🇰🇷", problem: "Edit Distance",                lang: "Java",   verdict: "WA",  ms: 12  },
  { user: "sofia_r",    country: "🇧🇷", problem: "Number of Islands",            lang: "TS",     verdict: "AC",  ms: 9   },
  { user: "wei.q",      country: "🇨🇳", problem: "Burst Balloons",               lang: "C++",    verdict: "AC",  ms: 16  },
  { user: "olek",       country: "🇵🇱", problem: "Longest Valid Parentheses",    lang: "Kotlin", verdict: "MLE", ms: 84  },
  { user: "haz_dev",    country: "🇺🇸", problem: "N-Queens II",                  lang: "C#",     verdict: "AC",  ms: 6   },
  { user: "ines",       country: "🇫🇷", problem: "Regular Expression Match",     lang: "C++",    verdict: "RE",  ms: 1   },
];

const VERDICT_STYLES: Record<string, string> = {
  AC:  "text-success",
  WA:  "text-destructive",
  TLE: "text-warning",
  MLE: "text-warning",
  RE:  "text-destructive",
};

/* ---------- Featured problem (looks interactive but is fully static) ---------- */
const PROBLEM_CODE = `function maxSubArray(nums: number[]): number {
  let best = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`;

function Landing() {
  /* tiny rotating ticker index — purely client-side, hydration-safe */
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, []);
  const feed = useMemo(() => {
    const out = [];
    for (let i = 0; i < 6; i++) out.push(LIVE_FEED[(tick + i) % LIVE_FEED.length]);
    return out;
  }, [tick]);

  /* countdown to next contest — stable mock target */
  const target = useMemo(() => {
    const d = new Date();
    d.setUTCHours(d.getUTCHours() + 13, 22, 0, 0);
    return d.getTime();
  }, []);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = now ? Math.max(0, target - now) : 0;
  const hh = String(Math.floor(remaining / 3.6e6)).padStart(2, "0");
  const mm = String(Math.floor((remaining % 3.6e6) / 6e4)).padStart(2, "0");
  const ss = String(Math.floor((remaining % 6e4) / 1000)).padStart(2, "0");

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Atmospheric layers */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_75%)]" />
      <div className="absolute inset-0 gradient-hero" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative">
        <Navbar />

        {/* ======================= HERO: TERMINAL + BATTLESTATION ======================= */}
        <section className="mx-auto grid max-w-7xl gap-10 px-6 pt-16 pb-20 lg:grid-cols-12 lg:gap-8">
          {/* Left: pitch */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-3 py-1 text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-muted-foreground">Judge online ·</span>
              <span className="font-mono text-foreground">1,284 submissions/sec</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight md:text-[5.5rem] md:leading-[0.98]"
            >
              Write code.<br />
              <span className="gradient-text">Get judged.</span><br />
              <span className="text-muted-foreground/80">Climb the ladder.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-balance text-lg text-muted-foreground"
            >
              An online judge for engineers who want feedback in milliseconds — not screening rounds.
              3,142 problems, weekly contests, deterministic sandboxing, and a leaderboard that's actually live.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="gradient-primary shadow-glow text-primary-foreground">
                <Link to="/problems">Start solving <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass">
                <Link to="/contests"><Swords className="mr-2 h-4 w-4" />Enter a contest</Link>
              </Button>
              <div className="ml-1 flex items-center gap-2 text-xs text-muted-foreground">
                <kbd className="rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px]">⌘</kbd>
                <kbd className="rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px]">K</kbd>
                <span>to jump anywhere</span>
              </div>
            </motion.div>

            {/* Inline strip: trusted-by + language chips */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
            >
              <span className="uppercase tracking-widest">Battle-tested in</span>
              {["C++17", "Rust", "Python 3.12", "Go 1.22", "Java 21", "TypeScript", "Kotlin", "Swift"].map((l) => (
                <span key={l} className="rounded-md border border-border/60 px-2 py-1 font-mono">{l}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: Battlestation — live judging terminal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Floating verdict chip */}
              <div className="absolute -left-4 -top-4 z-10 hidden items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1.5 text-xs font-mono text-success shadow-glow backdrop-blur md:inline-flex">
                <Check className="h-3.5 w-3.5" /> Accepted · 4ms · 6.2MB
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/60 glass shadow-elegant">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-border/60 bg-background/50 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-destructive/70" />
                    <span className="h-3 w-3 rounded-full bg-warning/70" />
                    <span className="h-3 w-3 rounded-full bg-success/70" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-muted-foreground">~/codearena/solutions/kadane.ts</span>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    <Radio className="h-3 w-3 text-success" /> live
                  </span>
                </div>

                {/* Code area with line numbers */}
                <div className="grid grid-cols-[3rem_1fr] text-sm font-mono">
                  <div className="select-none border-r border-border/60 bg-background/30 py-4 text-right text-muted-foreground/60">
                    {PROBLEM_CODE.split("\n").map((_, i) => (
                      <div key={i} className="px-3 leading-relaxed">{i + 1}</div>
                    ))}
                  </div>
                  <pre className="overflow-x-auto py-4 pl-4 pr-6 leading-relaxed">
{PROBLEM_CODE.split("\n").map((line, i) => (
  <div key={i}>
    {line
      .replace(/\b(function|let|for|return|const)\b/g, "§K§$1§/§")
      .replace(/\b(number|Math)\b/g, "§T§$1§/§")
      .split(/(§[KT]§.*?§\/§)/g)
      .map((part, j) => {
        if (part.startsWith("§K§")) return <span key={j} className="text-[oklch(0.68_0.20_300)]">{part.slice(3, -3)}</span>;
        if (part.startsWith("§T§")) return <span key={j} className="text-[oklch(0.70_0.16_230)]">{part.slice(3, -3)}</span>;
        return <span key={j}>{part}</span>;
      })}
  </div>
))}
                  </pre>
                </div>

                {/* Judge output */}
                <div className="border-t border-border/60 bg-background/40 p-4 font-mono text-xs">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <Terminal className="h-3.5 w-3.5" /> judge.log
                  </div>
                  <div className="space-y-1">
                    <Line ok>compile · gcc-13 · 142ms</Line>
                    <Line ok>testcase 01 · 1ms · 5.8MB</Line>
                    <Line ok>testcase 02 · 2ms · 5.9MB</Line>
                    <Line ok>testcase 03 · 3ms · 6.1MB</Line>
                    <Line ok>testcase 04 (stress·1e6) · 4ms · 6.2MB</Line>
                    <div className="pt-2 text-success">
                      ▶ Accepted · 64/64 testcases · runtime beats 98.4%
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating leaderboard mini-card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-4 hidden w-56 rounded-xl border border-border/60 glass p-3 shadow-elegant md:block"
              >
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Trophy className="h-3 w-3 text-warning" /> Live ranking</span>
                  <span className="font-mono text-success">+12</span>
                </div>
                {[
                  { r: 1, u: "tourist_jr", pts: 3284, c: "🇧🇾" },
                  { r: 2, u: "you",        pts: 3271, c: "🇺🇸", me: true },
                  { r: 3, u: "wei.q",      pts: 3260, c: "🇨🇳" },
                ].map((p) => (
                  <div key={p.r} className={`flex items-center gap-2 rounded-md px-1.5 py-1 text-xs ${p.me ? "bg-primary/15" : ""}`}>
                    <span className="w-4 font-mono text-muted-foreground">{p.r}</span>
                    <span>{p.c}</span>
                    <span className={`flex-1 truncate font-mono ${p.me ? "text-primary" : ""}`}>{p.u}</span>
                    <span className="font-mono text-muted-foreground">{p.pts}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ======================= LIVE TICKER ======================= */}
        <section className="relative border-y border-border/60 bg-background/40 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-6 py-3 text-xs font-mono">
            <span className="flex items-center gap-2 whitespace-nowrap text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-primary" /> GLOBAL FEED
            </span>
            <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-1 overflow-hidden">
              {feed.map((f, i) => (
                <motion.span
                  key={`${tick}-${i}`}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{f.country}</span>
                  <span className="text-foreground">{f.user}</span>
                  <span className="text-muted-foreground">solved</span>
                  <span className="truncate text-foreground">{f.problem}</span>
                  <span className={`${VERDICT_STYLES[f.verdict]}`}>· {f.verdict} {f.ms}ms</span>
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= BENTO: WHAT YOU GET ======================= */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
                <Hash className="h-3.5 w-3.5" /> the stack
              </div>
              <h2 className="text-3xl font-bold md:text-5xl">Everything between <span className="gradient-text">you</span> and <span className="gradient-text">AC</span>.</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              From editorial breakdowns to deterministic sandboxes — every layer of the loop is built for speed, fairness, and signal.
            </p>
          </div>

          <div className="grid auto-rows-[12rem] grid-cols-1 gap-4 md:grid-cols-6">
            {/* Big tile — Problem of the day */}
            <BentoCard className="md:col-span-3 md:row-span-2">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-warning"><Flame className="h-3.5 w-3.5" /> Problem of the day</span>
                  <span className="rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-mono text-warning">MEDIUM · 1450</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">Maximum Subarray Sum II</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Given an array of integers, return the maximum sum obtainable from a contiguous subarray.
                  Then generalize to <span className="font-mono text-foreground">k</span> non-overlapping subarrays.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["dp", "array", "kadane", "divide-and-conquer"].map((t) => (
                    <span key={t} className="rounded-md border border-border/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">#{t}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5 text-success" /> 38,492 solved</span>
                    <span className="inline-flex items-center gap-1"><CircleDot className="h-3.5 w-3.5 text-warning" /> 64.2% AC</span>
                  </div>
                  <Button asChild variant="outline" size="sm" className="glass"><Link to="/problems">Open <ChevronRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
                </div>
              </div>
            </BentoCard>

            {/* Contest countdown */}
            <BentoCard className="md:col-span-3">
              <div className="flex h-full items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary"><Timer className="h-3.5 w-3.5" /> Next contest</div>
                  <div className="mt-2 text-lg font-semibold">Weekly Round 412</div>
                  <div className="text-xs text-muted-foreground">4 problems · 2h · rated</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-4xl font-bold tabular-nums">
                    <span className="gradient-text">{hh}</span>
                    <span className="text-muted-foreground/40">:</span>
                    <span className="gradient-text">{mm}</span>
                    <span className="text-muted-foreground/40">:</span>
                    <span className="gradient-text">{ss}</span>
                  </div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">hh · mm · ss</div>
                </div>
              </div>
            </BentoCard>

            {/* Language battle */}
            <BentoCard className="md:col-span-3">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary"><Swords className="h-3.5 w-3.5" /> Language battle · today</div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { l: "C++",    pct: 92, ms: "3ms"  },
                    { l: "Rust",   pct: 88, ms: "4ms"  },
                    { l: "Go",     pct: 71, ms: "11ms" },
                    { l: "Python", pct: 54, ms: "82ms" },
                  ].map((row) => (
                    <div key={row.l} className="flex items-center gap-3 text-xs">
                      <span className="w-14 font-mono text-muted-foreground">{row.l}</span>
                      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50">
                        <div className="absolute inset-y-0 left-0 gradient-primary" style={{ width: `${row.pct}%` }} />
                      </div>
                      <span className="w-10 text-right font-mono">{row.ms}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Sandbox */}
            <BentoCard className="md:col-span-2">
              <Cpu className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">Deterministic sandbox</h3>
              <p className="mt-1 text-sm text-muted-foreground">cgroup-isolated workers, per-µs CPU accounting, zero flaky verdicts.</p>
            </BentoCard>
            <BentoCard className="md:col-span-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">Sub-second judging</h3>
              <p className="mt-1 text-sm text-muted-foreground">Median verdict latency: <span className="font-mono text-foreground">412ms</span>. We measured.</p>
            </BentoCard>
            <BentoCard className="md:col-span-2">
              <Globe2 className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">240k coders, 119 countries</h3>
              <p className="mt-1 text-sm text-muted-foreground">Editorials, discussions, and friendly trash talk in every timezone.</p>
            </BentoCard>
          </div>
        </section>

        {/* ======================= 3-STEP LOOP ======================= */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-10 text-center">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary"><Sparkles className="h-3.5 w-3.5" /> the loop</div>
            <h2 className="text-3xl font-bold md:text-4xl">Three steps. Repeat until <span className="gradient-text">unstoppable</span>.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Pick a problem", b: "Filter by topic, difficulty, or company tag. Curated tracks from arrays to advanced graphs.", icon: Hash },
              { n: "02", t: "Submit your code", b: "Editor with Monaco, Vim mode, custom testcases, and a one-key submit (⌘↵).", icon: Play },
              { n: "03", t: "Read the verdict", b: "Per-testcase breakdown, runtime percentile, and a community editorial within seconds.", icon: Check },
            ].map((s) => (
              <div key={s.n} className="group relative overflow-hidden rounded-2xl border border-border/60 glass p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-5xl font-bold text-muted-foreground/20">{s.n}</span>
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        {/* ======================= FINAL CTA — Terminal prompt ======================= */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 glass p-10 shadow-elegant">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.70_0.16_230)]/20 blur-3xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-3xl font-bold leading-tight md:text-4xl">Your terminal is waiting.</h3>
                <p className="mt-3 text-muted-foreground">Free forever for the first 3,000 problems. No card. No upsell. Just code.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="gradient-primary shadow-glow text-primary-foreground">
                    <Link to="/register">Create your handle <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="glass">
                    <Link to="/problems">Browse problems</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-sm">
                <div className="text-muted-foreground">$ curl -sSL get.codearena.dev | sh</div>
                <div className="text-success">▶ installed codearena-cli v2.4.0</div>
                <div className="mt-1 text-muted-foreground">$ codearena login</div>
                <div className="text-success">▶ paired with browser session</div>
                <div className="mt-1 text-muted-foreground">$ codearena submit kadane.ts</div>
                <div className="text-success">▶ Accepted · 64/64 · 4ms · top 1.6%</div>
                <div className="mt-2 flex items-center text-foreground">
                  <span className="text-primary">$</span>
                  <span className="ml-2">_</span>
                  <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= FOOTER ======================= */}
        <footer className="border-t border-border/60 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-primary">{"</>"}</span>
              <span>© 2026 CodeArena · Built for coders, judged by machines.</span>
            </div>
            <div className="flex gap-6">
              <Link to="/problems" className="hover:text-foreground">Problems</Link>
              <Link to="/contests" className="hover:text-foreground">Contests</Link>
              <Link to="/leaderboard" className="hover:text-foreground">Leaderboard</Link>
              <Link to="/discuss" className="hover:text-foreground">Discuss</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-border/60 glass p-6 transition hover:border-primary/40 hover:shadow-glow ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function Line({ ok, children }: { ok?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className={ok ? "text-success" : "text-destructive"}>{ok ? "✓" : "✗"}</span>
      <span className="text-muted-foreground">{children}</span>
    </div>
  );
}
