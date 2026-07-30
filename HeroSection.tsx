import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact'];

const PORTRAIT_SRC =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

export default function HeroSection() {
  return (
    <section
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

      {/* Portrait */}
      <FadeIn
        delay={0.6}
        y={30}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          wrapperClassName="w-full"
          innerClassName="w-full"
        >
          <img
            src={PORTRAIT_SRC}
            alt="Jack, 3D creator, standing with arms folded"
            className="block h-auto w-full select-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      {/* Heading */}
      <div className="relative z-0 overflow-hidden">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]"
        >
          Hi, i&apos;m jack
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 mt-auto flex w-full items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          a 3d creator driven by crafting striking and unforgettable projects
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
