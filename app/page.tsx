import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ThePlan } from "@/components/ThePlan";
import { Verdict } from "@/components/Verdict";
import { AvailabilitySurvey } from "@/components/AvailabilitySurvey";
import { Crew } from "@/components/Crew";
import { Costs } from "@/components/Costs";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ThePlan />
      <Verdict />
      <div className="rule-gold mx-auto max-w-5xl" />
      <AvailabilitySurvey />
      <Crew />
      <Costs />
      <Faq />
      <Footer />
    </main>
  );
}
