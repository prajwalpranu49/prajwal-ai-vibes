## Goal
Revert the fixed top navigation bar to its original transparent look (no background fill, no glass blur, no shadow), while keeping it fixed and fully clickable.

## Change
In `src/components/portfolio/HeroVideo.tsx`, on the fixed nav container:
- Remove `bg-background/40`, `backdrop-blur-xl`, `backdrop-saturate-150`, `shadow-[...]`, and `border-b border-white/10`.
- Keep `fixed inset-x-0 top-0 z-50` and `pointer-events-auto` so it stays pinned and clickable on all devices.
- Leave the mute button and nav links untouched (still clickable, with their existing styles).

No other files change.