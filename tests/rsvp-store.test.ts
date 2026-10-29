import { describe, it, expect } from "bun:test";
import { nameKey, validateRsvp, attendanceByName } from "@/lib/rsvp-store";

describe("nameKey", () => {
  it("lowercases and trims like the SQL generated column", () => {
    expect(nameKey("  Josh Raj ")).toBe("josh raj");
  });
});

describe("validateRsvp", () => {
  const ok = { name: "Neil Reddy", attendance: "in" as const, spurs: true, gymkhana: false, note: "" };

  it("accepts a complete RSVP", () => {
    expect(validateRsvp(ok)).toBeNull();
  });

  it("accepts neither event (opting out of both is allowed)", () => {
    expect(validateRsvp({ ...ok, spurs: false, gymkhana: false })).toBeNull();
  });

  it("rejects a blank name", () => {
    expect(validateRsvp({ ...ok, name: "   " })).not.toBeNull();
  });

  it("rejects a missing or unknown attendance", () => {
    expect(validateRsvp({ ...ok, attendance: undefined })).not.toBeNull();
    expect(validateRsvp({ ...ok, attendance: "yes" as never })).not.toBeNull();
  });

  it("rejects an oversized note (matches the SQL check)", () => {
    expect(validateRsvp({ ...ok, note: "x".repeat(1001) })).not.toBeNull();
  });
});

describe("attendanceByName", () => {
  it("keys by normalized name and lets later rows win", () => {
    const m = attendanceByName([
      { name: "Ajay Gupta", attendance: "maybe" },
      { name: " ajay gupta", attendance: "in" },
      { name: "Kento Yamamoto", attendance: "out" },
    ]);
    expect(m.size).toBe(2);
    expect(m.get("ajay gupta")).toBe("in");
    expect(m.get("kento yamamoto")).toBe("out");
  });
});
