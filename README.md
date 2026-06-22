# Bachelor-Croatia-2026

Best-man planning hub for the Croatia bachelor trip. The centerpiece is an
availability survey: the crew picks which Saturday-to-Saturday Yacht Week window
they can make, and a live tally surfaces the week most people can attend.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`)
- Bun (package manager + test runner)
- Persistence: localStorage stub today, one-file swap to Supabase later (`lib/survey-store.ts`)

## Run it

```bash
bun install
bun dev          # http://localhost:3000 (falls back to 3001 if busy)
bun test         # 15 tests: survey logic + data integrity
bun run build    # production build
```

## Where things live

| Path | What |
|------|------|
| `lib/data.ts` | SINGLE SOURCE OF TRUTH: trip config, the 11 week windows, route, costs, crew, FAQ. Edit here. |
| `lib/survey-store.ts` | Survey persistence seam. Swap these 4 functions for Supabase; nothing else changes. |
| `components/AvailabilitySurvey.tsx` | The centerpiece. Form + live tally + leading-week highlight. |
| `components/EuroHopGated.tsx` | GATED placeholder. Do not build the real planner until the groom decides. |
| `tests/` | `bun test` suite (pure logic only; visuals are inspected, not unit-tested). |
| `app/page.tsx` | Section assembly order. |

## Editing the trip

Everything you are likely to change is in `lib/data.ts`:

- `TRIP.year` + `WEEKS` -- if targeting 2027 instead of 2026, change these.
- `TRIP.decisionDeadline` -- the hero countdown target (the survey lock-in date).
- `CREW` -- replace the `TBD` placeholders with real names.

## Design

Adriatic-nautical palette (deep navy, sea-teal, off-white) with a deliberate ~20%
of gold/coral swagger. This emulates the energy of the wedding site (melwik.com)
while staying visually distinct from it. Tokens live in `app/globals.css` under `@theme`.

## Project conventions

This project follows the 3-file agentic standard: `CLAUDE.md` (static identity +
hard rules), `MEMORY.md` (dynamic state), `ANTIPATTERNS.md` (hard stops), plus
`PLAN.md` (linear critical path). All four are `.gitignore`d and never committed.
