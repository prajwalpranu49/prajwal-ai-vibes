## Plan

### 1. Sticky, clickable nav across all devices (HeroVideo.tsx)
- Convert the absolute top bar into a `fixed` top header (z-50, backdrop-blur, subtle bg) so it stays visible on scroll on every viewport.
- Show the nav on mobile too (currently `hidden md:flex`). Use a compact horizontal scroll row on small screens with the same links, keeping the mute button on the right.
- Ensure mute button and all nav links remain clickable (no overlay intercepting clicks, `pointer-events` on overlays set to `none`).
- Replace `#blogs` anchor with a real route link `/blogs`.
- Add matching top padding to hero content so it isn't hidden under the fixed header.

### 2. Contact page nav consistency (contact.tsx)
- Make its header `fixed` (matches home).
- Add "Blogs" → `/blogs` link.
- Update email everywhere: `prajwalpranu49@yahoo.com` (mailto + display text).
- Wire social icons to real URLs (Instagram, YouTube, X/Twitter) and add a Threads icon/link.

### 3. Footer (Footer.tsx)
- Update mailto + display email to `prajwalpranu49@yahoo.com`.
- Replace placeholder `#` hrefs with real URLs for Instagram, YouTube, X/Twitter.
- Add a 4th link: Threads → `https://www.threads.com/@prajwal_ai_vibes`. Grid becomes `grid-cols-2 md:grid-cols-4`.
- Links open in new tab (`target="_blank"`, `rel="noopener noreferrer"`).

### 4. New Blogs route (src/routes/blogs.tsx)
- New page at `/blogs` with the same fixed header + footer styling.
- Hero ("Blogs — Notes from the edit bay") + a placeholder grid of 3 sample post cards (title, date, excerpt, "Coming soon" tag) so the section feels alive until real posts are added.
- Distinct `head()` meta (title/description/og).

### Social URLs used
- Instagram: https://www.instagram.com/prajwal_ai_vibes/
- YouTube: https://www.youtube.com/@prajwalpranu
- X/Twitter: https://x.com/prajwal_ai_vibe
- Threads: https://www.threads.com/@prajwal_ai_vibes

No backend changes.
