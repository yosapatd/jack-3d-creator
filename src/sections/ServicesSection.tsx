import FadeIn from '../components/FadeIn';

type Service = {
  number: string;
  name: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'SAP MM Implementation',
    description:
      'Full-cycle Materials Management delivery — Procure to Pay and Plan to Repair process design, master data configuration, and organisation structure setup aligned to how the business actually buys and maintains.',
  },
  {
    number: '02',
    name: 'ECC to S/4HANA Migration',
    description:
      'Re-implementation and upgrade programmes from SAP ECC to S/4HANA, covering fit-gap analysis, configuration, data migration and conversion, and cutover support through to a stable go-live.',
  },
  {
    number: '03',
    name: 'Fiori & UI5 Enhancement',
    description:
      'Extending and supporting Fiori UI5 applications in live landscapes — reworking screens around real user tasks and keeping enhancements maintainable after handover.',
  },
  {
    number: '04',
    name: 'Functional Specification & ABAP',
    description:
      'Translating business requirements into functional specifications developers can build from, designing custom programs and reports, then debugging to trace root causes rather than symptoms.',
  },
  {
    number: '05',
    name: 'Basis, Authorisation & Batch',
    description:
      'Authorisation design across organisation levels, roles, parameters, and user AD, plus batch job setup and monitoring for recurring processes such as replenishment.',
  },
];

const HAIRLINE = 'rgba(12, 12, 12, 0.15)';

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            y={30}
            className="flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{
              borderTop: i === 0 ? `1px solid ${HAIRLINE}` : undefined,
              borderBottom: `1px solid ${HAIRLINE}`,
            }}
          >
            <span
              className="shrink-0 font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.number}
            </span>

            <div className="flex flex-col gap-3 pt-1 md:gap-4">
              <h3
                className="font-medium uppercase leading-tight text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                style={{
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  opacity: 0.6,
                }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
