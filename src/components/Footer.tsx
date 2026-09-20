import { ArrowUp, ArrowUpRight } from "lucide-react";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Collection", href: "#collection" },
      { label: "Why haya", href: "#why" },
      { label: "The craft", href: "#craft" },
      { label: "Design notes", href: "#reviews" },
    ],
  },
  {
    title: "Details",
    links: [
      { label: "Concept pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Concept close", href: "#cta" },
      { label: "Back to top", href: "#top" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950 pb-10 pt-20 text-bone-100" aria-label="Site footer">
      <div className="wrap relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <a href="#top" className="flex items-baseline gap-1" aria-label="haya — back to top">
              <span className="font-display text-4xl font-semibold tracking-tight text-bone-50">haya</span>
              <span className="size-2 rounded-full bg-ember-500" aria-hidden />
            </a>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bone-300/70">
              A premium footwear concept built around featherlight proportions, expressive knit texture, and a restrained editorial system.
            </p>
            <a
              href="#cta"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone-200 transition-colors hover:text-ember-400"
            >
              View the concept close
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
            <a
              href="#reviews"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] text-bone-200 transition-all hover:border-ember-500/40 hover:bg-white/[0.06]"
            >
              Read the design notes
              <ArrowUpRight className="size-3.5 text-ember-400" aria-hidden />
            </a>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-bone-300/50">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-0 text-[14.5px] text-bone-200/80 transition-all duration-300 hover:gap-1.5 hover:text-bone-50"
                    >
                      <span className="h-px w-0 bg-ember-500 transition-all duration-300 group-hover:w-3" aria-hidden />
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
              className="group grid size-12 place-items-center self-start rounded-full border border-white/10 bg-white/[0.04] text-bone-200 transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/50 hover:text-ember-400"
            >
              <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-[12.5px] text-bone-300/50">
          <p>© 2026 haya — independent footwear concept.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <a href="#faq" className="transition-colors hover:text-bone-100">Project notes</a>
            <a href="#collection" className="transition-colors hover:text-bone-100">Collection</a>
            <a href="#top" className="transition-colors hover:text-bone-100">Top</a>
          </div>
          <p>Made for movers.</p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none relative mt-6 select-none overflow-hidden">
        <p className="text-outline-bone mx-auto -mb-[0.24em] text-center font-display text-[clamp(8rem,26vw,24rem)] font-bold leading-none tracking-tight [mask-image:linear-gradient(to_bottom,black_40%,transparent)]">
          haya
        </p>
      </div>
    </footer>
  );
}
