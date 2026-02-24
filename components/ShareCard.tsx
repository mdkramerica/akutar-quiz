'use client';

import { useState } from 'react';
import { Archetype, ArchetypeId } from '@/lib/archetypes';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://akutar-quiz-production.up.railway.app';

interface ShareCardProps {
  archetype: Archetype;
  archetypeId: ArchetypeId;
  emoji: string;
}

export default function ShareCard({ archetype, archetypeId, emoji }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState<'square' | 'landscape' | null>(null);

  const resultsUrl = `${BASE_URL}/results/${archetypeId}`;
  const ogPreviewUrl = `/api/og?archetype=${archetypeId}&format=square`;

  const tweetText = [
    `${emoji} I just discovered my Akutar archetype — I'm ${archetype.name}!`,
    ``,
    `"${archetype.tagline}"`,
    ``,
    `12 questions. Real astronaut insights. Find yours in the Akuverse`,
    resultsUrl,
    ``,
    `#Akutar #Akuverse #MicahJohnson #AkuJourneyToIbra`,
  ].join('\n');

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownload = async (format: 'square' | 'landscape') => {
    setDownloading(format);
    try {
      const response = await fetch(`/api/og?archetype=${archetypeId}&format=${format}`);
      if (!response.ok) throw new Error('Failed to generate');

      const blob = await response.blob();

      // Try Web Share API on mobile first
      if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'akutar.png', { type: 'image/png' })] })) {
        try {
          await navigator.share({
            files: [new File([blob], `my-akutar-${archetypeId}.png`, { type: 'image/png' })],
            title: `I'm ${archetype.name}!`,
            text: `Discover your Akutar archetype`,
          });
          setDownloading(null);
          return;
        } catch {
          // User cancelled share, fall through to download
        }
      }

      // Fallback: trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-akutar-${archetypeId}-${format === 'square' ? '1080x1080' : '1200x630'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Silently fail — user still has copy link and tweet options
    }
    setDownloading(null);
  };

  return (
    <div
      className="rounded-sm p-8 sm:p-10 mb-6 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.10) 100%)',
        border: '1px solid rgba(0,212,255,0.25)',
        boxShadow: '0 0 40px rgba(0,212,255,0.06)',
      }}
    >
      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)'}}>
        <span style={{width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff', display: 'inline-block'}} />
        <span className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400">Mission Debrief</span>
      </div>

      <h2 className="font-display text-4xl sm:text-5xl text-white mb-3" style={{textShadow: '0 0 30px rgba(0,212,255,0.3)'}}>
        SHARE YOUR ARCHETYPE
      </h2>
      <p className="font-condensed text-slate-400 text-lg mb-8 max-w-md mx-auto">
        Challenge your crew. Who else is built for the Akuverse?
      </p>

      {/* Card preview */}
      <div className="mb-8 mx-auto max-w-sm">
        <div
          className="rounded-sm overflow-hidden"
          style={{ border: '1px solid rgba(0,212,255,0.2)', boxShadow: '0 0 20px rgba(0,212,255,0.1)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogPreviewUrl}
            alt={`${archetype.name} share card`}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <p className="font-condensed text-xs text-slate-600 mt-2 uppercase tracking-widest">
          Your shareable card
        </p>
      </div>

      {/* Download buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
        <button
          onClick={() => handleDownload('square')}
          disabled={downloading !== null}
          className="inline-flex items-center justify-center gap-2 font-condensed font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-sm transition-all duration-200"
          style={{
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#00d4ff',
          }}
        >
          {downloading === 'square' ? (
            <>
              <span className="animate-pulse">Generating...</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Instagram (1080x1080)
            </>
          )}
        </button>
        <button
          onClick={() => handleDownload('landscape')}
          disabled={downloading !== null}
          className="inline-flex items-center justify-center gap-2 font-condensed font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-sm transition-all duration-200"
          style={{
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#00d4ff',
          }}
        >
          {downloading === 'landscape' ? (
            <>
              <span className="animate-pulse">Generating...</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Twitter/X (1200x630)
            </>
          )}
        </button>
      </div>

      {/* Tweet preview card */}
      <div
        className="rounded-sm p-5 mb-8 text-left mx-auto max-w-lg"
        style={{background: 'rgba(4,8,18,0.8)', border: '1px solid rgba(255,255,255,0.08)'}}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold" style={{background: 'linear-gradient(135deg, #00d4ff, #7c3aed)'}}>
            A
          </div>
          <div>
            <p className="font-condensed text-white text-sm leading-none">Akutar Quiz</p>
            <p className="font-condensed text-slate-500 text-xs">@akutar</p>
          </div>
        </div>
        <p className="font-condensed text-slate-200 text-sm leading-relaxed whitespace-pre-line">
          {emoji} I just discovered my Akutar archetype — I&apos;m <span className="text-cyan-400 font-bold">{archetype.name}</span>!{'\n\n'}
          <span className="text-amber-300/90 italic">&ldquo;{archetype.tagline}&rdquo;</span>{'\n\n'}
          12 questions. Real astronaut insights. Find yours in the Akuverse{'\n'}
          <span className="text-[#1DA1F2]">{resultsUrl}</span>{'\n\n'}
          <span className="text-slate-500">#Akutar #Akuverse #MicahJohnson</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 font-condensed font-bold text-base uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #00d4ff22, #1DA1F222)',
            border: '1.5px solid #1DA1F2',
            color: '#ffffff',
            boxShadow: '0 0 20px rgba(29,161,242,0.2)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 35px rgba(29,161,242,0.45)'; (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, #1DA1F233, #00d4ff22)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(29,161,242,0.2)'; (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, #00d4ff22, #1DA1F222)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color: '#1DA1F2'}}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Post to X / Twitter
        </a>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-3 font-condensed font-bold text-base uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-200"
          style={{
            background: copied ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
            border: copied ? '1.5px solid rgba(0,212,255,0.8)' : '1.5px solid rgba(255,255,255,0.2)',
            color: copied ? '#00d4ff' : 'rgba(255,255,255,0.7)',
          }}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Link Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>

      <p className="font-condensed text-slate-600 text-xs mt-6 uppercase tracking-widest">
        8 archetypes · 12 questions · real astronaut DNA
      </p>
    </div>
  );
}
