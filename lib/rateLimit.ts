import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface LimitResult {
  success: boolean;
  remaining: number;
  /** epoch ms when the next slot frees up */
  reset: number;
  limit: number;
}

interface Limiter {
  limit: (key: string) => Promise<LimitResult>;
}

function makeLimiter(): Limiter {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    // dev / preview fallback — fail open so the demo still works without keys.
    // The route stamps the response with `stub: true` so the UI can label it.
    return {
      limit: async () => ({ success: true, remaining: 5, reset: Date.now() + 60_000, limit: 5 }),
    };
  }
  const redis = new Redis({ url, token });
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
    prefix: "bilawalsami:tally",
  });
  return {
    limit: async (key) => {
      const r = await rl.limit(key);
      return { success: r.success, remaining: r.remaining, reset: r.reset, limit: r.limit };
    },
  };
}

export const tallyLimiter = makeLimiter();
