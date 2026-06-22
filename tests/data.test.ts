import { describe, it, expect } from "bun:test";
import { WEEKS, ROUTE, COSTS, CREW, FAQS, TRIP } from "@/lib/data";

const DAY = 86400000;

describe("WEEKS integrity", () => {
  it("has unique, stable ids", () => {
    const ids = WEEKS.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses parseable ISO dates with start before end", () => {
    for (const w of WEEKS) {
      const s = new Date(w.start).getTime();
      const e = new Date(w.end).getTime();
      expect(Number.isNaN(s)).toBe(false);
      expect(Number.isNaN(e)).toBe(false);
      expect(s).toBeLessThan(e);
    }
  });

  it("is exactly Saturday-to-Saturday (7-day windows)", () => {
    for (const w of WEEKS) {
      const span = new Date(w.end).getTime() - new Date(w.start).getTime();
      expect(span).toBe(7 * DAY);
      // 6 = Saturday (UTC) for these date-only ISO strings.
      expect(new Date(w.start).getUTCDay()).toBe(6);
    }
  });

  it("each window starts where the previous ended (no gaps)", () => {
    for (let i = 1; i < WEEKS.length; i++) {
      expect(WEEKS[i].start).toBe(WEEKS[i - 1].end);
    }
  });
});

describe("content presence", () => {
  it("has a non-empty route, costs, crew, and FAQ", () => {
    expect(ROUTE.length).toBeGreaterThan(0);
    expect(COSTS.length).toBeGreaterThan(0);
    expect(CREW.length).toBeGreaterThan(0);
    expect(FAQS.length).toBeGreaterThan(0);
  });

  it("route starts and ends at Split (the Split-to-Split loop)", () => {
    expect(ROUTE[0].place).toContain("Split");
    expect(ROUTE[ROUTE.length - 1].place).toContain("Split");
  });

  it("has a parseable decision deadline", () => {
    expect(Number.isNaN(new Date(TRIP.decisionDeadline).getTime())).toBe(false);
  });
});
