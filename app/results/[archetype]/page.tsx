'use client';

import { archetypes, ArchetypeId } from '@/lib/archetypes';
import { logQuizCompletion } from '@/lib/supabase';
import { archetypeAkutars, NFT_BLUR_DATA_URL } from '@/lib/akutars';
import ArchetypeReveal from '@/components/ArchetypeReveal';
import ShareCard from '@/components/ShareCard';
import CommunityStats from './CommunityStats';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

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
  const [revealComplete, setRevealComplete] = useState(false);
  const handleRevealComplete = useCallback(() => setRevealComplete(true), []);
  const emoji = archetypeEmojis[archetypeId] ?? '🚀';

  useEffect(() => {
    if (archetype) {
      logQuizCompletion(archetype.id);
    }
  }, [archetype]);

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
    <main id="main-content" className="min-h-screen bg-akuverse p-4 overflow-x-hidden pb-safe" aria-label={`Your archetype result: ${archetype.name}`}>

      {/* Cinematic archetype reveal overlay */}
      <ArchetypeReveal
        archetypeName={archetype.name}
        tagline={archetype.tagline}
        onRevealComplete={handleRevealComplete}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-cyan-500/5 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-purple-900/15 blur-[100px]" />
      </div>

      <div
        className={`relative z-10 max-w-3xl mx-auto pt-6 sm:pt-10 transition-opacity duration-500 ${
          revealComplete ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!revealComplete}
      >

        {/* Nav */}
        <nav className={`flex items-center justify-between mb-8 sm:mb-14 ${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '0ms' }} aria-label="Results navigation">
          <Link href="/" className="font-display text-xl tracking-widest text-white/50 hover:text-white transition-colors" aria-label="Back to Aku homepage">
            ΛKU
          </Link>
          <Link href="/quiz" className="font-condensed text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors py-2 px-1">
            Retake Quiz
          </Link>
        </nav>

        {/* HERO REVEAL */}
        <div className={`text-center mb-10 sm:mb-16 ${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '100ms' }}>
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-3">
            Mission Complete — Your Akutar Is
          </p>
          <h1 className="font-display text-[clamp(3rem,14vw,8rem)] leading-none text-white text-glow-cyan mb-4">
            {archetype.name.toUpperCase()}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-5 sm:mb-6">
            <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{boxShadow: '0 0 8px #00d4ff'}} />
            <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
          <p className="font-condensed italic text-xl sm:text-2xl text-amber-300 mb-5 sm:mb-6">
            &ldquo;{archetype.tagline}&rdquo;
          </p>
          <p className="font-condensed text-base sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
            {archetype.description}
          </p>
        </div>

        {/* TRAITS */}
        <div className={`glass border border-cyan-500/20 border-glow-cyan rounded-sm p-5 sm:p-8 mb-6 sm:mb-8 ${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '250ms' }}>
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">Equipment Profile</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-6 sm:mb-8">
            YOUR {archetype.name.toUpperCase()} TRAITS
          </h2>
          <div className="space-y-5 sm:space-y-6">
            {Object.entries(archetype.traits).map(([key, value]) => {
              const meaning = archetype.traitMeanings[key as keyof typeof archetype.traitMeanings];
              return (
                <div key={key} className="border-l-2 border-cyan-400/40 pl-4 sm:pl-6">
                  <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-1">
                    {key}
                  </p>
                  <p className="font-display text-xl sm:text-2xl text-white mb-1">
                    {value}
                  </p>
                  <p className="font-condensed text-sm sm:text-base text-slate-400">
                    {meaning}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ASTRONAUTS */}
        <div className={`glass border border-white/10 rounded-sm p-5 sm:p-8 mb-6 sm:mb-8 ${revealComplete ? 'animate-in' : ''}`} style={{background: 'rgba(30, 10, 60, 0.4)', animationDelay: '400ms'}}>
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-amber-400/80 mb-2">Inspiration</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-6 sm:mb-8">
            REAL {archetype.name.toUpperCase()}S LIKE YOU
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {archetype.realAstronauts.map((astronaut, index) => (
              <div key={index} className="border-l-2 border-amber-400/40 pl-4 sm:pl-6">
                <p className="font-display text-xl sm:text-2xl text-white mb-1">
                  {astronaut.name}
                </p>
                <p className="font-condensed text-xs sm:text-sm text-amber-300/80 uppercase tracking-widest mb-2 sm:mb-3">
                  {astronaut.achievement}
                </p>
                <p className="font-condensed italic text-slate-300 text-base sm:text-lg leading-relaxed">
                  &ldquo;{astronaut.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QUALITIES */}
        <div className={`mb-6 sm:mb-8 ${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '550ms' }}>
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">Your Profile</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-5 sm:mb-6">
            {archetype.name.toUpperCase()} QUALITIES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {archetype.qualities.map((quality, index) => (
              <div
                key={index}
                className="glass border border-white/10 rounded-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:border-cyan-400/30 transition-colors"
              >
                <span className="font-display text-cyan-400 text-lg leading-none flex-shrink-0">✦</span>
                <span className="font-condensed text-slate-200 text-sm sm:text-base">{quality}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MISSION */}
        <div className={`glass-dark border border-cyan-400/20 border-glow-cyan rounded-sm p-6 sm:p-10 mb-8 sm:mb-10 text-center ${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '700ms' }}>
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-3 sm:mb-4">Your Mission</p>
          <p className="font-condensed text-lg sm:text-2xl text-white leading-relaxed">
            {archetype.mission}
          </p>
        </div>

        {/* COMMUNITY STATS */}
        <CommunityStats currentArchetype={archetypeId} />

        {/* AKUTAR MATCH — real NFT images */}
        <div className={`mb-8 sm:mb-10 ${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '850ms' }}>
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">Your Match</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-2">YOUR AKUTARS</h2>
          <p className="font-condensed text-slate-400 text-sm sm:text-base mb-6 sm:mb-8">
            These two Akutars from the 14,833-piece collection share your {archetype.name.toLowerCase()} spirit.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-6">
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
                  sizes="(max-width: 768px) 45vw, 350px"
                  placeholder="blur"
                  blurDataURL={NFT_BLUR_DATA_URL}
                  style={{objectFit: 'cover', width: '100%', height: 'auto', display: 'block', transition: 'transform 0.4s'}}
                  className="group-hover:scale-105"
                />
                {/* Overlay on hover/touch */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'rgba(0,212,255,0.08)'}}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(10px,3vw,14px)', color: '#00d4ff', letterSpacing: '0.12em', background: 'rgba(4,8,18,0.85)', padding: '5px 10px', borderRadius: '2px'}}>VIEW ON OPENSEA →</span>
                  </div>
                </div>
                {/* Token label */}
                <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 10px', background: 'linear-gradient(to top, rgba(4,8,18,0.95), transparent)'}}>
                  <p style={{fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif', fontSize: 'clamp(13px,4vw,18px)', color: '#ffffff', letterSpacing: '0.05em'}}>Akutar #{nft.tokenId}</p>
                  <p style={{fontFamily: '"Barlow Condensed", sans-serif', fontSize: '10px', color: 'rgba(0,212,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase'}}>
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
            className="inline-block font-condensed font-bold text-sm uppercase tracking-widest px-6 sm:px-8 py-4 border border-cyan-400/50 text-cyan-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-400/10 transition-all duration-200 rounded-sm border-glow-cyan"
          >
            Browse All 14,833 Akutars →
          </a>
        </div>

        {/* CTA CARDS */}
        <div className={`grid sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10 ${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '1000ms' }}>
          <div className="glass border border-white/10 rounded-sm p-5 sm:p-7 hover:border-white/20 transition-colors">
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">The Book</p>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">AKU&apos;S STORY</h3>
            <p className="font-condensed text-slate-400 text-sm mb-5 sm:mb-6 leading-relaxed">
              Follow Aku&apos;s journey to Ibra — a planet where dreamers like you discover their true potential.
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

          <div className="glass border border-white/10 rounded-sm p-5 sm:p-7 hover:border-white/20 transition-colors">
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">The Collection</p>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">AKUVERSE</h3>
            <p className="font-condensed text-slate-400 text-sm mb-5 sm:mb-6 leading-relaxed">
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
        <div className={`${revealComplete ? 'animate-in' : ''}`} style={{ animationDelay: '1150ms' }}>
          <ShareCard archetype={archetype} archetypeId={archetypeId} emoji={emoji} />
        </div>

      </div>
    </main>
  );
}
