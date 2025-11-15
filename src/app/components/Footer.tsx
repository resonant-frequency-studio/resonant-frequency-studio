import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#0b0b0b] text-brand-ivory"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('/footer.png')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative">
        <div className="container mx-auto w-full px-4 md:px-12 py-24">
          <div className="rounded-[48px] border border-white/10 bg-white/5 px-8 py-16 text-center backdrop-blur">
            <span className="text-sm uppercase tracking-[0.45em] text-[#ACAF9C]">
              Let&apos;s work together
            </span>
            <h3 className="mt-6 text-4xl font-semibold md:text-6xl">
              Have a project in mind? Let’s build something that resonates.
            </h3>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div>
              <Link href="/" className="text-2xl font-semibold">
                Resonant Frequency
              </Link>
              <p className="text-sm text-brand-ivory/70">
                Design-led brand and product teams crafting interfaces that feel
                as good as they perform.
              </p>
            </div>

            <div className="md:col-start-4 md:col-end-5">
              <h3 className="text-sm uppercase tracking-[0.35em] text-[#ACAF9C]">
                Contact
              </h3>
              <div className="space-y-3 text-base text-brand-ivory/80">
                <div>
                  <span className="block text-xs uppercase tracking-[0.35em] text-[#ACAF9C]">
                    Phone
                  </span>
                  <Link
                    href="tel:+17075958958"
                    className="transition hover:text-white"
                  >
                    +1.707.595.8958
                  </Link>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-[0.35em] text-[#ACAF9C]">
                    Email
                  </span>
                  <Link
                    href="mailto:hello@resonantfrequency.studio"
                    className="transition hover:text-white"
                  >
                    hello@resonantfrequency.studio
                  </Link>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-[0.35em] text-[#ACAF9C]">
                    Address
                  </span>
                  <p>
                    427 Mendocino Ave #100 <br />
                    Santa Rosa, CA 95401
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-brand-ivory/70 md:flex-row">
            <p>
              © {new Date().getFullYear()} Resonant Frequency Studio. All
              rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy-policy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
