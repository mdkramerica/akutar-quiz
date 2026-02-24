import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'default' | 'dark' | 'cyan' | 'hover-gold';
  className?: string;
}

export default function GlassCard({ children, variant = 'default', className = '' }: GlassCardProps) {
  const variants = {
    default: 'glass border border-white/10 rounded-sm',
    dark: 'glass-dark border border-cyan-400/20 border-glow-cyan rounded-sm',
    cyan: 'glass border border-cyan-500/20 border-glow-cyan rounded-sm',
    'hover-gold': 'glass border border-white/10 rounded-sm hover:border-amber-400/30 transition-all duration-300 hover-glow-gold',
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
