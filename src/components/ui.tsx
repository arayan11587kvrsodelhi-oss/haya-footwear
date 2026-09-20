import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight, Star } from "lucide-react";
import { EASE } from "../lib/motion";
import { cn } from "../utils/cn";

/* ————————————————————————— Scroll reveal wrapper ————————————————————————— */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const Comp = as === "span" ? motion.span : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* ————————————————————————— Kicker / eyebrow tag ————————————————————————— */
export function Tag({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
        dark
          ? "border-white/15 bg-white/[0.04] text-bone-200"
          : "border-ink-900/10 bg-white/50 text-ink-600",
        className
      )}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-ember-500" />
      </span>
      {children}
    </span>
  );
}

/* ————————————————————————— Buttons ————————————————————————— */
const btnBase =
  "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]";

function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
    />
  );
}

export function PrimaryButton({
  children,
  href = "#pricing",
  tone = "ink",
  className,
}: {
  children: ReactNode;
  href?: string;
  tone?: "ink" | "ember" | "bone";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        btnBase,
        tone === "ink" && "bg-ink-950 text-bone-50 shadow-xl shadow-ink-950/20 hover:shadow-2xl hover:shadow-ink-950/25",
        tone === "ember" && "bg-ember-500 text-white shadow-xl shadow-ember-500/30 hover:shadow-2xl hover:shadow-ember-500/40",
        tone === "bone" && "bg-bone-50 text-ink-950 shadow-xl shadow-black/30",
        className
      )}
    >
      <Shine />
      <span className="relative">{children}</span>
      <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </a>
  );
}

export function GhostButton({
  children,
  href,
  dark = false,
  className,
}: {
  children: ReactNode;
  href: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-300 active:scale-[0.97]",
        dark
          ? "border-white/20 text-bone-100 hover:border-white/50 hover:bg-white/5"
          : "border-ink-900/15 bg-white/40 text-ink-900 hover:border-ink-900/40 hover:bg-white/70",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  );
}

/* ————————————————————————— Star rating row ————————————————————————— */
export function Stars({ className, size = "size-4" }: { className?: string; size?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label="Rated 4.9 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(size, "fill-ember-500 text-ember-500")} aria-hidden />
      ))}
    </span>
  );
}

/* ————————————————————————— Circular rotating badge ————————————————————————— */
export function OrbitBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        "glass-light grid size-28 place-items-center rounded-full sm:size-32",
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-rotate-slow">
        <defs>
          <path id="orbit-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text className="fill-ink-900 font-body text-[9.5px] font-semibold uppercase" letterSpacing="2.6">
          <textPath href="#orbit-circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-10 place-items-center rounded-full bg-ember-500 text-white shadow-lg shadow-ember-500/40">
        <ArrowRight className="size-4 -rotate-45" />
      </span>
    </div>
  );
}
