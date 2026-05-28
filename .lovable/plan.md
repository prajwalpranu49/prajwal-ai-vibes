## Changes

### 1. Top nav (HeroVideo.tsx)
- Remove the "Prajwal // Pranu" wordmark on the left.
- Replace nav with: Home, About Us, Products / Services, Blogs, Contact Us.
- Links scroll to existing sections where possible: Home → `#top`, About Us → `#about`, Products / Services → `#work`, Contact Us → `#contact`. Blogs → `#blogs` (placeholder anchor; no new page in this pass).
- Keep the mute toggle on the right; move nav to center for balance.
- On mobile (small viewport), collapse nav into a simple hamburger menu (since the viewport is 458px wide).

### 2. Work grid imagery (WorkGrid.tsx + new assets)
- Generate 4 cinematic AI-styled images, one per work card, saved in `src/assets/`:
  - `work-synthetic-dreams.jpg` — surreal AI dreamscape, violet/cyan glow
  - `work-neon-hours.jpg` — neon-lit night city, magenta/teal
  - `work-prompt-diaries.jpg` — abstract typographic / terminal-inspired visual
  - `work-after-midnight.jpg` — moody cinematic portrait with motion blur
- Import each in `WorkGrid.tsx`, render as a background `<img>` behind the existing gradient overlay so text stays legible.
- Keep current card layout, hover glow, and overlay gradient.

### 3. Footer (Footer.tsx)
- Remove the "Email" item from the social links grid under "Reach out".
- Keep Instagram, YouTube, X / Twitter (3 items). Adjust grid to `grid-cols-3` on desktop, `grid-cols-1` on mobile.
- Keep the large `hello@prajwalpranu.com` mailto headline intact.

No other sections, routes, or backend logic change.
