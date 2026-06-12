import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Instagram, Youtube, Twitter, AtSign, Sparkles, Wand2, Film, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Prajwal Pranu — Hire an AI Creator & Video Editor" },
      { name: "description", content: "Hire Prajwal Pranu for AI-driven storytelling, viral short-form edits and cinematic visual direction. Get in touch for collaborations." },
      { property: "og:title", content: "Contact Prajwal Pranu — Hire an AI Creator & Video Editor" },
      { property: "og:description", content: "Hire Prajwal Pranu for AI storytelling, viral edits and cinematic visuals." },
      { property: "og:url", content: "https://prajwal-ai-vibes.lovable.app/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://prajwal-ai-vibes.lovable.app/contact" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Prajwal Pranu",
          url: "https://prajwal-ai-vibes.lovable.app/contact",
          mainEntity: {
            "@type": "Person",
            name: "Prajwal Pranu",
            email: "prajwalpranu49@yahoo.com",
            jobTitle: "AI Creator, Viral Video Editor & Cinematic Visual Director",
            sameAs: [
              "https://www.instagram.com/prajwal_ai_vibes/",
              "https://www.youtube.com/@prajwalpranu",
              "https://x.com/prajwal_ai_vibe",
              "https://www.threads.com/@prajwal_ai_vibes",
            ],
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/#about" },
  { label: "Products / Services", to: "/#work" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Us", to: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/prajwal_ai_vibes/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@prajwalpranu", icon: Youtube },
  { label: "X / Twitter", href: "https://x.com/prajwal_ai_vibe", icon: Twitter },
  { label: "Threads", href: "https://www.threads.com/@prajwal_ai_vibes", icon: AtSign },
];

const pillars = [
  {
    icon: Sparkles,
    tag: "AI Creator",
    title: "Building the Future with Generative AI",
    body: "I architect prompt systems and AI-native workflows that transform raw ideas into stunning visual artifacts. From text-to-image pipelines to video generation workflows, every project pushes the boundary of what machines can dream.",
  },
  {
    icon: Wand2,
    tag: "Viral Edits & Creative Visuals",
    title: "Engineered for the Feed",
    body: "Short-form content designed to stop the scroll. Beat-mapped pacing, kinetic typography, and bold graphics that turn casual viewers into engaged communities. Every edit is data-informed and culture-driven.",
  },
  {
    icon: Film,
    tag: "Cinematic Vibes",
    title: "Atmosphere Over Noise",
    body: "Color science, composition, and motion that feel like film. I craft visuals where every frame earns its place — moody palettes, dramatic lighting, and textures that evoke emotion before a single word is read.",
  },
];

function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Header */}
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

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
            Get in touch
          </div>
          <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] md:text-7xl lg:text-8xl">
            AI Creator. <br />
            <span className="text-gradient">Viral Edits & Creative Visuals.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            🖤 Cinematic vibes only. I collaborate with brands, artists, and innovators who believe visuals should move people — not just pixels.
          </p>
        </div>
      </section>

      {/* Detail Pillars */}
      <section className="relative px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
              What drives the work
            </div>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Three crafts. <span className="text-gradient">One vision.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, tag, title, body }) => (
              <article
                key={tag}
                className="glow-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                <div className="mt-8 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {tag}
                </div>
                <h3 className="font-display mt-3 text-xl font-semibold leading-snug">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Split */}
      <section className="relative px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
                Start a conversation
              </div>
              <h2 className="font-display mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Let's create <span className="text-gradient">something iconic.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Whether it's a brand film, a viral campaign, or an AI-driven visual experiment — I'm always open to collaborations that challenge the ordinary.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Email
                    </div>
                    <a
                      href="mailto:prajwalpranu49@yahoo.com"
                      className="font-display mt-1 block text-lg hover:text-gradient"
                    >
                      prajwalpranu49@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Based in
                    </div>
                    <div className="font-display mt-1 text-lg">Creating worldwide</div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-12">
                <div className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Follow the work
                </div>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:border-primary/60 hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <Send className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-semibold">Message sent</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      className="mt-2 flex h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      className="mt-2 flex h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      className="mt-2 flex w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-mono-accent text-sm uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/90"
                  >
                    Send message
                    <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
