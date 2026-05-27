import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Email", href: "mailto:hello@prajwalpranu.com" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
          Let's build
        </div>
        <h2 className="font-display mt-4 text-5xl font-semibold leading-[0.95] md:text-8xl">
          Have an idea? <br />
          <span className="text-gradient">Let's make it move.</span>
        </h2>

        <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
          <div className="space-y-2">
            <div className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Reach out
            </div>
            <a
              href="mailto:hello@prajwalpranu.com"
              className="font-display block text-2xl hover:text-gradient md:text-4xl"
            >
              hello@prajwalpranu.com
            </a>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition hover:border-primary/60"
                >
                  <span className="font-mono-accent text-xs uppercase tracking-[0.25em]">
                    {l.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex items-center justify-between font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>© 2026 Prajwal Pranu</span>
          <span>Built with care</span>
        </div>
      </div>
    </footer>
  );
}