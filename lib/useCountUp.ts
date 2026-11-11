"use client";

import { useCallback, useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp({ 
  end, 
  duration = 2000, 
  start = 0, 
  decimals = 0,
  suffix = '',
  prefix = ''
}: UseCountUpOptions) {
  // Start at the final value so the server HTML (and visitors without JS or with
  // reduced motion) always show the real figure. The count-up is client-only.
  const [count, setCount] = useState(end);
  const [hasStarted, setHasStarted] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const range = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const current = start + (range * easeOut);
      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [hasStarted, end, duration, start]);

  const startCount = useCallback(() => setHasStarted(true), []);
  const resetCount = useCallback(() => setCount(start), [start]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.round(num).toLocaleString();
  };

  return {
    count,
    displayValue: `${prefix}${formatNumber(count)}${suffix}`,
    startCount,
    resetCount,
    hasStarted
  };
}

interface UseScrollCountUpOptions extends UseCountUpOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollCountUp(options: UseScrollCountUpOptions) {
  const { threshold = 0.5, triggerOnce = true, ...countUpOptions } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const { displayValue, startCount, resetCount } = useCountUp(countUpOptions);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Reduced motion: keep the final value, never animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Drop to the start value on the client only, then count up once visible.
    resetCount();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCount();
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [startCount, resetCount, triggerOnce, threshold]);

  return { elementRef, displayValue, isVisible };
}
