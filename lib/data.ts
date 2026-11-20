// =============================================================================
// SINGLE SOURCE OF TRUTH for the whole site (v2, London).
// Edit values here; every section reads from this file. No hardcoded trip facts
// in components. Every price traces to a source named next to it (see PLAN.md).
// =============================================================================

// -----------------------------------------------------------------------------
// TRIP CONFIG
// The wedding is Satwik & Melissa, JUNE 24-27, 2027, Lake Placid NY (melwik.com).
// The weekend moved on 2026-11-19 to Spurs vs Man United, Sun May 23 2027, with
// the Gymkhana dinner on Mon May 24 (its private room serves dinner Sun-Tue only).
// -----------------------------------------------------------------------------
export const TRIP = {
  guestOfHonor: "Satwik",
  organizer: "Vignan, the best man",
  city: "London",
  year: 2027,
  dates: "Sat May 22 - Tue May 25, 2027",
  nights: 3,
  weddingDate: "June 24-27, 2027",
  // RESPONSE DEADLINE. The hero countdown ticks to this. Spurs says Premium Seats
  // sell out, so Vignan needs the opt-in count fast.
  responseDeadline: "2026-11-27T23:59:59",
  responseDeadlineLabel: "Fri Nov 27",
} as const;

// -----------------------------------------------------------------------------
// THE UNAVOIDABLE COSTS -- everyone pays these. Per person, USD.
// Sources: hotel engines + Google Flights for May 22-25 2027 (pulled 2026-11-19),
// FX 1 GBP = 1.309 USD (Alpha Vantage). Food and night out are Oct 29 ballparks.
// -----------------------------------------------------------------------------
export type CostLine = { item: string; low: number; high: number; note: string; source: string };

export const COSTS: CostLine[] = [
  {
    item: "Hotel, 3 nights",
    low: 250,
    high: 475,
    note: "The group stays in one West End hotel, with two guests in each room. Each guest books their own room and can add nights.",
    source: "Hotel booking sites, refundable rate for two guests, Sat May 22 to Tue May 25 (pulled 2026-11-19)",
  },
  {
    item: "Round-trip flight",
    low: 905,
    high: 1030,
    note: "Round trip from New York or Boston to London. The flight leaves on the evening of Fri May 21, lands on Sat May 22, and returns on Tue May 25.",
    source: "Google Flights, cheapest economy nonstop EWR $905, JFK $1,010, BOS $1,031, May 21-25 (pulled 2026-11-19)",
  },
  {
    item: "Food + casual drinks",
    low: 250,
    high: 250,
    note: "Meals and casual drinks for four days. This estimate excludes the two main events.",
    source: "Ballpark from BudgetYourTrip and Numbeo London prices (2026-10-29)",
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
  "All figures are ballpark estimates per person, from Nov 19 2026. They exclude the Spurs match and the Gymkhana dinner. Prices change, so check the current rates when you book.";

// -----------------------------------------------------------------------------
// THE BIG TWO -- optional. Pick both, one, or neither (in the private form).
// -----------------------------------------------------------------------------
export type BigEvent = {
  id: "spurs" | "gymkhana";
  name: string;
  when: string;
  price: string;
  priceUsd: string; // rough conversion at 1 GBP = 1.309 USD (Alpha Vantage, 2026-11-20 00:21 UTC)
  priceNote: string;
  includes: string[];
  source: string;
};

export const BIG_TWO: BigEvent[] = [
  {
    id: "spurs",
    name: "Spurs vs Manchester United, Premium Seats",
    when: "Sun May 23, Tottenham Hotspur Stadium",
    price: "£449",
    priceUsd: "~$590",
    priceNote: "per person. The club does not give discounts. The club has not yet confirmed the date of the match.",
    includes: [
      "Padded seats together in Block 002, next to the touchline",
      "Access to the Premium lounges and bars for up to 3 hours before kickoff and up to 2 hours after the match",
      "Light food before the match and one drink at half-time",
      "Other drinks are available to buy at the Premium bars",
    ],
    source: "THFC Premium Seats price list, category A+ (Premium Sales email, 2026-10-29). The fixture date is from third-party listings",
  },
  {
    id: "gymkhana",
    name: "Gymkhana, Private Dining at 42",
    when: "Mon May 24, 7-10pm, Mayfair",
    price: "~£330",
    priceUsd: "~$430",
    priceNote: "per person, estimated for 14 guests. The final price is confirmed at booking.",
    includes: [
      "A private dining room in Mayfair for up to 16 guests",
      "The main dinner of the weekend, in honor of Satwik",
      "The Feast menu with drinks. The menu and the drinks are confirmed at booking",
    ],
    source: "Gymkhana private dining page: minimum spend from £4,000 plus 15% service, divided by 14 guests. Not yet quoted by Gymkhana",
  },
];

// -----------------------------------------------------------------------------
// THE WEEKEND -- day-by-day sketch. Only fixed items are named; the rest is TBD.
// -----------------------------------------------------------------------------
export type Day = { day: string; date: string; title: string; blurb: string; optional?: boolean };

export const DAYS: Day[] = [
  { day: "Sat", date: "May 22", title: "Arrival and night out", blurb: "Guests arrive and check in at the hotel. The group goes out in the evening. The venues are not yet confirmed." },
  { day: "Sun", date: "May 23", title: "Spurs vs Manchester United", blurb: "Premium lounge access before and after the match. The broadcasters set the kickoff time later.", optional: true },
  { day: "Mon", date: "May 24", title: "Gymkhana dinner", blurb: "The daytime activity is not yet confirmed. The group dinner is from 7pm to 10pm in Mayfair.", optional: true },
  { day: "Tue", date: "May 25", title: "Departure", blurb: "Guests check out and fly home. Guests can extend their stay." },
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
  { q: "Why did the dates change?", a: "The Gymkhana private room serves dinner only on Sunday, Monday, and Tuesday. The only other Spurs home match in May is on Sun May 23, so the dinner moves to Monday. Please plan to take Monday and Tuesday off work." },
  { q: "Why is there a deadline?", a: "The club expects Premium Seats to sell out. The club holds the seats only after we confirm the number of guests. Please complete the form by Fri Nov 27." },
  { q: "Can we buy general admission tickets instead?", a: "General admission needs a paid club membership for each guest. The club also says that a group is unlikely to get seats together. Premium Seats is the entry-level package that keeps the group together." },
  { q: "What does the Spurs price include?", a: "The price includes your seat, lounge access before and after the match, light food before the match, and one drink at half-time. Other drinks cost extra." },
  { q: "How do I book the hotel?", a: "The group selects one West End hotel. Each guest books their own room. You can share a room, add nights, or select a larger room." },
  { q: "Is the Gymkhana price final?", a: "No. The estimate divides the minimum spend for the room among 14 guests. If fewer guests attend, the price per person goes up. Vignan gets the final price when the number of guests is known." },
  { q: "Why should I book the hotel early?", a: "The FA Cup final is at Wembley on Sat May 22, so many visitors are in London that night. Rooms can sell out." },
  { q: "What if I cannot attend on May 23?", a: "Select Maybe or No in the form. A response helps the planning more than no response." },
];
