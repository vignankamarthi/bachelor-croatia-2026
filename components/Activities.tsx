import { ACTIVITIES } from "@/lib/data";
import { Section } from "./Section";

export function Activities() {
  return (
    <Section
      id="activities"
      eyebrow="04 / Activities"
      title="Activity shortlist"
      lead="These are options for the Sunday daytime activity. The group selects one or two. Prices and group availability are not yet checked."
    >
      <div className="grid gap-px border border-slate/15 bg-slate/15 sm:grid-cols-2 lg:grid-cols-3">
        {ACTIVITIES.map((a) => {
          const body = (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-red">{a.type}</p>
              <p className="mt-2 font-display text-lg font-medium text-ink">
                {a.name}
                {a.url && <span className="ml-2 text-red">&rarr;</span>}
              </p>
              <p className="text-sm text-muted">{a.where}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate/80">{a.blurb}</p>
            </>
          );
          return a.url ? (
            <a
              key={a.name}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-paper p-6 transition-colors hover:bg-paper-2"
            >
              {body}
            </a>
          ) : (
            <div key={a.name} className="bg-paper p-6">
              {body}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
