'use client';

import { useState, useMemo } from 'react';
import { ROOM_COLORS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';

const FAMILIES = ['All', 'Neutrals', 'Greens', 'Warm', 'Bold'] as const;

type RoomColor = { name: string; hex: string; family: string };

export default function RoomExplorer() {
  const [selectedColor, setSelectedColor] = useState<RoomColor>(ROOM_COLORS[0]);
  const [activeFamily, setActiveFamily] = useState<string>('All');

  const filteredColors = useMemo(() => {
    if (activeFamily === 'All') return ROOM_COLORS;
    return ROOM_COLORS.filter((c) => c.family === activeFamily);
  }, [activeFamily]);

  return (
    <section id="room-explorer" className="section-padding bg-[#F5F0E8]">
      <div className="container-wide">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.25em] uppercase text-[#B8AFA6] mb-4 block">
              Color Studio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] mb-6">
              Find Your Perfect Shade
            </h2>
            <p className="text-[#4A4A4A] text-lg max-w-lg mx-auto">
              Visualize how different colors transform a room. Select a shade below
              and watch the walls come alive.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Room Visualization */}
          <ScrollReveal className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Room SVG */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Back Wall */}
                  <rect
                    x="80" y="60" width="640" height="380"
                    fill={selectedColor.hex}
                    className="transition-colors duration-700 ease-out"
                  />

                  {/* Wall shadow/depth */}
                  <polygon points="0,0 80,60 80,440 0,520" fill="#E8E4DF" />
                  <polygon points="800,0 720,60 720,440 800,520" fill="#DDD8D0" />

                  {/* Floor */}
                  <polygon points="0,520 80,440 720,440 800,520 800,600 0,600" fill="#C4B9AB" />
                  <line x1="80" y1="440" x2="0" y2="520" stroke="#B8AFA6" strokeWidth="1" />
                  <line x1="720" y1="440" x2="800" y2="520" stroke="#B8AFA6" strokeWidth="1" />

                  {/* Ceiling line */}
                  <polygon points="0,0 80,60 720,60 800,0" fill="#F5F0E8" />

                  {/* Wall trim / baseboard */}
                  <rect x="80" y="425" width="640" height="15" fill="#FFFFFF" opacity="0.6" />

                  {/* Picture frame */}
                  <rect x="300" y="140" width="200" height="140" rx="2" fill="none" stroke="#2C2C2C" strokeWidth="3" />
                  <rect x="310" y="150" width="180" height="120" fill="#D4C5B5" />
                  <circle cx="380" cy="230" r="30" fill="#87A878" opacity="0.4" />
                  <circle cx="420" cy="210" r="20" fill="#C67B5C" opacity="0.3" />

                  {/* Sofa */}
                  <rect x="180" y="340" width="300" height="80" rx="12" fill="#4A4A4A" />
                  <rect x="180" y="330" width="300" height="30" rx="8" fill="#5A5A5A" />
                  {/* Sofa cushions */}
                  <rect x="195" y="340" width="86" height="60" rx="6" fill="#525252" />
                  <rect x="287" y="340" width="86" height="60" rx="6" fill="#525252" />
                  <rect x="379" y="340" width="86" height="60" rx="6" fill="#525252" />
                  {/* Sofa arms */}
                  <rect x="170" y="330" width="20" height="90" rx="6" fill="#3E3E3E" />
                  <rect x="470" y="330" width="20" height="90" rx="6" fill="#3E3E3E" />
                  {/* Pillows */}
                  <ellipse cx="215" cy="340" rx="22" ry="18" fill="#C67B5C" opacity="0.8" />
                  <ellipse cx="445" cy="340" rx="22" ry="18" fill="#87A878" opacity="0.7" />

                  {/* Floor lamp */}
                  <rect x="585" y="250" width="4" height="170" fill="#2C2C2C" />
                  <ellipse cx="587" cy="250" rx="30" ry="20" fill="#E8DDD3" />
                  <rect x="580" y="418" width="14" height="4" rx="2" fill="#2C2C2C" />

                  {/* Plant */}
                  <rect x="120" y="360" width="30" height="60" rx="4" fill="#C67B5C" opacity="0.7" />
                  <ellipse cx="135" cy="355" rx="25" ry="15" fill="#87A878" />
                  <ellipse cx="125" cy="345" rx="18" ry="12" fill="#6B8E5A" />
                  <ellipse cx="145" cy="348" rx="15" ry="10" fill="#87A878" />

                  {/* Side table */}
                  <rect x="530" y="375" width="50" height="45" rx="3" fill="#8B7355" />
                  <rect x="528" y="370" width="54" height="8" rx="2" fill="#A08060" />
                  {/* Book on table */}
                  <rect x="538" y="362" width="30" height="10" rx="1" fill="#722F37" />

                  {/* Rug */}
                  <ellipse cx="330" cy="480" rx="180" ry="35" fill="#D4C5B5" opacity="0.5" />
                </svg>

                {/* Color name badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div
                    className="w-5 h-5 rounded-full inline-block mr-2 align-middle border border-black/10 transition-colors duration-700"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="text-sm font-medium text-[#2C2C2C] align-middle">
                    {selectedColor.name}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Color Selection */}
          <ScrollReveal className="lg:col-span-2" delay={0.2}>
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {/* Family tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {FAMILIES.map((family) => (
                  <button
                    key={family}
                    onClick={() => setActiveFamily(family)}
                    className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-300 ${
                      activeFamily === family
                        ? 'bg-[#722F37] text-white'
                        : 'bg-transparent border border-[#B8AFA6]/40 text-[#4A4A4A] hover:border-[#722F37] hover:text-[#722F37]'
                    }`}
                  >
                    {family}
                  </button>
                ))}
              </div>

              {/* Color swatches */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {filteredColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative aspect-square rounded-xl transition-all duration-300 hover:scale-110 ${
                      selectedColor.hex === color.hex
                        ? 'ring-2 ring-[#722F37] ring-offset-2 scale-110'
                        : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                  >
                    {selectedColor.hex === color.hex && (
                      <svg className="absolute inset-0 m-auto w-4 h-4" fill="none" stroke={isLightColor(color.hex) ? '#2C2C2C' : '#FFFFFF'} strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected color info */}
              <div className="border-t border-[#B8AFA6]/20 pt-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl shadow-inner border border-black/5 transition-colors duration-700"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div>
                    <h4 className="font-display text-lg text-[#2C2C2C]">
                      {selectedColor.name}
                    </h4>
                    <p className="text-sm text-[#B8AFA6] font-mono">
                      {selectedColor.hex}
                    </p>
                    <p className="text-xs text-[#B8AFA6] mt-1">
                      {selectedColor.family} Collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/** Helper to determine if a hex color is light (for contrast on checkmark icon) */
function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
