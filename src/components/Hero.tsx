import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Feather, Layers, Palette } from "lucide-react";
import { EASE, useFinePointer, useReducedMotion } from "../lib/motion";
import { PrimaryButton, GhostButton, OrbitBadge, Tag } from "./ui";
import { ResponsiveImage } from "./ResponsiveImage";

/*
 * Masked line reveal for the headline. The overflow wrapper is clipped at the
 * baseline box, and the inner span slides up into place — a classic editorial
 * entrance that reads as intentional rather than decorative.
 */
function LineReveal({
  children,
  delay = 0,
  enabled = true,
}: {
  children: React.ReactNode;
  delay?: number;
  /** Reduced-motion users skip the slide and simply see the text. */
  enabled?: boolean;
}) {
  if (!enabled) return <span className="block">{children}</span>;

  return (
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Floating spec chip. The idle float is preserved (it is part of HAYA's
 * character) but the amplitude is reduced and it is disabled outright for
 * reduced-motion users.
 */
function SpecChip({
  icon: Icon,
  value,
  label,
  className,
  delay,
  float = true,
}: {
  icon: typeof Feather;
  value: string;
  label: string;
  className?: string;
  delay: number;
  float?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      <motion.div
        animate={float ? { y: [0, -7, 0] } : undefined}
        transition={{ duration: 5.5 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="glass-light flex items-center gap-3 rounded-[var(--radius-md)] px-3.5 py-3"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-[0.7rem] bg-ink-950 text-bone-50">
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[17px] font-semibold tabular-nums text-ink-950">
            {value}
          </span>
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            {label}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  /* Pointer parallax only makes sense with a mouse and without reduced motion. */
  const parallaxOn = fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 20, mass: 0.6 });
  /* Kept deliberately shallow — depth, not movement. */
  const shoeX = useTransform(sx, [-1, 1], [-10, 10]);
  const shoeY = useTransform(sy, [-1, 1], [-7, 7]);
  const bgX = useTransform(sx, [-1, 1], [8, -8]);
  const bgY = useTransform(sy, [-1, 1], [6, -6]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!parallaxOn) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Ambient background — two soft ember glows plus a hairline grid. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-20%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute -right-40 bottom-[-30%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,160,126,0.2),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(19,18,16,0.035)_1px,transparent_1px)] bg-[size:128px_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* ——— Copy ——— */}
        <div className="relative z-10 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <Tag>A1 Series — concept study</Tag>
          </motion.div>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.2rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink-950 sm:mt-7"
          >
            <LineReveal delay={0.38} enabled={!reduced}>Featherlight step.</LineReveal>
            <LineReveal delay={0.5} enabled={!reduced}>
              Heavyweight{" "}
              <em className="font-accent font-normal italic tracking-[-0.01em] text-ember-500">
                presence.
              </em>
            </LineReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
            className="mt-6 max-w-[34rem] text-[16.5px] leading-[1.7] text-ink-600 sm:mt-7"
          >
            A featherlight concept built around supercritical foam, expressive
            knit, and a silhouette drawn for long days. Clean lines, quiet
            engineering, and a little more presence than your average sneaker.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.88, ease: EASE }}
             className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <PrimaryButton href="#collection" className="w-full sm:w-auto">
              Explore the collection
            </PrimaryButton>
            <GhostButton href="#why" className="w-full sm:w-auto">
              Why haya
            </GhostButton>
          </motion.div>

          {/* Concept signals - factual counts for this page, not market claims. */}
          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-2.5 sm:mt-10"
          >
            {["01 silhouette", "03 colorways", "04 material systems"].map((item) => (
              <li
                key={item}
                className="rounded-full border-ink-900/10 bg-white/55 px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-600"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ——— Visual ——— */}
        <div className="relative lg:col-span-6">
          <motion.div style={{ x: bgX, y: bgY }} aria-hidden className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-[46%_54%_52%_48%/50%_46%_54%_50%] bg-[linear-gradient(135deg,#ffd9c4,#fe4e17_140%)] opacity-65 blur-[2px] sm:size-[30rem]" />
          </motion.div>

          {/* Oversized outline wordmark, anchored behind the product. */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="text-outline pointer-events-none absolute -bottom-6 left-1/2 z-0 -translate-x-1/2 select-none font-display text-[clamp(4.5rem,15vw,12rem)] font-bold leading-none tracking-tight sm:-bottom-8"
          >
            haya
          </motion.span>

          {/* Product */}
          <motion.div style={{ x: shoeX, y: shoeY }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
            >
              <div className={reduced ? undefined : "animate-float"}>
                <ResponsiveImage
                  name="hero-shoe"
                  alt="haya A1 sneaker in ivory knit with ember accents, shown in profile"
                  priority
                  ratio="1 / 1"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 34rem"
                  className="mx-auto max-w-[30rem] -rotate-6 lg:max-w-[34rem]"
                  imgClassName="img-cutout object-contain"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating spec chips — the visual signature of the hero. */}
          <SpecChip
            icon={Feather}
            value="01"
            label="hero silhouette"
            delay={1}
            float={!reduced}
            className="absolute left-0 top-[6%] z-20 hidden sm:block lg:left-2"
          />
          <SpecChip
            icon={Layers}
            value="04"
            label="material systems"
            delay={1.12}
            float={!reduced}
            className="absolute right-0 top-[40%] z-20 hidden sm:block lg:right-2"
          />
          <SpecChip
            icon={Palette}
            value="03"
            label="core colorways"
            delay={1.24}
            float={!reduced}
            className="absolute bottom-[14%] left-[4%] z-20 hidden md:block"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
            className="absolute -bottom-2 right-1 z-20 sm:right-4"
          >
            <OrbitBadge text="material study · motion system · quiet design · " />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — purely decorative, so it is hidden from assistive tech. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.9 }}
        className="absolute bottom-7 left-1/2 hidden flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-500 lg:flex"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-ink-500/60 to-transparent" />
      </motion.div>
    </section>
  );
}
