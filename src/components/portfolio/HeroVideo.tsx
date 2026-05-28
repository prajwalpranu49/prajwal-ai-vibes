import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      <div className="absolute inset-0 bg-mesh opacity-60" />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <nav className="hidden flex-1 justify-center gap-8 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
          <a href="#top" className="hover:text-foreground transition-colors">Home</a>
          <a href="#about" className="hover:text-foreground transition-colors">About Us</a>
          <a href="#work" className="hover:text-foreground transition-colors">Products / Services</a>
          <a href="#blogs" className="hover:text-foreground transition-colors">Blogs</a>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
        </nav>
        <div className="md:hidden" />
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="rounded-full border border-border bg-background/40 p-2 backdrop-blur-md transition hover:bg-background/70"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      {/* hero copy */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
        <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
          AI Creator · Editor · Visual Director
        </div>
        <h1 className="font-display mt-4 text-5xl font-semibold leading-[0.95] md:text-8xl lg:text-[10rem]">
          Prajwal <span className="text-gradient">Pranu</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          Crafting AI-driven stories, viral edits and cinematic visuals
          that move at the speed of culture.
        </p>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono-accent text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Scroll
      </div>
    </section>
  );
}