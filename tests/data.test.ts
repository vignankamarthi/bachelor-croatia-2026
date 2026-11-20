import { describe, it, expect } from "bun:test";
import { TRIP, COSTS, COST_TOTAL, formatUsd, BIG_TWO, DAYS, CREW, FAQS } from "@/lib/data";

describe("trip config", () => {
  it("has a parseable response deadline before the trip", () => {
    const d = new Date(TRIP.responseDeadline).getTime();
    expect(Number.isNaN(d)).toBe(false);
    expect(d).toBeLessThan(new Date("2027-05-22").getTime());
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

  it("shows the May 22-25 pulls (hotel ~$250-475, flight ~$905-1,030) and the ballparks (food ~$250)", () => {
    expect(formatUsd(COSTS[0].low, COSTS[0].high)).toBe("~$250-475");
    expect(formatUsd(COSTS[1].low, COSTS[1].high)).toBe("~$905-1,030");
    expect(formatUsd(COSTS[2].low, COSTS[2].high)).toBe("~$250");
    expect(formatUsd(COSTS[3].low, COSTS[3].high)).toBe("~$250");
  });

  it("totals the four lines", () => {
    expect(COST_TOTAL).toEqual({ low: 1655, high: 2005 });
    expect(formatUsd(COST_TOTAL.low, COST_TOTAL.high)).toBe("~$1,655-2,005");
  });
});

describe("costs placeholders", () => {
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

  it("keeps the Spurs price at the category A+ GBP 449", () => {
    expect(BIG_TWO[0].price).toBe("£449");
  });

  it("carries a rough USD conversion at 1.309 (GBP 449 -> ~$590, GBP 330 -> ~$430)", () => {
    expect(BIG_TWO.map((e) => e.priceUsd)).toEqual(["~$590", "~$430"]);
  });
});

describe("weekend + crew", () => {
  it("runs Sat to Tue", () => {
    expect(DAYS.map((d) => d.day)).toEqual(["Sat", "Sun", "Mon", "Tue"]);
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
