# Bachelor-Croatia-2026

The planning site for Satwik's bachelor weekend in London, Fri May 7 to Mon May 10, 2027.
The folder name is historical. The site gives each guest the estimated costs, the two optional
events, the hotel and activity shortlists, and a response form.

Live at https://spurs-top-of-the-league.vercel.app.

## Stack

Next.js 15 (App Router) + TypeScript + Tailwind v4 on Vercel, with Supabase for the response form.
Bun is the package manager and the test runner.

```bash
bun install
bun dev          # local dev server
bun test         # unit tests
bun run build    # production build
```

## Layout

| Path | What |
|------|------|
| `lib/data.ts` | The single source of truth for all site content: trip config, costs, events, hotels, activities, schedule, guests, FAQ. Every price names its source. |
| `lib/rsvp-store.ts` | Response form persistence. It calls the two Supabase functions, or falls back to localStorage when no Supabase env vars are set. |
| `supabase/london_rsvp.sql` | The schema for the response form. Run it once in the Supabase SQL editor. |
| `components/` | One component per page section. |
| `tests/` | `bun test` suite for the data integrity and the form logic. |

## Privacy model

Each response holds a name, weekend attendance, two event opt-ins, and a note. The browser can
save a response and can read back only the name and the attendance, which the guest list shows.
The event opt-ins and the notes stay in the database. The anon key has no table grants. It can
only call `submit_london_rsvp` and `london_attendance`, which are security definer functions.

## Environment

`.env.local` (gitignored) holds `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Never commit a service role key.
