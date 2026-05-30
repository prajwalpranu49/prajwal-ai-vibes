import { createFileRoute } from "@tanstack/react-router";
import { HeroVideo } from "@/components/portfolio/HeroVideo";
import { Marquee } from "@/components/portfolio/Marquee";
import { Pillars } from "@/components/portfolio/Pillars";
import { WorkGrid } from "@/components/portfolio/WorkGrid";
import { Footer } from "@/components/portfolio/Footer";
import { AIChat } from "@/components/portfolio/AIChat";
import chibiWave from "@/assets/chibi-wave.png";
import chibiLaptop from "@/assets/chibi-laptop.png";
import chibiCool from "@/assets/chibi-cool.png";

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
      <div className="relative">
        <Pillars />
        <img
          src={chibiCool}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-4 top-8 hidden w-28 select-none drop-shadow-2xl md:block lg:w-36"
          style={{ animation: "chibi-float 6s ease-in-out infinite" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-20 top-32 hidden text-2xl md:block"
          style={{ animation: "chibi-float 5s ease-in-out infinite" }}
        >
          ✨
        </span>
      </div>
      <div className="relative">
        <WorkGrid />
        <img
          src={chibiLaptop}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-6 top-16 hidden w-32 -rotate-6 select-none drop-shadow-2xl md:block lg:w-44"
          style={{ animation: "chibi-float 7s ease-in-out infinite" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-12 top-40 hidden text-xl md:block"
          style={{ animation: "chibi-float 4s ease-in-out infinite" }}
        >
          🔥
        </span>
      </div>
      <div className="relative">
        <Footer />
        <img
          src={chibiWave}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-6 top-10 hidden w-28 rotate-3 select-none drop-shadow-2xl md:block lg:w-36"
          style={{ animation: "chibi-float 5.5s ease-in-out infinite" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-16 top-24 hidden text-2xl md:block"
          style={{ animation: "chibi-float 6s ease-in-out infinite" }}
        >
          💜
        </span>
      </div>
      <AIChat />
      <style>{`
        @keyframes chibi-float {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--tw-rotate, 0deg)); }
        }
      `}</style>
    </main>
  );
}
