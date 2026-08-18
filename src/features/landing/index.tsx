import { Navbar } from "../../shared/components/Navbar";
import { Footer } from "../../shared/components/Footer";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { Services } from "./components/Services";
import { Experience } from "./components/Experience";
import { ImageMarquee } from "./components/ImageMarquee";
import { FindUs } from "./components/FindUs";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <ImageMarquee />
        <Experience />
        <FindUs />
      </main>
      <Footer />
    </div>
  );
}
