'use client';

import { useState, useEffect } from 'react';

export interface CommunityStats {
  distribution: Record<string, number>;
  total: number;
  updatedAt: string;
}

export function useCommunityStats() {
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading, error };
}
