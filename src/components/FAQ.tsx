import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE } from "../lib/motion";
import { Reveal, Tag } from "./ui";
import { ResponsiveImage } from "./ResponsiveImage";
import { cn } from "../utils/cn";

/**
 * Honest FAQ. Every answer describes the actual status of this concept rather
 * than promising a product, service, or policy that does not exist.
 */
const FAQS = [
  {
    q: "Is haya a real, purchasable shoe?",
    a: "No. This is a self-contained design concept exploring editorial art direction, product presentation, motion, and responsive front-end work. There is no product to buy and no checkout anywhere on this page.",
  },
  {
    q: "What about sizing and fit?",
    a: "There is no live size chart or fit guarantee, because there is no manufactured product behind the concept. A real launch would pair this section with tested sizing data and fit notes.",
  },
  {
    q: "How does shipping and returns work?",
    a: "It does not. There is no fulfillment network, shipping service, or returns policy attached to this project. Those would be added only alongside a real commerce backend.",
  },
  {
    q: "Are the material systems real?",
    a: "FeatherCell, FluxKnit, SeamZero, and EverGrip are fictional names created for this concept. They describe design intent, not measured or certified performance.",
  },
  {
    q: "Is there a sustainability claim here?",
    a: "No. Any recycled-content, lifecycle, or carbon statement would require verified supplier and testing data, so none is made on this page.",
  },
  {
    q: "Can I reuse the visual direction?",
    a: "The concept exists as a design exercise. The images, type system, colour palette, and interaction patterns are part of that study rather than a licensed brand asset.",
  },
];

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <Reveal delay={index * 0.04}>
      <div
        className={cn(
          "rounded-[var(--radius-lg)] border transition-colors duration-[var(--dur-base)]",
          open
            ? "border-ink-900/[0.12] bg-white/70 shadow-[0_16px_36px_-20px_rgba(19,18,16,0.18)]"
            : "border-ink-900/[0.08] bg-transparent hover:bg-white/40"
        )}
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full cursor-pointer items-center justify-between gap-5 rounded-[var(--radius-lg)] px-5 py-4.5 text-left sm:px-6 sm:py-5"
          >
            <span className="font-display text-[16.5px] font-semibold leading-snug tracking-[-0.02em] text-ink-950 sm:text-[17.5px]">
              {q}
            </span>
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-[var(--dur-base)]",
                open
                  ? "rotate-45 border-ember-500 bg-ember-500 text-white"
                  : "border-ink-900/15 text-ink-900"
              )}
              aria-hidden
            >
              <Plus className="size-4" />
            </span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-xl px-5 pb-5 text-[14.5px] leading-[1.7] text-ink-600 sm:px-6 sm:pb-6">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left rail */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Tag>FAQ</Tag>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="faq-title"
                className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink-950"
              >
                Asked,{" "}
                <em className="font-accent font-normal italic text-ember-500">answered.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-sm text-[16px] leading-[1.7] text-ink-600">
                The honest answers about what this project is, and what it is
                deliberately not. No product claims, no invented policies.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative mt-9 overflow-hidden rounded-[var(--radius-xl)] border-ink-900/[0.08]">
                <ResponsiveImage
                  name="editorial"
                  alt="haya sneakers resting on a stone pedestal in warm sunlight"
                  ratio="16 / 11"
                  sizes="(max-width: 1023px) 92vw, 40vw"
                  className="rounded-none"
                />
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-bone-50/88 px-5 py-4 backdrop-blur-xl sm:inset-x-4 sm:bottom-4">
                  <div>
                    <p className="text-[13.5px] font-semibold text-ink-950">
                      About this project
                    </p>
                    <p className="text-[12px] text-ink-500">
                      An independent design study
                    </p>
                  </div>
                  <a
                    href="#cta"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-[13px] font-semibold text-bone-50 transition-transform duration-[var(--dur-base)] hover:-translate-y-0.5 lg:min-h-0"
                  >
                    Read the close
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3.5 lg:col-span-7">
          {FAQS.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}