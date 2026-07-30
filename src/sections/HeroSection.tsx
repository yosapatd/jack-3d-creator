import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ScrollSequence from '../components/ScrollSequence';

const NAV_LINKS = ['About', 'Services', 'Experience', 'Contact'];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // 0 when the hero top meets the viewport top, 1 when its bottom does — so the
  // whole effect plays across exactly one viewport of scrolling.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: three layers travelling at different rates give the depth.
  // Portrait drifts down (lags the page), heading lifts (outruns it).
  // Every range collapses to a no-op when the visitor asked for less motion;
  // ScrollSequence separately declines to download the frames in that case.
  const still = useReducedMotion();
  const portraitY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 160]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1, 1.12]);
  const portraitOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    still ? [1, 1, 1] : [1, 1, 0]
  );
  const headingY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -70]);
  const barY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
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
          Centring lives on this plain wrapper, NOT on a motion element. Framer
          Motion writes `transform` into the inline style, which beats Tailwind's
          -translate-x-1/2 utility class, so a motion element cannot be centred
          that way. Flex centring uses no transform, so the two never collide.
          Entry fade, scroll parallax and the magnet each own a separate element
          for the same reason — one transform per element. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <FadeIn
          delay={0.6}
          y={30}
          className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
        >
          <motion.div
            style={{
              y: portraitY,
              scale: portraitScale,
              opacity: portraitOpacity,
            }}
          >
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              wrapperClassName="w-full"
              innerClassName="w-full"
            >
              <ScrollSequence
                progress={scrollYProgress}
                alt="Animated 3D portrait of Yosapat"
                className="select-none"
              />
            </Magnet>
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
          Experienced SAP Consultant with comprehensive expertise in MM, WM, SD,
          ABAP, and Basis modules.
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </motion.div>
    </section>
  );
}
