import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Public client config. The publishable/anon key is safe in the browser: anon has
// no grants on london_rsvp and can only call the two security definer functions
// in supabase/london_rsvp.sql. (The v1 `availability` table is left as-is.)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// null when env vars are absent -> rsvp-store transparently falls back to
// localStorage, so the app still runs for anyone who clones without a .env.local.
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;
