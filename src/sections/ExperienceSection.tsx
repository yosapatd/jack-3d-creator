import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../components/FadeIn';
import { ROLES } from '../data/experience';
import type { Role } from '../data/experience';

const RADIUS = 'rounded-[32px] sm:rounded-[40px] md:rounded-[50px]';

type RoleCardProps = {
  role: Role;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

function RoleCard({ role, index, progress, range, targetScale }: RoleCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-center justify-center md:top-32">
      <motion.article
        className={`relative w-full border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 ${RADIUS}`}
        style={{ scale, top: `${index * 28}px`, transformOrigin: 'top' }}
      >
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-[#D7E2EA]/20 pb-6 md:flex-row md:items-start md:justify-between md:gap-10 md:pb-8">
          <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading shrink-0 font-black leading-[0.8]"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 100px)' }}
            >
              {role.number}
            </span>

            <div className="flex flex-col gap-1.5">
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.9rem)' }}
              >
                {role.title}
              </h3>
              <p
                className="font-light leading-snug text-[#D7E2EA]"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
              >
                {role.company}
                <span className="opacity-50"> · {role.employment}</span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-1.5 md:items-end md:text-right">
            <span
              className="font-medium uppercase tracking-widest text-[#D7E2EA]"
              style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
            >
              {role.period}
            </span>
            <span
              className="font-light uppercase tracking-wider text-[#D7E2EA] opacity-50"
              style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}
            >
              {role.duration}
            </span>
          </div>
        </div>

        {/* Context tags */}
        <div className="flex flex-wrap gap-2 pt-6 md:pt-8">
          <span
            className="rounded-full border border-[#D7E2EA]/40 px-4 py-1.5 font-light uppercase tracking-wider text-[#D7E2EA]"
            style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}
          >
            {role.industry}
          </span>
          {role.focus ? (
            <span
              className="rounded-full border border-[#D7E2EA]/20 px-4 py-1.5 font-light uppercase tracking-wider text-[#D7E2EA] opacity-60"
              style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}
            >
              {role.focus}
            </span>
          ) : null}
        </div>

        {/* Responsibilities */}
        <ul className="flex list-none flex-col gap-3 pt-6 md:gap-4 md:pt-8">
          {role.points.map((point) => (
            <li
              key={point}
              className="flex gap-3 font-light leading-relaxed text-[#D7E2EA] md:gap-4"
              style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', opacity: 0.75 }}
            >
              <span aria-hidden="true" className="select-none opacity-40">
                —
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = ROLES.length;

  return (
    <section
      id="experience"
      className="relative z-10 -mt-10 w-full rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-5xl">
        {ROLES.map((role, index) => (
          <RoleCard
            key={role.number}
            role={role}
            index={index}
            progress={scrollYProgress}
            range={[index * (1 / total), 1]}
            targetScale={1 - (total - 1 - index) * 0.03}
          />
        ))}
      </div>
    </section>
  );
}
