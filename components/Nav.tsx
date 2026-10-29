import { TRIP } from "@/lib/data";

const LINKS = [
  { href: "#costs", label: "Costs" },
  { href: "#big-two", label: "Events" },
  { href: "#hotels", label: "Hotels" },
  { href: "#activities", label: "Activities" },
  { href: "#weekend", label: "Schedule" },
  { href: "#crew", label: "Guests" },
  { href: "#faq", label: "FAQ" },
];

// Zydro-style gridded bar: each item sits in its own cell with hairline dividers.
export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-stretch px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center pr-6 font-display text-xl font-bold tracking-tight text-paper"
        >
          {TRIP.guestOfHonor}
          <span className="mx-2 text-red">/</span>
          <span className="font-medium text-mist/70">{TRIP.city}</span>
        </a>
        <div className="hidden items-stretch border-l border-white/10 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex items-center border-r border-white/10 px-5 text-sm text-mist/85 transition-colors hover:bg-white/5 hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-stretch border-l border-white/10">
          <a
            href="#rsvp"
            className="flex items-center px-4 text-sm font-medium text-paper transition-colors hover:bg-red sm:px-6"
          >
            Complete the form <span className="ml-2 text-red">&rarr;</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
