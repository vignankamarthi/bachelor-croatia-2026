import { TRIP } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-2xl font-medium text-paper">
            {TRIP.city} <span className="text-red">/</span> {TRIP.dates}
          </p>
          <p className="mt-1 text-sm text-mist/60">
            Organized by {TRIP.organizer}. The wedding is on {TRIP.weddingDate}.
          </p>
        </div>
      </div>
    </footer>
  );
}
