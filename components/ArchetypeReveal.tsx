'use client';

import { useState, useEffect, useCallback } from 'react';

type RevealPhase = 'blackout' | 'classify' | 'name' | 'tagline' | 'dissolve' | 'done';

interface ArchetypeRevealProps {
  archetypeName: string;
  tagline: string;
  onRevealComplete: () => void;
}

export default function ArchetypeReveal({ archetypeName, tagline, onRevealComplete }: ArchetypeRevealProps) {
  const [phase, setPhase] = useState<RevealPhase>('blackout');

  const skipReveal = useCallback(() => {
    setPhase('done');
    onRevealComplete();
  }, [onRevealComplete]);

  useEffect(() => {
    // Respect reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      skipReveal();
      return;
    }

    // Only play once per session per archetype
    const key = `reveal-seen-${archetypeName}`;
    if (sessionStorage.getItem(key)) {
      skipReveal();
      return;
    }
    sessionStorage.setItem(key, '1');

    // Phase timing chain
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('classify'), 400));
    timers.push(setTimeout(() => setPhase('name'), 1600));
    timers.push(setTimeout(() => setPhase('tagline'), 2800));
    timers.push(setTimeout(() => setPhase('dissolve'), 3400));
    timers.push(setTimeout(() => {
      setPhase('done');
      onRevealComplete();
    }, 4000));

    return () => timers.forEach(clearTimeout);
  }, [archetypeName, skipReveal, onRevealComplete]);

  if (phase === 'done') return null;

  const isDissolving = phase === 'dissolve';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Revealing your archetype: ${archetypeName}`}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
        isDissolving ? 'reveal-dissolve' : ''
      }`}
      style={{ backgroundColor: '#000' }}
    >
      {/* Skip button — appears after blackout phase */}
      {phase !== 'blackout' && (
        <button
          onClick={skipReveal}
          className="absolute bottom-8 right-8 font-condensed text-xs text-slate-600 hover:text-slate-400 transition-colors uppercase tracking-widest z-10"
          style={{ animation: 'fadeInUp 0.3s ease-out both' }}
        >
          Skip →
        </button>
      )}

      {/* Phase 0: Blackout — cyan dot + expanding line */}
      {(phase === 'blackout' || phase === 'classify') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Cyan dot */}
          <div
            className="reveal-dot w-2 h-2 rounded-full"
            style={{ backgroundColor: '#00d4ff', boxShadow: '0 0 12px #00d4ff' }}
          />
          {/* Expanding line */}
          <div
            className="reveal-line mt-4"
            style={{
              width: '60vw',
              maxWidth: '400px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.6), transparent)',
              boxShadow: '0 0 20px rgba(0,212,255,0.4)',
            }}
          />
        </div>
      )}

      {/* Phase 1: Classification text */}
      {phase === 'classify' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12">
          <p
            className="reveal-type font-condensed text-[11px] uppercase text-cyan-400"
            style={{ letterSpacing: '0.5em' }}
          >
            Mission Complete
          </p>
          {/* Line (same as blackout but glowing more) */}
          <div
            style={{
              width: '60vw',
              maxWidth: '400px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.6), transparent)',
              boxShadow: '0 0 20px rgba(0,212,255,0.4)',
            }}
          />
          <p
            className="reveal-type font-condensed text-[11px] uppercase text-cyan-400"
            style={{ letterSpacing: '0.5em', animationDelay: '0.3s' }}
          >
            Archetype Classified
          </p>
        </div>
      )}

      {/* Phase 2: The big name reveal */}
      {(phase === 'name' || phase === 'tagline' || phase === 'dissolve') && (
        <div className="flex flex-col items-center justify-center text-center px-4">
          {/* Accent lines + name */}
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <div
              className="reveal-sweep h-px"
              style={{
                width: '60px',
                background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5))',
              }}
            />
            <h1
              className="reveal-name reveal-glow font-display leading-none text-white"
              style={{ fontSize: 'clamp(3.5rem, 16vw, 9rem)' }}
            >
              {archetypeName.toUpperCase()}
            </h1>
            <div
              className="reveal-sweep h-px"
              style={{
                width: '60px',
                background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.5))',
              }}
            />
          </div>

          {/* Phase 3: Tagline fade-up */}
          {(phase === 'tagline' || phase === 'dissolve') && (
            <p
              className="reveal-tagline font-condensed italic text-amber-300"
              style={{ fontSize: 'clamp(1.1rem, 4vw, 1.75rem)' }}
            >
              &ldquo;{tagline}&rdquo;
            </p>
          )}
        </div>
      )}

      {/* Screen reader announcement */}
      <span className="sr-only">
        Your archetype is {archetypeName}. {tagline}
      </span>
    </div>
  );
}
