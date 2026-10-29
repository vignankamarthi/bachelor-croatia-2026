import { describe, it, expect } from "bun:test";
import { TRIP, COSTS, COST_TOTAL, formatUsd, BIG_TWO, HOTELS, ACTIVITIES, DAYS, CREW, FAQS } from "@/lib/data";

describe("trip config", () => {
  it("has a parseable response deadline before the trip", () => {
    const d = new Date(TRIP.responseDeadline).getTime();
    expect(Number.isNaN(d)).toBe(false);
    expect(d).toBeLessThan(new Date("2027-05-07").getTime());
  });

  it("keeps a professional register (no emojis, slang, or hashtags)", () => {
    const blob = JSON.stringify({ TRIP, COSTS, BIG_TWO, DAYS, CREW, FAQS });
    expect(/\p{Extended_Pictographic}/u.test(blob)).toBe(false);
    for (const banned of ["send it", "chaos", "#", "tbd", "your call", "totally"]) {
      expect(blob.toLowerCase()).not.toContain(banned);
    }
  });

  it("has no Croatia leftovers", () => {
    const blob = JSON.stringify({ TRIP, COSTS, BIG_TWO, DAYS, FAQS }).toLowerCase();
    expect(blob).not.toContain("croatia");
    expect(blob).not.toContain("yacht");
  });
});

describe("costs", () => {
  it("has hotel, flight, food, and the night out, each with a source", () => {
    expect(COSTS).toHaveLength(4);
    for (const c of COSTS) {
      expect(c.low).toBeGreaterThan(0);
      expect(c.high).toBeGreaterThanOrEqual(c.low);
      expect(c.source.trim().length).toBeGreaterThan(0);
    }
  });

  it("shows the ballparks Vignan set (hotel ~$400, food ~$250)", () => {
    expect(formatUsd(COSTS[0].low, COSTS[0].high)).toBe("~$400");
    expect(formatUsd(COSTS[1].low, COSTS[1].high)).toBe("~$715-870");
    expect(formatUsd(COSTS[2].low, COSTS[2].high)).toBe("~$250");
    expect(formatUsd(COSTS[3].low, COSTS[3].high)).toBe("~$250");
  });

  it("totals the four lines", () => {
    expect(COST_TOTAL).toEqual({ low: 1615, high: 1770 });
    expect(formatUsd(COST_TOTAL.low, COST_TOTAL.high)).toBe("~$1,615-1,770");
  });
});

describe("hotels + activities", () => {
  it("lists only 3-star hotels, each with a verified https link", () => {
    expect(HOTELS).toHaveLength(4);
    for (const h of HOTELS) {
      expect(h.rating.startsWith("3-star")).toBe(true);
      expect(h.url.startsWith("https://")).toBe(true);
    }
  });

  it("lists activities with https links and nothing soccer-related", () => {
    expect(ACTIVITIES.length).toBeGreaterThan(0);
    for (const a of ACTIVITIES) {
      expect(a.url.startsWith("https://")).toBe(true);
      expect(`${a.name} ${a.blurb}`.toLowerCase()).not.toMatch(/soccer|football/);
    }
  });

  it("carries no unfilled placeholders", () => {
    const blob = JSON.stringify(COSTS);
    expect(blob).not.toContain("PENDING");
  });
});

describe("the big two", () => {
  it("is exactly Spurs and Gymkhana, each priced and sourced", () => {
    expect(BIG_TWO.map((e) => e.id)).toEqual(["spurs", "gymkhana"]);
    for (const e of BIG_TWO) {
      expect(e.price).toContain("£");
      expect(e.source.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps the Spurs price at the quoted GBP 399", () => {
    expect(BIG_TWO[0].price).toBe("£399");
  });
});

describe("weekend + crew", () => {
  it("runs Fri to Mon", () => {
    expect(DAYS.map((d) => d.day)).toEqual(["Fri", "Sat", "Sun", "Mon"]);
  });

  it("has at most 14 crew, unique names, groom and best man locked", () => {
    expect(CREW.length).toBeLessThanOrEqual(14);
    const keys = CREW.map((g) => g.name.toLowerCase());
    expect(new Set(keys).size).toBe(keys.length);
    expect(CREW.filter((g) => g.locked).map((g) => g.name)).toEqual(["Satwik", "Vignan Kamarthi"]);
  });

  it("has FAQ content", () => {
    expect(FAQS.length).toBeGreaterThan(0);
  });
});
