import { Coffee } from "lucide-react";

export function KoFiButton() {
  return (
    <a
      href="https://ko-fi.com/W4A11ZVCN3"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Support me on Ko-fi"
      className="group fixed bottom-6 left-6 z-[100] inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#a885ff]/40 ring-1 ring-white/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#a885ff]/60 md:px-5 md:py-3"
      style={{
        backgroundColor: "#a885ff",
        animation: "kofi-float 3s ease-in-out infinite",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-2 ring-[#a885ff] transition-opacity group-hover:opacity-100"
        style={{ animation: "kofi-pulse 1.6s ease-out infinite" }}
      />
      <Coffee className="h-4 w-4" strokeWidth={2.5} />
      <span className="font-mono-accent text-[11px] uppercase tracking-[0.2em] md:text-xs">
        Support on Ko-fi
      </span>
      <style>{`
        @keyframes kofi-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes kofi-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </a>
  );
}