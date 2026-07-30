# Jack — 3D Creator

A single-page portfolio landing built with React 18, TypeScript, Tailwind CSS, and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle
```

## Structure

```
index.html                    Kanit font link, page title
src/index.css                 reset, #0C0C0C base, .hero-heading gradient
src/App.tsx                   section order
src/components/
  FadeIn.tsx                  whileInView wrapper (motion.create, once: true)
  Magnet.tsx                  cursor-following translate3d effect
  AnimatedText.tsx            per-character scroll-driven opacity reveal
  ContactButton.tsx           gradient pill CTA
  LiveProjectButton.tsx       ghost outline pill
src/sections/
  HeroSection.tsx             navbar, 17.5vw gradient headline, magnetic portrait
  MarqueeSection.tsx          two scroll-parallax image rows (opposing directions)
  AboutSection.tsx            corner 3D props + scroll-revealed paragraph
  ServicesSection.tsx         white panel, five numbered services
  ProjectsSection.tsx         sticky card stack that scales down on scroll
src/data/projects.ts          project copy and image URLs
```

## Notes on the motion

- **Marquee** reads `window.scrollY` against the section's `offsetTop`, scaled by `0.3`. Row one travels `+(offset - 200)px`, row two the inverse. Listener is passive; rows use `will-change: transform`. Each row's tiles are tripled so the strip never runs dry.
- **Card stack** uses one `useScroll` on the card container with `['start start', 'end end']`, then one `useTransform` per card mapping `[index/total, 1]` to `[1, 1 - (total - 1 - index) * 0.03]`. Cards are `sticky` inside `h-[85vh]` wrappers and offset by `index * 28px`, so each one shrinks as the next slides over it.
- **Reduced motion** is respected globally via a `prefers-reduced-motion` block in `index.css`, and focus rings are visible on all interactive elements.

## Two things you may want to change

- `lucide-react` is installed per the spec but nothing currently imports an icon — drop it or put an arrow in the Live Project button.
- Both CTAs are `<button>` elements with an optional `onClick`, not links, since there's no contact form or case-study route yet. Wire them up when those exist.
