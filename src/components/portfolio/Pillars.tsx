import { Sparkles, Wand2, Film } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    tag: "01 / AI 🤖",
    title: "AI Creator",
    body: "Building with generative models — prompt systems, agents, and AI-native workflows that turn ideas into shipped artifacts. ✨",
  },
  {
    icon: Wand2,
    tag: "02 / Edit 🎞️",
    title: "Viral Edits & Creative Visuals",
    body: "Short-form cuts engineered for the feed. Beat-mapped pacing, kinetic type and graphics designed to stop the scroll. 🔥",
  },
  {
    icon: Film,
    tag: "03 / Cinema 🎬",
    title: "Cinematic Vibes",
    body: "Color, composition and motion that feel like film. Atmosphere over noise — every frame earning its place. 🌌",
  },
];

export function Pillars() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
            What I do 🤖
          </div>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            Three crafts. <span className="text-gradient">One signal. ⚡</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, tag, title, body }) => (
            <article
              key={title}
              className="glow-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <div className="mt-8 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {tag}
              </div>
              <h3 className="font-display mt-3 text-2xl font-semibold">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}