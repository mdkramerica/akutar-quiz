interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  eyebrowColor?: 'cyan' | 'amber';
}

export default function SectionHeader({ eyebrow, title, description, eyebrowColor = 'cyan' }: SectionHeaderProps) {
  const colorClass = eyebrowColor === 'amber' ? 'text-amber-400' : 'text-cyan-400';

  return (
    <div className="text-center mb-10 sm:mb-14">
      <p className={`font-condensed text-sm uppercase tracking-[0.4em] ${colorClass} mb-2`}>{eyebrow}</p>
      <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white mb-3 sm:mb-4">{title}</h2>
      {description && (
        <p className="font-condensed text-slate-400 max-w-xl mx-auto text-sm sm:text-base">{description}</p>
      )}
    </div>
  );
}
