import { useEffect, useRef, useState } from 'react';

const ROW_ONE = [
  'SAP MM',
  'SAP S/4HANA',
  'SAP ECC',
  'Fiori / UI5',
  'ABAP',
  'SAP Basis',
  'SAP NetWeaver',
  'Procure to Pay',
  'Plan to Repair',
  'Master Data Configuration',
  'Data Migration',
];

const ROW_TWO = [
  'Requirement Gathering',
  'Functional Specification',
  'Unit Testing',
  'UAT Support',
  'Authorisation & Roles',
  'Batch Job Monitoring',
  'Debugging',
  'System Integration',
  'Replenishment Process',
  'Training & Documentation',
];

/**
 * Tripled so the strip never runs out of pills while it travels. Each row is
 * then parked at -33.3333%, which puts the middle copy at the origin — so there
 * is a full spare copy of slack in BOTH directions and neither row can expose a
 * gap at its leading edge, whichever way it is moving.
 */
const triple = (items: string[]) => [...items, ...items, ...items];

function Pill({ label, dim }: { label: string; dim: boolean }) {
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full border px-6 py-3 font-medium uppercase tracking-wider text-[#D7E2EA] sm:px-8 sm:py-4 ${
        dim ? 'border-[#D7E2EA]/20 opacity-50' : 'border-[#D7E2EA]/50'
      }`}
      style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.35rem)' }}
    >
      {label}
    </span>
  );
}

export default function SkillsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = sectionRef.current;
      if (!node) return;
      setOffset((window.scrollY - node.offsetTop + window.innerHeight) * 0.3);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const travel = offset - 200;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] pb-16 pt-24 sm:pt-32 md:pb-20 md:pt-40"
      style={{ overflowX: 'clip' }}
      aria-label="Core skills"
    >
      <div className="flex flex-col gap-4 md:gap-5">
        <div
          className="flex w-max gap-4 md:gap-5"
          style={{
            transform: `translateX(calc(-33.3333% + ${travel}px))`,
            willChange: 'transform',
          }}
        >
          {triple(ROW_ONE).map((label, i) => (
            <Pill key={`r1-${i}`} label={label} dim={false} />
          ))}
        </div>

        <div
          className="flex w-max gap-4 md:gap-5"
          style={{
            transform: `translateX(calc(-33.3333% + ${-travel}px))`,
            willChange: 'transform',
          }}
        >
          {triple(ROW_TWO).map((label, i) => (
            <Pill key={`r2-${i}`} label={label} dim />
          ))}
        </div>
      </div>
    </section>
  );
}
