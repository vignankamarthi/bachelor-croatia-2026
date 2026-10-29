-- =============================================================================
-- LONDON RSVP (v2). Run once in the Supabase SQL editor (project gvynoallwyuigmjttejs).
-- Leaves the v1 `availability` table and the `selfies` bucket untouched.
--
-- Privacy model:
--   attendance (in / maybe / out)      -> PUBLIC, read via london_attendance()
--   spurs, gymkhana, note              -> PRIVATE, readable only in the dashboard
-- anon gets NO grants on the table. It can only EXECUTE the two functions below,
-- which run as the table owner (security definer) and expose exactly what they return.
-- =============================================================================

create table if not exists public.london_rsvp (
  id           uuid primary key default gen_random_uuid(),
  name         text not null check (char_length(trim(name)) between 1 and 80),
  name_key     text generated always as (lower(trim(name))) stored unique,
  attendance   text not null check (attendance in ('in', 'maybe', 'out')),
  spurs        boolean not null default false,
  gymkhana     boolean not null default false,
  note         text not null default '' check (char_length(note) <= 1000),
  submitted_at timestamptz not null default now()
);

-- RLS on with zero policies = deny-all for anon/authenticated on direct table access.
alter table public.london_rsvp enable row level security;
revoke all on public.london_rsvp from anon, authenticated;

-- Write path. Re-submitting the same name (case/space-insensitive) updates the row.
create or replace function public.submit_london_rsvp(
  p_name text, p_attendance text, p_spurs boolean, p_gymkhana boolean, p_note text
) returns void
language sql
security definer
set search_path = public
as $$
  insert into public.london_rsvp (name, attendance, spurs, gymkhana, note, submitted_at)
  values (trim(p_name), p_attendance, coalesce(p_spurs, false), coalesce(p_gymkhana, false),
          coalesce(p_note, ''), now())
  on conflict (name_key) do update
    set name = excluded.name,
        attendance = excluded.attendance,
        spurs = excluded.spurs,
        gymkhana = excluded.gymkhana,
        note = excluded.note,
        submitted_at = excluded.submitted_at;
$$;

-- Public read path. Name + attendance ONLY. The opt-ins and note never leave the DB.
create or replace function public.london_attendance()
returns table (name text, attendance text)
language sql
stable
security definer
set search_path = public
as $$
  select r.name, r.attendance from public.london_rsvp r order by r.submitted_at;
$$;

revoke all on function public.submit_london_rsvp(text, text, boolean, boolean, text) from public;
revoke all on function public.london_attendance() from public;
grant execute on function public.submit_london_rsvp(text, text, boolean, boolean, text) to anon, authenticated;
grant execute on function public.london_attendance() to anon, authenticated;

-- Vignan's collation query (dashboard only):
--   select name, attendance, spurs, gymkhana, note, submitted_at from public.london_rsvp order by name_key;
