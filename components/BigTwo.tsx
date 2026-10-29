import { BIG_TWO } from "@/lib/data";
import { Section } from "./Section";

export function BigTwo() {
  return (
    <Section
      id="big-two"
      eyebrow="02 / Optional events"
      title="The two main events"
      lead={
        <>
          <strong className="font-semibold text-ink">We are gauging interest in these two events.</strong> The
          responses decide if the group books one event or both. Each event is optional, and only
          Vignan sees your selections.
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {BIG_TWO.map((e) => (
          <article key={e.id} className="flex flex-col bg-ink p-6 text-paper sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">{e.when}</p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">{e.name}</h3>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-white/10 py-5">
              <span className="whitespace-nowrap font-display text-5xl font-medium tracking-tight text-paper">{e.price}</span>
              <span className="whitespace-nowrap font-display text-2xl text-mist/80">({e.priceUsd})</span>
              <span className="text-sm text-mist/75">{e.priceNote}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {e.includes.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-mist/90">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-red" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-8 font-mono text-[11px] leading-snug text-mist/50">Source: {e.source}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
