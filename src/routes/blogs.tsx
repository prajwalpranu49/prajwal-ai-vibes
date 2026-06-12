import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Volume2 } from "lucide-react";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blog — AI Workflows, Viral Edits & Cinematic Visuals | Prajwal Pranu" },
      { name: "description", content: "Notes from the edit bay — AI video workflows, prompt-to-frame pipelines, viral edit breakdowns and color science for cinematic AI visuals." },
      { property: "og:title", content: "Blog — AI Workflows, Viral Edits & Cinematic Visuals" },
      { property: "og:description", content: "AI video workflows, viral edit breakdowns and cinematic visual experiments by Prajwal Pranu." },
      { property: "og:url", content: "https://prajwal-ai-vibes.lovable.app/blogs" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://prajwal-ai-vibes.lovable.app/blogs" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Prajwal Pranu — Field Notes",
          url: "https://prajwal-ai-vibes.lovable.app/blogs",
          description: "AI video workflows, viral edits and cinematic visual experiments.",
          author: { "@type": "Person", name: "Prajwal Pranu" },
        }),
      },
    ],
  }),
  component: BlogsPage,
});

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/#about" },
  { label: "Products / Services", to: "/#work" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Us", to: "/contact" },
];

const posts = [
  {
    tag: "AI Workflow",
    date: "Coming soon",
    title: "Prompt-to-Frame: My Generative Video Pipeline",
    excerpt: "How I chain text, image, and video models to turn a single idea into a finished cinematic edit.",
  },
  {
    tag: "Viral Edits",
    date: "Coming soon",
    title: "Anatomy of a Scroll-Stopper",
    excerpt: "Beat-mapping, kinetic type, and the first 1.5 seconds — what really hooks an audience on the feed.",
  },
  {
    tag: "Cinematic Vibes",
    date: "Coming soon",
    title: "Color Science for the AI Era",
    excerpt: "Building a consistent visual identity across generative tools that were never supposed to agree.",
  },
];

function BlogsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link
            to="/"
            className="font-display text-lg font-semibold tracking-tight transition-colors hover:text-accent"
          >
            Prajwal <span className="text-gradient">Pranu</span>
          </Link>
          <nav className="hidden gap-8 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            className="flex items-center gap-2 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <section className="relative px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
            Field notes
          </div>
          <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] md:text-7xl lg:text-8xl">
            Notes from the <span className="text-gradient">edit bay.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            Process, prompts, and the small obsessions behind every frame. Long-form posts dropping soon.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="glow-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-center justify-between font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="text-accent">{p.tag}</span>
                <span>{p.date}</span>
              </div>
              <h2 className="font-display mt-6 text-2xl font-semibold leading-snug">{p.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <div className="mt-8 inline-flex items-center gap-2 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                <Volume2 className="h-3 w-3" />
                Draft in progress
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            © 2026 Prajwal Pranu
          </span>
          <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Built with care
          </span>
        </div>
      </footer>
    </main>
  );
}