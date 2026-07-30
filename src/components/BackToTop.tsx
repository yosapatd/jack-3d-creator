import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

const R = 21;
const CIRC = 2 * Math.PI * R;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setVisible(v > window.innerHeight * 0.9);
  });

  // Ring fills as the page is consumed — same idea as the hero scrub, so the
  // control reads as part of the scroll language rather than a bolted-on widget.
  const dashOffset = useTransform(scrollYProgress, [0, 1], [CIRC, 0]);

  const toTop = () => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-[#D7E2EA]/25 bg-[#0C0C0C]/80 text-[#D7E2EA] backdrop-blur transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
        >
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r={R}
              stroke="#D7E2EA"
              strokeOpacity="0.15"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={R}
              stroke="url(#backToTopRing)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              style={{ strokeDashoffset: dashOffset }}
            />
            <defs>
              <linearGradient
                id="backToTopRing"
                x1="0"
                y1="0"
                x2="0"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#646973" />
                <stop offset="1" stopColor="#BBCCD7" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp
            className="relative h-4 w-4 sm:h-[18px] sm:w-[18px]"
            strokeWidth={2}
            aria-hidden="true"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
