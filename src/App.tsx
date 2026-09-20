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

    /*
     * Reduced-motion users get the plain native scroll. No Lenis instance is
     * created at all, so nothing can fight or lock the scroll position.
     */
    if (reduced) {
      window.__scrollToHash = (hash) => {
        document.querySelector(hash)?.scrollIntoView({ block: "start" });
      };
      return () => {
        delete window.__scrollToHash;
      };
    }

    const lenis = new Lenis({
      /* 1.15 was slightly floaty; 1.0 keeps it smooth but more natural. */
      duration: 1,
      smoothWheel: true,
      /* Respect the element scroll-margin-top so anchors clear the navbar. */
      anchors: { offset: -80 },
      /* Avoid intercepting scroll while a modal-ish surface is open. */
      prevent: (node) =>
        node.hasAttribute?.("data-lenis-prevent") ||
        node.closest?.("[data-lenis-prevent]") !== null,
    } as ConstructorParameters<typeof Lenis>[0]);

    /* Expose the instance so the mobile menu can pause/resume scrolling. */
    window.__lenis = lenis;
    window.__scrollToHash = (hash) => lenis.scrollTo(hash, { offset: -80 });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
      delete window.__scrollToHash;
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
        {/* Film grain — unifies the whole page. Hidden for reduced motion. */}
        <div
          aria-hidden
          className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-multiply"
        />
      </div>
    </MotionConfig>
  );
}
