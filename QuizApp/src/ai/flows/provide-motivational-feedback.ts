'use server';
/**
 * @fileOverview A motivational feedback AI agent.
 *
 * - provideMotivationalFeedback - A function that provides motivational feedback based on user performance.
 * - ProvideMotivationalFeedbackInput - The input type for the provideMotivationalFeedback function.
 * - ProvideMotivationalFeedbackOutput - The return type for the provideMotivationalFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideMotivationalFeedbackInputSchema = z.object({
  score: z.number().describe('The user\'s current score.'),
  questionsAnswered: z.number().describe('The number of questions the user has answered.'),
  totalQuestions: z.number().describe('The total number of questions in the quiz.'),
});
export type ProvideMotivationalFeedbackInput = z.infer<typeof ProvideMotivationalFeedbackInputSchema>;

const ProvideMotivationalFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Motivational feedback for the user.'),
});
export type ProvideMotivationalFeedbackOutput = z.infer<typeof ProvideMotivationalFeedbackOutputSchema>;

export async function provideMotivationalFeedback(input: ProvideMotivationalFeedbackInput): Promise<ProvideMotivationalFeedbackOutput> {
  return provideMotivationalFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideMotivationalFeedbackPrompt',
  input: {schema: ProvideMotivationalFeedbackInputSchema},
  output: {schema: ProvideMotivationalFeedbackOutputSchema},
  prompt: `You are a motivational quiz master. Provide feedback to the user based on their performance in the quiz.

  Score: {{{score}}}
  Questions Answered: {{{questionsAnswered}}}
  Total Questions: {{{totalQuestions}}}

  Consider their score, questions answered and total question to return encouraging and motivational feedback to encourage them to keep going.  Be brief. `,
});

const provideMotivationalFeedbackFlow = ai.defineFlow(
  {
    name: 'provideMotivationalFeedbackFlow',
    inputSchema: ProvideMotivationalFeedbackInputSchema,
    outputSchema: ProvideMotivationalFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
