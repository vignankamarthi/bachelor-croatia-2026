import { FAQS } from "@/lib/data";
import { Section } from "./Section";

export function Faq() {
  return (
    <Section id="faq" eyebrow="08 / FAQ" title="Frequently asked questions">
      <div className="max-w-3xl divide-y divide-slate/15 border-y border-slate/15">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
              {f.q}
              <span className="ml-4 font-mono text-red transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
