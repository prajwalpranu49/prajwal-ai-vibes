## Goal
1. Add a floating Ko-Fi support button fixed to the bottom-left corner on every page of the site.
2. On the home page only, sprinkle isolated chibi character cut-outs (extracted from the uploaded reference) in tasteful spots between sections — not the full grid image, just the character on a transparent background.

## Implementation

### 1. Ko-Fi floating button (global)
- Create `src/components/KoFiButton.tsx`: a fixed `bottom-6 left-6 z-50` anchor link to `https://ko-fi.com/W7W4A11ZVCN3` (slug `W4A11ZVCN3` from the script) styled as a pill button with the brand color `#a885ff`, Ko-Fi cup icon, label "Support me on Ko-fi", subtle pulse/glow highlight on hover, and a gentle floating animation so it "highlights" itself.
  - We render a custom button instead of injecting `Widget_2.js` because that script writes into `document.body` directly, which conflicts with SSR / TanStack Start hydration. The link target and visual style match the official widget.
- Mount it in `src/routes/__root.tsx` inside `RootComponent` (after `<Outlet />`, before devtools) so it appears on every route.

### 2. Chibi character on home page
- Use `imagegen--edit_image` to crop/extract just the chibi character (transparent background PNG) from 2–3 of the six panels in the uploaded reference:
  - the backpack/peace pose → `src/assets/chibi-wave.png`
  - the laptop/hoodie pose → `src/assets/chibi-laptop.png`
  - the sunglasses crossed-arms pose → `src/assets/chibi-cool.png`
- Place them in the home page (`src/routes/index.tsx` and/or its section components) as small, absolutely-positioned decorative images that peek into the layout:
  - One near the Marquee / Pillars boundary (right edge, ~120px wide)
  - One floating beside the WorkGrid heading (left edge)
  - One near the Footer "Let's build" headline (bottom-right corner)
- Each instance uses `pointer-events-none`, a subtle float animation, and `hidden md:block` so mobile stays clean (the viewport is currently 384px).
- No chibi images appear on `/blogs`, `/contact`, or anywhere else.

### Files touched
- new: `src/components/KoFiButton.tsx`
- new: `src/assets/chibi-wave.png`, `chibi-laptop.png`, `chibi-cool.png` (transparent)
- edit: `src/routes/__root.tsx` (mount KoFiButton)
- edit: `src/routes/index.tsx` (place chibi decorations around existing sections)

No backend, routing, or business-logic changes.
