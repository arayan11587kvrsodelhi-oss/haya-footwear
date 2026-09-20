import { motion } from "framer-motion";
import { Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { staggerParent, staggerChild } from "../lib/motion";
import { Reveal, Tag } from "./ui";
import { cn } from "../utils/cn";

const TIERS = [
  {
    name: "A1 Core",
    tagline: "The everyday direction",
    price: 169,
    img: "/images/shoe-bone.png",
    alt: "haya A1 Core in bone ivory",
    features: [
      "FeatherCell™ midsole",
      "FluxKnit™ breathable upper",
      "3 core colorways",
      "Machine washable",
      "Trial concept",
    ],
    featured: false,
    cta: "Explore Core",
  },
  {
    name: "A1 Apex",
    tagline: "The expressive direction",
    price: 219,
    img: "/images/shoe-ember.png",
    alt: "haya A1 Apex in ember orange",
    features: [
      "Everything in Core",
      "ApexBoost™ propulsion plate",
      "Weather-repellent knit",
      "360° reflective details",
      "Early access to limited drops",
      "Spare tonal laces",
    ],
    featured: true,
    cta: "Explore Apex",
  },
  {
    name: "A1 Atelier",
    tagline: "The atelier direction",
    price: 289,
    img: "/images/shoe-onyx.png",
    alt: "haya A1 Atelier in matte onyx",
    features: [
      "Everything in Apex",
      "Hand-finished details",
      "Merino wool interior liner",
      "Individually numbered pair",
      "Lifetime resole program",
      "Concierge fitting session",
    ],
    featured: false,
    cta: "Explore Atelier",
  },
];

const ASSURANCES = [
  { icon: Truck, label: "Shipping concept" },
  { icon: RotateCcw, label: "Trial concept" },
  { icon: ShieldCheck, label: "Warranty concept" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-bone-50 py-24 sm:py-32" aria-labelledby="pricing-title">
      <span aria-hidden className="text-outline pointer-events-none absolute left-[-3%] bottom-8 select-none font-display text-[clamp(5rem,12vw,10rem)] font-bold leading-none">
        $169
      </span>

      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Tag className="mx-auto">Concept pricing</Tag>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="pricing-title"
              className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-950"
            >
              Pick your{" "}
              <em className="font-accent font-normal italic text-ember-500">pair.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-ink-600">
              Three visual directions for the same silhouette system. The figures below are
              concept MSRP placeholders for the design exercise — there is no checkout. 
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="mt-16 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {TIERS.map((t) => (
            <motion.article
              key={t.name}
              variants={staggerChild}
              className={cn(
                "relative flex flex-col rounded-[1.75rem] border p-8 transition-all duration-500",
                t.featured
                  ? "border-ink-950 bg-ink-950 text-bone-100 shadow-2xl shadow-ink-950/30 lg:-my-4 lg:py-12"
                  : "border-ink-900/[0.09] bg-white/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-ink-950/[0.09]"
              )}
            >
              {t.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-ember-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-ember-500/40">
                  Featured direction
                </span>
              )}

              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className={cn("font-display text-[22px] font-semibold tracking-tight", t.featured ? "text-bone-50" : "text-ink-950")}>
                    {t.name}
                  </h3>
                  <p className={cn("mt-1 text-[13px]", t.featured ? "text-bone-300/70" : "text-ink-500")}>{t.tagline}</p>
                </div>
                <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-bone-100">
                  <img
                    src={t.img}
                    alt={t.alt}
                    width={300}
                    height={300}
                    loading="lazy"
                    className="size-full scale-[1.28] object-cover transition-transform duration-500 hover:scale-150"
                  />
                </span>
              </div>

              <p className="mt-7 flex items-baseline gap-2">
                <span className={cn("font-display text-5xl font-semibold tracking-tight", t.featured ? "text-bone-50" : "text-ink-950")}>
                  ${t.price}
                </span>
                <span className={cn("text-[13.5px]", t.featured ? "text-bone-300/60" : "text-ink-500")}>concept MSRP</span>
              </p>

              <ul className="mt-7 flex flex-col gap-3.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14.5px]">
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
                  "group relative mt-9 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 text-[15px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                  t.featured
                    ? "bg-ember-500 text-white shadow-lg shadow-ember-500/30 hover:shadow-xl hover:shadow-ember-500/40"
                    : "bg-ink-950 text-bone-50 hover:shadow-lg hover:shadow-ink-950/20"
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
                />
                {t.cta}
              </a>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {ASSURANCES.map((a) => (
              <span key={a.label} className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink-600">
                <a.icon className="size-4.5 text-ember-500" aria-hidden />
                {a.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
