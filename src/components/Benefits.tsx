import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Clock, Droplets, RefreshCw, WashingMachine } from "lucide-react";
import { EASE } from "../lib/motion";
import { Reveal, Tag } from "./ui";

function Stat({
  value,
  suffix = "",
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) =>
        setDisplay(
          decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US")
        ),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <div ref={ref} className="border-l border-white/10 pl-5">
      <p className="font-display text-[clamp(2.4rem,4.5vw,3.4rem)] font-semibold leading-none tracking-tight text-bone-50">
        {display}
        <span className="text-ember-500">{suffix}</span>
      </p>
      <p className="mt-2.5 text-[12.5px] font-medium uppercase tracking-[0.14em] text-bone-300/60">{label}</p>
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
    icon: RefreshCw,
    title: "Soft from the first frame",
    copy: "The upper and collar language are designed to feel broken-in from the start, with fewer hard transitions against the foot.",
  },
  {
    icon: Droplets,
    title: "City-ready material language",
    copy: "The knit direction favors a clean, weather-aware surface that keeps the product looking composed across commutes and off-duty hours.",
  },
  {
    icon: WashingMachine,
    title: "Care kept uncomplicated",
    copy: "A practical, easy-care product story keeps maintenance out of the spotlight and the silhouette in focus.",
  },
];

export function Benefits() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="craft" className="relative overflow-hidden bg-ink-950 py-24 text-bone-100 sm:py-32" aria-labelledby="craft-title">
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[10%] size-[34rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.13),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] size-[30rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(255,160,126,0.08),transparent_65%)] blur-3xl [animation-delay:4s]" />
      </div>

      <div className="wrap relative grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Sticky editorial image */}
        <div className="relative">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div ref={imgRef} className="relative overflow-hidden rounded-[2rem] border border-white/10">
                <motion.img
                  src="/images/lifestyle.png"
                  alt="Stride across a sunlit city crosswalk in ivory haya sneakers"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  style={{ y: parallax }}
                  className="h-[58vh] w-full scale-[1.14] object-cover sm:h-[68vh]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                {/* Overlay quote */}
                <figure className="glass-dark absolute inset-x-5 bottom-5 rounded-2xl p-5">
                  <blockquote className="font-accent text-[19px] italic leading-snug text-bone-50">
                    “The product should disappear into the outfit — not the experience.”
                  </blockquote>
                  <figcaption className="mt-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-bone-300/70">
                    Wear brief — long-day movement
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            {/* Detail thumbs */}
            <div className="mt-5 grid grid-cols-2 gap-5">
              {[
                { img: "/images/detail-knit.png", alt: "Macro view of FluxKnit ivory weave with a single ember thread", label: "FluxKnit™ — expressive single-thread texture" },
                { img: "/images/detail-sole.png", alt: "Macro view of sculpted FeatherCell foam midsole", label: "FeatherCell™ — responsive foam concept" },
              ].map((d, i) => (
                <Reveal key={d.img} delay={0.12 + i * 0.1}>
                  <figure className="group">
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <img
                        src={d.img}
                        alt={d.alt}
                        width={800}
                        height={800}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <figcaption className="mt-2.5 text-[11.5px] font-medium uppercase tracking-[0.12em] text-bone-300/60">
                      {d.label}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Copy + benefits + stats */}
        <div>
          <Reveal>
            <Tag dark>The craft</Tag>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="craft-title"
              className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-bone-50"
            >
              Built for the
              <br />
              12-hour{" "}
              <em className="font-accent font-normal italic text-ember-400">day.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-bone-300/75">
              Your calendar doesn't schedule foot pain. So we built a shoe that
              makes it irrelevant — from the 7&nbsp;a.m. platform dash to the
              last standing ovation.
            </p>
          </Reveal>

          <div className="mt-12">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07}>
                <div className="group flex gap-5 border-t border-white/10 py-7 transition-all duration-300 last:border-b hover:pl-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ember-400 transition-all duration-300 group-hover:border-ember-500/40 group-hover:bg-ember-500/10">
                    <b.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] font-semibold tracking-tight text-bone-50">
                      {b.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-bone-300/70">{b.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Animated stats */}
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Stat value={1} label="hero silhouette" />
            <Stat value={3} label="core colorways" />
            <Stat value={4} label="signature systems" />
            <Stat value={12} label="hour comfort target" />
          </div>
        </div>
      </div>
    </section>
  );
}
