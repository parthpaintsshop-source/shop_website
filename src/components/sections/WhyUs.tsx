'use client';

import { WHY_US_POINTS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function WhyUs() {
  return (
    <section id="why-us" className="section-padding bg-[#FAF6F1]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column: heading */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-32">
              <span className="text-xs tracking-[0.25em] uppercase text-[#B8AFA6] mb-4 block">
                Why Choose Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] mb-6 leading-tight">
                More than
                <br />
                <span className="text-[#722F37]">a paint store.</span>
              </h2>
              <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-md">
                We&apos;re your partners in transforming spaces. With authorized
                Nerolac products and expert guidance, every project gets the care
                it deserves.
              </p>

              {/* Decorative element */}
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#722F37]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#722F37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <span className="text-sm text-[#4A4A4A]">Trusted by hundreds of homeowners</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column: points */}
          <div className="space-y-0">
            {WHY_US_POINTS.map((point, index) => (
              <ScrollReveal key={point.number} delay={index * 0.1}>
                <div className="group py-10 border-b border-[#B8AFA6]/20 last:border-b-0">
                  <div className="flex items-start gap-6">
                    {/* Number */}
                    <span className="font-accent text-5xl md:text-6xl text-[#722F37]/20 leading-none group-hover:text-[#722F37]/40 transition-colors duration-500 select-none">
                      {point.number}
                    </span>

                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-[#2C2C2C] mb-3 group-hover:text-[#722F37] transition-colors duration-300">
                        {point.title}
                      </h3>
                      <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
