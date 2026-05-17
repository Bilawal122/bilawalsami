/**
 * Brutalist placeholder card rendered wherever an asset is still "pending".
 * Same dimensions as the eventual asset so the layout never shifts on swap-in.
 */
export function AssetSlot({
  spec,
  aspect = "16 / 9",
  label = "ASSET PENDING",
  className = "",
}: {
  spec: string;
  aspect?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative border hairline bg-steel overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={`${label} — ${spec}`}
    >
      {/* subtle scanline grid for the "missing image" look */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-hairline) 0 1px, transparent 1px 12px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-start justify-end gap-1 p-4">
        <p className="label-mono text-bone">{label}</p>
        <p className="label-mono text-hairline">{spec}</p>
      </div>
      <div className="absolute top-4 right-4 h-2 w-2 bg-blood" aria-hidden="true">
        <span
          className="block h-full w-full bg-blood"
          style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}
