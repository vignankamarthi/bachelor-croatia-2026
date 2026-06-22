import { describe, it, expect } from "bun:test";
import {
  AvailabilityEntry,
  upsertEntry,
  tallyByWeek,
} from "@/lib/survey-store";

function entry(name: string, weekIds: string[], note = ""): AvailabilityEntry {
  return { name, weekIds, note, funny: "", photoUrl: "", submittedAt: "2026-06-21T00:00:00.000Z" };
}

describe("upsertEntry", () => {
  it("adds a new entry to an empty list", () => {
    const out = upsertEntry([], entry("Vignan", ["w05"]));
    expect(out).toHaveLength(1);
    expect(out[0].name).toBe("Vignan");
  });

  it("appends a distinct name without touching existing entries", () => {
    const start = [entry("Vignan", ["w05"])];
    const out = upsertEntry(start, entry("Satwik", ["w06"]));
    expect(out).toHaveLength(2);
    expect(out.map((e) => e.name)).toEqual(["Vignan", "Satwik"]);
  });

  it("updates in place when the same name re-submits (no duplicate)", () => {
    const start = [entry("Vignan", ["w05"])];
    const out = upsertEntry(start, entry("Vignan", ["w07", "w08"]));
    expect(out).toHaveLength(1);
    expect(out[0].weekIds).toEqual(["w07", "w08"]);
  });

  it("matches names case- and whitespace-insensitively", () => {
    const start = [entry("Vignan", ["w05"])];
    const out = upsertEntry(start, entry("  vIgNaN ", ["w09"]));
    expect(out).toHaveLength(1);
    expect(out[0].weekIds).toEqual(["w09"]);
  });

  it("does not mutate the input array", () => {
    const start = [entry("Vignan", ["w05"])];
    const snapshot = JSON.stringify(start);
    upsertEntry(start, entry("Satwik", ["w06"]));
    expect(JSON.stringify(start)).toBe(snapshot);
  });
});

describe("tallyByWeek", () => {
  it("returns an empty object for no entries", () => {
    expect(tallyByWeek([])).toEqual({});
  });

  it("counts a single entry across its weeks", () => {
    expect(tallyByWeek([entry("Vignan", ["w05", "w06"])])).toEqual({ w05: 1, w06: 1 });
  });

  it("aggregates overlapping weeks across multiple entries", () => {
    const out = tallyByWeek([
      entry("Vignan", ["w05", "w06"]),
      entry("Satwik", ["w06"]),
      entry("Guest", ["w06", "w07"]),
    ]);
    expect(out).toEqual({ w05: 1, w06: 3, w07: 1 });
  });
});
