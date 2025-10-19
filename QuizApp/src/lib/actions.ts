'use server';

import { generateQuizQuestions as generateQuizQuestionsFlow } from '@/ai/flows/generate-quiz-questions';
import { provideMotivationalFeedback as provideMotivationalFeedbackFlow } from '@/ai/flows/provide-motivational-feedback';
import type { Question } from '@/lib/types';

export async function generateQuizQuestions(topic: string, numQuestions: number): Promise<Question[]> {
  const result = await generateQuizQuestionsFlow({ topic, numQuestions });
  return result.questions;
}

export async function provideMotivationalFeedback(score: number, questionsAnswered: number, totalQuestions: number): Promise<string> {
  const result = await provideMotivationalFeedbackFlow({ score, questionsAnswered, totalQuestions });
  return result.feedback;
}
