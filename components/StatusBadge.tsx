/**
 * PRD §2.6 — text-only status indicators with a 1px hairline underline.
 * Colour-coded so recruiters can scan project credibility at a glance.
 */
export type Status = "LIVE" | "BETA" | "CLIENT" | "ACADEMIC" | "BUSINESS" | "IN DEV";

const STATUS_COLOUR: Record<Status, string> = {
  LIVE: "text-signal",
  BETA: "text-bone",
  CLIENT: "text-bone",
  ACADEMIC: "text-ash",
  BUSINESS: "text-ash",
  "IN DEV": "text-ash",
};

export function StatusBadge({
  statuses,
  className = "",
}: {
  statuses: Status | Status[];
  className?: string;
}) {
  const list = Array.isArray(statuses) ? statuses : [statuses];
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {list.map((status, i) => (
        <span key={status} className="inline-flex items-center gap-2">
          {i > 0 && <span className="text-hairline label-mono">+</span>}
          <span className={`label-mono border-b hairline pb-[1px] ${STATUS_COLOUR[status]}`}>
            {status}
          </span>
        </span>
      ))}
    </span>
  );
}
