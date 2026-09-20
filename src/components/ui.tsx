import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  EASE,
  REVEAL_VIEWPORT,
  revealTransition,
  useMagnetic,
} from "../lib/motion";
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
      viewport={REVEAL_VIEWPORT}
      transition={{ ...revealTransition, delay }}
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
      <span className="relative flex size-1.5" aria-hidden>
        <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-ember-500" />
      </span>
      {children}
    </span>
  );
}

/* ————————————————————————— Buttons ————————————————————————— */
/**
 * One button geometry for the entire site: same height (56px / min 44px touch
 * target), radius, tracking and hover choreography. Variants only change tone,
 * never dimensions, so buttons stay aligned when placed side by side.
 */
const btnBase =
  "group relative inline-flex h-14 min-h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[15px] font-semibold tracking-[-0.01em] transition-[transform,box-shadow,background-color,border-color] duration-[var(--dur-base)] ease-[var(--ease-signature)] hover:-translate-y-0.5 active:scale-[0.98]";

const btnTone = {
  ink: "bg-ink-950 text-bone-50 shadow-[0_10px_30px_-12px_rgba(19,18,16,0.5)] hover:shadow-[0_18px_44px_-14px_rgba(19,18,16,0.6)]",
  ember:
    "bg-ember-500 text-white shadow-[0_10px_30px_-12px_rgba(254,78,23,0.6)] hover:shadow-[0_18px_44px_-14px_rgba(254,78,23,0.7)]",
  bone: "bg-bone-50 text-ink-950 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
} as const;

/** Sheen sweep — the only "shiny" effect in the design system. */
function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
    />
  );
}

/**
 * Primary CTA. On fine-pointer devices the button drifts a few pixels toward
 * the cursor; on touch or with reduced motion it is completely static, because
 * `useMagnetic` short-circuits and keeps its motion values at zero.
 */
export function PrimaryButton({
  children,
  href = "#collection",
  tone = "ink",
  className,
  arrow = "right",
}: {
  children: ReactNode;
  href?: string;
  tone?: keyof typeof btnTone;
  className?: string;
  arrow?: "right" | "diagonal";
}) {
  const { ref, style, onPointerMove, onPointerLeave } = useMagnetic(7);
  const Arrow = arrow === "right" ? ArrowRight : ArrowUpRight;

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(btnBase, btnTone[tone], className)}
    >
      <Shine />
      <span className="relative">{children}</span>
      <Arrow
        className={cn(
          "relative size-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-signature)]",
          arrow === "right"
            ? "group-hover:translate-x-1"
            : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        )}
        aria-hidden
      />
    </motion.a>
  );
}

/** Secondary CTA — identical geometry, outline treatment. */
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
        btnBase,
        dark
          ? "border border-white/20 text-bone-100 hover:border-white/45 hover:bg-white/[0.06]"
          : "border border-ink-900/15 bg-white/40 text-ink-900 hover:border-ink-900/35 hover:bg-white/70",
        className
      )}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}

/** Inline "read more" link used to close out sections. */
export function InlineLink({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-ink-950 transition-colors duration-[var(--dur-base)] hover:text-ember-500",
        className
      )}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}

/* ————————————————————————— Circular rotating badge ————————————————————————— */
export function OrbitBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        "glass-light relative grid size-24 place-items-center rounded-full sm:size-32",
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
      <span className="grid size-9 place-items-center rounded-full bg-ember-500 text-white shadow-[0_8px_20px_-6px_rgba(254,78,23,0.6)] sm:size-10">
        <ArrowUpRight className="size-4" />
      </span>
    </div>
  );
}

export { EASE };

