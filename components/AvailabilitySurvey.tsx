"use client";

import { useEffect, useMemo, useState } from "react";
import { WEEKS, CREW } from "@/lib/data";
import {
  AvailabilityEntry,
  getResponses,
  submitResponse,
  tallyByWeek,
  uploadSelfie,
} from "@/lib/survey-store";
import { Section } from "./Section";
import { SelfieCapture } from "./SelfieCapture";

function isPast(weekEndISO: string): boolean {
  return new Date(weekEndISO).getTime() < Date.now();
}

export function AvailabilitySurvey() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [funny, setFunny] = useState("");
  const [photo, setPhoto] = useState(""); // captured selfie data URL (required)
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [entries, setEntries] = useState<AvailabilityEntry[]>([]);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getResponses()
      .then(setEntries)
      .catch((e) => console.error("[survey] load failed", e))
      .finally(() => setMounted(true));
  }, []);

  const tally = useMemo(() => tallyByWeek(entries), [entries]);
  const maxCount = useMemo(
    () => Math.max(1, ...Object.values(tally)),
    [tally],
  );
  const leadingId = useMemo(() => {
    let best: string | null = null;
    let bestN = 0;
    for (const [id, n] of Object.entries(tally)) {
      if (n > bestN) {
        bestN = n;
        best = id;
      }
    }
    return best;
  }, [tally]);

  function toggle(id: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || picked.size === 0 || !funny.trim() || !photo || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const photoUrl = await uploadSelfie(photo, name.trim());
      const entry: AvailabilityEntry = {
        name: name.trim(),
        weekIds: [...picked],
        note: note.trim(),
        funny: funny.trim(),
        photoUrl,
        submittedAt: new Date().toISOString(),
      };
      const next = await submitResponse(entry);
      setEntries(next);
      setSaved(true);
    } catch (err) {
      console.error("[survey] submit failed", err);
      setError("Could not save your reply or upload your selfie. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section
      id="survey"
      eyebrow="Pick a Week"
      title={
        <>
          When can you <span className="text-gradient-gold">actually</span> get on a boat?
        </>
      }
    >
      <p className="mx-auto mb-10 max-w-2xl text-center text-foam/70">
        Pick your name, check every week you could make, and send it. We sail the week
        most of us can make. Re-submitting overrides your previous answer.
      </p>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-foam/70">
            Who are you <span className="text-coral">*</span>
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CREW.map((g) => {
              const active = name === g.name;
              return (
                <button
                  type="button"
                  key={g.name}
                  onClick={() => {
                    setName(g.name);
                    setSaved(false);
                  }}
                  className={[
                    "flex min-h-[44px] items-center justify-center rounded-lg border px-2 py-2 text-center text-xs transition-colors",
                    active
                      ? "border-gold bg-gold/15 text-sand"
                      : "border-white/10 text-foam/70 hover:border-teal/50",
                  ].join(" ")}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-foam/40">
            Already submitted? Tap your name again and re-send to override your answer.
          </p>

          <p className="mt-6 text-sm text-foam/70">
            Funny selfie <span className="text-coral">*</span>
          </p>
          <p className="text-xs text-foam/40">Camera only, no uploads. Snap a funny live one so nobody RSVPs as you.</p>
          <SelfieCapture value={photo} onChange={(d) => { setPhoto(d); setSaved(false); }} />

          <p className="mt-6 mb-2 text-sm text-foam/70">
            Weeks that work <span className="text-coral">*</span>
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {WEEKS.map((w) => {
              const past = mounted && isPast(w.end);
              const on = picked.has(w.id);
              return (
                <button
                  type="button"
                  key={w.id}
                  disabled={past}
                  onClick={() => toggle(w.id)}
                  className={[
                    "flex min-h-[44px] items-center rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                    past
                      ? "cursor-not-allowed border-white/5 text-foam/25 line-through"
                      : on
                        ? "border-gold bg-gold/15 text-sand"
                        : "border-white/10 text-foam/70 hover:border-teal/50",
                  ].join(" ")}
                >
                  <span className="flex w-full items-center justify-center gap-2">
                    <span>{w.label}</span>
                    {past && <span className="text-[10px] uppercase">closed</span>}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="mt-6 block text-sm text-foam/70">
            Say something funny <span className="text-coral">*</span>
            <textarea
              value={funny}
              onChange={(e) => {
                setFunny(e.target.value);
                setSaved(false);
              }}
              rows={2}
              placeholder="e.g. roast Satwik in one line. this goes on the wall, make it count."
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-abyss/60 px-4 py-2.5 text-sand outline-none focus:border-gold"
            />
          </label>

          <label className="mt-6 block text-sm text-foam/70">
            Anything we should know (optional)
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setSaved(false);
              }}
              rows={2}
              placeholder="e.g. stuck wiping my MD's ass on a live deal till August, somebody save me"
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-abyss/60 px-4 py-2.5 text-sand outline-none focus:border-gold"
            />
          </label>

          <button
            type="submit"
            disabled={!name.trim() || picked.size === 0 || !funny.trim() || !photo || submitting}
            className="mt-6 w-full rounded-full bg-gold px-6 py-3 font-semibold text-abyss transition-transform enabled:hover:scale-[1.02] disabled:opacity-40"
          >
            {submitting ? "Sending..." : saved ? "Sent. Re-send anytime 😛" : "Send it 😛"}
          </button>
          {error && <p className="mt-3 text-sm text-coral">{error}</p>}
        </form>

        {/* LIVE TALLY */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl font-bold text-sand">Live tally</p>
            <span className="text-sm text-foam/50">
              {entries.length} {entries.length === 1 ? "reply" : "replies"}
            </span>
          </div>

          {!mounted ? (
            <p className="mt-6 text-sm text-foam/40">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="mt-6 text-sm text-foam/40">
              No replies yet. Be the first and the leading week shows up here.
            </p>
          ) : (
            <div className="mt-6 space-y-2.5">
              {WEEKS.filter((w) => !isPast(w.end)).map((w) => {
                const n = tally[w.id] ?? 0;
                const lead = w.id === leadingId && n > 0;
                return (
                  <div key={w.id} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-xs text-foam/60">{w.label}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full ${lead ? "bg-gradient-to-r from-gold to-coral" : "bg-teal/60"}`}
                        style={{ width: `${(n / maxCount) * 100}%` }}
                      />
                    </div>
                    <span className={`w-6 text-right text-xs ${lead ? "text-gold" : "text-foam/50"}`}>
                      {n}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {mounted && entries.length > 0 && (
            <div className="mt-6 border-t border-white/8 pt-4">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-teal">Who replied</p>
              <div className="flex flex-wrap gap-2">
                {entries.map((e) => (
                  <span
                    key={e.name}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-foam/70"
                  >
                    {e.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mounted && entries.some((e) => e.funny) && (
            <div className="mt-6 border-t border-white/8 pt-4">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-teal">Say something funny</p>
              <div className="space-y-3">
                {entries
                  .filter((e) => e.funny)
                  .map((e) => (
                    <div key={e.name} className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-left">
                      {e.photoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={e.photoUrl} alt={e.name} className="h-12 w-12 shrink-0 rounded-md object-cover" />
                      )}
                      <div>
                        <p className="text-sm italic text-foam/80">&ldquo;{e.funny}&rdquo;</p>
                        <p className="mt-1 text-xs text-gold">- {e.name}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-foam/40">
        Everyone&rsquo;s replies feed one live tally we can all see.
        Re-submit with the same name anytime to update your pick.
        <span className="ml-1 font-bold uppercase tracking-[0.2em] text-gold">#SatwikOverboard</span>
      </p>
    </Section>
  );
}
