import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Feather, Zap, Recycle } from "lucide-react";
import { EASE } from "../lib/motion";
import { PrimaryButton, GhostButton, OrbitBadge, Tag } from "./ui";

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function SpecChip({
  icon: Icon,
  value,
  label,
  className,
  delay,
}: {
  icon: typeof Feather;
  value: string;
  label: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="glass-light flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ink-950 text-bone-50">
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[17px] font-semibold text-ink-950">{value}</span>
          <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">{label}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const shoeX = useTransform(sx, [-1, 1], [-14, 14]);
  const shoeY = useTransform(sy, [-1, 1], [-10, 10]);
  const bgX = useTransform(sx, [-1, 1], [10, -10]);
  const bgY = useTransform(sy, [-1, 1], [8, -8]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28 sm:pt-32"
      aria-labelledby="hero-title"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-20%] size-[36rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute -right-40 bottom-[-30%] size-[40rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(255,160,126,0.2),transparent_65%)] blur-3xl [animation-delay:3s]" />
        {/* Hairline grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(19,18,16,0.035)_1px,transparent_1px)] bg-[size:128px_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
        {/* ——— Copy ——— */}
        <div className="relative z-10 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            <Tag>A1 Series — concept launch</Tag>
          </motion.div>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.9rem,7.2vw,5.4rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-ink-950"
          >
            <LineReveal delay={0.45}>Featherlight step.</LineReveal>
            <LineReveal delay={0.58}>
              Heavyweight{" "}
              <em className="font-accent font-normal italic tracking-[-0.01em] text-ember-500">
                presence.
              </em>
            </LineReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-600"
          >
            Meet the haya&nbsp;A1 — a featherlight concept built around supercritical
            foam, expressive knit, and a silhouette designed for long days.
            Clean lines. Quiet engineering. A little more presence than
            your average everyday sneaker.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <PrimaryButton href="#pricing">Explore the A1 — from $169</PrimaryButton>
            <GhostButton href="#collection">See all colorways</GhostButton>
          </motion.div>

          {/* Product signals */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-2.5"
          >
            {['01 silhouette', '03 colorways', 'All-day comfort brief'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-ink-900/10 bg-white/55 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-600"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ——— Visual ——— */}
        <div className="relative lg:col-span-6">
          <motion.div style={{ x: bgX, y: bgY }} aria-hidden className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 animate-blob bg-[linear-gradient(135deg,#ffd9c4,#fe4e17_140%)] opacity-70 blur-[2px] sm:size-[32rem]" />
          </motion.div>

          {/* Giant wordmark */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.1 }}
            className="text-outline pointer-events-none absolute -bottom-8 left-1/2 z-0 -translate-x-1/2 select-none font-display text-[clamp(6rem,16vw,13rem)] font-bold leading-none tracking-tight"
          >
            haya
          </motion.span>

          {/* Shoe */}
          <motion.div style={{ x: shoeX, y: shoeY }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -6, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
            >
              <div className="animate-float">
                <img
                  src="/images/hero-shoe.png"
                  alt="haya A1 sneaker in ivory knit with ember accents, floating in profile"
                  width={1024}
                  height={1024}
                  className="img-cutout mx-auto w-full max-w-[34rem] -rotate-6"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating spec chips */}
          <SpecChip icon={Feather} value="01" label="hero silhouette" delay={1.15} className="absolute left-0 top-[8%] z-20 hidden sm:block lg:-left-4" />
          <SpecChip icon={Zap} value="03" label="material layers" delay={1.3} className="absolute right-0 top-[38%] z-20 hidden lg:-right-2 sm:block" />
          <SpecChip icon={Recycle} value="03" label="core colorways" delay={1.45} className="absolute bottom-[16%] left-[6%] z-20 hidden md:block" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.55, ease: EASE }}
            className="absolute -bottom-2 right-2 z-20 sm:right-6"
          >
            <OrbitBadge text="material study · motion system · quiet design · " />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#press"
        aria-label="Scroll to see press mentions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-500 transition-colors hover:text-ink-950 md:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-ink-400 to-transparent"
          aria-hidden
        />
      </motion.a>
    </section>
  );
}
