import {
  ArchetypeSchema,
  AnalyticsRequestSchema,
  QuizAnswerSchema,
  sanitizeUserAgent,
  validateQuizAnswers,
  validateArchetype,
} from '@/lib/validation';

describe('Validation Schemas', () => {
  describe('ArchetypeSchema', () => {
    it('should accept valid archetypes', () => {
      const valid = ['explorer', 'engineer', 'commander', 'scientist', 'dreamer', 'guardian', 'innovator', 'pilot'];
      valid.forEach((archetype) => {
        expect(() => ArchetypeSchema.parse(archetype)).not.toThrow();
      });
    });

    it('should reject invalid archetypes', () => {
      expect(() => ArchetypeSchema.parse('invalid')).toThrow();
      expect(() => ArchetypeSchema.parse('')).toThrow();
      expect(() => ArchetypeSchema.parse(123)).toThrow();
    });
  });

  describe('AnalyticsRequestSchema', () => {
    it('should accept valid analytics request', () => {
      const result = AnalyticsRequestSchema.safeParse({ archetype: 'explorer' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid analytics request', () => {
      expect(AnalyticsRequestSchema.safeParse({ archetype: 'invalid' }).success).toBe(false);
      expect(AnalyticsRequestSchema.safeParse({}).success).toBe(false);
      expect(AnalyticsRequestSchema.safeParse({ archetype: '' }).success).toBe(false);
    });
  });

  describe('QuizAnswerSchema', () => {
    it('should accept valid 12-question answers', () => {
      const answers = Array.from({ length: 12 }, () => [0]);
      expect(() => QuizAnswerSchema.parse(answers)).not.toThrow();
    });

    it('should reject answers with wrong length', () => {
      const tooFew = Array.from({ length: 11 }, () => [0]);
      expect(() => QuizAnswerSchema.parse(tooFew)).toThrow();
    });

    it('should reject out-of-range answer indices', () => {
      const answers = Array.from({ length: 12 }, () => [5]);
      expect(() => QuizAnswerSchema.parse(answers)).toThrow();
    });

    it('should reject negative answer indices', () => {
      const answers = Array.from({ length: 12 }, () => [-1]);
      expect(() => QuizAnswerSchema.parse(answers)).toThrow();
    });
  });
});

describe('Sanitization Functions', () => {
  describe('sanitizeUserAgent', () => {
    it('should pass through normal user agents', () => {
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      expect(sanitizeUserAgent(ua)).toBe(ua);
    });

    it('should strip script tags', () => {
      const ua = 'Mozilla <script>alert("xss")</script> 5.0';
      const result = sanitizeUserAgent(ua);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
    });

    it('should strip HTML tags', () => {
      const ua = 'Mozilla <img src=x onerror=alert(1)> 5.0';
      const result = sanitizeUserAgent(ua);
      expect(result).not.toContain('<img');
    });

    it('should truncate to 255 characters', () => {
      const ua = 'A'.repeat(500);
      expect(sanitizeUserAgent(ua)).toHaveLength(255);
    });
  });

  describe('validateQuizAnswers', () => {
    it('should return parsed answers for valid input', () => {
      const answers = Array.from({ length: 12 }, () => [0]);
      expect(validateQuizAnswers(answers)).toEqual(answers);
    });

    it('should return null for invalid input', () => {
      expect(validateQuizAnswers('invalid')).toBeNull();
      expect(validateQuizAnswers(null)).toBeNull();
      expect(validateQuizAnswers([])).toBeNull();
    });
  });

  describe('validateArchetype', () => {
    it('should return the archetype for valid input', () => {
      expect(validateArchetype('explorer')).toBe('explorer');
      expect(validateArchetype('pilot')).toBe('pilot');
    });

    it('should return null for invalid input', () => {
      expect(validateArchetype('invalid')).toBeNull();
      expect(validateArchetype(123)).toBeNull();
      expect(validateArchetype(null)).toBeNull();
    });
  });
});
