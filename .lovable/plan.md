## Goal
Make the site discoverable on Google for searches around Prajwal Pranu's name and his crafts (AI creator, viral edits, cinematic visuals).

## Target keyword themes
- **Branded**: "Prajwal Pranu", "Prajwal Pranu portfolio", "Prajwal AI vibes"
- **Craft**: "AI creator portfolio", "AI video creator", "viral video editor", "short-form edit reels", "cinematic AI visuals", "AI filmmaker portfolio"
- **Intent / long-tail**: "hire AI creator for reels", "AI-driven music video editor", "generative AI short film director"
- **Blog**: "AI video workflow", "prompt to video pipeline", "scroll-stopping reel edits", "color grading for AI video"

## Changes

### 1. Per-route metadata (titles < 60 chars, descriptions < 160, with keywords)
- `src/routes/index.tsx` — title: "Prajwal Pranu — AI Creator, Viral Editor & Cinematic Director". Keyword-rich description, og:title/description, og:url, og:type=website, twitter:card=summary_large_image, canonical link.
- `src/routes/blogs.tsx` — title: "Blog — AI Workflows, Viral Edits & Cinematic Visuals | Prajwal Pranu". Matching og + canonical.
- `src/routes/contact.tsx` — title: "Contact Prajwal Pranu — Hire an AI Creator & Video Editor". Matching og + canonical.
- `src/routes/__root.tsx` — keep sitewide defaults; add `og:site_name`, `twitter:site`. Remove canonical from root (leaves own it). Keep AdSense script.

### 2. Structured data (JSON-LD) via route `scripts`
- Root: `WebSite` schema (name, url, potentialAction SearchAction stub).
- Index: `Person` schema for Prajwal Pranu (name, jobTitle, sameAs links to Instagram/YouTube/X/Threads, url).
- Blogs: `Blog` / `CollectionPage` schema.
- Contact: `ContactPage` schema.

### 3. Crawlability
- Add `public/robots.txt` allowing all crawlers, pointing at the sitemap.
- Add `src/routes/sitemap[.]xml.ts` server route listing `/`, `/blogs`, `/contact` with `BASE_URL = https://prajwal-ai-vibes.lovable.app`.

### 4. On-page SEO hygiene (light, non-visual)
- Ensure single H1 per page (home already has the H1; verify blogs/contact).
- Add descriptive `alt` text on the work-grid images (currently use the title — keep, but add a short descriptor like "AI short film still — Synthetic Dreams") for image search.
- Add `aria-hidden` and empty alt where decorative (chibi images already correct).

### 5. Social preview
- Keep existing `og:image` from root for now (already set to a hosted image). Mention to user they can swap for a custom share card later.

## Out of scope (ask later)
- Custom OG share image generation
- Google Search Console verification meta tag (needs user's verification code)
- Backlinks / off-site SEO

## Files touched
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/blogs.tsx`
- `src/routes/contact.tsx`
- `src/routes/sitemap[.]xml.ts` (new)
- `public/robots.txt` (new)
- `src/components/portfolio/WorkGrid.tsx` (alt text only)
