import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Costs } from "@/components/Costs";
import { BigTwo } from "@/components/BigTwo";
import { RsvpForm } from "@/components/RsvpForm";
import { Weekend } from "@/components/Weekend";
import { Crew } from "@/components/Crew";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

// Zydro rhythm: dark map hero, then the schedule sheet slides up over it, then the paper sheet.
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div className="relative z-10 -mt-12 overflow-hidden rounded-t-3xl">
        <Weekend />
      </div>
      <div className="bg-paper text-slate">
        <Costs />
        <BigTwo />
        <RsvpForm />
        <Crew />
        <Faq />
      </div>
      <Footer />
    </main>
  );
}
