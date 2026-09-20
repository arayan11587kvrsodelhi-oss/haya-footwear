const NOTES = [
  { source: "MATERIAL STUDY", quote: "Lightweight foam, expressive knit, quieter surfaces." },
  { source: "SILHOUETTE STUDY", quote: "One profile, softened geometry, no unnecessary noise." },
  { source: "COLOR STUDY", quote: "Bone, ember, onyx — three moods for one system." },
  { source: "WEAR STUDY", quote: "Built around movement, balance, and long-day comfort." },
  { source: "DETAIL STUDY", quote: "Small seams, subtle texture, deliberate contrast." },
  { source: "BRAND STUDY", quote: "A footwear identity with more restraint than hype." },
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {NOTES.map((item) => (
        <figure key={item.source} className="flex shrink-0 items-center gap-4 px-8 sm:gap-6 sm:px-12">
          <figcaption className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.22em] text-bone-100">
            {item.source}
          </figcaption>
          <span className="size-1.5 rotate-45 bg-ember-500" aria-hidden />
          <blockquote className="whitespace-nowrap font-accent text-lg italic text-bone-300/80">
            “{item.quote}”
          </blockquote>
        </figure>
      ))}
    </div>
  );
}

export function Press() {
  return (
    <section
      id="press"
      aria-label="Design notes"
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-950 py-7"
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}
