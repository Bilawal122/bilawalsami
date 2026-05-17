import { AssetSlot } from "@/components/AssetSlot";

/**
 * Phase 4 will replace this with either a real iframe embed of arisecode-zeta
 * (sandboxed) or a chip-driven playback of arisecode-prompt-{1,2,3}.mp4.
 */
export function AriseCodeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border hairline bg-steel p-4 flex items-center justify-between gap-4">
        <p className="label-mono text-signal">EMBEDDED DEMO · WIRED IN PHASE 004</p>
        <p className="label-mono text-hairline hidden sm:block">
          IFRAME OR PRE-RECORDED CHIP PLAYBACK
        </p>
      </div>
      <AssetSlot
        spec="60vw × 50vh iframe · sandbox: allow-scripts + allow-same-origin"
        aspect="16 / 9"
        label="DEMO SLOT"
      />
    </div>
  );
}
