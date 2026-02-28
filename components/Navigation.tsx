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

    // Setup IntersectionObserver for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -30% 0px' // Trigger when section crosses middle part of screen
      }
    );

    // Observe all sections defined in navLinks plus open-roles
    const sectionsToObserve = [...navLinks.map((link) => link.href.substring(1)), 'open-roles'];

    sectionsToObserve.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
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
      // Navigate to the homepage with the hash attached, allowing Next to scroll.
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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-background/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'py-4 md:py-6 bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300">
              <img
                src={getImagePath('/images/logo.jpg')}
                alt="Caliber Business Resource Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg leading-none text-white tracking-tight">
                Caliber
              </span>
              <span className="text-[10px] sm:text-xs text-primary font-medium tracking-wider uppercase">
                Business Resource
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
                  className={`text-sm font-medium transition-colors relative group ${isActive ? 'text-primary' : 'text-gray-300 hover:text-primary'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
            <a
              href="#open-roles"
              onClick={(e) => handleNavClick(e, '#open-roles')}
              className={`px-5 lg:px-6 py-2 lg:py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap ${isHomePage && activeSection === 'open-roles'
                ? 'bg-white text-primary shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)]'
                : 'bg-primary hover:bg-primary/90 text-background hover:shadow-[0_0_20px_-5px_rgba(255,193,7,0.5)]'
                }`}
            >
              View Jobs
            </a>
            <a
              href="https://www.linkedin.com/company/caliber-business-resource-bpo-inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 group"
              aria-label="Visit our LinkedIn page"
            >
              <svg className="w-5 h-5 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 pointer-events-none ${isMobileMenuOpen ? 'opacity-100 z-40' : 'opacity-0'
          }`}
      />

      {/* Mobile Menu */}
      <div
        data-mobile-menu
        className={`md:hidden fixed top-[72px] left-0 right-0 bg-background border-t border-white/10 shadow-2xl transition-all duration-300 ease-in-out z-50 ${isMobileMenuOpen ? 'max-h-[calc(100vh-72px)] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden pointer-events-none'
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
                className={`block transition-colors font-medium px-4 py-3.5 rounded-xl text-base ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-300 hover:text-primary hover:bg-white/5'
                  }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-3 space-y-3">
            <a
              href="#open-roles"
              onClick={(e) => handleNavClick(e, '#open-roles')}
              className={`block px-6 py-3.5 rounded-xl text-center font-bold text-base transition-colors ${isHomePage && activeSection === 'open-roles'
                ? 'bg-white text-primary'
                : 'bg-primary text-background'
                }`}
            >
              View Jobs
            </a>
            <a
              href="https://www.linkedin.com/company/caliber-business-resource-bpo-inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/20 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-colors text-base font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
