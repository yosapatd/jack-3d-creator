import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import ScrollSequence from '../components/ScrollSequence';

const NAV_LINKS = ['About', 'Services', 'Experience', 'Contact'];

/**
 * Fraction of the pinned scroll spent playing the character animation. The
 * remainder holds the closing pose for a beat before the pin releases.
 */
const SCRUB_END = 0.9;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  // The section is taller than the viewport and its contents are sticky, so the
  // hero holds still while this progress runs 0 -> 1. That is the whole point:
  // an earlier version tied the range to the hero LEAVING the viewport, so the
  // back half of the animation played off-screen where nobody could see it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Animation completes at SCRUB_END, comfortably before the pin releases.
  const scrubProgress = useTransform(scrollYProgress, [0, SCRUB_END], [0, 1]);

  // Parallax = three layers drifting DOWN at different rates. Foreground moves
  // most, background least; the difference is what reads as depth while the
  // section is held still.
  //
  // Every distance here is bounded by the clip budget of the sticky pane, which
  // has overflow-hidden. The bottom bar's only budget is its own bottom padding
  // (28px on mobile), so it gets 22px and no more — an earlier version pushed it
  // 95px and the strapline and Contact button were sliced clean off. The heading
  // drifts downward, away from the top edge, so it cannot clip either. There is
  // no exit fade: the pin release scrolls the whole pane away as one piece,
  // which is a cleaner hand-off than emptying the hero out in place.
  const portraitY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 70]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1, 1.08]);
  const headingY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 18]);
  const barY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 22]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] w-full"
      style={{ overflowX: 'clip' }}
    >
      {/* Everything visual lives in the sticky pane, so it stays put for the
          first 80vh of scrolling while the animation plays out. */}
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-[#0C0C0C]">
        {/* Navbar */}
        <FadeIn as="nav" delay={0} y={-20} className="relative z-20 w-full">
          <ul className="flex list-none items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Portrait.
            Centring lives on this plain wrapper, NOT on a motion element.
            Framer Motion writes `transform` into the inline style, which beats
            Tailwind's -translate-x-1/2 utility class, so a motion element cannot
            be centred that way. Flex centring uses no transform, so the two
            never collide. Entry fade and scroll parallax still own separate
            elements for the same reason — one transform per element. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <FadeIn
            delay={0.6}
            y={30}
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
          >
            <motion.div style={{ y: portraitY, scale: portraitScale }}>
              <ScrollSequence
                progress={scrubProgress}
                alt="Animated 3D portrait of Yosapat"
                className="select-none"
              />
            </motion.div>
          </FadeIn>
        </div>

        {/* Heading */}
        <div className="relative z-0 overflow-hidden">
          <motion.div style={{ y: headingY }}>
            <FadeIn
              as="h1"
              delay={0.15}
              y={40}
              className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[10vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[10.7vw] md:-mt-5 md:text-[11.4vw] lg:text-[12.5vw]"
            >
              Hi, i&apos;m yosapat
            </FadeIn>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          style={{ y: barY }}
          className="relative z-20 mt-auto flex w-full items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10"
        >
          <FadeIn
            as="p"
            delay={0.35}
            y={20}
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[260px] md:max-w-[320px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Experienced SAP Consultant with comprehensive expertise in MM, WM,
            SD, ABAP, and Basis modules.
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </motion.div>
      </div>
    </section>
  );
}
