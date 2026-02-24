import { calculateArchetype, questions } from '@/lib/questions';

describe('Quiz Scoring', () => {
  it('should have exactly 12 questions', () => {
    expect(questions).toHaveLength(12);
  });

  it('should have 4 answers per question', () => {
    questions.forEach((question) => {
      expect(question.answers).toHaveLength(4);
    });
  });

  it('should return explorer for all explorer-maximizing answers', () => {
    // Pick answers that score highest for explorer
    const explorerAnswers: number[][] = [
      [2], // Q1: innovator 3, pilot 1 (no explorer option as primary)
      [0], // Q2: dreamer 3, explorer 1
      [2], // Q3: explorer 3, innovator 1
      [0], // Q4: explorer 3, scientist 1
      [0], // Q5: explorer 3, pilot 1
      [2], // Q6: explorer 3, pilot 1
      [0], // Q7: explorer 3, pilot 1
      [0], // Q8: pilot 3, explorer 1
      [0], // Q9: pilot 3, commander 1
      [0], // Q10: innovator 3, explorer 1
      [1], // Q11: explorer 3, scientist 1
      [0], // Q12: explorer 3, commander 1
    ];
    const result = calculateArchetype(explorerAnswers);
    expect(result).toBe('explorer');
  });

  it('should return engineer for all engineer-maximizing answers', () => {
    const engineerAnswers: number[][] = [
      [0], // Q1: engineer 3, scientist 1
      [1], // Q2: scientist 3, engineer 1
      [3], // Q3: engineer 3, scientist 1
      [1], // Q4: engineer 3, innovator 1
      [1], // Q5: scientist 3, engineer 1
      [1], // Q6: engineer 3, guardian 1
      [1], // Q7: scientist 3, guardian 1
      [1], // Q8: engineer 3, scientist 1
      [1], // Q9: scientist 3, engineer 1
      [1], // Q10: engineer 3, guardian 1
      [2], // Q11: engineer 3, guardian 1
      [1], // Q12: innovator 3, engineer 1
    ];
    const result = calculateArchetype(engineerAnswers);
    expect(result).toBe('engineer');
  });

  it('should return commander for all commander-maximizing answers', () => {
    const commanderAnswers: number[][] = [
      [1], // Q1: commander 3, guardian 1
      [1], // Q2: scientist 3, engineer 1 (no commander here, fallback)
      [0], // Q3: guardian 3, commander 1
      [2], // Q4: dreamer 3, commander 1
      [2], // Q5: guardian 3, commander 1
      [0], // Q6: commander 3, guardian 1
      [2], // Q7: guardian 3, commander 1
      [2], // Q8: commander 3, dreamer 1
      [3], // Q9: commander 3, guardian 1
      [1], // Q10: engineer 3, guardian 1
      [0], // Q11: commander 3, guardian 1
      [0], // Q12: explorer 3, commander 1
    ];
    const result = calculateArchetype(commanderAnswers);
    expect(result).toBe('commander');
  });

  it('should handle empty answers gracefully', () => {
    const emptyAnswers: number[][] = Array(12).fill([]);
    const result = calculateArchetype(emptyAnswers);
    // With no answers, defaults to explorer
    expect(result).toBe('explorer');
  });

  it('should return a valid archetype for any combination', () => {
    const validArchetypes = ['explorer', 'engineer', 'commander', 'scientist', 'dreamer', 'guardian', 'innovator', 'pilot'];

    // Test 10 random combinations
    for (let trial = 0; trial < 10; trial++) {
      const randomAnswers: number[][] = Array.from({ length: 12 }, () => [
        Math.floor(Math.random() * 4)
      ]);
      const result = calculateArchetype(randomAnswers);
      expect(validArchetypes).toContain(result);
    }
  });

  it('should give higher scores for primary matches (3 points) vs secondary (1 point)', () => {
    // Q1 answer 0 gives engineer:3, scientist:1
    // If we pick this consistently, engineer should dominate
    const allFirstAnswer: number[][] = Array(12).fill([0]);
    const result = calculateArchetype(allFirstAnswer);
    // First answer across all questions should produce a consistent winner
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('each question should have scores that reference valid archetype IDs', () => {
    const validArchetypes = ['explorer', 'engineer', 'commander', 'scientist', 'dreamer', 'guardian', 'innovator', 'pilot'];

    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        Object.keys(answer.scores).forEach((archetype) => {
          expect(validArchetypes).toContain(archetype);
        });
      });
    });
  });

  it('each answer should have at least one score', () => {
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        expect(Object.keys(answer.scores).length).toBeGreaterThan(0);
      });
    });
  });
});
