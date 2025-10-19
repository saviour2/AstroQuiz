export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ScoreEntry {
  username: string;
  score: number;
  date: string;
}
