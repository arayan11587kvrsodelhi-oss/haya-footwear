import { motion } from "framer-motion";
import { Zap, Waves, Feather, Grip, ArrowUpRight } from "lucide-react";
import { staggerParent, staggerChild } from "../lib/motion";
import { Reveal, Tag } from "./ui";

const FEATURES = [
  {
    n: "01",
    icon: Zap,
    name: "FeatherCell™ midsole",
    copy: "A supercritical foam concept tuned for a soft land, quick recovery, and a light-on-foot feel across everyday miles.",
  },
  {
    n: "02",
    icon: Waves,
    name: "FluxKnit™ upper",
    copy: "A single-piece knit direction with open texture where airflow matters and a closer weave where support matters more.",
  },
  {
    n: "03",
    icon: Feather,
    name: "SeamZero interior",
    copy: "A soft, sock-like collar reduces visual bulk and keeps the upper feeling smooth around the ankle without overbuilding the silhouette.",
  },
  {
    n: "04",
    icon: Grip,
    name: "EverGrip outsole",
    copy: "A traction-led outsole concept balances clean geometry with a confident contact pattern for streets, studios, and the occasional detour.",
  },
];

export function Features() {
  return (
    <section id="why" className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="features-title">
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-20%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.08),transparent_65%)] blur-3xl" />

      <div className="wrap relative">
        {/* Editorial split heading */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <Tag>Why haya</Tag>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="features-title"
                className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-950"
              >
                Engineered quiet.
                <br />
                Felt{" "}
                <em className="font-accent font-normal italic text-ember-500">everywhere.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:justify-self-end">
            <p className="max-w-md text-[16px] leading-relaxed text-ink-600 lg:text-right">
              Three years. 214 prototypes. One obsession: a shoe your nervous
              system forgets it's wearing, so your day never has to think
              about your feet again.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <motion.article
              key={f.n}
              variants={staggerChild}
              className="group relative flex flex-col rounded-3xl border border-ink-900/[0.08] bg-bone-50/80 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-ink-900/[0.14] hover:shadow-2xl hover:shadow-ink-950/[0.08]"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-ink-950 text-bone-50 transition-all duration-500 group-hover:rotate-6 group-hover:bg-ember-500 group-hover:shadow-lg group-hover:shadow-ember-500/30">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <span className="font-accent text-xl italic text-ink-400 transition-colors duration-500 group-hover:text-ember-500" aria-hidden>
                  {f.n}
                </span>
              </div>
              <h3 className="mt-16 font-display text-xl font-semibold tracking-tight text-ink-950">
                {f.name}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{f.copy}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[13px] font-semibold text-ink-400 transition-colors duration-300 group-hover:text-ink-950">
                The details
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
