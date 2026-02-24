import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AnalyticsRequestSchema, sanitizeUserAgent } from '@/lib/validation';

// Server-side Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Analytics service not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate with Zod schema
    const parsed = AnalyticsRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid archetype' },
        { status: 400 }
      );
    }

    const { archetype } = parsed.data;

    // Get and sanitize user agent from headers
    const rawUserAgent = request.headers.get('user-agent') || 'unknown';
    const userAgent = sanitizeUserAgent(rawUserAgent);

    // Insert quiz result
    const { data, error } = await supabase
      .from('akutar_quiz_results')
      .insert([
        {
          archetype,
          completed_at: new Date().toISOString(),
          user_agent: userAgent
        }
      ]);

    if (error) {
      console.error('Error logging quiz result:', error);
      return NextResponse.json(
        { error: 'Failed to log quiz result' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Analytics service not configured' },
        { status: 503 }
      );
    }

    const { data, error } = await supabase
      .from('akutar_quiz_results')
      .select('archetype');

    if (error) {
      console.error('Error fetching stats:', error);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Calculate distribution
    const distribution: Record<string, number> = {};
    data.forEach(result => {
      distribution[result.archetype] = (distribution[result.archetype] || 0) + 1;
    });

    return NextResponse.json({ distribution });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}