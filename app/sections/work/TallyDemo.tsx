"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { TallyResponse } from "@/lib/schemas";

const PRE_FILL = [
  "two slices of toast with butter and a black coffee",
  "large oat-milk latte",
  "three eggs and avocado on sourdough",
];

interface DemoState {
  status: "idle" | "loading" | "done" | "error";
  data?: TallyResponse;
  error?: string;
  remaining?: number;
  limit?: number;
}

export function TallyDemo() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<DemoState>({ status: "idle" });

  const submit = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > 200) {
      setState({ status: "error", error: "Type 1–200 characters of food, hit Enter." });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/tally-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: trimmed }),
      });
      const json = (await res.json()) as TallyResponse & {
        error?: string;
        remaining?: number;
        limit?: number;
      };
      if (!res.ok) {
        setState({ status: "error", error: json.error ?? "Estimator unavailable." });
        return;
      }
      setState({
        status: "done",
        data: { items: json.items, total: json.total, stub: json.stub },
        remaining: json.remaining,
        limit: json.limit,
      });
      if (typeof json.remaining === "number" && typeof json.limit === "number") {
        window.dispatchEvent(
          new CustomEvent("bilawalsami:tally-quota", {
            detail: { remaining: json.remaining, limit: json.limit },
          }),
        );
      }
    } catch {
      setState({ status: "error", error: "Network blip. Try again." });
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="border hairline bg-steel">
        <div className="px-4 py-3 border-b hairline flex items-center justify-between">
          <p className="label-mono text-signal">LIVE DEMO · TALLY MACRO ESTIMATOR</p>
          {state.status === "done" && state.data?.stub && (
            <span className="label-mono text-blood">STUB · NO API KEY</span>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="px-4 py-4 flex flex-col gap-3"
        >
          <label htmlFor="tally-input" className="sr-only">
            Describe a meal
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="tally-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={200}
              placeholder='e.g. "two slices of toast with butter and a coffee"'
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-ink border hairline text-bone placeholder:text-hairline px-3 py-2.5 mono-sm focus:border-signal outline-none"
              data-cursor="hover"
            />
            <button
              type="submit"
              disabled={state.status === "loading" || !input.trim()}
              data-cursor="hover"
              className="label-mono bg-signal text-ink px-5 py-2.5 hover:bg-signal-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {state.status === "loading" ? "PARSING…" : "ESTIMATE ↵"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="label-mono text-hairline self-center">TRY:</span>
            {PRE_FILL.map((chip) => (
              <button
                key={chip}
                type="button"
                data-cursor="hover"
                onClick={() => {
                  setInput(chip);
                  void submit(chip);
                }}
                className="label-mono border hairline px-3 py-1.5 text-ash hover:text-bone hover:border-bone transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {state.status === "error" && state.error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-blood label-mono text-blood px-4 py-3"
            role="alert"
          >
            {state.error.toUpperCase()}
          </motion.p>
        )}

        {state.status === "done" && state.data && (
          <ResultCard key="ok" data={state.data} remaining={state.remaining} limit={state.limit} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- result ---------- */

function ResultCard({
  data,
  remaining,
  limit,
}: {
  data: TallyResponse;
  remaining?: number;
  limit?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
      className="border hairline bg-steel"
    >
      <div className="px-4 py-3 border-b hairline flex items-center justify-between">
        <p className="label-mono text-bone">RESULT</p>
        {typeof remaining === "number" && typeof limit === "number" && (
          <p className="label-mono text-hairline">
            {remaining}<span className="text-hairline">/</span>{limit} REQUESTS LEFT THIS MINUTE
          </p>
        )}
      </div>

      <ul className="divide-y hairline">
        {data.items.map((item, i) => (
          <motion.li
            key={`${item.name}-${i}`}
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : i * 0.06, duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="px-4 py-3 grid grid-cols-[1.5fr_auto_auto_auto_auto_auto] gap-4 items-baseline mono-sm text-bone"
          >
            <div className="flex flex-col">
              <span className="text-bone">{item.name}</span>
              <span className="label-mono text-hairline">{item.quantity}</span>
            </div>
            <Macro label="kcal" value={item.calories} delay={i * 0.06} />
            <Macro label="P" value={item.protein} unit="g" delay={i * 0.06 + 0.02} />
            <Macro label="C" value={item.carbs} unit="g" delay={i * 0.06 + 0.04} />
            <Macro label="F" value={item.fat} unit="g" delay={i * 0.06 + 0.06} />
            <Macro label="fib" value={item.fibre} unit="g" delay={i * 0.06 + 0.08} />
          </motion.li>
        ))}
      </ul>

      <div className="px-4 py-4 border-t border-signal bg-signal/[0.04]">
        <p className="label-mono text-signal mb-2">TOTAL</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-3">
          <TotalCell label="CALORIES" value={data.total.calories} unit="kcal" />
          <TotalCell label="PROTEIN" value={data.total.protein} unit="g" />
          <TotalCell label="CARBS" value={data.total.carbs} unit="g" />
          <TotalCell label="FAT" value={data.total.fat} unit="g" />
          <TotalCell label="FIBRE" value={data.total.fibre} unit="g" />
        </div>
      </div>
    </motion.div>
  );
}

function Macro({
  label,
  value,
  unit,
  delay = 0,
}: {
  label: string;
  value: number;
  unit?: string;
  delay?: number;
}) {
  return (
    <span className="flex items-baseline gap-1 tabular-nums">
      <CountUp to={value} delay={delay * 1000} />
      {unit && <span className="text-hairline label-mono">{unit}</span>}
      <span className="label-mono text-ash ml-1">{label}</span>
    </span>
  );
}

function TotalCell({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="flex flex-col">
      <span className="label-mono text-ash">{label}</span>
      <span
        className="font-sans font-bold text-bone tabular-nums"
        style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
      >
        <CountUp to={value} delay={120} duration={700} />
        <span className="label-mono text-ash ml-1">{unit}</span>
      </span>
    </div>
  );
}

function CountUp({
  to,
  duration = 500,
  delay = 0,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setN(Math.round(to));
      return;
    }
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const run = () => {
      const startedAt = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startedAt) / duration);
        setN(Math.round(to * easeOut(t)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (delay > 0) {
      timer = setTimeout(run, delay);
    } else {
      run();
    }
    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [to, duration, delay, reduced]);
  return <span suppressHydrationWarning>{n}</span>;
}
