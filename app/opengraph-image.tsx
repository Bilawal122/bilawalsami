import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Bilawal Ullah Sami — Software engineer building tools that ship, not slideware.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    <div
      style={{
        background: "#0A0A0A",
        color: "#F2EFE8",
        width: "100%",
        height: "100%",
        padding: 72,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* hairline border at edges for brutalist frame */}
      <div
        style={{
          position: "absolute",
          inset: 24,
          border: "1px solid #2A2A2A",
        }}
      />

      {/* top strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <span
          style={{
            color: "#6B6B6B",
            fontSize: 22,
            letterSpacing: "0.18em",
            fontFamily: "ui-monospace, monospace",
            textTransform: "uppercase",
          }}
        >
          Bilawal Ullah Sami · est. 2003 · Manchester
        </span>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div style={{ width: 14, height: 14, background: "#E6FF00" }} />
          <span
            style={{
              color: "#E6FF00",
              fontSize: 22,
              letterSpacing: "0.18em",
              fontFamily: "ui-monospace, monospace",
              textTransform: "uppercase",
            }}
          >
            Available
          </span>
        </div>
      </div>

      {/* punch line */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#6B6B6B",
            fontSize: 26,
            fontFamily: "system-ui, sans-serif",
            marginBottom: 18,
          }}
        >
          Bilawal Ullah Sami
        </span>
        <span
          style={{
            fontSize: 108,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#F2EFE8",
          }}
        >
          Software engineer.
        </span>
        <span
          style={{
            fontSize: 108,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#F2EFE8",
          }}
        >
          Building tools that
        </span>
        <span
          style={{
            fontSize: 108,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#E6FF00",
          }}
        >
          ship, not slideware.
        </span>
      </div>

      {/* bottom strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <span
          style={{
            color: "#6B6B6B",
            fontSize: 22,
            letterSpacing: "0.18em",
            fontFamily: "ui-monospace, monospace",
            textTransform: "uppercase",
          }}
        >
          bilawalsami.vercel.app
        </span>
        <span
          style={{
            color: "#6B6B6B",
            fontSize: 22,
            letterSpacing: "0.18em",
            fontFamily: "ui-monospace, monospace",
            textTransform: "uppercase",
          }}
        >
          /portfolio · 005
        </span>
      </div>
    </div>,
    { ...size },
  );
}
