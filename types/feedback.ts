// types/index.ts

export interface Feedback {
  id: string;
  learnId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

export interface Learned{
  id: string;
  background: string;
  topic: string;
  level: string;
  questions: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}
