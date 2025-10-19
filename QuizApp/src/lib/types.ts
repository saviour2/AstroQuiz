export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ScoreEntry {
  username: string;
  score: number;
  date: string;
  topic: string;
}

export type QuizTopic = 'Solar System' | 'Black Holes' | 'Cosmology' | 'Astrophysics' | 'Galaxies';

export const quizTopics: QuizTopic[] = ['Solar System', 'Black Holes', 'Cosmology', 'Astrophysics', 'Galaxies'];
