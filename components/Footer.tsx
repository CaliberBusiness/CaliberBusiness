"use client";

import { MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';
import ObfuscatedEmail from './ObfuscatedEmail';

interface FooterProps {
  data: {
    tagline: string;
    address: string;
    phone: string;
    phoneRaw: string;
    emailUser: string;
    emailDomain: string;
    fraudNotice: string;
  };
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#4a4a4a] border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div>
            <Link href="/#home" className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/20 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={getImagePath('/images/logo.jpg')}
                  alt="Caliber Business Resource Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-medium text-sm sm:text-base leading-none tracking-tight whitespace-nowrap text-white group-hover:text-[#7fffd4] transition-colors font-[family-name:var(--font-montserrat)]">
                  Caliber Business Resource
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#7fffd4] font-[family-name:var(--font-montserrat)]">
                  BPO &amp; Managed Staffing
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {data.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/#about" className="hover:text-[#7fffd4] transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-[#7fffd4] transition-colors">Our Services</Link></li>
              <li><Link href="/#open-roles" className="hover:text-[#7fffd4] transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7fffd4] shrink-0 mt-0.5" />
                <span>{data.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7fffd4] shrink-0" />
                <ObfuscatedEmail
                  user={data.emailUser}
                  domain={data.emailDomain}
                  className="hover:text-white transition-colors"
                />
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7fffd4] shrink-0" />
                <a href={`tel:${data.phoneRaw}`} className="hover:text-white transition-colors">{data.phone}</a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/privacy-policy" className="hover:text-[#7fffd4] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-[#7fffd4] transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <p className="text-center text-xs text-white/40">
            {data.fraudNotice}{' '}
            <ObfuscatedEmail user={data.emailUser} domain={data.emailDomain} className="text-[#7fffd4] hover:underline" />.
          </p>
          <p className="text-center text-sm text-white/50">
            &copy; {new Date().getFullYear()} Caliber Business Resource. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
