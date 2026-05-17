"use client";

import { useEffect, useState } from "react";

/**
 * Live local-time stamp in Manchester / London. Format: HH:MM:SS BST (or GMT).
 * Mounted client-side; SSR renders an em-dash placeholder so there's no hydration
 * mismatch and the layout doesn't shift when the time appears.
 */
export function LiveClock() {
  const [stamp, setStamp] = useState<string>("—:—:— BST");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const update = () => {
      const now = new Date();
      const zone =
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          timeZoneName: "short",
        })
          .formatToParts(now)
          .find((p) => p.type === "timeZoneName")?.value ?? "BST";
      setStamp(`${formatter.format(now)} ${zone}`);
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span aria-label={`Local time in Manchester: ${stamp}`} suppressHydrationWarning>
      [{stamp}]
    </span>
  );
}
