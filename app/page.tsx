import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Costs } from "@/components/Costs";
import { BigTwo } from "@/components/BigTwo";
import { Hotels } from "@/components/Hotels";
import { Activities } from "@/components/Activities";
import { RsvpForm } from "@/components/RsvpForm";
import { Weekend } from "@/components/Weekend";
import { Crew } from "@/components/Crew";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

// Zydro rhythm: dark map hero, then a paper sheet that slides up over it.
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div className="relative z-10 -mt-12 rounded-t-3xl bg-paper text-slate">
        <Costs />
        <BigTwo />
        <Hotels />
        <Activities />
        <RsvpForm />
      </div>
      <Weekend />
      <div className="bg-paper text-slate">
        <Crew />
        <Faq />
      </div>
      <Footer />
    </main>
  );
}
