/**
 * Marquee of design-study notes. This is a self-referential band about the
 * concept itself — not press coverage, and not customer commentary. The
 * accessible label reflects that.
 */
const NOTES = [
  { source: "MATERIAL STUDY", quote: "Lightweight foam, expressive knit, quieter surfaces." },
  { source: "SILHOUETTE STUDY", quote: "One profile, softened geometry, no unnecessary noise." },
  { source: "COLOR STUDY", quote: "Bone, ember, onyx - three moods for one system." },
  { source: "WEAR STUDY", quote: "Built around movement, balance, and long-day comfort." },
  { source: "DETAIL STUDY", quote: "Small seams, subtle texture, deliberate contrast." },
  { source: "BRAND STUDY", quote: "A footwear identity with more restraint than hype." },
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {NOTES.map((item) => (
        <figure
          key={item.source}
          className="flex shrink-0 items-center gap-3.5 px-6 sm:gap-6 sm:px-10"
        >
          <figcaption className="whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.22em] text-bone-100">
            {item.source}
          </figcaption>
          <span className="size-1.5 shrink-0 rotate-45 bg-ember-500" aria-hidden />
          <blockquote className="whitespace-nowrap font-accent text-[17px] italic text-bone-300/80 sm:text-lg">
            {item.quote}
          </blockquote>
        </figure>
      ))}
    </div>
  );
}

export function Press() {
  return (
    <section
      aria-label="Design study notes"
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-950 py-6"
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent sm:w-24" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent sm:w-24" />
      {/*
       * The visible marquee is decorative (duplicated content, infinite loop),
       * so it is hidden from assistive tech. Screen readers get the same notes
       * once, as a plain list, in `sr-only`.
       */}
      <div aria-hidden className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row ariaHidden />
      </div>
      <ul className="sr-only">
        {NOTES.map((n) => (
          <li key={n.source}>
            {n.source}: {n.quote}
          </li>
        ))}
      </ul>
    </section>
  );
}