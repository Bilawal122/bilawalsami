import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { estimateMacros } from "@/lib/gemini";
import { tallyLimiter } from "@/lib/rateLimit";
import { tallyRequestSchema } from "@/lib/schemas";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON." }, { status: 400 });
  }

  const parsed = tallyRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  // rate limit by IP — fail-open in dev when Upstash isn't configured
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "127.0.0.1";

  const limit = await tallyLimiter.limit(ip);
  if (!limit.success) {
    const secs = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return NextResponse.json(
      {
        error: `Easy — ${limit.limit}/min limit. Try again in ${secs}s.`,
        retryAfter: secs,
      },
      { status: 429, headers: { "Retry-After": String(secs) } },
    );
  }

  try {
    const result = await estimateMacros(parsed.data.input);
    return NextResponse.json(
      { ...result, remaining: limit.remaining, limit: limit.limit },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("tally-demo error", err);
    return NextResponse.json(
      { error: "Estimator unavailable. Try again in a moment." },
      { status: 502 },
    );
  }
}
