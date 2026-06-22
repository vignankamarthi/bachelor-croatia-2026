import { ROUTE, TRIP } from "@/lib/data";
import { Section } from "./Section";

export function ThePlan() {
  return (
    <Section
      id="plan"
      eyebrow="The Plan"
      title={
        <>
          Seven days, a moving <span className="text-teal">fleet</span>, and a{" "}
          <span className="text-gradient-gold">Split-to-Split</span> round-trip.
        </>
      }
    >
      <p className="mx-auto mb-12 max-w-2xl text-center text-foam/70">
        Yacht Week is a week-long party at sea. You board in Split, and the whole fleet
        sails a new island most nights along the Dalmatian coast. The boat relocates
        daily, so this is one continuous week, not a hub you commute from. Below is
        the typical Original route.
      </p>

      <ol className="mx-auto max-w-2xl space-y-4">
        {ROUTE.map((stop) => (
          <li key={stop.place}>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5 text-center transition-colors hover:border-teal/40">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-teal">{stop.day}</span>
                <span className="font-display text-xl font-bold text-sand">{stop.place}</span>
                {stop.airport && (
                  <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                    airport
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-foam/65">{stop.blurb}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <a
          href={TRIP.yachtWeekUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-teal/40 px-6 py-3 text-sm font-semibold text-teal transition-colors hover:border-teal hover:bg-teal/10"
        >
          See it on the official Yacht Week site &rarr;
        </a>
      </div>
    </Section>
  );
}
