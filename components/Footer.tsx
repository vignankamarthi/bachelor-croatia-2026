import { TRIP } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-12 text-center">
        <p className="font-display text-2xl font-black text-sand">
          {TRIP.city}, {TRIP.country} <span className="text-gold">/</span> {TRIP.year}
        </p>
        <p className="text-sm text-foam/50">
          Assembled by {TRIP.organizer}. Built to get us on a boat.
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-teal">
          #{TRIP.guestOfHonor}Overboard
        </p>
      </div>
    </footer>
  );
}
