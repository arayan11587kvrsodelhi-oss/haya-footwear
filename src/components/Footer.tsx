import { ArrowUp, ArrowUpRight } from "lucide-react";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Collection", href: "#collection" },
      { label: "Why haya", href: "#why" },
      { label: "The craft", href: "#craft" },
      { label: "Design notes", href: "#notes" },
    ],
  },
  {
    title: "Details",
    links: [
      { label: "Concept directions", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Concept close", href: "#cta" },
      { label: "Back to top", href: "#top" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950 pb-8 pt-16 text-bone-100 sm:pt-20"
      aria-label="Site footer"
    >
      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand + disclosure */}
          <div className="lg:col-span-6">
            <a
              href="#top"
              className="inline-flex items-baseline gap-1.5 rounded-sm"
              aria-label="haya, back to top"
            >
              <span className="font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-bone-50">
                haya
              </span>
              <span className="size-2 rounded-full bg-ember-500" aria-hidden />
            </a>
            <p className="mt-5 max-w-md text-[14.5px] leading-[1.7] text-bone-300/70">
              HAYA, Premium Footwear Concept. A design study exploring
              editorial art direction, product presentation, motion, and
              responsive web design.
            </p>

            {/* Concept disclosure, stated once and clearly. */}
            <p className="mt-5 max-w-md rounded-[var(--radius-md)] border-white/10 bg-white/[0.03] px-4 py-3 text-[12.5px] leading-[1.6] text-bone-300/55">
              This is a fictional concept. There is no product for sale, no
              checkout, and no real customer, press, or performance data
              represented anywhere on this site.
            </p>

            <a
              href="#notes"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] text-bone-200 transition-colors duration-[var(--dur-base)] hover:border-ember-500/40 hover:bg-white/[0.06]"
            >
              Read the design notes
              <ArrowUpRight
                className="size-3.5 text-ember-400 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <h2 className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-bone-300/50">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex min-h-8 items-center gap-0 text-[14.5px] text-bone-200/80 transition-[color,gap] duration-[var(--dur-base)] hover:gap-1.5 hover:text-bone-50"
                    >
                      <span
                        className="h-px w-0 bg-ember-500 transition-[width] duration-[var(--dur-base)] group-hover:w-3"
                        aria-hidden
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex lg:col-span-2 lg:justify-end">
            <a
              href="#top"
              aria-label="Back to top"
              className="group grid size-12 place-items-center self-start rounded-full border-white/10 bg-white/[0.04] text-bone-200 transition-[transform,color,border-color] duration-[var(--dur-base)] ease-[var(--ease-signature)] hover:-translate-y-1 hover:border-ember-500/50 hover:text-ember-400"
            >
              <ArrowUp
                className="size-5 transition-transform duration-[var(--dur-base)] group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/[0.07] pt-8 text-[12.5px] text-bone-300/50 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>HAYA, Premium Footwear Concept. Design study, not a live store.</p>
          <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer shortcuts">
            <a
              href="#faq"
              className="inline-flex min-h-8 items-center transition-colors hover:text-bone-100"
            >
              Project notes
            </a>
            <a
              href="#collection"
              className="inline-flex min-h-8 items-center transition-colors hover:text-bone-100"
            >
              Collection
            </a>
            <a
              href="#top"
              className="inline-flex min-h-8 items-center transition-colors hover:text-bone-100"
            >
              Top
            </a>
          </nav>
        </div>
      </div>

      {/* Oversized wordmark closing the page frame. */}
      <div aria-hidden className="pointer-events-none relative mt-6 select-none overflow-hidden">
        <p className="text-outline-bone mx-auto -mb-[0.24em] text-center font-display text-[clamp(5rem,24vw,22rem)] font-bold leading-none tracking-tight [mask-image:linear-gradient(to_bottom,black_40%,transparent)]">
          haya
        </p>
      </div>
    </footer>
  );
}
