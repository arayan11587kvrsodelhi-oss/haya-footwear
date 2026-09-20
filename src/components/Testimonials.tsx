import { Quote } from "lucide-react";
import { Reveal, Tag } from "./ui";
import { cn } from "../utils/cn";

const NOTES = [
  {
    quote: "Comfort should read through proportion first: less bulk, smoother transitions, fewer visual interruptions.",
    name: "Comfort brief",
    role: "Long-day movement direction",
    initials: "01",
  },
  {
    quote: "The strongest visual signature is restraint — a familiar sneaker language, pushed toward a quieter silhouette.",
    name: "Silhouette brief",
    role: "Product shape direction",
    initials: "02",
  },
  {
    quote: "Texture does the branding. The knit carries enough detail that the color system can stay deliberately simple.",
    name: "Material brief",
    role: "Upper and surface direction",
    initials: "03",
  },
  {
    quote: "Ember works best as an accent, not a flood. The contrast should arrive in the eyelet, mark, or edge — then disappear.",
    name: "Color brief",
    role: "Bone / Ember / Onyx",
    initials: "04",
  },
  {
    quote: "Every interaction should feel slightly physical: lift, drift, soften, then settle back into the grid.",
    name: "Motion brief",
    role: "Interaction direction",
    initials: "05",
  },
  {
    quote: "A premium landing page can sell the feeling before it sells the feature list. Let the imagery do some of the work.",
    name: "Brand brief",
    role: "Editorial product story",
    initials: "06",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="reviews-title">
      <div aria-hidden className="pointer-events-none absolute left-[-12%] top-[30%] size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(254,78,23,0.07),transparent_65%)] blur-3xl" />

      <div className="wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Tag>Design notes</Tag>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="reviews-title"
                className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-950"
              >
                Built around the
                <br />
                <em className="font-accent font-normal italic text-ember-500">feeling.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="max-w-sm rounded-2xl border border-ink-900/[0.08] bg-bone-50/80 px-5 py-4">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-500">Concept direction</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">
                The cards below replace customer testimonials with the design principles guiding the concept.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {NOTES.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.09} className="break-inside-avoid">
              <figure
                className={cn(
                  "group mb-5 rounded-3xl border border-ink-900/[0.08] bg-bone-50/80 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink-950/[0.08]",
                  i === 1 && "border-ember-500/25 bg-gradient-to-b from-ember-500/[0.06] to-bone-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-ink-900/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">
                    Note {t.initials}
                  </span>
                  <Quote className="size-5 text-ink-300 transition-colors duration-300 group-hover:text-ember-500" aria-hidden />
                </div>
                <blockquote className="mt-5 text-[15.5px] leading-relaxed text-ink-800">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-10 place-items-center rounded-full text-[11px] font-bold tracking-wide",
                      i % 4 === 0 ? "bg-ember-500 text-white" : "bg-ink-950 text-bone-100"
                    )}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-semibold text-ink-950">{t.name}</span>
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
