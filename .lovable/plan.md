
## Goal
Give you (single admin) a private login to write and publish blog posts with title, cover image, tags, excerpt, and rich text body. Public visitors read them on `/blogs` (existing card grid stays).

## Setup
- Enable **Lovable Cloud** (managed backend) for auth + database + file storage.
- Seed your admin email/password via Cloud → Users after enabling. No public signup.

## Database (migration)
- `app_role` enum (`admin`, `user`) + `user_roles` table + `has_role()` security-definer function (per project rules — roles never on profiles).
- `posts` table: `id`, `slug` (unique), `title`, `excerpt`, `body` (markdown/rich text), `cover_url`, `tags text[]`, `published boolean`, `created_at`, `updated_at`, `author_id`.
- RLS:
  - Public `SELECT` on `posts` where `published = true`.
  - Admin (`has_role(auth.uid(),'admin')`) full `INSERT/UPDATE/DELETE/SELECT`.
- Storage bucket `blog-images` (public read). Policies: admin-only upload/delete.
- Grants: `SELECT` to `anon` + `authenticated`; full CRUD to `authenticated`; `ALL` to `service_role`.

## Routes
- `/auth` — email + password sign-in only (no signup UI). Redirects to `/admin` when signed in.
- `/_authenticated/admin` — post list + "New post" button (integration-managed auth gate).
- `/_authenticated/admin/new` and `/_authenticated/admin/$id` — composer form: title, slug (auto from title), tags input, excerpt, cover image upload (to `blog-images`), body textarea (markdown), Save draft / Publish / Delete.
- `/blogs` — replace hardcoded posts with server-fn fetch of published posts (loader + `ensureQueryData`).
- `/blogs/$slug` — new public post detail page with rendered markdown, cover, tags, SEO `head()` + `BlogPosting` JSON-LD.

## Server functions (`src/lib/posts.functions.ts`)
- `listPublishedPosts` — public, publishable-key client.
- `getPostBySlug` — public.
- `listAllPosts`, `createPost`, `updatePost`, `deletePost`, `uploadCoverImage` — `requireSupabaseAuth` + `has_role admin` check inside handler.

## UI
- Reuse existing dark/gradient design tokens; composer uses shadcn `Input`, `Textarea`, `Button`, `Badge` for tags.
- Markdown rendering via `react-markdown` + `remark-gfm` on the public post page.
- Header "Admin" link visible only when signed-in admin.

## Out of scope
- WYSIWYG editor (markdown textarea only), comments, drafts scheduling, multi-author, image cropping.

## Files touched
- New: migration, `src/lib/posts.functions.ts`, `src/routes/auth.tsx`, `src/routes/_authenticated/route.tsx` (if not present), `src/routes/_authenticated/admin.tsx`, `src/routes/_authenticated/admin.new.tsx`, `src/routes/_authenticated/admin.$id.tsx`, `src/routes/blogs.$slug.tsx`.
- Edited: `src/routes/blogs.tsx` (data-driven), header nav to show Admin link when signed in.
