"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; mins: number; secs: number; done: boolean };

function diff(target: number): Parts {
  const ms = target - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, done: true };
  const secs = Math.floor(ms / 1000);
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
    secs: secs % 60,
    done: false,
  };
}

export function Countdown({ deadline }: { deadline: string }) {
  const target = new Date(deadline).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const t = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  // Avoid hydration mismatch: render nothing until mounted.
  if (!parts) return <div className="h-[88px]" aria-hidden />;

  if (parts.done) {
    return (
      <p className="text-lg text-coral">
        Lock-in deadline passed. Ping the best man before the boat sails without you.
      </p>
    );
  }

  const cells: [number, string][] = [
    [parts.days, "days"],
    [parts.hours, "hrs"],
    [parts.mins, "min"],
    [parts.secs, "sec"],
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
      {cells.map(([v, label]) => (
        <div
          key={label}
          className="min-w-[68px] rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center backdrop-blur-sm sm:min-w-[84px]"
        >
          <div className="font-display text-3xl font-black tabular-nums text-gradient-gold sm:text-4xl">
            {String(v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foam/60">{label}</div>
        </div>
      ))}
    </div>
  );
}
