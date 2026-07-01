import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, LogOut, Plus, Pencil, Trash2, Upload, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_url: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      setAuthChecked(true);
    })();
  }, [navigate]);

  const { data: posts, refetch } = useQuery({
    queryKey: ["admin-posts"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    qc.invalidateQueries({ queryKey: ["posts", "published"] });
  };

  if (!authChecked) return <div className="p-12 text-muted-foreground">Loading…</div>;
  if (!isAdmin)
    return (
      <div className="mx-auto max-w-md p-12 text-center">
        <p className="text-muted-foreground">You are signed in but not an admin.</p>
        <button onClick={signOut} className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">Sign out</button>
      </div>
    );

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" className="flex items-center gap-2 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Site
          </Link>
          <div className="font-display text-lg font-semibold">Admin</div>
          <button onClick={signOut} className="flex items-center gap-2 font-mono-accent text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-32 pb-24 md:px-12">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-semibold">Your posts</h1>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> New post
          </button>
        </div>

        <div className="mt-10 space-y-3">
          {(posts ?? []).length === 0 && (
            <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No posts yet — click “New post” to write your first one.
            </p>
          )}
          {(posts ?? []).map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              {p.cover_url ? (
                <img src={p.cover_url} alt="" className="h-16 w-24 rounded object-cover" />
              ) : (
                <div className="h-16 w-24 rounded bg-muted" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium">{p.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono-accent text-[9px] uppercase tracking-widest ${
                      p.published ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">/{p.slug}</p>
              </div>
              <button onClick={() => setEditing(p)} className="rounded p-2 hover:bg-muted" aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(p.id)} className="rounded p-2 text-destructive hover:bg-muted" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {(creating || editing) && (
        <PostEditor
          post={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            refetch();
            qc.invalidateQueries({ queryKey: ["posts", "published"] });
          }}
        />
      )}
    </main>
  );
}

function PostEditor({
  post,
  onClose,
  onSaved,
}: {
  post: Post | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [coverUrl, setCoverUrl] = useState(post?.cover_url ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("blog-images").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data: signed, error: sErr } = await supabase.storage
        .from("blog-images")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10); // 10 years
      if (sErr) throw sErr;
      setCoverUrl(signed.signedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const { data: sess } = await supabase.auth.getUser();
      const payload = {
        title,
        slug: slug || slugify(title),
        excerpt: excerpt || null,
        body,
        cover_url: coverUrl || null,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published,
        published_at: published ? new Date().toISOString() : null,
        author_id: sess.user?.id ?? null,
      };
      if (post) {
        const { error } = await supabase.from("posts").update(payload).eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("posts").insert(payload);
        if (error) throw error;
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm p-4 md:p-8">
      <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 rounded p-2 hover:bg-muted" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <h2 className="font-display text-2xl font-semibold">{post ? "Edit post" : "New post"}</h2>

        <div className="mt-6 space-y-4">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!post && !slug) setSlug(slugify(e.target.value));
              }}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent"
            />
          </Field>
          <Field label="Slug (URL)">
            <input
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-accent"
            />
          </Field>
          <Field label="Cover image">
            <div className="flex flex-wrap items-center gap-3">
              {coverUrl && <img src={coverUrl} alt="" className="h-20 w-32 rounded object-cover" />}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-muted">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading…" : coverUrl ? "Replace" : "Upload image"}
                <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
              </label>
              {coverUrl && (
                <button onClick={() => setCoverUrl("")} className="text-sm text-muted-foreground hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
          </Field>
          <Field label="Excerpt">
            <textarea
              value={excerpt ?? ""}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent"
            />
          </Field>
          <Field label="Tags (comma separated)">
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent"
            />
          </Field>
          <Field label="Body (Markdown supported)">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={14}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-accent"
            />
          </Field>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm">Publish (make visible on /blogs)</span>
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted">
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving || !title.trim()}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? "Saving…" : post ? "Save changes" : "Create post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}