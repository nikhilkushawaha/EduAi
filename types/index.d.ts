interface Feedback {
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

interface Learned {
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

interface CreateFeedbackParams {
  learnId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface LearningCardProps {
  learnId?: string;
  userId?: string;
  background: string;
  topic: string;
  type: string;
  level: string;
  createdAt?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  learnId?: string;
  feedbackId?: string;
  type: "generate" | "learn";
  questions?: string[];
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByLearningIdParams {
  learnId: string;
  userId: string;
}

interface GetLatestLearningsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface LearningFormProps {
  learnId: string;
  background: string;
  topic: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}
