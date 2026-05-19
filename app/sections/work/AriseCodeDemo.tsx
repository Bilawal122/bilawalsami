"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type LineTag = "" | "tag" | "preview:title" | "preview:sub" | "preview:btn";
interface Template {
  prompt: string;
  lines: [LineTag, string][];
}

/**
 * Site Review Obs 06 — "watch-it-write" demo.
 * Three deterministic templates type real JSX into the left pane while the
 * right pane fills in skeleton blocks as tags close. Vanilla JS, ~5KB,
 * offline, no iframe.
 */
const TEMPLATES: Record<string, Template> = {
  hero: {
    prompt: "a hero for a calorie tracking app that gets out of the way",
    lines: [
      ["tag", '<section className="min-h-screen bg-ink text-bone px-8 py-24">'],
      ["", '  <p className="label-mono text-ash">SECTION 000 · HERO</p>'],
      ["", '  <h1 className="mt-8 font-black text-7xl tracking-tight leading-none">'],
      ["", "    Type what you ate."],
      ["", '    <span className="text-signal"> Get the macros.</span>'],
      ["", "  </h1>"],
      ["preview:title", '  <p className="mt-6 text-lg text-bone/80 max-w-prose">'],
      ["", "    No database scroll. No barcode hunt. Five seconds,"],
      ["", "    free-text, the parser tracks the meal."],
      ["", "  </p>"],
      [
        "preview:btn",
        '  <a href="#try" className="mt-10 inline-block bg-signal text-ink px-6 py-3 label-mono">',
      ],
      ["", "    TRY IT &nbsp;↓"],
      ["", "  </a>"],
      ["", "</section>"],
    ],
  },
  pricing: {
    prompt: "a 3-tier pricing card, free / pro / team, brutalist",
    lines: [
      [
        "tag",
        '<section className="grid grid-cols-3 gap-px bg-hairline border border-hairline">',
      ],
      ["", '  <article className="bg-ink p-6 flex flex-col gap-3">'],
      ["preview:title", '    <p className="label-mono text-ash">FREE</p>'],
      ["", '    <p className="text-4xl font-bold tracking-tight">£0</p>'],
      ["", '    <ul className="mono-sm text-ash space-y-2">'],
      ["", "      <li>↳ 30 entries / day</li>"],
      ["preview:sub", "      <li>↳ Manual log</li>"],
      ["", "      <li>↳ Macros only</li>"],
      ["", "    </ul>"],
      ["", "  </article>"],
      [
        "",
        '  <article className="bg-ink p-6 flex flex-col gap-3 border-x border-signal/30">',
      ],
      ["preview:btn", '    <p className="label-mono text-signal">PRO · POPULAR</p>'],
      ["", '    <p className="text-4xl font-bold tracking-tight">£4 /mo</p>'],
      ["", "  </article>"],
      ["", "</section>"],
    ],
  },
  changelog: {
    prompt: "a brutalist changelog feed in mono",
    lines: [
      ["tag", '<ol className="mono-sm border-l border-hairline pl-6 space-y-8">'],
      ["preview:title", "  <li>"],
      ["", '    <p className="label-mono text-signal">v0.4.2 · 19 MAY 2026</p>'],
      ["", '    <p className="mt-2 text-bone">'],
      ["", "      Tally now streams the response — kcal pops first,"],
      ["", "      macros fill in over 600ms."],
      ["preview:sub", "    </p>"],
      ["", "  </li>"],
      ["", "  <li>"],
      ["", '    <p className="label-mono text-ash">v0.4.1 · 04 MAY 2026</p>'],
      ["preview:btn", '    <p className="mt-2 text-bone">Go Ride shipped to client.</p>'],
      ["", "  </li>"],
      ["", "</ol>"],
    ],
  },
};

const ESC: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ESC[c]);
}

function highlight(text: string): string {
  let s = escapeHtml(text);
  s = s.replace(/(\/\/[^\n]*)/g, '<span class="tk-com">$1</span>');
  s = s.replace(/(class[Nn]ame|href|src|alt)=/g, '<span class="tk-attr">$1</span>=');
  s = s.replace(/(&quot;|"[^"]*")/g, (m) => `<span class="tk-str">${m}</span>`);
  s = s.replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, '<span class="tk-tag">$1</span>');
  return s;
}

function plainText(text: string): string {
  return text;
}

const CHIPS: { key: keyof typeof TEMPLATES; label: string }[] = [
  { key: "hero", label: "a hero for a calorie tracking app" },
  { key: "pricing", label: "a 3-tier pricing card, free / pro / team" },
  { key: "changelog", label: "a brutalist changelog feed in mono" },
];

export function AriseCodeDemo() {
  const codeRef = useRef<HTMLPreElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [promptText, setPromptText] = useState<string>(TEMPLATES.hero.prompt);
  const [status, setStatus] = useState<string>("IDLE");
  const [active, setActive] = useState<string | null>(null);
  const runningRef = useRef<boolean>(false);
  const abortRef = useRef<boolean>(false);

  const reset = useCallback(() => {
    if (!codeRef.current || !previewRef.current) return;
    codeRef.current.innerHTML =
      '<span class="tk-com">// click a chip above to start →</span>';
    previewRef.current.innerHTML =
      '<div class="sk title"></div><div class="sk sub"></div><div class="sk sub" style="width:65%"></div><div class="sk btn"></div>';
    previewRef.current.classList.add("empty");
    setStatus("IDLE");
    setActive(null);
  }, []);

  const wait = (ms: number) =>
    new Promise<void>((res) => {
      const id = window.setTimeout(res, ms);
      // mark cancellable via abortRef
      (wait as unknown as { lastId: number }).lastId = id;
    });

  const run = useCallback(async (key: string) => {
    if (runningRef.current) return;
    const tmpl = TEMPLATES[key];
    if (!tmpl || !codeRef.current || !previewRef.current) return;
    runningRef.current = true;
    abortRef.current = false;
    setActive(key);
    setStatus("GENERATING…");
    setPromptText(tmpl.prompt);
    codeRef.current.innerHTML = "";
    previewRef.current.innerHTML = "";
    previewRef.current.classList.remove("empty");

    const stages: Record<string, string> = {
      title: '<div class="sk title"></div>',
      sub: '<div class="sk sub"></div>',
      btn: '<div class="sk btn"></div>',
      tag: '<div class="sk title" style="opacity:0.4; width:35%"></div>',
    };

    for (let i = 0; i < tmpl.lines.length; i++) {
      if (abortRef.current) break;
      const [tag, line] = tmpl.lines[i];
      const span = document.createElement("span");
      codeRef.current.appendChild(span);
      const html = highlight(line);
      const plain = plainText(line);
      const caret = document.createElement("span");
      caret.className = "caret";
      codeRef.current.appendChild(caret);

      for (let j = 0; j <= plain.length; j++) {
        if (abortRef.current) break;
        span.textContent = plain.slice(0, j);
        await wait(8 + Math.random() * 14);
      }
      if (abortRef.current) break;
      span.innerHTML = html;
      span.appendChild(document.createTextNode("\n"));
      if (codeRef.current.contains(caret)) codeRef.current.removeChild(caret);

      if (tag && tag.startsWith("preview:")) {
        const k = tag.split(":")[1];
        if (stages[k] && previewRef.current) previewRef.current.innerHTML += stages[k];
      } else if (tag === "tag" && previewRef.current) {
        previewRef.current.innerHTML += stages.tag;
      }
    }

    runningRef.current = false;
    if (!abortRef.current) setStatus("COMPILED · 0 ERRORS");
  }, []);

  useEffect(() => {
    reset();
    return () => {
      abortRef.current = true;
    };
  }, [reset]);

  return (
    <div className="border hairline bg-steel">
      <div className="px-4 py-3 border-b hairline flex items-center justify-between flex-wrap gap-3">
        <p className="label-mono text-signal flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 bg-signal inline-block"
            style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
          />
          LIVE DEMO · ARISECODE · WATCH IT WRITE
        </p>
        <p className="label-mono text-hairline">{status}</p>
      </div>

      {/* mock prompt */}
      <div className="px-4 py-3 border-b hairline flex items-center gap-2">
        <span className="label-mono text-signal">▌</span>
        <input
          aria-label="AriseCode prompt (read-only demo)"
          value={promptText}
          readOnly
          className="flex-1 bg-transparent border-0 outline-none mono-sm text-bone"
        />
        <button
          type="button"
          data-cursor="hover"
          onClick={() => run("hero")}
          className="label-mono bg-signal text-ink px-3 py-1.5 hover:bg-signal-dim transition-colors"
        >
          GENERATE ↵
        </button>
      </div>

      {/* chips */}
      <div className="px-4 py-3 border-b hairline flex flex-wrap gap-2 items-center">
        <span className="label-mono text-hairline">TRY:</span>
        {CHIPS.map((c) => {
          const on = active === c.key;
          return (
            <button
              key={c.key}
              type="button"
              data-cursor="hover"
              onClick={() => run(c.key)}
              className={`label-mono border px-3 py-1.5 transition-colors ${
                on
                  ? "border-signal text-signal"
                  : "hairline text-ash hover:text-bone hover:border-bone"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* split panes */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:border-r hairline">
          <div className="px-3 py-2 border-b hairline flex items-center justify-between">
            <span className="label-mono text-ash">HERO.TSX</span>
            <span className="flex gap-1.5">
              <i className="w-2 h-2 bg-hairline inline-block rounded-full" />
              <i className="w-2 h-2 bg-hairline inline-block rounded-full" />
              <i className="w-2 h-2 bg-hairline inline-block rounded-full" />
            </span>
          </div>
          <pre
            ref={codeRef}
            className="arise-code overflow-hidden text-bone p-3 m-0 whitespace-pre min-h-[240px]"
            style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", lineHeight: 1.55 }}
          />
        </div>
        <div className="bg-[#0d0d0d] border-t md:border-t-0 hairline">
          <div className="px-3 py-2 border-b hairline flex items-center justify-between">
            <span className="label-mono text-ash">LIVE PREVIEW</span>
            <span className="label-mono text-hairline">localhost:3000</span>
          </div>
          <div className="p-4">
            <div
              ref={previewRef}
              className="empty flex flex-col gap-2.5 border border-[#1f1f1f] p-4 bg-ink min-h-[200px]"
            />
          </div>
        </div>
      </div>

      <style>{`
        .arise-code .tk-tag { color: #88c0ff }
        .arise-code .tk-attr { color: #e6ff00 }
        .arise-code .tk-str { color: #a8e6a3 }
        .arise-code .tk-com { color: #5a5a5a }
        .arise-code .caret {
          display:inline-block; width:7px; height:14px; background:var(--color-signal);
          vertical-align:-2px; animation: ariseBlink 1s steps(2) infinite;
        }
        @keyframes ariseBlink { 50% { opacity: 0 } }
        .sk { height: 8px; background: #1a1a1a; }
        .sk.title { height: 18px; width: 60%; background: #262626; }
        .sk.sub { height: 10px; width: 80%; }
        .sk.btn { margin-top: 10px; height: 32px; width: 140px; background: var(--color-signal); }
        .empty .sk { opacity: 0.3; }
      `}</style>
    </div>
  );
}
