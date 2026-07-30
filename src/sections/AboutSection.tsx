import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';

const ABOUT_COPY =
  'Ten years inside SAP Materials Management, across retail, healthcare, printing, and oil & gas. I work the whole arc of a change: requirement gathering, configuration, functional specification, testing, and go-live support.';

const CREDENTIALS = [
  { value: '10 yrs', label: 'SAP MM experience' },
  { value: '4', label: 'Industries delivered in' },
  { value: 'S/4HANA', label: 'Migration & upgrade cycles' },
  { value: 'KMITL', label: 'BSc Computer Science' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
      style={{ overflowX: 'clip' }}
    >
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </FadeIn>

          <div className="flex flex-col items-center gap-6">
            <FadeIn
              as="p"
              delay={0.1}
              y={20}
              className="text-center font-light uppercase tracking-[0.2em] text-[#D7E2EA] opacity-50"
              style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
            >
              Yosapat Dangvijitthakarn · Boss
            </FadeIn>

            <AnimatedText
              text={ABOUT_COPY}
              className="max-w-[620px] text-center font-medium leading-relaxed text-[#D7E2EA]"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 border-t border-[#D7E2EA]/15 pt-10 md:grid-cols-4 md:gap-x-8">
            {CREDENTIALS.map((item, i) => (
              <FadeIn
                key={item.label}
                delay={0.15 + i * 0.08}
                y={20}
                className="flex flex-col gap-2 text-center"
              >
                <span
                  className="hero-heading font-black uppercase leading-none"
                  style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)' }}
                >
                  {item.value}
                </span>
                <span
                  className="font-light uppercase leading-snug tracking-wider text-[#D7E2EA] opacity-55"
                  style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}
                >
                  {item.label}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
