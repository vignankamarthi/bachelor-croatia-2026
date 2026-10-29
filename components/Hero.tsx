import { TRIP } from "@/lib/data";
import { Countdown } from "./Countdown";
import { LondonMap } from "./LondonMap";
import { Eyebrow } from "./Section";

export function Hero() {
  return (
    <header id="top" className="relative min-h-[100svh] overflow-hidden">
      <LondonMap />
      <div className="hero-veil absolute inset-0" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-32 pt-28 sm:px-6">
        <Eyebrow tone="light">
          {TRIP.city} / {TRIP.dates}
        </Eyebrow>

        <h1 className="max-w-3xl font-display text-[clamp(2.6rem,8vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-paper">
          {TRIP.guestOfHonor}&rsquo;s bachelor weekend
          <br />
          <span className="text-red">in London.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-mist/90 sm:text-xl">
          This page gives the estimated costs and the two main events. Each guest selects the
          events that they will attend. Please complete the form by {TRIP.responseDeadlineLabel}.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 bg-ink px-6 py-3 font-medium text-paper ring-1 ring-white/20 transition-colors hover:bg-red"
          >
            Complete the form <span className="text-red">&rarr;</span>
          </a>
          <a
            href="#costs"
            className="inline-flex items-center border border-white/30 px-6 py-3 font-medium text-paper transition-colors hover:border-paper hover:bg-white/5"
          >
            See the costs
          </a>
        </div>

        <div className="mt-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-mist/60">
            The form closes on {TRIP.responseDeadlineLabel}
          </p>
          <Countdown deadline={TRIP.responseDeadline} />
        </div>
      </div>

      <a
        href="#costs"
        aria-label="Scroll to costs"
        className="animate-nudge absolute bottom-16 right-6 font-mono text-2xl text-mist/70 sm:right-10"
      >
        &#8964;
      </a>
    </header>
  );
}
