import { DAYS } from "@/lib/data";
import { Section } from "./Section";

// Zydro-style node-and-wire diagram: day boxes joined by a wire with brass junction dots.
export function Weekend() {
  return (
    <div className="bg-drafting">
      <Section
        id="weekend"
        tone="light"
        eyebrow="06 / Schedule"
        title="Weekend schedule"
        lead="The schedule shows only the confirmed events. The plans for Friday evening, the Sunday daytime activity, and the night out are not yet confirmed."
      >
        <div className="relative">
          {/* horizontal wire (desktop) */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-mist/25 md:block" aria-hidden />
          {/* vertical wire (mobile) */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-mist/25 md:hidden" aria-hidden />

          <ol className="relative grid gap-6 md:grid-cols-4 md:gap-5">
            {DAYS.map((d) => (
              <li key={d.day} className="relative flex pl-12 md:pl-0">
                <span
                  className="animate-pulse-dot absolute left-[15px] top-6 h-2.5 w-2.5 rounded-full bg-brass md:hidden"
                  aria-hidden
                />
                <div className="w-full border border-mist/20 bg-ink/80 p-1.5 backdrop-blur-sm">
                  <div className="h-full bg-ink-3/70 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist/70">
                      {d.day} / {d.date}
                    </p>
                    <p className="mt-3 font-display text-xl font-medium text-paper">{d.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-mist/75">{d.blurb}</p>
                    {d.optional && (
                      <p className="mt-4 inline-block border border-brass/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                        Optional
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-mist/50">
          All guests stay in one West End hotel
        </p>
      </Section>
    </div>
  );
}
