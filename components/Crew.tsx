"use client";

import { useEffect, useState } from "react";
import { CREW, Guest } from "@/lib/data";
import { Attendance, attendanceByName, getAttendance, nameKey } from "@/lib/rsvp-store";
import { Section } from "./Section";

type Status = Attendance | "locked" | "no reply";

const STATUS_STYLE: Record<Status, string> = {
  locked: "border-ink bg-ink text-paper",
  in: "border-red bg-red text-paper",
  maybe: "border-brass text-brass",
  out: "border-slate/30 text-muted line-through",
  "no reply": "border-slate/20 text-muted/70",
};

const STATUS_LABEL: Record<Status, string> = {
  locked: "Confirmed",
  in: "Attending",
  maybe: "Maybe",
  out: "Not attending",
  "no reply": "No response",
};

export function Crew() {
  // Public slice only: name + attendance. Spurs/Gymkhana picks are never fetched.
  const [byName, setByName] = useState<Map<string, Attendance>>(new Map());

  useEffect(() => {
    getAttendance()
      .then((rows) => setByName(attendanceByName(rows)))
      .catch((err) => console.error("[crew] load failed", err));
  }, []);

  function status(g: Guest): Status {
    if (g.locked) return "locked";
    return byName.get(nameKey(g.name)) ?? "no reply";
  }

  const inCount = CREW.filter((g) => status(g) === "in").length;

  return (
    <Section
      id="crew"
      eyebrow="07 / Guests"
      title="Guest list"
      lead="The guest list shows the attendance of each guest for the weekend. It does not show event selections."
    >
      {inCount > 0 && (
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-red">
          {inCount} confirmed, plus the groom and the best man
        </p>
      )}
      <div className="grid border-l border-t border-slate/15 sm:grid-cols-2 lg:grid-cols-3">
        {CREW.map((g) => {
          const s = status(g);
          return (
            <div key={g.name} className="flex items-center justify-between gap-4 border-b border-r border-slate/15 p-5">
              <div>
                <p className="font-display text-lg font-medium text-ink">{g.name}</p>
                <p className="text-sm text-muted">{g.role}</p>
              </div>
              <span
                className={`shrink-0 border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${STATUS_STYLE[s]}`}
              >
                {STATUS_LABEL[s]}
              </span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
