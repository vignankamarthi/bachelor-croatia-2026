import { TRIP } from "@/lib/data";

const LINKS = [
  { href: "#plan", label: "The Plan" },
  { href: "#verdict", label: "The Verdict" },
  { href: "#survey", label: "Pick a Week" },
  { href: "#crew", label: "The Lineup" },
  { href: "#damage", label: "The Damage" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-abyss/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-black tracking-tight text-sand">
          {TRIP.guestOfHonor}
          <span className="text-gold">.</span>
          <span className="text-teal">cro</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foam/70 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#survey"
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-abyss transition-transform hover:scale-105"
        >
          Lock my spot
        </a>
      </div>
    </nav>
  );
}
