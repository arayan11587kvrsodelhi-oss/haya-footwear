import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { EASE } from "../lib/motion";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Why haya", href: "#why" },
  { label: "Craft", href: "#craft" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12",
          scrolled && "h-14"
        )}
      >
        {/* Backdrop pill */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-3 top-2 -z-10 h-[calc(100%-8px)] rounded-2xl border transition-all duration-500 sm:inset-x-5 lg:inset-x-8",
            scrolled
              ? "border-ink-900/[0.07] bg-bone-50/75 shadow-lg shadow-ink-950/[0.04] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        />

        {/* Logo */}
        <a href="#top" className="flex items-baseline gap-0.5" aria-label="haya — back to top">
          <span className="font-display text-[26px] font-semibold leading-none tracking-tight text-ink-950">
            haya
          </span>
          <span className="size-1.5 rounded-full bg-ember-500" aria-hidden />
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[14px] font-medium text-ink-600 transition-colors duration-300 hover:text-ink-950"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ember-500 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="#pricing"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-950 px-5 py-2.5 text-[13.5px] font-semibold text-bone-50 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:shadow-ink-950/25 active:scale-95"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
            />
            Explore the A1
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-full border border-ink-900/10 bg-white/60 text-ink-950 backdrop-blur-md transition-colors hover:bg-white lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mx-3 mt-1 rounded-3xl border border-ink-900/[0.07] bg-bone-50/95 p-6 shadow-2xl shadow-ink-950/10 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: EASE }}
                  className="border-b border-ink-900/[0.06] py-3.5 font-display text-2xl font-medium text-ink-950 transition-colors last:border-0 hover:text-ember-500"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#pricing"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4, ease: EASE }}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink-950 py-3.5 font-semibold text-bone-50"
            >
              Explore the A1
              <ArrowRight className="size-4" aria-hidden />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
