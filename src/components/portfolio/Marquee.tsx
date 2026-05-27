const tools = [
  "Midjourney", "Runway", "Sora", "Premiere Pro", "After Effects",
  "DaVinci Resolve", "ChatGPT", "ElevenLabs", "Stable Diffusion", "CapCut",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/30 py-6">
      <div className="flex animate-[marquee_30s_linear_infinite] gap-12 whitespace-nowrap font-mono-accent text-sm uppercase tracking-[0.25em] text-muted-foreground">
        {[...tools, ...tools, ...tools].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}