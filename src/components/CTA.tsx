import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal, Tag } from "./ui";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-ink-950 py-28 text-bone-100 sm:py-36" aria-labelledby="cta-title">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute left-[10%] top-[15%] size-[22rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.12),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] size-[26rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(255,160,126,0.1),transparent_65%)] blur-3xl [animation-delay:5s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 80, rotate: 20 }}
        whileInView={{ opacity: 1, x: 0, rotate: 12 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
        className="absolute -right-16 top-1/2 hidden w-[26rem] -translate-y-1/2 xl:block 2xl:right-8"
      >
        <div className="animate-float-slow">
          <img
            src="/images/hero-shoe.png"
            alt=""
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full rounded-[2.5rem] opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)]"
          />
        </div>
      </motion.div>

      <div className="wrap relative">
        <div className="max-w-2xl">
          <Reveal>
            <Tag dark>
              <Sparkles className="size-3" aria-hidden /> Concept close
            </Tag>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="cta-title"
              className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-bone-50"
            >
              Make room for a quieter
              <br />
              <em className="font-accent font-normal italic text-ember-400">statement.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-bone-300/75">
              Explore the collection, study the material language, and see how the interaction system carries the product story from hero to footer.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#collection"
                className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-ember-500 px-8 text-[15px] font-semibold text-white shadow-xl shadow-ember-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-ember-500/40 active:scale-[0.97]"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="relative">Explore the collection</span>
                <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </a>
              <a
                href="#top"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-[15px] font-semibold text-bone-100 transition-all duration-300 hover:border-white/45 hover:bg-white/5 active:scale-[0.97]"
              >
                Back to top
                <ArrowRight className="size-4 -rotate-45" aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <p className="mt-4 text-[13px] text-bone-300/50">
              Independent concept page — no checkout, live inventory, or customer claims are attached.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
