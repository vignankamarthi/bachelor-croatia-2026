import { HOTELS, HOTEL_NOTE } from "@/lib/data";
import { Section } from "./Section";

export function Hotels() {
  return (
    <Section
      id="hotels"
      eyebrow="03 / Hotels"
      title="Hotel shortlist"
      lead="The group stays in one of these 3-star West End hotels. Each guest books their own room after the group selects the hotel."
    >
      <div className="grid gap-px border border-slate/15 bg-slate/15 sm:grid-cols-2">
        {HOTELS.map((h) => (
          <div key={h.name} className="flex flex-col bg-paper p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{h.area}</p>
            <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink">{h.name}</h3>
            <p className="mt-1 text-sm text-muted">{h.rating}</p>
            <div className="mt-6 flex items-end justify-between gap-4">
              <p className="font-display text-3xl font-medium tracking-tight text-ink">
                ~${h.perPersonNight}
                <span className="ml-2 font-sans text-sm font-normal text-muted">per person per night</span>
              </p>
              {h.url && (
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Website <span className="text-red">&rarr;</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{HOTEL_NOTE}</p>
    </Section>
  );
}
