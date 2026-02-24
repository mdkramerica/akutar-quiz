import { z } from 'zod';

// Archetype enum validation
export const ArchetypeSchema = z.enum([
  'explorer',
  'engineer', 
  'commander',
  'scientist',
  'dreamer',
  'guardian',
  'innovator',
  'pilot'
]);

export type ValidArchetype = z.infer<typeof ArchetypeSchema>;

// Quiz completion validation schema
export const QuizCompletionSchema = z.object({
  archetype: ArchetypeSchema,
  userAgent: z.string().max(255).optional(),
  completedAt: z.string().datetime().optional(),
});

// Quiz answers validation
export const QuizAnswerSchema = z.array(
  z.array(z.number().int().min(0).max(3))
).length(12);

// Analytics request validation
export const AnalyticsRequestSchema = z.object({
  archetype: ArchetypeSchema,
});

// Stats response validation
export const StatsResponseSchema = z.object({
  distribution: z.record(ArchetypeSchema, z.number().int().min(0))
});

// Community stats response validation (enhanced)
export const CommunityStatsResponseSchema = z.object({
  distribution: z.record(z.string(), z.number().int().min(0)),
  total: z.number().int().min(0),
  updatedAt: z.string(),
});

// Safe string sanitization for user inputs
export function sanitizeUserAgent(userAgent: string): string {
  // Remove any potentially malicious content
  return userAgent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .slice(0, 255);
}

// Validate and sanitize quiz answers
export function validateQuizAnswers(answers: unknown): number[][] | null {
  try {
    const result = QuizAnswerSchema.parse(answers);
    return result;
  } catch (error) {
    console.error('Invalid quiz answers:', error);
    return null;
  }
}

// Validate archetype
export function validateArchetype(archetype: unknown): ValidArchetype | null {
  try {
    const result = ArchetypeSchema.parse(archetype);
    return result;
  } catch (error) {
    console.error('Invalid archetype:', error);
    return null;
  }
}