import { COSTS, COST_HEADLINE } from "@/lib/data";
import { Section } from "./Section";

export function Costs() {
  return (
    <Section
      id="damage"
      eyebrow="The Damage"
      title={
        <>
          What it runs, <span className="text-gradient-gold">roughly</span>.
        </>
      }
    >
      <p className="mx-auto mb-10 max-w-2xl text-center text-foam/70">{COST_HEADLINE}</p>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        {COSTS.map((line, i) => (
          <div
            key={line.item}
            className={`flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between ${
              i % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
            }`}
          >
            <div>
              <p className="font-semibold text-sand">{line.item}</p>
              <p className="text-sm text-foam/55">{line.note}</p>
            </div>
            <p className="font-display text-2xl font-black text-gold">{line.amount}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-foam/40">
        Rough numbers, not a budget meeting. The boat and the split get sorted together
        once we&rsquo;re locked in. Your only job is telling us when you&rsquo;re free.
      </p>
    </Section>
  );
}
