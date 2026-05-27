## Portfolio for Prajwal Pranu

A single-page, cinematic portfolio with a bold AI/tech aesthetic — think dark canvas, gradient mesh accents, mono+display type, restrained motion. The uploaded video plays at the very top as the hero.

### Sections (single page, smooth scroll)

1. **Hero** — Full-bleed autoplaying (muted, loop, playsInline) video of you working on the AI Creator. Overlaid: name "Prajwal Pranu", role tagline, scroll cue. Click-to-unmute control in the corner.
2. **About** — Short intro paragraph + key stats/marquee of tools (placeholder copy you can edit later).
3. **Three pillars** — Equal-weight cards for:
   - AI Creator
   - Viral Edits & Creative Visuals
   - Cinematic Vibes
4. **Selected Work** — Grid placeholder for future projects/reels.
5. **Contact / Footer** — Email + social links (placeholders).

### Design direction

- Dark theme, near-black background with subtle gradient mesh / noise texture.
- Display font: a modern geometric (e.g. Space Grotesk) for headings; Inter for body; JetBrains Mono accents for labels.
- Accent: electric violet → cyan gradient on key elements.
- Generous spacing, sharp corners on cards, soft glow on hover.
- Motion: fade/slide-in on scroll, subtle parallax on hero, no heavy effects.

### Technical details

- Copy `user-uploads://Prajwal_works_on_Al_Creator_202605272138.mp4` into `public/hero.mp4` so it streams directly.
- Replace placeholder content in `src/routes/index.tsx` with the new portfolio composition.
- Define color tokens (dark palette, gradient vars, glow shadow) in `src/styles.css` using oklch.
- Build small components under `src/components/portfolio/` (HeroVideo, Pillars, WorkGrid, Footer).
- Update route head() with proper SEO title/description ("Prajwal Pranu — AI Creator, Viral Edits, Cinematic Visuals").
- Use semantic tokens only, no hardcoded colors in components.

### Not included (ask later if needed)

- Real project entries / images (placeholders shown).
- CMS or backend.
- Multi-page routing (single page is enough for a portfolio of this scope).
