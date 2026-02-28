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
    <footer id="contact" className="bg-secondary/40 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div>
            <Link href="/#home" className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/10 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={getImagePath('/images/logo.jpg')}
                  alt="Caliber Business Resource Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">Caliber</h3>
                <p className="text-primary text-xs uppercase tracking-wider">Business Resource</p>
              </div>
            </Link>
            <p className="body-text text-sm">
              {data.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-3 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/#open-roles" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-3 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>{data.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <ObfuscatedEmail
                  user={data.emailUser}
                  domain={data.emailDomain}
                  className="hover:text-white transition-colors"
                />
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${data.phoneRaw}`} className="hover:text-white transition-colors">{data.phone}</a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="heading-3 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-primary transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border space-y-4">
          <p className="text-center text-xs text-gray-500">
            {data.fraudNotice}{' '}
            <ObfuscatedEmail user={data.emailUser} domain={data.emailDomain} className="text-primary hover:underline" />.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Caliber Business Resource. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
