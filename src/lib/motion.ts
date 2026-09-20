import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  type Transition,
  type Variants,
} from "framer-motion";

/** Duration scale (seconds) mirroring the CSS custom properties. */
export const DUR = {
  fast: 0.2,
  base: 0.3,
  slow: 0.6,
  slower: 0.9,
} as const;

/** Signature ease — snappy, long tail. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** One shared transition for every scroll reveal. */
export const revealTransition: Transition = {
  duration: DUR.slower,
  ease: EASE,
};

/** One shared viewport trigger, so reveals fire at the same scroll point. */
export const REVEAL_VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slower, delay: i * 0.09, ease: EASE },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.slower, ease: EASE },
  },
};

/**
 * True when the user requested reduced motion. Read from a live media query
 * rather than sampled once, so toggling the OS setting takes effect immediately.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True when the primary input is a mouse/trackpad, i.e. hover is meaningful. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

/**
 * Magnetic pointer-follow for primary CTAs.
 *
 * Deliberately restrained: a few pixels of pull, spring-eased, and only on
 * devices with a fine pointer and no reduced-motion preference. Touch and
 * reduced-motion users get a completely static button, because the handler
 * short-circuits and the motion values stay pinned at zero.
 */
export function useMagnetic(strength = 8) {
  const ref = useRef<HTMLElement | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 20, mass: 0.4 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, px)) * strength);
    y.set(Math.max(-1, Math.min(1, py)) * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: sx, y: sy }, onPointerMove, onPointerLeave, enabled };
}
