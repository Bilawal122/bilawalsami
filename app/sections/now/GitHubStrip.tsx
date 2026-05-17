/**
 * Build-time fetched GitHub contributions strip — last ~12 weeks of activity
 * for `Bilawal122`. Renders as a 1px-bordered row of 12px squares whose
 * intensity maps to a manual colour ramp (hairline → signal-dim → signal).
 *
 * Requires GITHUB_TOKEN in env (read scope). Without it, renders a placeholder
 * mono caption so the layout still holds — no client-side fetching.
 */

const QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

interface Day {
  date: string;
  count: number;
}

async function fetchDays(login: string): Promise<Day[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: { weeks: { contributionDays: Day[] }[] };
          };
        };
      };
    };
    const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
    return weeks.flatMap((w) => w.contributionDays).slice(-84); // last 12 weeks
  } catch {
    return null;
  }
}

function intensityColor(count: number): string {
  if (count === 0) return "var(--color-hairline)";
  if (count < 3) return "color-mix(in srgb, var(--color-signal-dim) 30%, var(--color-hairline))";
  if (count < 8) return "var(--color-signal-dim)";
  return "var(--color-signal)";
}

export async function GitHubStrip() {
  const days = await fetchDays("Bilawal122");

  if (!days || days.length === 0) {
    return (
      <div className="mt-10 flex items-center gap-3">
        <span className="label-mono text-hairline">CONTRIBUTIONS · PENDING TOKEN</span>
        <span className="label-mono text-hairline">github.com/Bilawal122</span>
      </div>
    );
  }

  const total = days.reduce((s, d) => s + d.count, 0);

  return (
    <div className="mt-10 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="label-mono text-ash">
          LAST 12 WEEKS · {total} CONTRIBUTION{total === 1 ? "" : "S"}
        </p>
        <a
          href="https://github.com/Bilawal122"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="label-mono text-bone hover:text-signal transition-colors"
        >
          GITHUB.COM/BILAWAL122 ↗
        </a>
      </div>
      <div className="flex gap-[3px] flex-wrap" role="img" aria-label={`${total} contributions in the last 12 weeks`}>
        {days.map((d) => (
          <span
            key={d.date}
            className="border hairline"
            style={{
              width: 12,
              height: 12,
              backgroundColor: intensityColor(d.count),
            }}
            title={`${d.date} · ${d.count} contribution${d.count === 1 ? "" : "s"}`}
          />
        ))}
      </div>
    </div>
  );
}
