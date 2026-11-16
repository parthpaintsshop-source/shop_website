'use client';

import { PRODUCT_CATEGORIES } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Products() {
  return (
    <section id="products" className="section-padding bg-[#FAF6F1]">
      <div className="container-wide">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.25em] uppercase text-[#B8AFA6] mb-4 block">
              Nerolac Range
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] mb-6">
              Product Categories
            </h2>
            <p className="text-[#4A4A4A] text-lg max-w-lg mx-auto">
              Explore the full range of Nerolac paints — from premium interiors
              to advanced waterproofing solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.1}>
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                {/* Card gradient background (placeholder for real photography) */}
                <div
                  className="relative h-64 md:h-72 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${category.colors[0]} 0%, ${category.colors[1]} 30%, ${category.colors[2]} 60%, ${category.colors[3]}40 100%)`,
                  }}
                >
                  {/* Decorative shapes */}
                  <div
                    className="absolute top-8 right-8 w-24 h-24 rounded-full opacity-20"
                    style={{ backgroundColor: category.colors[3] }}
                  />
                  <div
                    className="absolute bottom-12 left-12 w-16 h-16 rounded-lg opacity-15 rotate-12"
                    style={{ backgroundColor: category.colors[4] || category.colors[2] }}
                  />

                  {/* Category label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent pt-16 pb-6 px-8">
                    <h3 className="font-display text-2xl md:text-3xl text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Hover zoom effect on the gradient */}
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>

                {/* Card body */}
                <div className="p-6 md:p-8">
                  <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Color dots */}
                  <div className="flex items-center gap-2 mb-6">
                    {category.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-black/5"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <MagneticButton as="a" href="#contact">
                    <span className="inline-flex items-center gap-2 text-sm text-[#722F37] font-medium group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
