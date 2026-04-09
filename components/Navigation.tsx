"use client";

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getImagePath } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#our-story', label: 'About Us' },
  { href: '#connect', label: 'Contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px' }
    );

    const sectionsToObserve = [...navLinks.map((link) => link.href.substring(1)), 'open-roles'];
    sectionsToObserve.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = e.target as HTMLElement;
        const header = document.querySelector('header');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (header && !header.contains(target) && mobileMenu && !mobileMenu.contains(target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (!isHomePage) {
      router.push(`/${href}`);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      let offsetPosition;
      if (href === '#open-roles') {
        const viewportHeight = window.innerHeight;
        const elementHeight = element.clientHeight;
        const elementTop = element.getBoundingClientRect().top;
        offsetPosition = elementTop + window.pageYOffset - (viewportHeight / 2) + (elementHeight / 2);
      } else {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      }
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#4a4a4a] shadow-lg'
          : 'py-4 md:py-6 bg-white/95 backdrop-blur-sm border-b border-[#e0e0e0]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-xl shadow-lg border border-[#e0e0e0] group-hover:scale-105 transition-transform duration-300">
              <img
                src={getImagePath('/images/logo.jpg')}
                alt="Caliber Business Resource Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`font-medium text-sm sm:text-base leading-none tracking-tight whitespace-nowrap transition-colors font-[family-name:var(--font-montserrat)] ${isScrolled ? 'text-white' : 'text-[#4a4a4a]'}`}>
                Caliber Business Resource
              </span>
              <span className={`text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase transition-colors font-[family-name:var(--font-montserrat)] ${isScrolled ? 'text-[#7fffd4]' : 'text-[#f6b130]'}`}>
                BPO &amp; Managed Staffing
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = isHomePage && activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors relative group ${
                    isScrolled
                      ? isActive ? 'text-[#7fffd4]' : 'text-white/80 hover:text-white'
                      : isActive ? 'text-[#4a4a4a]' : 'text-[#6b6b6b] hover:text-[#4a4a4a]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#7fffd4] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
            <a
              href="#open-roles"
              onClick={(e) => handleNavClick(e, '#open-roles')}
              className="px-5 lg:px-6 py-2 lg:py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap bg-[#f6b130] hover:bg-[#d4940a] text-[#1a1a1a] hover:shadow-[0_0_20px_-5px_rgba(246,177,48,0.5)]"
            >
              View Jobs
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 -mr-2 rounded-lg transition-colors ${isScrolled ? 'text-white hover:bg-white/10' : 'text-[#4a4a4a] hover:bg-[#4a4a4a]/5'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 pointer-events-none ${isMobileMenuOpen ? 'opacity-100 z-40' : 'opacity-0'}`}
      />

      {/* Mobile Menu */}
      <div
        data-mobile-menu
        className={`md:hidden fixed top-[72px] left-0 right-0 bg-white border-t border-[#e0e0e0] shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'max-h-[calc(100vh-72px)] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="p-4 sm:p-6 space-y-1 overflow-y-auto max-h-[calc(100vh-72px)]">
          {navLinks.map((link) => {
            const isActive = isHomePage && activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block transition-colors font-medium px-4 py-3.5 rounded-xl text-base ${
                  isActive
                    ? 'bg-[#7fffd4]/15 text-[#4a4a4a]'
                    : 'text-[#6b6b6b] hover:text-[#4a4a4a] hover:bg-[#4a4a4a]/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="#open-roles"
              onClick={(e) => handleNavClick(e, '#open-roles')}
              className="block px-6 py-3.5 rounded-xl text-center font-bold text-base bg-[#f6b130] hover:bg-[#d4940a] text-[#1a1a1a] transition-colors"
            >
              View Jobs
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
