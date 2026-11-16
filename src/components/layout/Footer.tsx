'use client';

import { useSyncExternalStore } from 'react';
import { STORE_INFO, NAV_LINKS, PRODUCT_CATEGORIES } from '@/lib/constants';

// Read the clock only in the browser, with stable copyright text during prerender.
const subscribeToYear = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => null;

export default function Footer() {
  const year = useSyncExternalStore(subscribeToYear, getYear, getServerYear);
  return (
    <footer className="bg-[#2C2C2C] text-[#FAF6F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-xl tracking-[0.2em] uppercase mb-2">
              Parth Paints
            </h3>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#B8AFA6] mb-6">
              {STORE_INFO.tagline}
            </p>
            <p className="text-sm text-[#B8AFA6] leading-relaxed mb-8 max-w-xs">
              {STORE_INFO.description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#B8AFA6]/30 flex items-center justify-center hover:border-[#C67B5C] hover:text-[#C67B5C] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#B8AFA6]/30 flex items-center justify-center hover:border-[#C67B5C] hover:text-[#C67B5C] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#B8AFA6] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#FAF6F1]/70 hover:text-[#C67B5C] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#B8AFA6] mb-6">
              Products
            </h4>
            <ul className="space-y-3">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#products"
                    className="text-sm text-[#FAF6F1]/70 hover:text-[#C67B5C] transition-colors duration-300"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#B8AFA6] mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="text-xs text-[#B8AFA6] mb-1">Phone</p>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="text-sm hover:text-[#C67B5C] transition-colors duration-300"
                >
                  {STORE_INFO.phone}
                </a>
              </li>
              <li>
                <p className="text-xs text-[#B8AFA6] mb-1">Email</p>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="text-sm hover:text-[#C67B5C] transition-colors duration-300"
                >
                  {STORE_INFO.email}
                </a>
              </li>
              <li>
                <p className="text-xs text-[#B8AFA6] mb-1">Address</p>
                <p className="text-sm text-[#FAF6F1]/70">
                  {STORE_INFO.address.line1}
                  <br />
                  {STORE_INFO.address.line2}
                </p>
              </li>
              <li>
                <p className="text-xs text-[#B8AFA6] mb-1">Hours</p>
                <p className="text-sm text-[#FAF6F1]/70">
                  Mon–Sat: {STORE_INFO.hours.weekdays}
                  <br />
                  Sunday: {STORE_INFO.hours.sunday}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#B8AFA6]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#B8AFA6]">
            © {year} Parth Paints. All rights reserved.
          </p>
          <p className="text-xs text-[#B8AFA6]">
            Authorized Dealer of Nerolac Paints
          </p>
        </div>
      </div>
    </footer>
  );
}
