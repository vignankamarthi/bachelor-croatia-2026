// =============================================================================
// SINGLE SOURCE OF TRUTH for the whole site.
// Edit values here; every section reads from this file. No hardcoded trip facts
// in components. Every Yacht Week number below traces to research in MEMORY.md.
// =============================================================================

// -----------------------------------------------------------------------------
// TRIP CONFIG  -- the knobs you are most likely to change.
// The wedding is Satwik & Melissa, JUNE 24-27, 2027, Lake Placid NY (melwik.com).
// The bachelor trip is the weeks BEFORE that, so Yacht Week's late-May 2027 opener
// lines up. WEEKS below are therefore constrained to windows ending before Jun 24.
// -----------------------------------------------------------------------------
export const TRIP = {
  guestOfHonor: "Satwik",
  organizer: "Vignan (best man)",
  city: "Split",
  country: "Croatia",
  year: 2027,
  weddingDate: "June 24-27, 2027", // Lake Placid, NY -- the trip must wrap before this
  tagline: "One week. The Adriatic. Send it.",
  yachtWeekUrl: "https://www.theyachtweek.com/croatia-original",
  // AVAILABILITY CUTOFF (50 days out from 2026-06-22 -> 2026-08-11). The hero countdown
  // ticks to this, NOT to the trip. Guests must submit the survey by then so Vignan can
  // lock the week + book tickets immediately. Format: YYYY-MM-DDTHH:mm:ss (local).
  decisionDeadline: "2026-08-11T23:59:59",
} as const;

// -----------------------------------------------------------------------------
// AVAILABILITY WINDOWS  -- the Sat-to-Sat Yacht Week windows guests vote on.
// OFFICIAL 2027 Croatia Original dates + "from" prices, scraped 2026-06-22 from
// theyachtweek.com/croatia-original. Constrained to weeks that END BEFORE the
// June 24-27 wedding (w22/w23/w24; w25 Jun 19-26 overlaps the wedding -> excluded).
// id is the survey storage key -- do NOT renumber. ywWeek = Yacht Week's own label.
// -----------------------------------------------------------------------------
export type Week = { id: string; ywWeek: string; start: string; end: string; label: string; price: string };

export const WEEKS: Week[] = [
  { id: "w01", ywWeek: "w22", start: "2027-05-29", end: "2027-06-05", label: "May 29 - Jun 5", price: "from $690" },
  { id: "w02", ywWeek: "w23", start: "2027-06-05", end: "2027-06-12", label: "Jun 5 - Jun 12", price: "from $660" },
  { id: "w03", ywWeek: "w24", start: "2027-06-12", end: "2027-06-19", label: "Jun 12 - Jun 19", price: "from $690" },
];

// -----------------------------------------------------------------------------
// THE ROUTE  -- typical Croatia "Original" Split->Split loop (source: MEMORY.md).
// Rendered as a stylized itinerary, not a geographic map (no API keys needed).
// -----------------------------------------------------------------------------
export type Stop = { day: string; place: string; blurb: string; airport: boolean };

export const ROUTE: Stop[] = [
  { day: "Day 1", place: "Split", blurb: "Board the fleet. Mainland airport (SPU). The last time anyone is sober.", airport: true },
  { day: "Day 1->2", place: "Milna, Brac", blurb: "Short 10-12 NM hop (nautical miles, 1 NM = 1.15 mi) across to a sheltered port. Konobas and first-night chaos.", airport: false },
  { day: "Day 2->3", place: "Hvar", blurb: "The famous one. Hvar Town or anchor in the Pakleni Islands.", airport: false },
  { day: "Day 3", place: "Pakleni Islands", blurb: "Pine-covered archipelago off Hvar. Long lunch, longer swim.", airport: false },
  { day: "Day 4", place: "Vis", blurb: "~25 NM southwest, the prettiest sail of the week. Sometimes dolphins.", airport: false },
  { day: "Day 5", place: "Bisevo / Blue Cave", blurb: "Early start from Komiza to beat the queue at the Blue Cave.", airport: false },
  { day: "Day 6-7", place: "Solta -> Split", blurb: "Slow return via Solta and back to Split. Recovery not guaranteed.", airport: true },
];

// -----------------------------------------------------------------------------
// THE DAMAGE  -- per-person cost ranges (source: MEMORY.md). USD unless noted.
// -----------------------------------------------------------------------------
export type CostLine = { item: string; amount: string; note: string };

export const COSTS: CostLine[] = [
  { item: "Your cabin", amount: "~$1,200", note: "per person, ballpark. Exact boat and tier we sort out once we know who's in." },
  { item: "Onboard + extras", amount: "a few hundred", note: "split per person for fuel, ports, water taxis, and the stuff nobody itemizes" },
  { item: "Flights to Split", amount: "your call", note: "Fly first class or stitch together 20 layovers through Reykjavik, genuinely idrc. Just land in Split. (London ~2.5h, Rome ~1.5h direct if you're sane.)" },
];

export const COST_HEADLINE = "Rough ballpark, nothing to lose sleep over. We figure out the exact boat together once we're locked in. The only number that actually matters is how many of us are on it.";

// -----------------------------------------------------------------------------
// THE CREW  -- Satwik's side of the wedding party (the guest list), per melwik.com.
// Groom + best man = locked; everyone else "invited" until they hit the survey.
// status: "locked" | "likely" | "invited" | "tbd"
// -----------------------------------------------------------------------------
export type Guest = { name: string; role: string; status: "locked" | "likely" | "invited" | "tbd" };

export const CREW: Guest[] = [
  { name: "Satwik", role: "Guest of honor / the groom", status: "locked" },
  { name: "Vignan Kamarthi", role: "Best man / chaos coordinator", status: "locked" },
  { name: "Cobi Frongillo", role: "Officiant + Groomsman", status: "invited" },
  { name: "Alfonso Cervera", role: "Groomsman", status: "invited" },
  { name: "Matthew Coscarella", role: "Groomsman", status: "invited" },
  { name: "Joseph Demello", role: "Groomsman", status: "invited" },
  { name: "Aiman Ginawi", role: "Groomsman", status: "invited" },
  { name: "Ajay Gupta", role: "Groomsman", status: "invited" },
  { name: "Jared Kahn", role: "Groomsman", status: "invited" },
  { name: "Josh Raj", role: "Groomsman", status: "invited" },
  { name: "Neil Reddy", role: "Groomsman", status: "invited" },
  { name: "Isabella St. Arnault", role: "Groomsman", status: "invited" },
  { name: "Matthew Tong", role: "Groomsman", status: "invited" },
  { name: "Kento Yamamoto", role: "Groomsman", status: "invited" },
];

// -----------------------------------------------------------------------------
// THE VERDICT  -- the brother's call: Yacht Week is the plan IF enough of the crew
// can lock one week. If turnout is thin, pivot to a long weekend in LONDON.
// (Not a multi-city Europe hop -- just London.) This replaces the old gated section.
// -----------------------------------------------------------------------------
export const VERDICT = {
  primary: {
    name: "Yacht Week, Croatia",
    condition: "if enough of us can lock a single week",
    blurb: "The headline plan. Seven days, the Adriatic, the fleet. This is the goal, so fill the survey and let's see if a week clears the bar.",
  },
  backup: {
    name: "A long weekend in London",
    condition: "if not enough of us can make it",
    blurb: "If turnout is thin, we pivot to London. A proper Prem match, the pubs, the city. Lower lift, easier to pull off on short notice, still a sending-off worth the name.",
  },
} as const;

// -----------------------------------------------------------------------------
// FAQ
// -----------------------------------------------------------------------------
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "What actually is Yacht Week?", a: "A 7-day Split-to-Split sailing trip. A fleet of yachts, a new island most nights, big parties, and a route through the Dalmatian coast. Book a cabin solo or charter a whole boat with your group." },
  { q: "So is it Yacht Week or London?", a: "Yacht Week is the goal. If enough of us can lock a single week, we sail. If turnout is thin, we pivot to a long weekend in London instead (a Prem match, the pubs, the city). The survey decides which. See The Verdict." },
  { q: "How much does it cost?", a: "Ballpark ~$1,200 per person for your cabin, a few hundred more for the onboard kitty, plus flights to Split. Don't overthink it, the exact boat gets sorted once we're locked in. The real ask is just your availability." },
  { q: "How do I lock my spot?", a: "Fill out the availability survey. We pick the week most of us can make, then book before it sells out." },
  { q: "When is this happening?", a: "Spring 2027, a few weeks before the June 24-27 wedding in Lake Placid. The Yacht Week windows are late May to mid-June 2027, so pick yours in the survey and we converge on one." },
];
