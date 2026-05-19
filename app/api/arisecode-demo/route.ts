import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { tallyLimiter } from "@/lib/rateLimit";

export const runtime = "nodejs";

const requestSchema = z.object({
  prompt: z.string().min(1).max(200),
});

const SYSTEM_PROMPT = `You generate a single React JSX section based on a short
freeform prompt. Output rules, all required:

- Output ONLY JSX. No prose, no commentary, no markdown fences.
- The JSX must be syntactically valid and self-contained inside ONE outermost
  <section> or <article> tag.
- Use Tailwind classes from this restricted brutalist palette only:
    bg-ink, bg-steel, bg-hairline, bg-signal,
    text-bone, text-ash, text-signal, text-ink, text-hairline,
    border-hairline, border-bone, border-signal, border,
    font-bold, font-black, tracking-tight, leading-none, leading-tight,
    label-mono, mono-sm, space-y-2, space-y-4, gap-2, gap-4, gap-6,
    flex, grid, grid-cols-2, grid-cols-3, items-baseline, items-center,
    p-4, p-6, p-8, px-4, py-2, py-3, my-6, mt-4, mt-6, mt-8,
    text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl,
    text-5xl, max-w-prose, w-full, inline-block, block.
- Keep it to 12 to 30 lines. No filler content.
- No external imports. No event handlers. No useState. Plain markup only.
- No images. Use text and shapes only.
- Match this aesthetic: hairline borders, monospace labels, big bold sans
  headings, signal-yellow only for one accent moment per section.`;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "127.0.0.1";

  // reuse the Tally limiter — same per-IP envelope keeps it simple
  const limit = await tallyLimiter.limit(`arisecode:${ip}`);
  if (!limit.success) {
    const secs = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return NextResponse.json(
      { error: `Easy, ${limit.limit}/min limit. Try again in ${secs}s.` },
      { status: 429, headers: { "Retry-After": String(secs) } },
    );
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "AriseCode demo is not configured.", stub: true },
      { status: 503 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(parsed.data.prompt);
    let jsx = result.response.text().trim();

    // strip code-fence wrappers if Gemini ignored the no-markdown instruction
    jsx = jsx.replace(/^```(?:jsx|tsx|html)?\s*/i, "").replace(/```\s*$/i, "");

    return NextResponse.json(
      { jsx, remaining: limit.remaining, limit: limit.limit },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("arisecode-demo error", err);
    return NextResponse.json(
      { error: "Generator unavailable. Try a chip below." },
      { status: 502 },
    );
  }
}
