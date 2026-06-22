import { VERDICT } from "@/lib/data";
import { Section } from "./Section";

// THE VERDICT (formerly the gated Euro-Hop section). The groom decided: Yacht Week
// is the plan IF enough of the crew can lock one week; otherwise pivot to London.
// Not a Europe hop -- just London. Reads from VERDICT in lib/data.ts.
export function Verdict() {
  return (
    <Section
      id="verdict"
      eyebrow="The Verdict"
      title={
        <>
          The plan, and the <span className="text-gradient-gold">backup</span>.
        </>
      }
    >
      <p className="mx-auto mb-10 max-w-2xl text-center text-foam/70">
        The groom has spoken. Yacht Week is the goal. If we can rally a single
        week, we sail. If not enough people can make it, we pivot to a long weekend in
        London. Which one happens is on you (don&rsquo;t be a chud), so fill the survey.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {/* PRIMARY -- Yacht Week */}
        <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-navy/60 to-abyss p-7">
          <span className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-abyss">
            Plan A
          </span>
          <p className="pr-20 text-sm uppercase tracking-[0.2em] text-teal">{VERDICT.primary.condition}</p>
          <h3 className="mt-2 font-display text-3xl font-black text-gradient-gold">{VERDICT.primary.name}</h3>
          <p className="mt-3 text-foam/70">{VERDICT.primary.blurb}</p>
        </div>

        {/* BACKUP -- London */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <span className="absolute right-5 top-5 rounded-full border border-coral/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-coral">
            Plan B
          </span>
          <p className="pr-20 text-sm uppercase tracking-[0.2em] text-coral">{VERDICT.backup.condition}</p>
          <h3 className="mt-2 font-display text-3xl font-black text-sand">{VERDICT.backup.name}</h3>
          <p className="mt-3 text-foam/70">{VERDICT.backup.blurb}</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-foam/50">
        Mid-week side-trips off the boat are not in play. The fleet relocates to a new,
        usually airport-less island every night. It is the full week, or London. Not both.
        <span className="ml-2 font-bold uppercase tracking-[0.2em] text-gold">#SatwikOverboard</span>
      </p>
    </Section>
  );
}
