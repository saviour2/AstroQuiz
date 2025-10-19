"use client";

import { useState, useEffect } from 'react';
import type { Question } from '@/lib/types';
import { provideMotivationalFeedback } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import QuizResults from './quiz-results';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizSessionProps {
  topic: string;
  questions: Question[];
  onQuizEnd: () => void;
}

export default function QuizSession({ topic, questions, onQuizEnd }: QuizSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (isAnswered) {
      const feedbackTimeout = setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          setShowResults(true);
        }
      }, 2000);

      const motivationalFeedbackTimeout = setTimeout(async () => {
        try {
          const feedback = await provideMotivationalFeedback(score, currentQuestionIndex + 1, totalQuestions);
          toast({
            title: 'Quiz Master says:',
            description: feedback,
          });
        } catch (error) {
          console.error("Could not get motivational feedback", error);
        }
      }, 1000);


      return () => {
        clearTimeout(feedbackTimeout);
        clearTimeout(motivationalFeedbackTimeout);
      };
    }
  }, [isAnswered, currentQuestionIndex, score, totalQuestions, toast]);
  
  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 10); // 10 points per correct answer
    }
    setIsAnswered(true);
  };

  if (showResults) {
    return <QuizResults score={score} totalQuestions={totalQuestions} onRestart={onQuizEnd} />;
  }
  
  if (!currentQuestion) return null;

  return (
    <Card className="w-full bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{topic} Quiz</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {totalQuestions}</CardDescription>
        <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium font-headline">{currentQuestion.question}</p>
        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={isAnswered}
        >
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedAnswer;
            
            return (
              <Label
                htmlFor={`option-${index}`}
                key={index}
                className={cn(
                  'flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-colors has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70',
                  isAnswered && isCorrect && 'border-accent bg-accent/10 text-accent',
                  isAnswered && isSelected && !isCorrect && 'border-destructive bg-destructive/10 text-destructive',
                  !isAnswered && 'cursor-pointer hover:bg-muted/50'
                )}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <span className="flex-1">{option}</span>
                {isAnswered && isCorrect && <CheckCircle className="text-accent" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="text-destructive" />}
              </Label>
            );
          })}
        </RadioGroup>

        <Button onClick={handleAnswerSubmit} disabled={selectedAnswer === null || isAnswered} className="w-full">
          Submit Answer
        </Button>
      </CardContent>
    </Card>
  );
}
