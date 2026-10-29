import { COSTS, COST_FOOTNOTE, COST_TOTAL, formatUsd } from "@/lib/data";
import { Section } from "./Section";

export function Costs() {
  return (
    <Section
      id="costs"
      eyebrow="01 / Fixed costs"
      title="Estimated costs for each guest"
      lead="These are ballpark estimates per person for three nights. Each guest pays these costs, whichever events they select."
    >
      <div className="grid gap-px border border-slate/15 bg-slate/15 sm:grid-cols-2 lg:grid-cols-4">
        {COSTS.map((c) => (
          <div key={c.item} className="bg-paper p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{c.item}</p>
            <p className="mt-3 font-display text-4xl font-medium tracking-tight text-ink">{formatUsd(c.low, c.high)}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate/80">{c.note}</p>
            <p className="mt-4 font-mono text-[11px] leading-snug text-muted/80">Source: {c.source}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 bg-ink p-6 text-paper sm:flex-row sm:items-baseline sm:justify-between sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist/75">Total fixed costs per person</p>
        <p className="font-display text-4xl font-medium tracking-tight">{formatUsd(COST_TOTAL.low, COST_TOTAL.high)}</p>
      </div>
      <p className="mt-4 text-sm text-muted">{COST_FOOTNOTE}</p>
    </Section>
  );
}
