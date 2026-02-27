"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

return (
        <button
            onClick={scrollToTop}
            className={`
        fixed bottom-8 right-4 sm:right-8 z-50
        w-12 h-12 sm:w-14 sm:h-14
        bg-primary text-primary-foreground
        rounded-full shadow-lg
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 hover:shadow-xl hover:shadow-primary/20
        active:scale-95
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}
      `}
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
    );
}
