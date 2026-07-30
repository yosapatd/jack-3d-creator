import { Linkedin, Mail } from 'lucide-react';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';

const EMAIL = 'yosapatd@hotmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/yosapatd/';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full scroll-mt-24 bg-[#0C0C0C] px-5 pb-20 pt-10 sm:px-8 sm:pb-24 md:px-10 md:pb-28"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 border-t border-[#D7E2EA]/15 pt-16 sm:gap-12 md:pt-20">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          y={20}
          className="max-w-[520px] text-center font-light uppercase leading-snug tracking-wide text-[#D7E2EA] opacity-70"
          style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
        >
          Open to SAP MM engagements, S/4HANA programmes, and consulting
          conversations.
        </FadeIn>

        <FadeIn
          delay={0.2}
          y={20}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <ContactButton />
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
          >
            <span className="inline-flex items-center gap-2.5">
              <Linkedin size={18} strokeWidth={2} aria-hidden="true" />
              LinkedIn
            </span>
          </a>
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.3}
          y={20}
          className="flex items-center gap-2 font-light tracking-wider text-[#D7E2EA] opacity-45"
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)' }}
        >
          <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
          {EMAIL}
        </FadeIn>
      </div>
    </section>
  );
}
