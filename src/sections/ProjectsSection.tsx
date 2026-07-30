import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/projects';

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

type ProjectCardProps = {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: ProjectCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-center justify-center md:top-32">
      <motion.article
        className={`relative w-full border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 ${RADIUS}`}
        style={{ scale, top: `${index * 28}px`, transformOrigin: 'top' }}
      >
        {/* Top row */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading shrink-0 font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-1 sm:gap-2">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]"
                style={{
                  fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
                  opacity: 0.6,
                }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton />
        </div>

        {/* Bottom row — image grid */}
        <div className="flex gap-3 sm:gap-4 md:gap-6">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4 md:gap-6">
            <img
              src={project.images.colOneTop}
              alt={`${project.name} — detail one`}
              loading="lazy"
              className={`w-full object-cover ${RADIUS}`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.images.colOneBottom}
              alt={`${project.name} — detail two`}
              loading="lazy"
              className={`w-full object-cover ${RADIUS}`}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>

          <div className="w-[60%]">
            <img
              src={project.images.colTwo}
              alt={`${project.name} — hero render`}
              loading="lazy"
              className={`h-full w-full object-cover ${RADIUS}`}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = PROJECTS.length;

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 w-full rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-6xl">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
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
