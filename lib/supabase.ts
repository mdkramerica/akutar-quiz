// Supabase client for analytics

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://npnqnsjmcyzkpoqynadr.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface QuizResult {
  id?: string;
  archetype: string;
  completed_at: string;
  user_agent?: string;
}

export async function logQuizCompletion(archetype: string) {
  if (!supabase) return { data: null, error: null };

  const { data, error } = await supabase
    .from('akutar_quiz_results')
    .insert([
      {
        archetype,
        completed_at: new Date().toISOString(),
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown'
      }
    ]);

  if (error) console.error('Error logging quiz result:', error);
  return { data, error };
}

export async function getArchetypeStats() {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('akutar_quiz_results')
    .select('archetype');

  if (error) {
    console.error('Error fetching stats:', error);
    return null;
  }

  const distribution: Record<string, number> = {};
  data.forEach(result => {
    distribution[result.archetype] = (distribution[result.archetype] || 0) + 1;
  });

  return distribution;
}
