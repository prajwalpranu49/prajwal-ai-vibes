import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
    links: [{ rel: "canonical", href: "https://prajwal-ai-vibes.lovable.app/blogs" }],
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

function BlogsPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, cover_url, tags, published_at, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight transition-colors hover:text-accent">
            Prajwal <span className="text-gradient">Pranu</span>
          </Link>
          <nav className="hidden gap-8 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className="flex items-center gap-2 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground md:hidden">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <section className="relative px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">Field notes</div>
          <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] md:text-7xl lg:text-8xl">
            Notes from the <span className="text-gradient">edit bay.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            Process, prompts, and the small obsessions behind every frame.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <p className="font-mono-accent text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading…</p>
          ) : !posts || posts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to="/blogs/$slug"
                  params={{ slug: p.slug }}
                  className="glow-hover group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                >
                  {p.cover_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={p.cover_url}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      <span className="text-accent">{p.tags?.[0] ?? "Post"}</span>
                      <span>
                        {new Date(p.published_at ?? p.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="font-display mt-4 text-2xl font-semibold leading-snug">{p.title}</h2>
                    {p.excerpt && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">© 2026 Prajwal Pranu</span>
          <Link to="/auth" className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
            Admin
          </Link>
        </div>
      </footer>
    </main>
  );
}