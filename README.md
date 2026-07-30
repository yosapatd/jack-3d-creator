# Yosapat Dangvijitthakarn — SAP MM Consultant

Single-page portfolio built with React 18, TypeScript, Tailwind CSS, and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle
npm run preview  # serve the built output at :4173
```

## Structure

```
index.html                    Kanit font link, title, meta description
src/index.css                 reset, #0C0C0C base, .hero-heading gradient
src/App.tsx                   section order
src/components/
  FadeIn.tsx                  whileInView wrapper (motion.create, once: true)
  Magnet.tsx                  cursor-following translate3d effect
  AnimatedText.tsx            per-character scroll-driven opacity reveal
  ContactButton.tsx           gradient pill, mailto link
src/sections/
  HeroSection.tsx             navbar, gradient headline, magnetic portrait
  SkillsMarquee.tsx           two scroll-parallax skill rows (opposing directions)
  AboutSection.tsx            bio, scroll-revealed paragraph, credential row
  ServicesSection.tsx         white panel, five SAP service lines
  ExperienceSection.tsx       sticky card stack, four real roles
  ContactSection.tsx          email + LinkedIn
src/data/experience.ts        work history content
public/yosapat-portrait.webp  hero portrait (transparent, bottom-faded, 64 KB)
netlify.toml                  build command, publish dir, Node 20
```

## Notes on the motion

- **Skills marquee** reads `window.scrollY` against the section's `offsetTop`, scaled by
  `0.3`. Row one travels `+(offset - 200)px`, row two the inverse. Listener is passive; rows
  use `will-change: transform`. Pills are tripled so the strip never runs dry.
- **Card stack** uses one `useScroll` on the card container with `['start start', 'end end']`,
  then one `useTransform` per card mapping `[index/total, 1]` to
  `[1, 1 - (total - 1 - index) * 0.03]`. Cards are `sticky` inside `h-[85vh]` wrappers and
  offset by `index * 28px`, so each shrinks as the next slides over it.
- **Reduced motion** is respected via a `prefers-reduced-motion` block in `index.css`, and
  focus rings are visible on every interactive element.

## Things to know before editing

- **Headline sizing is measured, not guessed.** `Hi, i'm yosapat` renders 7.40 em wide in
  Kanit 900 with `tracking-tight`. The sizes `10 / 10.7 / 11.4 / 12.5vw` were derived from
  that so the line spans the viewport without clipping. Change the name and you must
  re-derive them — `whitespace-nowrap` means overflow is silently cut, not wrapped.
- **Never centre a Framer Motion element with Tailwind's `-translate-x-1/2`.** Motion writes
  `transform` into the inline style, which beats the utility class, so the element silently
  lands half its own width to the right. The hero portrait is centred by a plain flex wrapper
  (`absolute inset-0 flex items-center justify-center`) with `FadeIn` inside it — positioning
  and animation kept on separate elements.
- **Section ids are the nav targets.** `about`, `services`, `experience`, `contact` in
  `HeroSection`'s `NAV_LINKS` are lowercased to build the anchors. Rename a label and you
  must rename the matching section `id`.
- **No hotlinked images.** Everything is local or text. The only external requests are the
  Google Fonts stylesheet and the LinkedIn outbound link.
- **Contact button** is a `mailto:` to `yosapatd@hotmail.com` with subject `Project inquiry`.
  Pass `subject=""` to drop it, or `email="..."` to point elsewhere.
- Experience content lives entirely in `src/data/experience.ts` — add a role there and the
  stack maths adjusts on its own.
