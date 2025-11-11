import Spline from '@splinetool/react-spline/next';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen min-h-[900px] bg-black">
      <div className="absolute inset-0 z-10 before:content-[''] before:absolute before:z-10 before:bottom-44 before:right-0 before:rounded-br-[15vw] before:shadow-[0_15vw_0_0_rgba(18,18,18,1)] before:bg-transparent before:w-[15vw] before:h-[30vw] after:content-[''] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-44 after:w-full after:rounded-tl-[15vw] after:from-transparent after:bg-[#121212]">
        <Spline scene="https://prod.spline.design/Vu7AiG5ZUbif4STZ/scene.splinecode" />
      </div>
      <div className="relative z-20 flex justify-center h-full px-10 pointer-events-none">
        <div className="flex flex-col justify-center flex-1">
          <div className="flex flex-col gap-8 pointer-events-auto">
            <h1 className="text-5xl md:text-9xl font-bold text-white leading-none mix-blend-difference">
              Design that resonates. <br />
              Experiences that convert.
            </h1>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20 hover:border-white"
            >
              Let's Build Something That Resonates
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
