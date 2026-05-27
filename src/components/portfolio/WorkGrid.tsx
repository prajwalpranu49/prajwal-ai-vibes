const works = [
  { tag: "AI · Short Film", title: "Synthetic Dreams", meta: "2026 · Director / Edit" },
  { tag: "Reel · Brand", title: "Neon Hours", meta: "2026 · Edit / Color" },
  { tag: "AI · Series", title: "Prompt Diaries", meta: "2025 · Creator" },
  { tag: "Music Video", title: "After Midnight", meta: "2025 · Edit / VFX" },
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
              <div
                className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    i % 2 === 0
                      ? "radial-gradient(at 30% 30%, oklch(0.7 0.22 300 / 60%) 0px, transparent 60%), radial-gradient(at 80% 70%, oklch(0.78 0.18 200 / 50%) 0px, transparent 55%)"
                      : "radial-gradient(at 70% 30%, oklch(0.65 0.25 340 / 55%) 0px, transparent 60%), radial-gradient(at 20% 80%, oklch(0.7 0.22 300 / 50%) 0px, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
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