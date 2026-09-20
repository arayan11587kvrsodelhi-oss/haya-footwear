import { motion } from "framer-motion";
import { Check, Sliders, Ruler, Layers } from "lucide-react";
import { staggerParent, staggerChild, REVEAL_VIEWPORT } from "../lib/motion";
import { Reveal, Tag } from "./ui";
import { ResponsiveImage } from "./ResponsiveImage";
import { cn } from "../utils/cn";

/**
 * Three directions on one silhouette. These are design directions for the
 * concept, not purchasable products — there is no cart or checkout anywhere
 * in this project, and the copy says so explicitly.
 */
const DIRECTIONS = [
  {
    name: "A1 Core",
    tagline: "The everyday direction",
    price: 169,
    asset: "shoe-bone",
    alt: "haya A1 Core in bone ivory",
    features: [
      "FeatherCell midsole direction",
      "FluxKnit breathable upper",
      "Three core colorways",
      "Easy-care material brief",
      "Studio trial concept",
    ],
    featured: false,
    cta: "View the Core direction",
  },
  {
    name: "A1 Apex",
    tagline: "The expressive direction",
    price: 219,
    asset: "shoe-ember",
    alt: "haya A1 Apex in ember orange",
    features: [
      "Everything in the Core direction",
      "Apex propulsion-plate study",
      "Weather-aware knit brief",
      "Reflective detail concept",
      "Coming soon",
      "Spare tonal laces",
    ],
    featured: true,
    cta: "View the Apex direction",
  },
  {
    name: "A1 Atelier",
    tagline: "The atelier direction",
    price: 289,
    asset: "shoe-onyx",
    alt: "haya A1 Atelier in matte onyx",
    features: [
      "Everything in the Apex direction",
      "Hand-finished detail study",
      "Textile interior brief",
      "Individually numbered pair",
      "Long-term resole concept",
      "Concierge fitting concept",
    ],
    featured: false,
    cta: "View the Atelier direction",
  },
] as const;

/** Honest descriptions of what these are: design directions, not products. */
const ASSURANCES = [
  { icon: Sliders, label: "Design direction, not a SKU" },
  { icon: Ruler, label: "Sizing needs real validation" },
  { icon: Layers, label: "Materials are conceptual" },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="section relative overflow-hidden bg-bone-50"
      aria-labelledby="pricing-title"
    >
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute bottom-8 left-[-3%] hidden select-none font-display text-[clamp(5rem,12vw,10rem)] font-bold leading-none lg:block"
      >
        A1
      </span>

      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Tag className="mx-auto">Concept directions</Tag>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="pricing-title"
              className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink-950"
            >
              Pick a{" "}
              <em className="font-accent font-normal italic text-ember-500">direction.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.7] text-ink-600">
              Three tiers of the same silhouette system. The figures are
              placeholder concept MSRPs for the design exercise — there is no
              checkout, cart, or live inventory on this page.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
          className="mt-14 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-3"
        >
          {DIRECTIONS.map((t) => (
            <motion.article
              key={t.name}
              variants={staggerChild}
              className={cn(
                "relative flex flex-col rounded-[var(--radius-xl)] border p-7 transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-signature)] sm:p-8",
                t.featured
                  ? "border-ink-950 bg-ink-950 text-bone-100 shadow-[0_28px_60px_-24px_rgba(19,18,16,0.5)] lg:-my-4 lg:py-12"
                  : "border-ink-900/[0.09] bg-white/60 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-20px_rgba(19,18,16,0.22)]"
              )}
            >
              {t.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ember-500 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_-6px_rgba(254,78,23,0.5)]">
                  Featured direction
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "font-display text-[21px] font-semibold leading-tight tracking-[-0.02em]",
                      t.featured ? "text-bone-50" : "text-ink-950"
                    )}
                  >
                    {t.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 text-[13px] leading-snug",
                      t.featured ? "text-bone-300/70" : "text-ink-500"
                    )}
                  >
                    {t.tagline}
                  </p>
                </div>
                <ResponsiveImage
                  name={t.asset}
                  alt={t.alt}
                  ratio="1 / 1"
                  sizes="80px"
                  className="size-[4.5rem] shrink-0 rounded-[var(--radius-md)]"
                  imgClassName="scale-[1.25] object-cover"
                />
              </div>

              <p className="mt-6 flex items-baseline gap-2 sm:mt-7">
                <span
                  className={cn(
                    "font-display text-[2.6rem] font-semibold leading-none tabular-nums tracking-[-0.03em] sm:text-5xl",
                    t.featured ? "text-bone-50" : "text-ink-950"
                  )}
                >
                  ${t.price}
                </span>
                <span
                  className={cn(
                    "text-[13px]",
                    t.featured ? "text-bone-300/60" : "text-ink-500"
                  )}
                >
                  concept MSRP
                </span>
              </p>

              <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14.5px] leading-snug">
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                        t.featured ? "bg-ember-500 text-white" : "bg-ink-950 text-bone-50"
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span className={t.featured ? "text-bone-200" : "text-ink-700"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={cn(
                  "group relative mt-8 inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 text-[14.5px] font-semibold tracking-[-0.01em] transition-[transform,box-shadow,background-color] duration-[var(--dur-base)] ease-[var(--ease-signature)] hover:-translate-y-0.5 active:scale-[0.98]",
                  t.featured
                    ? "bg-ember-500 text-white shadow-[0_10px_28px_-12px_rgba(254,78,23,0.6)] hover:shadow-[0_16px_36px_-14px_rgba(254,78,23,0.7)]"
                    : "bg-ink-950 text-bone-50 hover:shadow-[0_14px_30px_-12px_rgba(19,18,16,0.5)]"
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
                />
                <span className="relative">{t.cta}</span>
              </a>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.12}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:mt-16">
            {ASSURANCES.map((a) => (
              <li
                key={a.label}
                className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink-600"
              >
                <a.icon className="size-4 text-ember-500" aria-hidden />
                {a.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
