import { TRIP } from "@/lib/data";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-deep-water">
      <div className="mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-teal animate-floaty">
          {TRIP.city} / {TRIP.country} / {TRIP.year}
        </p>
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-gold">
          #SatwikOverboard
        </p>

        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-black leading-[0.95] text-sand">
          {TRIP.guestOfHonor}&rsquo;s
          <br />
          <span className="text-gradient-gold">Last Voyage</span>
        </h1>

        <p className="mt-4 font-display text-[clamp(1.25rem,3.5vw,2rem)] italic text-foam/75">
          before the shackles take him forever.
        </p>

        <p className="mx-auto mt-6 max-w-xl text-lg text-foam/80">
          {TRIP.tagline} One last week of freedom on the Adriatic. A yacht, seven islands,
          and a sending-off we will never forget (and legally cannot fully remember).
        </p>

        <div className="mt-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-foam/50">
            Fill the availability form before this hits zero
          </p>
          <div className="flex justify-center">
            <Countdown deadline={TRIP.decisionDeadline} />
          </div>
          <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-coral">
            You have 50 days. Submit your dates below, we book the second the clock dies.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#survey"
            className="rounded-full bg-gold px-7 py-3 font-semibold text-abyss transition-transform hover:scale-105"
          >
            Send it 😛
          </a>
          <a
            href="#plan"
            className="rounded-full border border-white/15 px-7 py-3 font-semibold text-sand transition-colors hover:border-gold hover:text-gold"
          >
            What is this trip
          </a>
        </div>
      </div>
    </header>
  );
}
