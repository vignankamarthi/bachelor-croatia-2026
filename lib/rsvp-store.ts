// =============================================================================
// LONDON RSVP PERSISTENCE (v2)
// -----------------------------------------------------------------------------
// The survey writes through submitRsvp() and the crew list reads through
// getAttendance(). With Supabase configured, both go through the two security
// definer functions in supabase/london_rsvp.sql, so the browser can NEVER read
// back anyone's Spurs / Gymkhana opt-ins or note. Without Supabase it falls back
// to this browser's localStorage (dev only, per-device).
//
// The PURE helpers (nameKey, validateRsvp, attendanceByName) hold the logic and
// are unit-tested.
// =============================================================================

import { supabase } from "./supabase";

export type Attendance = "in" | "maybe" | "out";
export const ATTENDANCE: Attendance[] = ["in", "maybe", "out"];

export type Rsvp = {
  name: string;
  attendance: Attendance;
  spurs: boolean; // PRIVATE
  gymkhana: boolean; // PRIVATE
  note: string; // PRIVATE
};

// The public slice. This is all the browser can ever read back.
export type AttendanceRow = { name: string; attendance: Attendance };

const STORAGE_KEY = "london-rsvp-v2";

// -----------------------------------------------------------------------------
// PURE logic (unit-tested; no I/O)
// -----------------------------------------------------------------------------

// Mirrors the SQL generated column: lower(trim(name)).
export function nameKey(name: string): string {
  return name.trim().toLowerCase();
}

// Returns an error message, or null when the RSVP is valid to submit.
export function validateRsvp(r: Partial<Rsvp>): string | null {
  if (!r.name || !r.name.trim()) return "Select your name.";
  if (r.name.trim().length > 80) return "The name is too long.";
  if (!r.attendance || !ATTENDANCE.includes(r.attendance)) return "Select your attendance for the weekend.";
  if ((r.note ?? "").length > 1000) return "The note must be 1000 characters or fewer.";
  return null;
}

// Latest answer per person, keyed by nameKey. Later rows win.
export function attendanceByName(rows: AttendanceRow[]): Map<string, Attendance> {
  const out = new Map<string, Attendance>();
  for (const r of rows) out.set(nameKey(r.name), r.attendance);
  return out;
}

// -----------------------------------------------------------------------------
// localStorage fallback (no backend configured)
// -----------------------------------------------------------------------------

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function localGet(): Rsvp[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Rsvp[]) : [];
  } catch {
    return [];
  }
}

// -----------------------------------------------------------------------------
// Public async API
// -----------------------------------------------------------------------------

export async function getAttendance(): Promise<AttendanceRow[]> {
  if (supabase) {
    const { data, error } = await supabase.rpc("london_attendance");
    if (error) throw error;
    return (data ?? []) as AttendanceRow[];
  }
  return localGet().map(({ name, attendance }) => ({ name, attendance }));
}

export async function submitRsvp(r: Rsvp): Promise<void> {
  const problem = validateRsvp(r);
  if (problem) throw new Error(problem);
  if (supabase) {
    const { error } = await supabase.rpc("submit_london_rsvp", {
      p_name: r.name.trim(),
      p_attendance: r.attendance,
      p_spurs: r.spurs,
      p_gymkhana: r.gymkhana,
      p_note: r.note,
    });
    if (error) throw error;
    return;
  }
  if (!isBrowser()) return;
  const key = nameKey(r.name);
  const next = localGet().filter((e) => nameKey(e.name) !== key);
  next.push({ ...r, name: r.name.trim() });
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
