'use client';

import Link from 'next/link';

export default function QuizError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-akuverse flex items-center justify-center p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        <p className="font-condensed text-xs uppercase tracking-[0.4em] text-amber-400 mb-4">
          Quiz Error
        </p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-none text-white mb-5">
          MISSION<br />MALFUNCTION
        </h1>
        <p className="font-condensed text-lg text-slate-300 mb-8">
          The quiz encountered an unexpected error. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="font-condensed font-bold text-base uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-200"
            style={{
              background: 'rgba(0,212,255,0.15)',
              border: '1px solid rgba(0,212,255,0.7)',
              color: '#e0f8ff',
            }}
          >
            Restart Quiz
          </button>
          <Link
            href="/"
            className="font-condensed font-bold text-base uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Back to Base
          </Link>
        </div>
      </div>
    </main>
  );
}
