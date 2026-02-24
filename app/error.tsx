'use client';

import Link from 'next/link';

export default function Error({
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
        <p className="font-condensed text-xs uppercase tracking-[0.4em] text-red-400 mb-4">
          System Error
        </p>
        <h1 className="font-display text-[clamp(3rem,10vw,6rem)] leading-none text-white mb-5">
          MISSION<br />INTERRUPTED
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-400/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" style={{ boxShadow: '0 0 8px #ff4444' }} />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-400/50" />
        </div>
        <p className="font-condensed text-lg text-slate-300 mb-8">
          Something went wrong. Don&apos;t worry — every astronaut faces setbacks.
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
            Try Again
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
