## Goal
Update the fixed top navigation bar on the home page (HeroVideo.tsx) to a glassmorphism style.

## Changes
1. Remove the solid background colour token (`bg-background/70`) from the fixed nav container.
2. Keep `backdrop-blur-md` for the frosted-glass effect.
3. Set background opacity to ~40% (e.g., `bg-background/40`) so the video behind shows through.
4. Keep the bottom border subtle (`border-border/40`) as a glass edge.
5. Ensure `pointer-events: auto` on the nav bar and all interactive elements inside it (links, mute button) so they remain fully clickable. The overlays behind already have `pointer-events-none`.
6. Ensure the same style applies across all breakpoints (mobile and desktop).

## Files to edit
- `src/components/portfolio/HeroVideo.tsx` — update the fixed nav bar styling class list.

No other files need to change for this request.