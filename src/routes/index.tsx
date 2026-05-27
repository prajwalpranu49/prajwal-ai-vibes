import { createFileRoute } from "@tanstack/react-router";
import { HeroVideo } from "@/components/portfolio/HeroVideo";
import { Marquee } from "@/components/portfolio/Marquee";
import { Pillars } from "@/components/portfolio/Pillars";
import { WorkGrid } from "@/components/portfolio/WorkGrid";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prajwal Pranu — AI Creator, Viral Edits & Cinematic Visuals" },
      { name: "description", content: "Portfolio of Prajwal Pranu: AI creator, viral video editor, and cinematic visual director crafting next-gen stories." },
      { property: "og:title", content: "Prajwal Pranu — AI Creator & Visual Director" },
      { property: "og:description", content: "AI-driven storytelling, viral edits, and cinematic visuals." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <HeroVideo />
      <Marquee />
      <Pillars />
      <WorkGrid />
      <Footer />
    </main>
  );
}
