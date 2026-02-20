'use client';

import { archetypes, ArchetypeId } from '@/lib/archetypes';
import { logQuizCompletion } from '@/lib/supabase';
import { archetypeAkutars } from '@/lib/akutars';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const archetypeEmojis: Record<string, string> = {
  explorer:  '🚀',
  engineer:  '⚙️',
  commander: '🌟',
  scientist: '🔬',
  dreamer:   '✨',
  guardian:  '🛡️',
  innovator: '💡',
  pilot:     '🛸',
};

export default function ResultPage() {
  const params = useParams();
  const archetypeId = params.archetype as ArchetypeId;
  const archetype = archetypes[archetypeId];
  const matchedNFTs = archetypeAkutars[archetypeId] ?? [];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (archetype) {
      logQuizCompletion(archetype.id);
    }
  }, [archetype]);

  const quizUrl = 'https://akutar-quiz-production.up.railway.app';
  const emoji = archetypeEmojis[archetypeId] ?? '🚀';

  const tweetText = [
    `${emoji} I just discovered my Akutar archetype — I'm ${archetype?.name}!`,
    ``,
    `"${archetype?.tagline}"`,
    ``,
    `12 questions. Real astronaut insights. Find yours in the Akuverse 👇`,
    quizUrl,
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

  if (!archetype) {
    return (
      <main className="min-h-screen bg-akuverse flex items-center justify-center">
        <div className="glass border border-white/10 rounded-sm p-12 text-center">
          <p className="font-condensed text-slate-400 mb-4 uppercase tracking-widest text-sm">Error</p>
          <h1 className="font-display text-4xl text-white mb-6">Archetype Not Found</h1>
          <Link href="/quiz" className="font-condensed text-cyan-400 hover:text-white transition-colors uppercase tracking-widest text-sm">
            ← Retake Quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-akuverse p-4 pb-20">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-cyan-500/5 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-purple-900/15 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto pt-10">

        {/* Nav */}
        <div className="flex items-center justify-between mb-14">
          <Link href="/" className="font-display text-xl tracking-widest text-white/50 hover:text-white transition-colors">
            ΛKU
          </Link>
          <Link href="/quiz" className="font-condensed text-xs uppercase tracking-widest text-slate-600 hover:text-cyan-400 transition-colors">
            Retake Quiz
          </Link>
        </div>

        {/* HERO REVEAL */}
        <div className="text-center mb-16 animate-in">
          <p className="font-condensed text-xs uppercase tracking-[0.5em] text-cyan-400 mb-3">
            Mission Complete — Your Akutar Is
          </p>
          <h1 className="font-display text-[clamp(3.5rem,14vw,8rem)] leading-none text-white text-glow-cyan mb-4">
            {archetype.name.toUpperCase()}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{boxShadow: '0 0 8px #00d4ff'}} />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
          <p className="font-condensed italic text-2xl text-amber-300 mb-6">
            "{archetype.tagline}"
          </p>
          <p className="font-condensed text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
            {archetype.description}
          </p>
        </div>

        {/* TRAITS */}
        <div className="glass border border-cyan-500/20 border-glow-cyan rounded-sm p-8 mb-8">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">Equipment Profile</p>
          <h2 className="font-display text-4xl text-white mb-8">
            YOUR {archetype.name.toUpperCase()} TRAITS
          </h2>
          <div className="space-y-6">
            {Object.entries(archetype.traits).map(([key, value]) => {
              const meaning = archetype.traitMeanings[key as keyof typeof archetype.traitMeanings];
              return (
                <div key={key} className="border-l-2 border-cyan-400/40 pl-6">
                  <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-1">
                    {key}
                  </p>
                  <p className="font-display text-2xl text-white mb-1.5">
                    {value}
                  </p>
                  <p className="font-condensed text-slate-400">
                    {meaning}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ASTRONAUTS */}
        <div className="glass border border-white/10 rounded-sm p-8 mb-8" style={{background: 'rgba(30, 10, 60, 0.4)'}}>
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-amber-400/80 mb-2">Inspiration</p>
          <h2 className="font-display text-4xl text-white mb-8">
            REAL {archetype.name.toUpperCase()}S LIKE YOU
          </h2>
          <div className="space-y-8">
            {archetype.realAstronauts.map((astronaut, index) => (
              <div key={index} className="border-l-2 border-amber-400/40 pl-6">
                <p className="font-display text-2xl text-white mb-1">
                  {astronaut.name}
                </p>
                <p className="font-condensed text-sm text-amber-300/80 uppercase tracking-widest mb-3">
                  {astronaut.achievement}
                </p>
                <p className="font-condensed italic text-slate-300 text-lg leading-relaxed">
                  "{astronaut.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QUALITIES */}
        <div className="mb-8">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">Your Profile</p>
          <h2 className="font-display text-4xl text-white mb-6">
            {archetype.name.toUpperCase()} QUALITIES
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {archetype.qualities.map((quality, index) => (
              <div
                key={index}
                className="glass border border-white/10 rounded-sm p-5 flex items-center gap-4 hover:border-cyan-400/30 transition-colors"
              >
                <span className="font-display text-cyan-400 text-xl leading-none">✦</span>
                <span className="font-condensed text-slate-200">{quality}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MISSION */}
        <div className="glass-dark border border-cyan-400/20 border-glow-cyan rounded-sm p-10 mb-10 text-center">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-4">Your Mission</p>
          <p className="font-condensed text-2xl text-white leading-relaxed">
            {archetype.mission}
          </p>
        </div>

        {/* AKUTAR MATCH — real NFT images */}
        <div className="mb-10">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">Your Match</p>
          <h2 className="font-display text-4xl text-white mb-2">YOUR AKUTARS</h2>
          <p className="font-condensed text-slate-400 mb-8">
            These two Akutars from the 14,833-piece collection share your {archetype.name.toLowerCase()} spirit.
          </p>

          <div className="grid grid-cols-2 gap-5 mb-6">
            {matchedNFTs.map((nft) => (
              <a
                key={nft.tokenId}
                href={nft.openseaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                style={{borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,212,255,0.3)', boxShadow: '0 0 20px rgba(0,212,255,0.1)'}}
              >
                <Image
                  src={nft.image}
                  alt={`Akutar #${nft.tokenId}`}
                  width={400}
                  height={400}
                  style={{objectFit: 'cover', width: '100%', height: 'auto', display: 'block', transition: 'transform 0.4s'}}
                  className="group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'rgba(0,212,255,0.08)'}}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px', color: '#00d4ff', letterSpacing: '0.15em', background: 'rgba(4,8,18,0.85)', padding: '6px 14px', borderRadius: '2px'}}>VIEW ON OPENSEA →</span>
                  </div>
                </div>
                {/* Token label */}
                <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px', background: 'linear-gradient(to top, rgba(4,8,18,0.95), transparent)'}}>
                  <p style={{fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif', fontSize: '18px', color: '#ffffff', letterSpacing: '0.05em'}}>Akutar #{nft.tokenId}</p>
                  <p style={{fontFamily: '"Barlow Condensed", sans-serif', fontSize: '11px', color: 'rgba(0,212,255,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase'}}>
                    {archetype.name} Spirit
                  </p>
                </div>
              </a>
            ))}
          </div>

          <a
            href="https://opensea.io/collection/akutars"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-condensed font-bold text-sm uppercase tracking-widest px-8 py-4 border border-cyan-400/50 text-cyan-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-400/10 transition-all duration-200 rounded-sm border-glow-cyan"
          >
            Browse All 14,833 Akutars →
          </a>
        </div>

        {/* CTA CARDS */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          <div className="glass border border-white/10 rounded-sm p-7 hover:border-white/20 transition-colors">
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">The Book</p>
            <h3 className="font-display text-3xl text-white mb-3">AKU'S STORY</h3>
            <p className="font-condensed text-slate-400 text-sm mb-6 leading-relaxed">
              Follow Aku's journey to Ibra — a planet where dreamers like you discover their true potential.
            </p>
            <a
              href="https://www.penguinrandomhouse.com/books/746514/aku-journey-to-ibra-by-micah-johnson/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed font-semibold text-sm uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
            >
              Pre-Order Now →
            </a>
          </div>

          <div className="glass border border-white/10 rounded-sm p-7 hover:border-white/20 transition-colors">
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">The Collection</p>
            <h3 className="font-display text-3xl text-white mb-3">AKUVERSE</h3>
            <p className="font-condensed text-slate-400 text-sm mb-6 leading-relaxed">
              Browse all 14,833 Akutars. See the full diversity of characters who make the universe possible.
            </p>
            <a
              href="https://opensea.io/collection/akutars"
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed font-semibold text-sm uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
            >
              OpenSea Collection →
            </a>
          </div>
        </div>

        {/* SHARE */}
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
              12 questions. Real astronaut insights. Find yours in the Akuverse 👇{'\n'}
              <span className="text-[#1DA1F2]">{quizUrl}</span>{'\n\n'}
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

      </div>
    </main>
  );
}
