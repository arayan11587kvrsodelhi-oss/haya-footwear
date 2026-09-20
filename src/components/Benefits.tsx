import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Clock, Droplets, Leaf, Waves } from "lucide-react";
import { EASE, useReducedMotion } from "../lib/motion";
import { Reveal, Tag } from "./ui";
import { ResponsiveImage } from "./ResponsiveImage";

/*
 * Animated counter. Uses a real count-up, but the final value is set
 * immediately for reduced-motion users so the number is never missing.
 */
function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (reduced) {
      setDisplay(String(value));
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <div ref={ref} className="border-l border-white/10 pl-5">
      <p className="font-display text-[clamp(2.2rem,4.5vw,3.2rem)] font-semibold leading-none tabular-nums tracking-[-0.03em] text-bone-50">
        {display}
        <span className="text-ember-500">{suffix}</span>
      </p>
      <p className="mt-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone-300/60">
        {label}
      </p>
    </div>
  );
}

const BENEFITS = [
  {
    icon: Clock,
    title: "Designed around long days",
    copy: "The comfort brief starts with a lighter visual and physical footprint: soft transitions, stable underfoot support, and no needless bulk.",
  },
  {
    icon: Waves,
    title: "Soft from the first frame",
    copy: "The upper and collar language are designed to feel broken-in from the start, with fewer hard transitions against the foot.",
  },
  {
    icon: Droplets,
    title: "City-ready material language",
    copy: "The knit direction favours a clean, weather-aware surface that keeps the product looking composed across commutes and off-duty hours.",
  },
  {
    icon: Leaf,
    title: "Care kept uncomplicated",
    copy: "A practical, easy-care product story keeps maintenance out of the spotlight and the silhouette in focus.",
  },
];

const DETAILS = [
  {
    asset: "detail-knit",
    alt: "Macro view of ivory knit weave with a single ember thread",
    label: "FluxKnit, expressive single-thread texture",
  },
  {
    asset: "detail-sole",
    alt: "Macro view of a sculpted foam midsole",
    label: "FeatherCell, responsive foam concept",
  },
] as const;

export function Benefits() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  /* Reduced motion disables parallax entirely rather than just damping it. */
  const parallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="craft"
      className="section relative overflow-hidden bg-ink-950 text-bone-100"
      aria-labelledby="craft-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[10%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.13),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,160,126,0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="wrap relative grid gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Sticky editorial imagery */}
        <div className="relative">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div
                ref={imgRef}
                className="relative overflow-hidden rounded-[var(--radius-2xl)] border-white/10"
              >
                <motion.div style={reduced ? undefined : { y: parallax }}>
                  <ResponsiveImage
                    name="lifestyle"
                    alt="A stride across a sunlit city crosswalk in ivory haya sneakers"
                    ratio="4 / 5"
                    sizes="(max-width: 1023px) 92vw, 46vw"
                    className="rounded-none"
                    imgClassName="scale-[1.12] object-cover"
                  />
                </motion.div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent"
                />
                <figure className="glass-dark absolute inset-x-4 bottom-4 rounded-[var(--radius-lg)] p-5 sm:inset-x-5 sm:bottom-5">
                  <blockquote className="font-accent text-[18px] italic leading-snug text-bone-50 sm:text-[19px]">
                    "The product should disappear into the outfit, not the experience."
                  </blockquote>
                  <figcaption className="mt-2.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-bone-300/70">
                    Wear brief, long-day movement
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            {/* Detail thumbnails */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-5">
              {DETAILS.map((d, i) => (
                <Reveal key={d.asset} delay={0.1 + i * 0.08}>
                  <figure className="group">
                    <ResponsiveImage
                      name={d.asset}
                      alt={d.alt}
                      ratio="4 / 3"
                      sizes="(max-width: 1023px) 45vw, 22vw"
                      className="rounded-[var(--radius-md)] border-white/10"
                      imgClassName="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-signature)] group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                    />
                    <figcaption className="mt-2.5 text-[11px] font-medium uppercase leading-snug tracking-[0.12em] text-bone-300/60">
                      {d.label}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Copy, benefits, stats */}
        <div>
          <Reveal>
            <Tag dark>The craft</Tag>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="craft-title"
              className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-bone-50"
            >
              Built for the
              <br />
              twelve-hour{" "}
              <em className="font-accent font-normal italic text-ember-400">day.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-md text-[16px] leading-[1.7] text-bone-300/75">
              A calendar does not schedule foot fatigue. This concept starts
              from a single premise: a shoe that stays unremarkable in the best
              way, from the early platform dash to the last hour standing.
            </p>
          </Reveal>

          <div className="mt-10">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="group flex gap-5 border-t border-white/10 py-6 transition-[padding] duration-[var(--dur-base)] last:border-b hover:pl-2">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] border-white/10 bg-white/[0.04] text-ember-400 transition-colors duration-[var(--dur-base)] group-hover:border-ember-500/40 group-hover:bg-ember-500/10">
                    <b.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[18.5px] font-semibold tracking-[-0.02em] text-bone-50">
                      {b.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[14.5px] leading-[1.65] text-bone-300/70">
                      {b.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Counts describe this concept's own scope, not market performance. */}
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 xl:grid-cols-4">
            <Stat value={1} label="hero silhouette" />
            <Stat value={3} label="core colorways" />
            <Stat value={4} label="material systems" />
            <Stat value={3} label="concept directions" />
          </div>
        </div>
      </div>
    </section>
  );
}
