"use client";

export function PrintButton({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
