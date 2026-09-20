import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { EASE } from "../lib/motion";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Why haya", href: "#why" },
  { label: "Craft", href: "#craft" },
  { label: "Design notes", href: "#notes" },
  { label: "Directions", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 180) {
        setActiveSection("");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = LINKS.map((l) => l.href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (window.scrollY >= 180) {
            setActiveSection(`#${visible[0].target.id}`);
          }
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.4],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /*
   * Lenis drives the scroll position, so `body { overflow: hidden }` does not
   * reliably lock the page — Lenis keeps translating the document, and the
   * background scrolls behind the open menu. Pausing the smooth-scroll loop
   * instead is the correct fix.
   */
  useEffect(() => {
    const root = document.documentElement;
    const api = window.__lenis;
    if (open) {
      api?.stop();
      root.classList.add("menu-open");
    } else {
      api?.start();
      root.classList.remove("menu-open");
    }
    return () => {
      api?.start();
      root.classList.remove("menu-open");
    };
  }, [open]);

  /* Escape closes the menu; Tab is trapped inside it while open. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
    };
  }, [open, close]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-7xl items-center justify-between px-5 transition-[height] duration-500 ease-[var(--ease-signature)] sm:px-8 lg:px-12",
          scrolled ? "h-14" : "h-16 sm:h-[4.5rem]"
        )}
      >
        {/* Backdrop pill */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-3 top-2 -z-10 h-[calc(100%-0.5rem)] rounded-[var(--radius-lg)] border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-signature)] sm:inset-x-5 lg:inset-x-8",
            scrolled
              ? "border-ink-900/[0.07] bg-bone-50/78 shadow-[0_8px_30px_-16px_rgba(19,18,16,0.28)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        />

        {/* Wordmark */}
        <a
          href="#top"
          className="flex items-baseline gap-[3px] rounded-sm"
          aria-label="haya — back to top"
        >
          <span className="font-display text-[25px] font-semibold leading-none tracking-[-0.03em] text-ink-950">
            haya
          </span>
          <span className="size-1.5 rounded-full bg-ember-500" aria-hidden />
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Primary">
          {LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative py-1.5 text-[14px] tracking-[-0.005em] transition-colors duration-[var(--dur-base)]",
                  isActive
                    ? "font-semibold text-ink-950"
                    : "font-medium text-ink-600 hover:text-ink-950"
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full bg-ember-500 transition-transform duration-[var(--dur-base)] ease-[var(--ease-signature)]",
                    isActive
                      ? "scale-x-100"
                      : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="#collection"
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-ink-950 px-5 text-[13.5px] font-semibold tracking-[-0.01em] text-bone-50 transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-signature)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(19,18,16,0.55)] active:scale-[0.97]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
            />
            <span className="relative">View the A1</span>
            <ArrowRight
              className="relative size-3.5 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full border border-ink-900/10 bg-white/60 text-ink-950 backdrop-blur-md transition-colors hover:bg-white lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 -z-20 bg-ink-950/25 backdrop-blur-xs lg:hidden"
            />
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mx-3 mt-1 overflow-hidden rounded-[var(--radius-xl)] border-ink-900/[0.07] bg-bone-50/[0.97] p-5 shadow-[0_24px_60px_-24px_rgba(19,18,16,0.35)] backdrop-blur-2xl lg:hidden"
            >
              <nav className="flex flex-col" aria-label="Mobile">
                {LINKS.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: EASE }}
                      className={cn(
                        "border-b border-ink-900/[0.06] py-3.5 font-display text-[22px] leading-tight tracking-[-0.02em] transition-colors last:border-0",
                        isActive
                          ? "font-semibold text-ember-500"
                          : "font-medium text-ink-950 hover:text-ember-500"
                      )}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>
              <motion.a
                href="#collection"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.35, ease: EASE }}
                className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink-950 py-3.5 font-semibold text-bone-50"
              >
                View the A1
                <ArrowRight className="size-4" aria-hidden />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
