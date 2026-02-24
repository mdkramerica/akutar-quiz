interface DividerProps {
  color?: 'cyan' | 'red';
}

export default function Divider({ color = 'cyan' }: DividerProps) {
  const dotColor = color === 'red' ? 'bg-red-400' : 'bg-cyan-400';
  const dotShadow = color === 'red' ? '0 0 8px #ff4444' : '0 0 8px #00d4ff';
  const gradientColor = color === 'red' ? 'to-red-400/50' : 'to-cyan-400/50';

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className={`h-px w-16 bg-gradient-to-r from-transparent ${gradientColor}`} />
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} style={{ boxShadow: dotShadow }} />
      <div className={`h-px w-16 bg-gradient-to-l from-transparent ${gradientColor}`} />
    </div>
  );
}
