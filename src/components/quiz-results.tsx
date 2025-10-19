"use client";
import { useEffect } from 'react';
import { useUser } from '@/context/user-context';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PartyPopper } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const { addPoints } = useUser();

  useEffect(() => {
    addPoints(score);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const percentage = totalQuestions > 0 ? Math.round((score / (totalQuestions * 10)) * 100) : 0;

  return (
    <Card className="w-full text-center bg-card/70 backdrop-blur-sm border-primary/50 shadow-lg shadow-primary/20">
      <CardHeader>
        <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit">
            <PartyPopper size={48} className="text-primary" style={{filter: 'drop-shadow(0 0 8px hsl(var(--primary)))'}}/>
        </div>
        <CardTitle className="font-headline text-3xl pt-4">Quiz Complete!</CardTitle>
        <CardDescription>You've navigated the cosmos of knowledge.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <p className="text-muted-foreground">Your Score</p>
            <p className="text-5xl font-bold text-primary" style={{textShadow: '0 0 8px hsl(var(--primary))'}}>{score}</p>
            <p className="text-lg text-accent" style={{textShadow: '0 0 8px hsl(var(--accent))'}}>{percentage}% accuracy</p>
        </div>
        <Button onClick={onRestart} size="lg" className="w-full">
          Play Another Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
