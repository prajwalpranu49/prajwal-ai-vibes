import syntheticDreams from "@/assets/work-synthetic-dreams.jpg";
import neonHours from "@/assets/work-neon-hours.jpg";
import promptDiaries from "@/assets/work-prompt-diaries.jpg";
import afterMidnight from "@/assets/work-after-midnight.jpg";

const works = [
  { tag: "AI · Short Film", title: "Synthetic Dreams", meta: "2026 · Director / Edit", image: syntheticDreams, alt: "AI-generated short film still — Synthetic Dreams by Prajwal Pranu" },
  { tag: "Reel · Brand", title: "Neon Hours", meta: "2026 · Edit / Color", image: neonHours, alt: "Cinematic neon-lit brand reel still — Neon Hours edit by Prajwal Pranu" },
  { tag: "AI · Series", title: "Prompt Diaries", meta: "2025 · Creator", image: promptDiaries, alt: "AI video series cover — Prompt Diaries by Prajwal Pranu" },
  { tag: "Music Video", title: "After Midnight", meta: "2025 · Edit / VFX", image: afterMidnight, alt: "Music video still with VFX — After Midnight edit by Prajwal Pranu" },
];

export function WorkGrid() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
              Selected work
            </div>
            <h2 className="font-display mt-4 text-4xl font-semibold md:text-6xl">
              Recent <span className="text-gradient">drops</span>
            </h2>
          </div>
          <div className="hidden font-mono-accent text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
            2025 — 2026
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {works.map((w, i) => (
            <article
              key={w.title}
              className="glow-hover group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={w.image}
                alt={w.alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-card/10" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {w.tag}
                </div>
                <h3 className="font-display mt-2 text-3xl font-semibold">{w.title}</h3>
                <div className="mt-2 font-mono-accent text-xs text-muted-foreground">{w.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}