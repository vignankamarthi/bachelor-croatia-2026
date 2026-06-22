import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Public client config. The publishable/anon key is safe in the browser: it is
// gated by the Row Level Security policies on the `availability` table.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// null when env vars are absent -> survey-store transparently falls back to
// localStorage, so the app still runs for anyone who clones without a .env.local.
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export const SURVEY_TABLE = "availability";
