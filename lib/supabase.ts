// Supabase client for analytics

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables not configured. Analytics will be disabled.');
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface QuizResult {
  id?: string;
  archetype: string;
  completed_at: string;
  user_agent?: string;
}

export async function logQuizCompletion(archetype: string) {
  try {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archetype }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error logging quiz result:', error);
      return { data: null, error };
    }

    const result = await response.json();
    return { data: result.data, error: null };
  } catch (error) {
    console.error('Error logging quiz result:', error);
    return { data: null, error };
  }
}

export async function getArchetypeStats() {
  try {
    const response = await fetch('/api/analytics');
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Error fetching stats:', error);
      return null;
    }

    const { distribution } = await response.json();
    return distribution;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}
