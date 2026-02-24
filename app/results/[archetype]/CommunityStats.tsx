'use client';

import { useCommunityStats } from '@/lib/useCommunityStats';
import { useCountUp } from '@/lib/useCountUp';
import { archetypes, ArchetypeId } from '@/lib/archetypes';

const archetypeOrder: ArchetypeId[] = [
  'explorer', 'engineer', 'commander', 'scientist',
  'dreamer', 'guardian', 'innovator', 'pilot',
];

function getRarityMessage(archetypeName: string, percentage: number, count: number): string {
  if (percentage <= 8) {
    return `Only ${percentage}% of the crew shares your ${archetypeName} spirit. You're a rare find in the Akuverse.`;
  } else if (percentage <= 12) {
    return `${count} fellow ${archetypeName}s and counting. A tight crew with uncommon purpose.`;
  } else if (percentage <= 18) {
    return `${archetypeName}s are well-represented in the Akuverse. You're in good company.`;
  } else {
    return `${archetypeName}s lead the Akuverse with ${percentage}% of all crew. The universe clearly needs your kind.`;
  }
}

interface CommunityStatsProps {
  currentArchetype: ArchetypeId;
}

export default function CommunityStats({ currentArchetype }: CommunityStatsProps) {
  const { stats, loading, error } = useCommunityStats();
  const archetypeCount = stats?.distribution[currentArchetype] ?? 0;
  const animatedCount = useCountUp(archetypeCount, 1800, !loading && !error);

  // Graceful degradation — don't render if stats fail
  if (error) return null;

  const archetype = archetypes[currentArchetype];
  const archetypeName = archetype?.name?.replace('The ', '') ?? currentArchetype;

  // Loading skeleton
  if (loading) {
    return (
      <div className="mb-8 sm:mb-10">
        <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">
          Crew Manifest
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-white mb-6 sm:mb-8">
          YOUR CREW
        </h2>
        <div className="glass border border-white/10 rounded-sm p-6 sm:p-8">
          <div className="space-y-3">
            <div className="h-16 bg-white/5 rounded-sm animate-pulse w-1/3 mx-auto" />
            <div className="h-4 bg-white/5 rounded-sm animate-pulse w-2/3 mx-auto" />
            <div className="mt-6 space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 bg-white/5 rounded-sm animate-pulse w-20" />
                  <div className="h-5 bg-white/5 rounded-sm animate-pulse flex-1" style={{ width: `${30 + (i * 7) % 50}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const total = stats!.total;
  const percentage = total > 0 ? Math.round((archetypeCount / total) * 100) : 0;

  // Sort archetypes by count descending
  const sortedArchetypes = [...archetypeOrder].sort(
    (a, b) => (stats!.distribution[b] ?? 0) - (stats!.distribution[a] ?? 0)
  );
  const maxCount = Math.max(...archetypeOrder.map(id => stats!.distribution[id] ?? 0), 1);

  return (
    <div className="mb-8 sm:mb-10 animate-in">
      <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">
        Crew Manifest
      </p>
      <h2 className="font-display text-3xl sm:text-4xl text-white mb-6 sm:mb-8">
        YOUR CREW
      </h2>

      <div className="glass border border-cyan-500/20 border-glow-cyan rounded-sm p-6 sm:p-8">
        {/* Hero stat */}
        <div className="text-center mb-8">
          {archetypeCount === 0 ? (
            <p className="font-condensed text-lg text-cyan-400 italic">
              Be the first {archetypeName} to launch into the Akuverse
            </p>
          ) : (
            <>
              <p
                className="font-display leading-none text-cyan-400 text-glow-cyan"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)' }}
              >
                {animatedCount.toLocaleString()}
              </p>
              <p className="font-condensed text-lg sm:text-xl text-slate-300 mt-2">
                {archetypeName}s have launched from this page
              </p>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <p className="font-condensed text-xs uppercase tracking-[0.3em] text-slate-500 flex-shrink-0">
            Across the Akuverse
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Distribution bars */}
        <div className="space-y-2 sm:space-y-3">
          {sortedArchetypes.map((id) => {
            const count = stats!.distribution[id] ?? 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
            const isCurrent = id === currentArchetype;
            const name = archetypes[id]?.name?.replace('The ', '') ?? id;

            return (
              <div key={id} className="flex items-center gap-3">
                <span className={`font-condensed text-xs uppercase tracking-wider w-20 sm:w-24 text-right flex-shrink-0 ${
                  isCurrent ? 'text-cyan-400 font-semibold' : 'text-slate-500'
                }`}>
                  {name}
                </span>
                <div
                  className="flex-1 h-5 sm:h-6 rounded-sm overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div
                    className={`h-full rounded-sm transition-all duration-1000 ease-out ${
                      isCurrent
                        ? 'bg-gradient-to-r from-cyan-400/80 to-cyan-400/40'
                        : 'bg-white/15'
                    }`}
                    style={{
                      width: `${barWidth}%`,
                      boxShadow: isCurrent ? '0 0 12px rgba(0,212,255,0.3)' : 'none',
                    }}
                  />
                </div>
                <span className={`font-condensed text-xs w-8 text-right flex-shrink-0 ${
                  isCurrent ? 'text-cyan-400' : 'text-slate-600'
                }`}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Rarity message */}
        {archetypeCount > 0 && (
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="font-condensed text-sm sm:text-base text-slate-400 italic">
              {getRarityMessage(archetypeName, percentage, archetypeCount)}
            </p>
            <p className="font-condensed text-xs text-slate-600 mt-2 uppercase tracking-widest">
              {total.toLocaleString()} total crew members
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
