import { FAQS } from "@/lib/data";
import { Section } from "./Section";

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title={
        <>
          The <span className="text-gradient-gold">obvious</span> questions.
        </>
      }
    >
      <div className="divide-y divide-white/8 rounded-2xl border border-white/10">
        {FAQS.map((f) => (
          <details key={f.q} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-sand">
              {f.q}
              <span className="ml-4 text-gold transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-foam/65">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
