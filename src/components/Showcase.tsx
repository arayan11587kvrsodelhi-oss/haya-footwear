import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { staggerParent, staggerChild, REVEAL_VIEWPORT } from "../lib/motion";
import { InlineLink, Reveal, Tag } from "./ui";
import { ResponsiveImage } from "./ResponsiveImage";
import { cn } from "../utils/cn";

/**
 * The three colorways of the concept. `asset` maps to a generated responsive
 * image set; `swatches` drive the small colour strip under each card.
 */
const PRODUCTS = [
  {
    name: "A1 Cloud",
    colorway: "Bone / Ivory",
    price: 189,
    asset: "shoe-bone",
    alt: "haya A1 Cloud in bone white knit, side profile",
    swatches: [
      { hex: "#EFE9DC", name: "Ivory" },
      { hex: "#DDD3BF", name: "Sand" },
      { hex: "#3B3830", name: "Charcoal" },
    ],
    badge: null,
  },
  {
    name: "A1 Ember",
    colorway: "Ember / Cream",
    price: 199,
    asset: "shoe-ember",
    alt: "haya A1 Ember in burnt orange knit with cream sole, side profile",
    swatches: [
      { hex: "#FE4E17", name: "Ember" },
      { hex: "#F3DFC4", name: "Cream" },
      { hex: "#1A1915", name: "Ink" },
    ],
    badge: "Featured colorway",
  },
  {
    name: "A1 Onyx",
    colorway: "Blackout / Black",
    price: 209,
    asset: "shoe-onyx",
    alt: "haya A1 Onyx in matte black knit, side profile",
    swatches: [
      { hex: "#131210", name: "Onyx" },
      { hex: "#35332B", name: "Graphite" },
      { hex: "#716E63", name: "Stone" },
    ],
    badge: null,
  },
] as const;

export function Showcase() {
  return (
    <section
      id="collection"
      className="section relative overflow-hidden bg-bone-50"
      aria-labelledby="collection-title"
    >
      {/* Oversized outline label, cropped by the section edge. */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute right-[-2%] top-10 hidden select-none font-display text-[clamp(5rem,12vw,10rem)] font-bold leading-none lg:block"
      >
        A1-25
      </span>

      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Tag className="mx-auto">The collection</Tag>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="collection-title"
              className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink-950"
            >
              Three shades of{" "}
              <em className="font-accent font-normal italic text-ember-500">gone.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.7] text-ink-600">
              One silhouette, three moods. Each colorway carries the same
              featherlight construction and the same restrained detailing.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
          className="mt-14 grid gap-6 sm:gap-7 md:grid-cols-3 lg:mt-16"
        >
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.name}
              variants={staggerChild}
              className={cn("group relative flex flex-col", i === 1 && "lg:translate-y-8")}
            >
              <div className="relative overflow-hidden rounded-[var(--radius-xl)] border-ink-900/[0.08] bg-gradient-to-b from-bone-100 to-bone-200">
                {p.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-ember-500 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_-6px_rgba(254,78,23,0.55)]">
                    {p.badge}
                  </span>
                )}

                {/* Soft ember wash on hover — warmth, not a glow effect. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_62%,rgba(254,78,23,0.14),transparent_62%)] opacity-0 transition-opacity duration-[var(--dur-slow)] group-hover:opacity-100"
                />

                <ResponsiveImage
                  name={p.asset}
                  alt={p.alt}
                  ratio="1 / 1"
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 30vw"
                  imgClassName="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-signature)] group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
                />

                {/*
                 * Concept-accurate CTA. There is no cart on this project, so the
                 * label describes what actually happens (jump to the spec cards)
                 * instead of implying a purchase.
                 */}
                <a
                  href="#pricing"
                  className="absolute inset-x-4 bottom-4 z-20 flex min-h-11 translate-y-[130%] items-center justify-between rounded-[var(--radius-md)] bg-ink-950/92 px-5 py-3 text-[13.5px] font-semibold text-bone-50 opacity-0 backdrop-blur-md transition-[transform,opacity,background-color] duration-500 ease-[var(--ease-signature)] hover:bg-ink-950 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 lg:min-h-0"
                >
                  View concept specs
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4 px-1">
                <div>
                  <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink-950">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-snug text-ink-500">{p.colorway}</p>
                </div>
                <p className="shrink-0 font-display text-[19px] font-semibold tabular-nums tracking-[-0.02em] text-ink-950">
                  <span className="sr-only">Concept MSRP </span>${p.price}
                </p>
              </div>

              {/* Colour strip — presented as reference, not as live controls. */}
              <ul
                className="mt-3 flex flex-wrap items-center gap-2 px-1"
                aria-label={`${p.name} palette reference`}
              >
                {p.swatches.map((s) => (
                  <li
                    key={s.hex}
                    className="size-4 rounded-full border-ink-900/15"
                    style={{ backgroundColor: s.hex }}
                  >
                    <span className="sr-only">{s.name}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.12} className="mt-16 text-center lg:mt-24">
          <InlineLink href="#pricing">Compare all specs</InlineLink>
        </Reveal>
      </div>
    </section>
  );
}
