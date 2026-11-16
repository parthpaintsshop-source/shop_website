'use client';

import { STORE_INFO } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[#F5F0E8]">
      <div className="container-wide">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.25em] uppercase text-[#B8AFA6] mb-4 block">
              Visit Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] mb-6">
              Let&apos;s Bring Your
              <br />
              Vision to <span className="text-[#722F37]">Life</span>
            </h2>
            <p className="text-[#4A4A4A] text-lg max-w-lg mx-auto">
              Visit our store for free color consultation, computerized shade
              matching, and the complete Nerolac range.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* WhatsApp */}
          <ScrollReveal delay={0}>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-7 h-7 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.688-1.228A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.315 0-4.458-.764-6.18-2.054l-.175-.137-3.628.951.968-3.536-.15-.239A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[#2C2C2C] mb-2">WhatsApp</h3>
              <p className="text-sm text-[#4A4A4A] mb-4">
                Quick queries & color advice
              </p>
              <span className="text-sm text-[#25D366] font-medium group-hover:underline">
                Message us now →
              </span>
            </a>
          </ScrollReveal>

          {/* Call */}
          <ScrollReveal delay={0.1}>
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="group block bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#722F37]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-7 h-7 text-[#722F37]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[#2C2C2C] mb-2">Call Us</h3>
              <p className="text-sm text-[#4A4A4A] mb-4">
                Speak with our paint experts
              </p>
              <span className="text-sm text-[#722F37] font-medium group-hover:underline">
                {STORE_INFO.phone}
              </span>
            </a>
          </ScrollReveal>

          {/* Directions */}
          <ScrollReveal delay={0.2}>
            <a
              href={STORE_INFO.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#C67B5C]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-7 h-7 text-[#C67B5C]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[#2C2C2C] mb-2">Directions</h3>
              <p className="text-sm text-[#4A4A4A] mb-4">
                {STORE_INFO.address.line1}
              </p>
              <span className="text-sm text-[#C67B5C] font-medium group-hover:underline">
                Get directions →
              </span>
            </a>
          </ScrollReveal>
        </div>

        {/* Store Hours Banner */}
        <ScrollReveal>
          <div className="bg-[#2C2C2C] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-[#FAF6F1] mb-3">
                Store Hours
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#B8AFA6] mb-1">
                    Monday – Saturday
                  </p>
                  <p className="text-[#FAF6F1]">{STORE_INFO.hours.weekdays}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#B8AFA6] mb-1">
                    Sunday
                  </p>
                  <p className="text-[#FAF6F1]">{STORE_INFO.hours.sunday}</p>
                </div>
              </div>
            </div>

            <MagneticButton as="a" href={`https://wa.me/${STORE_INFO.whatsapp}`}>
              <span className="inline-flex items-center gap-2 bg-[#722F37] text-[#FAF6F1] rounded-full px-8 py-3.5 text-sm tracking-wide hover:bg-[#5A252C] transition-colors duration-300">
                Book a Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
