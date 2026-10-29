import { ReactNode } from "react";

// Zydro-style mono eyebrow: a small filled square, then spaced caps.
export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-slate" : "text-mist"
      }`}
    >
      <span className={`inline-block h-2 w-2 ${tone === "dark" ? "bg-red" : "bg-brass"}`} />
      {children}
    </p>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = "dark",
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  tone?: "dark" | "light"; // "dark" = dark text on paper, "light" = light text on ink
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-10 max-w-3xl">
          {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
          {title && (
            <h2
              className={`font-display text-[clamp(1.9rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-tight ${
                tone === "dark" ? "text-ink" : "text-paper"
              }`}
            >
              {title}
            </h2>
          )}
          {lead && (
            <p className={`mt-4 text-lg ${tone === "dark" ? "text-muted" : "text-mist/80"}`}>{lead}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
