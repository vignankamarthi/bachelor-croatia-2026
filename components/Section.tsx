import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-20 px-6 py-24 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-12 text-center">
          {eyebrow && (
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-teal">{eyebrow}</p>
          )}
          {title && (
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,5vw,3rem)] font-black leading-tight text-sand">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
