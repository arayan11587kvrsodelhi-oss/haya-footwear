import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { staggerParent, staggerChild } from "../lib/motion";
import { Reveal, Tag } from "./ui";
import { cn } from "../utils/cn";

const PRODUCTS = [
  {
    name: "A1 Cloud",
    colorway: "Bone / Ivory",
    price: 189,
    img: "/images/shoe-bone.png",
    alt: "haya A1 Cloud in bone white knit, side profile",
    dots: ["#EFE9DC", "#DDD3BF", "#3B3830"],
    badge: null,
  },
  {
    name: "A1 Ember",
    colorway: "Ember / Cream",
    price: 199,
    img: "/images/shoe-ember.png",
    alt: "haya A1 Ember in burnt orange knit with cream sole, side profile",
    dots: ["#FE4E17", "#F3DFC4", "#1A1915"],
    badge: "Featured colorway",
  },
  {
    name: "A1 Onyx",
    colorway: "Blackout / Black",
    price: 209,
    img: "/images/shoe-onyx.png",
    alt: "haya A1 Onyx in matte black knit, side profile",
    dots: ["#131210", "#35332B", "#716E63"],
    badge: null,
  },
];

export function Showcase() {
  return (
    <section id="collection" className="relative overflow-hidden bg-bone-50 py-24 sm:py-32" aria-labelledby="collection-title">
      <span aria-hidden className="text-outline pointer-events-none absolute right-[-2%] top-10 select-none font-display text-[clamp(5rem,12vw,10rem)] font-bold leading-none">
        A1—25
      </span>

      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Tag className="mx-auto">The collection</Tag>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="collection-title"
              className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-950"
            >
              Three shades of{" "}
              <em className="font-accent font-normal italic text-ember-500">gone.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-ink-600">
              One silhouette, three moods. Every colorway ships with the same
              impossible lightness — pick the one they'll remember you by.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.name}
              variants={staggerChild}
              className={cn("group relative", i === 1 && "lg:translate-y-10")}
            >
              <div className="relative overflow-hidden rounded-[1.75rem] border border-ink-900/[0.07] bg-gradient-to-b from-bone-100 to-bone-200">
                {p.badge && (
                  <span className="absolute left-5 top-5 z-10 rounded-full bg-ember-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-ember-500/30">
                    {p.badge}
                  </span>
                )}
                {/* Hover glow */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(254,78,23,0.14),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <img
                  src={p.img}
                  alt={p.alt}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-rotate-2"
                />
                {/* Quick add */}
                <a
                  href="#pricing"
                  className="absolute inset-x-4 bottom-4 flex translate-y-[130%] items-center justify-between rounded-2xl bg-ink-950/90 px-5 py-3.5 text-sm font-semibold text-bone-50 opacity-0 backdrop-blur-md transition-all duration-500 ease-out hover:bg-ink-950 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Quick add — ${p.price}
                  <Plus className="size-4" aria-hidden />
                </a>
              </div>

              <div className="mt-5 flex items-start justify-between px-1">
                <div>
                  <h3 className="font-display text-[19px] font-semibold tracking-tight text-ink-950">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[13.5px] text-ink-500">{p.colorway}</p>
                </div>
                <p className="font-display text-[19px] font-semibold text-ink-950">${p.price}</p>
              </div>

              <div className="mt-3 flex items-center gap-2 px-1" aria-label={`${p.name} color options`}>
                {p.dots.map((d) => (
                  <span
                    key={d}
                    style={{ backgroundColor: d }}
                    className="size-4 cursor-pointer rounded-full border border-ink-900/15 transition-transform duration-200 hover:scale-125"
                  />
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.15} className="mt-16 text-center lg:mt-24">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink-950 transition-colors hover:text-ember-500"
          >
            Compare all specs
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
