// Quiz Questions & Scoring Logic

import { ArchetypeId } from './archetypes';

export interface Answer {
  text: string;
  scores: Partial<Record<ArchetypeId, number>>;
  insight?: string; // Educational note shown after selection
}

export interface Question {
  id: number;
  text: string;
  category: string;
  answers: Answer[];
  educationalNote?: string; // Optional tooltip
}

export const questions: Question[] = [
  {
    id: 1,
    text: "You're on a mission to Mars. The ship loses power. What's your first move?",
    category: 'Problem Solving',
    answers: [
      {
        text: 'Analyze the schematics to find the root cause',
        scores: { engineer: 3, scientist: 1 },
        insight: 'Systematic problem-solving! Engineers saved Apollo 13 by methodically diagnosing the oxygen tank failure.'
      },
      {
        text: 'Rally the crew to stay calm and work together',
        scores: { commander: 3, guardian: 1 },
        insight: 'Leadership under pressure! Commander Chris Hadfield guided the ISS crew through a simulated ammonia leak — calm, clear communication saved the day.'
      },
      {
        text: 'Improvise a creative workaround with available tools',
        scores: { innovator: 3, pilot: 1 },
        insight: 'Creative problem-solving! Apollo 13\'s crew built a CO2 filter from spare parts—innovation saved the mission.'
      },
      {
        text: 'Consult mission data to find similar past scenarios',
        scores: { scientist: 3, engineer: 1 },
        insight: 'Research-driven! NASA\'s knowledge base of past missions has prevented countless disasters.'
      }
    ]
  },

  {
    id: 2,
    text: "How do you prefer to spend downtime on the space station?",
    category: 'Values & Interests',
    answers: [
      {
        text: 'Gazing at the stars, dreaming of what\'s beyond',
        scores: { dreamer: 3, explorer: 1 },
        insight: 'The "Overview Effect"—seeing Earth from space changes how astronauts view humanity and possibility.'
      },
      {
        text: 'Reviewing mission logs to optimize next steps',
        scores: { scientist: 3, engineer: 1 }
      },
      {
        text: 'Training for emergency scenarios',
        scores: { guardian: 3, pilot: 1 }
      },
      {
        text: 'Experimenting with new tech or ideas',
        scores: { innovator: 3, scientist: 1 }
      }
    ]
  },

  {
    id: 3,
    text: "Your team disagrees on the best route through an asteroid field. You...",
    category: 'Team Dynamics',
    answers: [
      {
        text: 'Suggest a vote and go with majority',
        scores: { guardian: 3, commander: 1 }
      },
      {
        text: 'Trust your gut and take decisive action',
        scores: { pilot: 3, commander: 1 }
      },
      {
        text: 'Propose a third option no one\'s considered',
        scores: { explorer: 3, innovator: 1 }
      },
      {
        text: 'Calculate risk/reward for each route',
        scores: { engineer: 3, scientist: 1 }
      }
    ]
  },

  {
    id: 4,
    text: "What motivates you most about space exploration?",
    category: 'Core Values',
    answers: [
      {
        text: 'Discovering what\'s never been seen',
        scores: { explorer: 3, scientist: 1 }
      },
      {
        text: 'Solving problems others think are impossible',
        scores: { engineer: 3, innovator: 1 }
      },
      {
        text: 'Building a better future for humanity',
        scores: { dreamer: 3, commander: 1 }
      },
      {
        text: 'Protecting the crew and mission',
        scores: { guardian: 3, pilot: 1 }
      }
    ]
  },

  {
    id: 5,
    text: "When faced with the unknown, you feel...",
    category: 'Mindset',
    answers: [
      {
        text: 'Excited and energized',
        scores: { explorer: 3, pilot: 1 }
      },
      {
        text: 'Curious and analytical',
        scores: { scientist: 3, engineer: 1 }
      },
      {
        text: 'Cautious but determined',
        scores: { guardian: 3, commander: 1 }
      },
      {
        text: 'Confident in your ability to adapt',
        scores: { pilot: 3, innovator: 1 }
      }
    ]
  },

  {
    id: 6,
    text: "Your ideal role on the mission is...",
    category: 'Work Style',
    answers: [
      {
        text: 'Leading the team to success',
        scores: { commander: 3, guardian: 1 }
      },
      {
        text: 'Designing systems that keep everyone safe',
        scores: { engineer: 3, guardian: 1 }
      },
      {
        text: 'Charting new territory',
        scores: { explorer: 3, pilot: 1 }
      },
      {
        text: 'Conducting groundbreaking research',
        scores: { scientist: 3, innovator: 1 }
      }
    ]
  },

  {
    id: 7,
    text: "You discover an anomaly in deep space. You...",
    category: 'Response to Unknown',
    answers: [
      {
        text: 'Immediately investigate',
        scores: { explorer: 3, pilot: 1 }
      },
      {
        text: 'Document it thoroughly first',
        scores: { scientist: 3, guardian: 1 }
      },
      {
        text: 'Alert the team and assess threats',
        scores: { guardian: 3, commander: 1 }
      },
      {
        text: 'Wonder what it could mean for humanity',
        scores: { dreamer: 3, scientist: 1 }
      }
    ]
  },

  {
    id: 8,
    text: "How do you handle unexpected setbacks?",
    category: 'Resilience',
    answers: [
      {
        text: 'Stay calm and find a new path',
        scores: { pilot: 3, explorer: 1 }
      },
      {
        text: 'Analyze what went wrong to prevent it again',
        scores: { engineer: 3, scientist: 1 }
      },
      {
        text: 'Rally others to stay positive',
        scores: { commander: 3, dreamer: 1 }
      },
      {
        text: 'See it as a chance to innovate',
        scores: { innovator: 3, dreamer: 1 }
      }
    ]
  },

  {
    id: 9,
    text: "Your communication style is...",
    category: 'Communication',
    answers: [
      {
        text: 'Direct and action-focused',
        scores: { pilot: 3, commander: 1 }
      },
      {
        text: 'Thoughtful and detailed',
        scores: { scientist: 3, engineer: 1 }
      },
      {
        text: 'Inspiring and big-picture',
        scores: { dreamer: 3, commander: 1 }
      },
      {
        text: 'Clear commands with room for input',
        scores: { commander: 3, guardian: 1 }
      }
    ]
  },

  {
    id: 10,
    text: "Your workspace is...",
    category: 'Work Environment',
    answers: [
      {
        text: 'Organized chaos - tools everywhere but you know where everything is',
        scores: { innovator: 3, explorer: 1 }
      },
      {
        text: 'Spotless and labeled - everything has a place',
        scores: { engineer: 3, guardian: 1 }
      },
      {
        text: 'Minimal - just what you need for the task',
        scores: { guardian: 3, pilot: 1 }
      },
      {
        text: 'Covered in research, notes, and ideas',
        scores: { scientist: 3, dreamer: 1 }
      }
    ]
  },

  {
    id: 11,
    text: "When the mission succeeds, you're most proud of...",
    category: 'Achievement',
    answers: [
      {
        text: 'The team working together flawlessly',
        scores: { commander: 3, guardian: 1 }
      },
      {
        text: 'The discoveries we made along the way',
        scores: { explorer: 3, scientist: 1 }
      },
      {
        text: 'The systems that held up under pressure',
        scores: { engineer: 3, guardian: 1 }
      },
      {
        text: 'Knowing everyone made it home safe',
        scores: { guardian: 3, commander: 1 }
      }
    ]
  },

  {
    id: 12,
    text: "If you could leave one legacy in space, it would be...",
    category: 'Legacy',
    answers: [
      {
        text: 'A new frontier opened for others',
        scores: { explorer: 3, commander: 1 },
        insight: 'Just like Aku\'s mission—opening doors so others can follow. Representation creates pathways.'
      },
      {
        text: 'Technology that changes everything',
        scores: { innovator: 3, engineer: 1 }
      },
      {
        text: 'Knowledge that expands human understanding',
        scores: { scientist: 3, dreamer: 1 }
      },
      {
        text: 'Proof that dreams become reality',
        scores: { dreamer: 3, explorer: 1 },
        insight: '"Can astronauts be Black?" became "Yes, and here\'s an entire universe to prove it." Dreams matter.'
      }
    ]
  }
];

// Scoring function
export function calculateArchetype(answers: number[][]): ArchetypeId {
  const scores: Partial<Record<ArchetypeId, number>> = {};
  
  answers.forEach((selectedAnswers, questionIndex) => {
    selectedAnswers.forEach(answerIndex => {
      const answer = questions[questionIndex].answers[answerIndex];
      Object.entries(answer.scores).forEach(([archetype, points]) => {
        scores[archetype as ArchetypeId] = (scores[archetype as ArchetypeId] || 0) + points;
      });
    });
  });

  // Find highest score
  let maxScore = 0;
  let result: ArchetypeId = 'explorer';
  
  Object.entries(scores).forEach(([archetype, score]) => {
    if (score > maxScore) {
      maxScore = score;
      result = archetype as ArchetypeId;
    }
  });

  return result;
}
