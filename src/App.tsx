import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Press } from "./components/Press";
import { Features } from "./components/Features";
import { Showcase } from "./components/Showcase";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: true,
    } as ConstructorParameters<typeof Lenis>[0]);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="relative">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bone-50"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <Hero />
          <Press />
          <Features />
          <Showcase />
          <Benefits />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
        </main>

        <Footer />

        {/* Film grain — unifies the whole page */}
        <div
          aria-hidden
          className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-multiply"
        />
      </div>
    </MotionConfig>
  );
}
