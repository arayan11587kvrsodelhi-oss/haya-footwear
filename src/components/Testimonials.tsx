import { Quote } from "lucide-react";
import { Reveal, Tag } from "./ui";
import { cn } from "../utils/cn";

/*
 * This section previously echoed the form of customer testimonials. It now
 * presents the design principles behind the concept, clearly labelled, with
 * no invented people, quotes, or ratings.
 */
const NOTES = [
  {
    quote:
      "Comfort should read through proportion first: less bulk, smoother transitions, fewer visual interruptions.",
    name: "Comfort brief",
    role: "Long-day movement direction",
    index: "01",
  },
  {
    quote:
      "The strongest visual signature is restraint, a familiar sneaker language pushed toward a quieter silhouette.",
    name: "Silhouette brief",
    role: "Product shape direction",
    index: "02",
  },
  {
    quote:
      "Texture does the branding. The knit carries enough detail that the colour system can stay deliberately simple.",
    name: "Material brief",
    role: "Upper and surface direction",
    index: "03",
  },
  {
    quote:
      "Ember works best as an accent, not a flood. The contrast should arrive in the eyelet, mark, or edge, then disappear.",
    name: "Colour brief",
    role: "Bone / Ember / Onyx",
    index: "04",
  },
  {
    quote:
      "Every interaction should feel slightly physical: lift, drift, soften, then settle back into the grid.",
    name: "Motion brief",
    role: "Interaction direction",
    index: "05",
  },
  {
    quote:
      "A premium landing page can sell the feeling before it sells the feature list. Let the imagery do some of the work.",
    name: "Brand brief",
    role: "Editorial product story",
    index: "06",
  },
];

export function Testimonials() {
  return (
    <section
      id="notes"
      className="section relative overflow-hidden"
      aria-labelledby="notes-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-12%] top-[30%] size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.07),transparent_65%)] blur-3xl"
      />

      <div className="wrap relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Tag>Design notes</Tag>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="notes-title"
                className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink-950"
              >
                Built around the
                <br />
                <em className="font-accent font-normal italic text-ember-500">feeling.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="max-w-sm rounded-[var(--radius-lg)] border-ink-900/[0.08] bg-bone-50/80 p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                What this section is
              </p>
              <p className="mt-2 text-[14px] leading-[1.65] text-ink-600">
                These cards are the design principles guiding the concept. They
                are not customer quotes, reviews, or testimonials.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:mt-14 lg:columns-3">
          {NOTES.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure
                className={cn(
                  "group mb-5 rounded-[var(--radius-lg)] border-ink-900/[0.08] bg-bone-50/80 p-6 transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-signature)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(19,18,16,0.2)] sm:p-7",
                  i === 1 && "border-ember-500/25 bg-gradient-to-b from-ember-500/[0.06] to-bone-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border-ink-900/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
                    Note {t.index}
                  </span>
                  <Quote
                    className="size-4 text-ink-300 transition-colors duration-[var(--dur-base)] group-hover:text-ember-500"
                    aria-hidden
                  />
                </div>
                <blockquote className="mt-5 text-[15.5px] leading-[1.65] text-ink-800">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-10 place-items-center rounded-full text-[11px] font-bold tabular-nums tracking-wide",
                      i % 4 === 0 ? "bg-ember-500 text-white" : "bg-ink-950 text-bone-100"
                    )}
                  >
                    {t.index}
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-semibold text-ink-950">
                      {t.name}
                    </span>
                    <span className="block text-[12.5px] text-ink-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}