import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blogs/$slug")({
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight hover:text-accent">
            Prajwal <span className="text-gradient">Pranu</span>
          </Link>
          <Link to="/blogs" className="flex items-center gap-2 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
        </div>
      </header>

      <article className="relative mx-auto max-w-3xl px-6 pt-32 pb-24 md:px-12 md:pt-40">
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {error && <p className="text-destructive">Post not found.</p>}
        {post && (
          <>
            <div className="font-mono-accent text-xs uppercase tracking-[0.3em] text-accent">
              {post.tags?.join(" · ") || "Post"}
            </div>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-tight md:text-6xl">{post.title}</h1>
            <div className="mt-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {new Date(post.published_at ?? post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {post.cover_url && (
              <img src={post.cover_url} alt={post.title} className="mt-10 w-full rounded-2xl border border-border object-cover" />
            )}
            <div className="prose prose-invert prose-lg mt-10 max-w-none prose-headings:font-display prose-a:text-accent">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </div>
          </>
        )}
      </article>
    </main>
  );
}