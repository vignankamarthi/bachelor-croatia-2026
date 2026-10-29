"use client";

import { useState } from "react";
import { BIG_TWO, CREW, TRIP } from "@/lib/data";
import { Attendance, submitRsvp, validateRsvp } from "@/lib/rsvp-store";
import { Section } from "./Section";

const ATTEND_OPTIONS: { id: Attendance; label: string }[] = [
  { id: "in", label: "Yes" },
  { id: "maybe", label: "Maybe" },
  { id: "out", label: "No" },
];

function chip(active: boolean) {
  return `border px-4 py-2.5 text-sm transition-colors ${
    active ? "border-ink bg-ink text-paper" : "border-slate/25 text-slate hover:border-ink"
  }`;
}

export function RsvpForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [picks, setPicks] = useState({ spurs: false, gymkhana: false });
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const out = attendance === "out";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const rsvp = {
      name,
      attendance: attendance ?? undefined,
      spurs: out ? false : picks.spurs,
      gymkhana: out ? false : picks.gymkhana,
      note,
    };
    const problem = validateRsvp(rsvp);
    if (problem) return setError(problem);
    setError("");
    setSubmitting(true);
    try {
      await submitRsvp({ ...rsvp, attendance: attendance! });
      setSaved(true);
    } catch (err) {
      console.error("[rsvp] submit failed", err);
      setError("The form did not submit. Please try again, or contact Vignan.");
    } finally {
      setSubmitting(false);
    }
  }

  if (saved) {
    return (
      <Section id="rsvp" eyebrow="05 / The form" title="Thank you. Your response is saved.">
        <p className="max-w-xl text-lg text-muted">
          To change your response, submit the form again with the same name. The new response
          replaces the old one.
        </p>
        <button onClick={() => setSaved(false)} className={`mt-8 ${chip(false)}`}>
          Change my response
        </button>
      </Section>
    );
  }

  return (
    <Section
      id="rsvp"
      eyebrow="05 / The form"
      title="Response form"
      lead={`Please complete the form by ${TRIP.responseDeadlineLabel}. Only Vignan sees your event selections and your notes. The guest list shows only your attendance for the weekend.`}
    >
      <form onSubmit={onSubmit} className="max-w-3xl space-y-10">
        <fieldset>
          <legend className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">1. Your name</legend>
          <div className="flex flex-wrap gap-2">
            {CREW.map((g) => (
              <button type="button" key={g.name} onClick={() => setName(g.name)} className={chip(name === g.name)}>
                {g.name}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            2. Can you attend {TRIP.dates}?
          </legend>
          <div className="flex flex-wrap gap-2">
            {ATTEND_OPTIONS.map((o) => (
              <button type="button" key={o.id} onClick={() => setAttendance(o.id)} className={chip(attendance === o.id)}>
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset disabled={out} className={out ? "opacity-40" : ""}>
          <legend className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            3. Select the events that interest you (private)
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {BIG_TWO.map((ev) => {
              const on = !out && picks[ev.id];
              return (
                <label
                  key={ev.id}
                  className={`flex cursor-pointer items-start gap-4 border p-5 transition-colors ${
                    on ? "border-ink bg-ink text-paper" : "border-slate/25 text-slate hover:border-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-red"
                    checked={on}
                    onChange={(e) => setPicks((p) => ({ ...p, [ev.id]: e.target.checked }))}
                  />
                  <span>
                    <span className="block font-medium">{ev.name}</span>
                    <span className={`mt-1 block font-mono text-xs ${on ? "text-mist/75" : "text-muted"}`}>
                      {ev.price} ({ev.priceUsd}) pp / {ev.when}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-muted">Leave both boxes clear if neither event interests you.</p>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            4. Notes (optional, private)
          </legend>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="Arrival plans, dietary needs, or questions for Vignan"
            className="w-full border border-slate/25 bg-transparent p-4 text-slate placeholder:text-muted/60 focus:border-ink focus:outline-none"
          />
        </fieldset>

        {error && <p className="text-sm font-medium text-red">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-red px-8 py-4 font-medium text-paper transition-colors hover:bg-red-deep disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit"} <span>&rarr;</span>
        </button>
      </form>
    </Section>
  );
}
