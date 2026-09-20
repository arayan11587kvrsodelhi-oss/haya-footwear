import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { REVEAL_VIEWPORT, useReducedMotion } from "../lib/motion";
import { PrimaryButton, Reveal, Tag } from "./ui";
import { ResponsiveImage } from "./ResponsiveImage";

/**
 * Closing section. The primary action returns the reader to the collection
 * (real in-page navigation) rather than simulating a newsletter signup or a
 * purchase flow that does not exist.
 */
export function CTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="cta"
      className="section relative overflow-hidden bg-ink-950 text-bone-100"
      aria-labelledby="cta-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,160,126,0.1),transparent_65%)] blur-3xl" />
      </div>

      {/* Product accent, desktop only — it would crowd the mobile layout. */}
      <motion.div
        initial={{ opacity: 0, x: 60, rotate: 20 }}
        whileInView={{ opacity: 1, x: 0, rotate: 12 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden w-[24rem] -translate-y-1/2 xl:block 2xl:right-8"
      >
        <div className={reduced ? undefined : "animate-float-slow"}>
          <ResponsiveImage
            name="hero-shoe"
            alt=""
            ratio="1 / 1"
            sizes="24rem"
            className="rounded-none opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)]"
            imgClassName="object-contain"
          />
        </div>
      </motion.div>

      <div className="wrap relative">
        <div className="max-w-2xl">
          <Reveal>
            <Tag dark>Concept close</Tag>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="cta-title"
              className="mt-6 font-display text-[clamp(2.3rem,6vw,4.75rem)] font-semibold leading-[1.0] tracking-[-0.035em] text-bone-50"
            >
              Make room for a quieter
              <br />
              <em className="font-accent font-normal italic text-ember-400">statement.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-lg text-[16.5px] leading-[1.7] text-bone-300/75">
              Explore the collection, study the material language, and see how
              the interaction system carries the product story from hero to
              footer.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <PrimaryButton
                href="#collection"
                tone="ember"
                className="w-full sm:w-auto"
              >
                Explore the collection
              </PrimaryButton>
              <a
                href="#top"
                className="group inline-flex h-14 min-h-11 w-full items-center justify-center gap-2 rounded-full border-white/20 px-7 text-[15px] font-semibold tracking-[-0.01em] text-bone-100 transition-[transform,background-color,border-color] duration-[var(--dur-base)] ease-[var(--ease-signature)] hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.06] active:scale-[0.98] sm:w-auto"
              >
                Back to top
                <ArrowRight
                  className="size-4 -rotate-45 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-5 text-[13px] leading-relaxed text-bone-300/55">
              An independent footwear concept. No checkout, live inventory,
              customer data, or commercial claims are attached to this project.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}