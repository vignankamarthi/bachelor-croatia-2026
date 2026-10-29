// =============================================================================
// SINGLE SOURCE OF TRUTH for the whole site (v2, London).
// Edit values here; every section reads from this file. No hardcoded trip facts
// in components. Every price traces to a source named next to it (see PLAN.md).
// =============================================================================

// -----------------------------------------------------------------------------
// TRIP CONFIG
// The wedding is Satwik & Melissa, JUNE 24-27, 2027, Lake Placid NY (melwik.com).
// The weekend is set by the Spurs reply: Premium Seats vs Chelsea, Sat May 8 2027.
// -----------------------------------------------------------------------------
export const TRIP = {
  guestOfHonor: "Satwik",
  organizer: "Vignan, the best man",
  city: "London",
  year: 2027,
  dates: "Fri May 7 - Mon May 10, 2027",
  nights: 3,
  weddingDate: "June 24-27, 2027",
  // RESPONSE DEADLINE. The hero countdown ticks to this. Spurs says the Chelsea
  // fixture will sell out, so Vignan needs the opt-in count fast.
  responseDeadline: "2026-11-13T23:59:59",
  responseDeadlineLabel: "Fri Nov 13",
} as const;

// -----------------------------------------------------------------------------
// THE UNAVOIDABLE COSTS -- everyone pays these. Per person, USD.
// Sources: PLAN.md ledger (hotel, Google Hotels 2026-10-24) + costs research.
// -----------------------------------------------------------------------------
export type CostLine = { item: string; low: number; high: number; note: string; source: string };

export const COSTS: CostLine[] = [
  {
    item: "Hotel, 3 nights",
    low: 400,
    high: 400,
    note: "The group stays in one West End hotel, with two guests in each room. Each guest books their own room and can add nights.",
    source: "Ballpark from Google Hotels rates for West End hotels, two to a room (pulled 2026-10-24)",
  },
  {
    item: "Round-trip flight",
    low: 715,
    high: 870,
    note: "Round trip from New York or Boston to London, out on Fri May 7 and back on Mon May 10.",
    source: "Google Flights, economy nonstop JFK/EWR/BOS to LHR, May 7-10 (pulled 2026-10-29)",
  },
  {
    item: "Food + casual drinks",
    low: 250,
    high: 250,
    note: "Meals and casual drinks for four days. This estimate excludes the two main events.",
    source: "Ballpark from BudgetYourTrip and Numbeo London prices (pulled 2026-10-29)",
  },
  {
    item: "Big night out",
    low: 250,
    high: 250,
    note: "One night at a club with a group table and drinks. The club is not yet confirmed.",
    source: "Ballpark from Vignan for a club table and drinks (2026-10-29)",
  },
];

// "~$400" for a single figure, "~$715-870" for a range.
export function formatUsd(low: number, high: number): string {
  const f = (n: number) => `$${n.toLocaleString("en-US")}`;
  return low === high ? `~${f(low)}` : `~${f(low)}-${high.toLocaleString("en-US")}`;
}

export const COST_TOTAL = {
  low: COSTS.reduce((sum, c) => sum + c.low, 0),
  high: COSTS.reduce((sum, c) => sum + c.high, 0),
};

export const COST_FOOTNOTE =
  "All figures are ballpark estimates per person, from Oct 29 2026. They exclude the Spurs match and the Gymkhana dinner. Prices change, so check the current rates when you book.";

// -----------------------------------------------------------------------------
// THE BIG TWO -- optional. Pick both, one, or neither (in the private form).
// -----------------------------------------------------------------------------
export type BigEvent = {
  id: "spurs" | "gymkhana";
  name: string;
  when: string;
  price: string;
  priceNote: string;
  includes: string[];
  source: string;
};

export const BIG_TWO: BigEvent[] = [
  {
    id: "spurs",
    name: "Spurs vs Chelsea, Premium Seats",
    when: "Sat May 8, Tottenham Hotspur Stadium",
    price: "£399",
    priceNote: "per person. The club does not give discounts.",
    includes: [
      "Padded seats together in Block 002, next to the touchline",
      "Access to the Premium lounges and bars for up to 3 hours before kickoff and up to 2 hours after the match",
      "Light food before the match and one drink at half-time",
      "Other drinks are available to buy at the Premium bars",
    ],
    source: "Tottenham Hotspur Premium Sales email (2026-10-29) and the THFC Premium Seats brochure",
  },
  {
    id: "gymkhana",
    name: "Gymkhana, Private Dining at 42",
    when: "Sun May 9, Mayfair",
    price: "~£200-250",
    priceNote: "per person, estimated. The final price is confirmed at booking.",
    includes: [
      "A private dining room in Mayfair for up to 16 guests",
      "The main dinner of the weekend, in honor of Satwik",
      "The menu and the drinks are confirmed at booking",
    ],
    source: "Vignan's working estimate (2026-10-29). Not yet quoted by Gymkhana",
  },
];

// -----------------------------------------------------------------------------
// HOTEL SHORTLIST -- 3-star West End hotels only. The group picks one.
// Rates: Google Hotels lowest listed rate, Sat May 8 2027, two adults, with fees,
// pulled 2026-10-24 (PLAN.md hotel ledger). perPersonNight = room rate / 2, rounded.
// -----------------------------------------------------------------------------
export type Hotel = { name: string; area: string; rating: string; perPersonNight: number; url: string };

export const HOTELS: Hotel[] = [
  { name: "Travelodge London Covent Garden", area: "Drury Lane", rating: "3-star, 3.8 (6.2k reviews)", perPersonNight: 100, url: "https://www.travelodge.co.uk/hotels/318/London-Central-Covent-Garden-hotel" },
  { name: "Zedwell Piccadilly Circus", area: "Piccadilly", rating: "3-star, 4.0 (11.0k reviews)", perPersonNight: 104, url: "https://zedwellhotels.com/locations/london/piccadilly-circus/" },
  { name: "The Z Hotel Soho", area: "Soho", rating: "3-star, 4.0 (1.4k reviews)", perPersonNight: 108, url: "https://www.thezhotels.com/hotels/soho/" },
  { name: "The Z Hotel Covent Garden", area: "Covent Garden", rating: "3-star, 4.3 (1.2k reviews)", perPersonNight: 127, url: "https://www.thezhotels.com/hotels/covent-garden/" },
];

export const HOTEL_NOTE =
  "Rates are per person per night, with two guests in each room. They are the lowest Google Hotels rates for Sat May 8 2027, pulled on Oct 24 2026. Zedwell and Z Hotel rooms are small, and many rooms have no window.";

// -----------------------------------------------------------------------------
// ACTIVITY SHORTLIST -- the Sunday daytime slot. No soccer. Prices not checked.
// Source: PLAN.md activity ledger (2026-10-24). Links verified 2026-10-29. Whistle Punks was cut:
// its domain now redirects to unrelated sites, so the venue could not be verified.
// -----------------------------------------------------------------------------
export type Activity = { type: string; name: string; where: string; blurb: string; url: string };

export const ACTIVITIES: Activity[] = [
  { type: "Comedy", name: "The Comedy Store", where: "Piccadilly", blurb: "Saturday shows at 6:30pm and 9:30pm. The late show is 18+.", url: "https://london.thecomedystore.co.uk/" },
  { type: "Comedy", name: "Top Secret Comedy Club", where: "Covent Garden", blurb: "An 18+ club. Shows sell out, so book early.", url: "https://thetopsecretcomedyclub.co.uk/" },
  { type: "Bowling", name: "Bloomsbury Bowling Lanes", where: "Bloomsbury", blurb: "The private Kingpin Suite has 5 lanes, ping-pong, and its own bar.", url: "https://bloomsburybowling.com/" },
  { type: "Bowling", name: "All Star Lanes", where: "Holborn", blurb: "Bowling lanes with a cocktail bar and a restaurant.", url: "https://www.allstarlanes.co.uk/locations/holborn" },
  { type: "Darts", name: "Flight Club", where: "Bloomsbury", blurb: "Team darts in private booths, with automatic scoring.", url: "https://flightclubdarts.com/uk/london-bloomsbury/" },
  { type: "Shuffleboard", name: "Electric Shuffle", where: "King's Cross", blurb: "Shuffleboard for groups of 2 to 32.", url: "https://electricshuffle.com/uk/london/kings-cross" },
  { type: "Mini golf", name: "Puttshack", where: "Bank", blurb: "Mini golf with interactive holes and automatic scoring.", url: "https://www.puttshack.com/uk/locations/bank/" },
  { type: "Racing sim", name: "F1 Arcade", where: "St Paul's", blurb: "F1 driving simulators with a bar.", url: "https://f1arcade.com/uk/london" },
  { type: "Karting", name: "F1 Drive London", where: "Tottenham", blurb: "Premium karting with a race format, about 1.5 hours.", url: "https://www.tottenhamhotspurstadium.com/f1-drive-london" },
  { type: "Karting", name: "TeamSport Karting", where: "North Greenwich", blurb: "Indoor karting.", url: "https://www.team-sport.co.uk/go-kart-tracks/docklands" },
  { type: "Clay shooting", name: "Clays", where: "Soho", blurb: "Virtual clay shooting with live leaderboards.", url: "https://clays.bar/soho" },
  { type: "Multi-game", name: "Rocket Room", where: "Leicester Square", blurb: "Axe throwing, darts, shuffleboard, and beer pong in one venue.", url: "https://www.rocket-room.com/" },
  { type: "Karaoke", name: "BAM Karaoke Box", where: "Victoria", blurb: "22 private karaoke rooms.", url: "https://uk.bam-karaokebox.com/" },
];

// -----------------------------------------------------------------------------
// THE WEEKEND -- day-by-day sketch. Only fixed items are named; the rest is TBD.
// -----------------------------------------------------------------------------
export type Day = { day: string; date: string; title: string; blurb: string; optional?: boolean };

export const DAYS: Day[] = [
  { day: "Fri", date: "May 7", title: "Arrival", blurb: "Guests arrive and check in at the hotel. The evening plan is not yet confirmed." },
  { day: "Sat", date: "May 8", title: "Spurs vs Chelsea", blurb: "Premium lounge access before and after the match. The broadcasters set the kickoff time later.", optional: true },
  { day: "Sun", date: "May 9", title: "Gymkhana dinner", blurb: "The daytime activity is not yet confirmed. The group dinner is in the evening in Mayfair.", optional: true },
  { day: "Mon", date: "May 10", title: "Departure", blurb: "Guests check out and fly home. Guests can extend their stay." },
];

// -----------------------------------------------------------------------------
// THE CREW -- Satwik's side of the wedding party, per melwik.com.
// Their weekend attendance (in / maybe / out) shows publicly once they answer.
// Their Spurs / Gymkhana opt-ins NEVER show on the site.
// -----------------------------------------------------------------------------
export type Guest = { name: string; role: string; locked?: boolean };

export const CREW: Guest[] = [
  { name: "Satwik", role: "Groom", locked: true },
  { name: "Vignan Kamarthi", role: "Best man", locked: true },
  { name: "Cobi Frongillo", role: "Officiant and groomsman" },
  { name: "Alfonso Cervera", role: "Groomsman" },
  { name: "Matthew Coscarella", role: "Groomsman" },
  { name: "Joseph Demello", role: "Groomsman" },
  { name: "Aiman Ginawi", role: "Groomsman" },
  { name: "Ajay Gupta", role: "Groomsman" },
  { name: "Jared Kahn", role: "Groomsman" },
  { name: "Josh Raj", role: "Groomsman" },
  { name: "Neil Reddy", role: "Groomsman" },
  { name: "Isabella St. Arnault", role: "Groomsman" },
  { name: "Matthew Tong", role: "Groomsman" },
  { name: "Kento Yamamoto", role: "Groomsman" },
];

// -----------------------------------------------------------------------------
// FAQ
// -----------------------------------------------------------------------------
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "Why is there a deadline?", a: "The club expects the Chelsea match to sell out. The club holds the seats only after we confirm the number of guests. Please complete the form by Fri Nov 13." },
  { q: "Can we buy general admission tickets instead?", a: "General admission needs a paid club membership for each guest. The club also says that a group is unlikely to get seats together. Premium Seats is the entry-level package that keeps the group together." },
  { q: "What does the Spurs price include?", a: "The price includes your seat, lounge access before and after the match, light food before the match, and one drink at half-time. Other drinks cost extra." },
  { q: "How do I book the hotel?", a: "The group selects one West End hotel. Each guest books their own room. You can share a room, add nights, or select a larger room." },
  { q: "Is the Gymkhana price final?", a: "No. The price is an estimate. Vignan gets the final price when the number of guests is known." },
  { q: "What if I cannot attend on May 8?", a: "Select Maybe or No in the form. A response helps the planning more than no response." },
];
