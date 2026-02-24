'use client';

import { useState, useEffect, useRef } from 'react';

export function useCountUp(
  target: number,
  duration: number = 1800,
  enabled: boolean = true
): number {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !enabled || target === 0) {
      setValue(target);
      return;
    }

    // Ease-out cubic
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(progress);

      setValue(Math.round(easedProgress * target));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    startTime.current = null;
    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [target, duration, enabled]);

  return value;
}
