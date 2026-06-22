"use client";

import { useEffect, useState } from "react";
import { CREW, Guest } from "@/lib/data";
import { getResponses } from "@/lib/survey-store";
import { Section } from "./Section";

const STATUS_STYLE: Record<string, string> = {
  in: "border-gold/60 bg-gold/10 text-gold",
  locked: "border-teal/50 text-teal",
  likely: "border-gold/50 text-gold",
  invited: "border-coral/50 text-coral",
  tbd: "border-white/15 text-foam/40",
};

export function Crew() {
  // Names that have submitted availability (lowercased for matching the selector values).
  const [responded, setResponded] = useState<Set<string>>(new Set());

  useEffect(() => {
    getResponses()
      .then((entries) => setResponded(new Set(entries.map((e) => e.name.trim().toLowerCase()))))
      .catch((err) => console.error("[crew] load failed", err));
  }, []);

  // Locked guests stay locked; anyone who has submitted flips invited -> in; else original.
  function displayStatus(g: Guest): string {
    if (g.status === "locked") return "locked";
    if (responded.has(g.name.trim().toLowerCase())) return "in";
    return g.status;
  }

  const inCount = CREW.filter((g) => displayStatus(g) === "in").length;

  return (
    <Section
      id="crew"
      eyebrow="The Lineup"
      title={
        <>
          The <span className="text-teal">manifest</span>.
        </>
      }
    >
      <p className="mx-auto mb-10 max-w-2xl text-center text-foam/70">
        Satwik&rsquo;s side of the wedding party. Groom and best man are locked; everyone
        else flips from &ldquo;invited&rdquo; to &ldquo;in&rdquo; the moment they complete the survey.
        <span className="ml-1 font-bold uppercase tracking-[0.2em] text-gold">#SatwikOverboard</span>
      </p>

      {inCount > 0 && (
        <p className="mb-8 text-center text-sm text-gold">
          {inCount} {inCount === 1 ? "reply" : "replies"} in so far.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CREW.map((g, i) => {
          const status = displayStatus(g);
          return (
            <div
              key={`${g.name}-${i}`}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-center transition-transform hover:-translate-y-1"
            >
              <p className="font-display text-xl font-bold text-sand">{g.name}</p>
              <span
                className={`mt-3 inline-block rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_STYLE[status]}`}
              >
                {status}
              </span>
              <p className="mt-3 text-sm text-foam/55">{g.role}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
