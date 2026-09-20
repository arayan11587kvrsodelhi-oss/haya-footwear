import { motion } from "framer-motion";
import { Zap, Waves, Feather, Grip } from "lucide-react";
import { staggerParent, staggerChild, REVEAL_VIEWPORT } from "../lib/motion";
import { Reveal, Tag } from "./ui";

/**
 * The four material systems behind the concept. Names are fictional by design
 * and the copy describes intent rather than measured performance.
 */
const FEATURES = [
  {
    n: "01",
    icon: Zap,
    name: "FeatherCell midsole",
    copy: "A foam direction tuned for a soft landing, quick recovery, and a light-on-foot feel across everyday mileage.",
  },
  {
    n: "02",
    icon: Waves,
    name: "FluxKnit upper",
    copy: "A single-piece knit direction with open texture where airflow matters and a closer weave where support matters more.",
  },
  {
    n: "03",
    icon: Feather,
    name: "SeamZero interior",
    copy: "A soft, sock-like collar reduces visual bulk and keeps the upper feeling smooth around the ankle without overbuilding it.",
  },
  {
    n: "04",
    icon: Grip,
    name: "EverGrip outsole",
    copy: "A traction-led outsole concept that balances clean geometry with a confident contact pattern for streets and studios.",
  },
];

export function Features() {
  return (
    <section
      id="why"
      className="section relative overflow-hidden"
      aria-labelledby="features-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-20%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.08),transparent_65%)] blur-3xl"
      />

      <div className="wrap relative">
        {/* Editorial split heading */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <Tag>Why haya</Tag>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="features-title"
                className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink-950"
              >
                Engineered quiet.
                <br />
                Felt{" "}
                <em className="font-accent font-normal italic text-ember-500">
                  everywhere.
                </em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:justify-self-end">
            <p className="max-w-md text-[16px] leading-[1.7] text-ink-600 lg:text-right">
              Four systems, one idea: a silhouette your attention never has to
              land on. These are the parts of the concept that carry the
              comfort story.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <motion.article
              key={f.n}
              variants={staggerChild}
              className="group relative flex flex-col rounded-[var(--radius-lg)] border-ink-900/[0.08] bg-bone-50/80 p-6 transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-signature)] hover:-translate-y-1.5 hover:border-ink-900/[0.14] hover:shadow-[0_20px_44px_-20px_rgba(19,18,16,0.2)] sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-[var(--radius-md)] bg-ink-950 text-bone-50 transition-[background-color,transform] duration-[var(--dur-base)] group-hover:rotate-6 group-hover:bg-ember-500">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <span
                  className="font-accent text-xl italic tabular-nums text-ink-400 transition-colors duration-[var(--dur-base)] group-hover:text-ember-500"
                  aria-hidden
                >
                  {f.n}
                </span>
              </div>
              <h3 className="mt-10 font-display text-[18.5px] font-semibold leading-snug tracking-[-0.02em] text-ink-950 sm:mt-14">
                {f.name}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-600">{f.copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
