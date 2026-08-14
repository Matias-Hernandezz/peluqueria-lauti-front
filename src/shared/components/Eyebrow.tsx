import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  align?: "start" | "center";
}

/** Etiqueta de sección con línea dorada, estilo editorial del template. */
export function Eyebrow({ children, align = "start" }: EyebrowProps) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-9 bg-gold" aria-hidden="true" />
      <span className="text-xs uppercase tracking-[0.3em] text-gold/90">
        {children}
      </span>
      {align === "center" && (
        <span className="h-px w-9 bg-gold" aria-hidden="true" />
      )}
    </div>
  );
}
