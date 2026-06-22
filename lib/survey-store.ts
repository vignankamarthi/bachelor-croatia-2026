// =============================================================================
// SURVEY PERSISTENCE
// -----------------------------------------------------------------------------
// The centerpiece survey reads/writes through THIS module only. If Supabase is
// configured (NEXT_PUBLIC_SUPABASE_URL + _ANON_KEY in .env.local) it persists to
// the shared `availability` table so the whole crew sees one live tally. If not,
// it transparently falls back to this browser's localStorage (per-device).
//
// The public API is async (getResponses/submitResponse/clearResponses return
// Promises) so the same calls work against either backend. The PURE helpers
// (upsertEntry, tallyByWeek) hold the dedupe/tally logic and are unit-tested.
// =============================================================================

import { supabase, SURVEY_TABLE } from "./supabase";

export type AvailabilityEntry = {
  name: string;
  weekIds: string[]; // ids from WEEKS in data.ts
  note: string;
  funny: string; // "say something funny" message
  photoUrl: string; // live selfie (Supabase Storage URL, or data URL in stub mode)
  submittedAt: string; // ISO timestamp
};

const STORAGE_KEY = "croatia-availability-v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// -----------------------------------------------------------------------------
// PURE logic (unit-tested; no I/O)
// -----------------------------------------------------------------------------

// Upserts by name (case-insensitive) so re-submitting updates rather than dupes.
// Returns a NEW array; does not mutate the input.
export function upsertEntry(
  list: AvailabilityEntry[],
  entry: AvailabilityEntry,
): AvailabilityEntry[] {
  const key = entry.name.trim().toLowerCase();
  const idx = list.findIndex((e) => e.name.trim().toLowerCase() === key);
  if (idx >= 0) {
    const next = list.slice();
    next[idx] = entry;
    return next;
  }
  return [...list, entry];
}

// Tally: how many people picked each week id -> { weekId: count }.
export function tallyByWeek(entries: AvailabilityEntry[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const e of entries) {
    for (const id of e.weekIds) {
      counts[id] = (counts[id] ?? 0) + 1;
    }
  }
  return counts;
}

// -----------------------------------------------------------------------------
// localStorage fallback
// -----------------------------------------------------------------------------

function localGet(): AvailabilityEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AvailabilityEntry[]) : [];
  } catch {
    return [];
  }
}

// -----------------------------------------------------------------------------
// Row mapping (DB snake_case <-> app camelCase). name_key is generated in SQL.
// -----------------------------------------------------------------------------
type Row = { name: string; week_ids: string[] | null; note: string | null; funny: string | null; photo_url: string | null; submitted_at: string };

function rowToEntry(r: Row): AvailabilityEntry {
  return { name: r.name, weekIds: r.week_ids ?? [], note: r.note ?? "", funny: r.funny ?? "", photoUrl: r.photo_url ?? "", submittedAt: r.submitted_at };
}

// -----------------------------------------------------------------------------
// Public async API
// -----------------------------------------------------------------------------

export async function getResponses(): Promise<AvailabilityEntry[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from(SURVEY_TABLE)
      .select("name, week_ids, note, funny, photo_url, submitted_at")
      .order("submitted_at", { ascending: true });
    if (error) throw error;
    return (data as Row[]).map(rowToEntry);
  }
  return localGet();
}

export async function submitResponse(entry: AvailabilityEntry): Promise<AvailabilityEntry[]> {
  if (supabase) {
    // name_key (generated, unique) is the conflict target -> re-submit updates.
    const { error } = await supabase
      .from(SURVEY_TABLE)
      .upsert(
        { name: entry.name, week_ids: entry.weekIds, note: entry.note, funny: entry.funny, photo_url: entry.photoUrl, submitted_at: entry.submittedAt },
        { onConflict: "name_key" },
      );
    if (error) throw error;
    return getResponses();
  }
  // localStorage path
  if (!isBrowser()) return [];
  const all = upsertEntry(localGet(), entry);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return all;
}

export async function clearResponses(): Promise<void> {
  if (supabase) {
    // delete all rows (id is never the empty uuid) -- used for admin reset only.
    await supabase.from(SURVEY_TABLE).delete().neq("id", "00000000-0000-0000-0000-000000000000");
    return;
  }
  if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
}

// Upload a live-captured selfie (JPEG data URL) to Supabase Storage and return a
// public URL. One file per person (keyed by name) so re-submitting overwrites it.
// Falls back to returning the data URL directly when no backend is configured.
export async function uploadSelfie(dataUrl: string, name: string): Promise<string> {
  if (!supabase) return dataUrl;
  const blob = await (await fetch(dataUrl)).blob();
  const slug =
    name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "guest";
  const path = `${slug}.jpg`;
  const { error } = await supabase.storage
    .from("selfies")
    .upload(path, blob, { contentType: "image/jpeg", upsert: true });
  if (error) throw error;
  const publicUrl = supabase.storage.from("selfies").getPublicUrl(path).data.publicUrl;
  // cache-bust so a re-submitted (overwritten) selfie shows fresh
  return `${publicUrl}?v=${Date.now()}`;
}
