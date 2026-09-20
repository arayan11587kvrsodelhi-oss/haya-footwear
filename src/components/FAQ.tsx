import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { EASE } from "../lib/motion";
import { Reveal, Tag } from "./ui";
import { cn } from "../utils/cn";

const FAQS = [
  {
    q: "How does the sizing run?",
    a: "The current page is a concept study, so there is no live sizing or checkout flow yet. The final product spec would pair this section with a real size chart, fit notes, and an exchange policy.",
  },
  {
    q: "What exactly is the 60-day trial?",
    a: "This landing page uses trial language as part of the visual product story only. A real launch would replace it with the actual return window, eligibility rules, and refund policy before publishing.",
  },
  {
    q: "How fast is shipping, and where do you deliver?",
    a: "There is no live fulfillment network attached to this concept. Delivery windows, regions, duties, and shipping methods would be added once a real commerce backend exists.",
  },
  {
    q: "Can I really machine-wash them?",
    a: "The care story is intentionally simple, but the final washing instructions should follow the validated material specification for the production shoe.",
  },
  {
    q: "What makes FeatherCell™ different from regular foam?",
    a: "FeatherCell™ is presented here as a fictional material system for the concept. The final page should use measured lab data only if a real product and testing program back those numbers.",
  },
  {
    q: "Is the sustainability claim real or marketing?",
    a: "The sustainability section is also conceptual. Any recycled-content, lifecycle, carbon, or traceability statement should be replaced with verified supplier and lifecycle data before public commerce use.",
  },
];

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const id = `faq-panel-${index}`;
  return (
    <Reveal delay={index * 0.05}>
      <div
        className={cn(
          "rounded-2xl border transition-colors duration-300",
          open ? "border-ink-900/[0.12] bg-white/70 shadow-lg shadow-ink-950/[0.05]" : "border-ink-900/[0.08] bg-transparent hover:bg-white/40"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
        >
          <span className="font-display text-[17.5px] font-semibold tracking-tight text-ink-950">{q}</span>
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-400",
              open ? "rotate-45 border-ember-500 bg-ember-500 text-white" : "border-ink-900/15 text-ink-900"
            )}
          >
            <Plus className="size-4" aria-hidden />
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 pt-0 max-w-xl text-[14.5px] leading-relaxed text-ink-600">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Left rail */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Tag>FAQ</Tag>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="faq-title"
                className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-950"
              >
                Asked,{" "}
                <em className="font-accent font-normal italic text-ember-500">answered.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-ink-600">
                Everything people ask before they step into the concept.
                The production version would connect these answers to real sizing, shipping, care, and returns data.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="relative mt-9 overflow-hidden rounded-3xl border border-ink-900/[0.08]">
                <img
                  src="/images/editorial.png"
                  alt="haya sneakers resting on a stone pedestal in warm sunlight"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-bone-50/85 px-5 py-4 backdrop-blur-xl">
                  <div>
                    <p className="text-[14px] font-semibold text-ink-950">Talk to a human</p>
                    <p className="text-[12.5px] text-ink-500">Concept enquiry</p>
                  </div>
                  <a
                    href="#cta"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-4 py-2 text-[13px] font-semibold text-bone-50 transition-transform hover:scale-105"
                  >
                    Explore the concept
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
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
