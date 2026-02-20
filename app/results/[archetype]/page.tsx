'use client';

import { archetypes, ArchetypeId } from '@/lib/archetypes';
import { logQuizCompletion } from '@/lib/supabase';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultPage() {
  const params = useParams();
  const archetypeId = params.archetype as ArchetypeId;
  const archetype = archetypes[archetypeId];

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

        {/* AKUTAR MATCH */}
        <div className="glass border border-white/10 rounded-sm p-8 mb-8">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">Collection Match</p>
          <h2 className="font-display text-4xl text-white mb-4">YOUR AKUTAR</h2>
          <p className="font-condensed text-slate-400 mb-8">
            We're matching you with Akutars that share your {archetype.name.toLowerCase()} spirit across the 14,833-piece collection.
          </p>
          <a
            href={`https://opensea.io/collection/akutars?search[query]=${archetype.traits.helmet}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-condensed font-bold text-sm uppercase tracking-widest px-8 py-4 border border-cyan-400/50 text-cyan-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-400/10 transition-all duration-200 rounded-sm border-glow-cyan"
          >
            Explore {archetype.name}s on OpenSea →
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
        <div className="text-center">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-slate-500 mb-5">Share Your Results</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=I'm ${archetype.name} in the Akuverse! ${archetype.tagline} 🚀 Discover yours:`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed font-semibold text-sm uppercase tracking-widest px-8 py-4 bg-[#1DA1F2]/15 border border-[#1DA1F2]/40 text-[#1DA1F2] hover:bg-[#1DA1F2]/25 hover:border-[#1DA1F2] transition-all rounded-sm"
            >
              Share on X (Twitter)
            </a>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="font-condensed font-semibold text-sm uppercase tracking-widest px-8 py-4 border border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all rounded-sm"
            >
              Copy Link
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
