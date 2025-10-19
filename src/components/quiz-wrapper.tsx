"use client";
import { useState } from "react";
import QuizSetup from "./quiz-setup";
import QuizSession from "./quiz-session";
import type { Question } from "@/lib/types";

export default function QuizWrapper() {
  const [quizState, setQuizState] = useState<'setup' | 'playing'>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topic, setTopic] = useState('');

  const startQuiz = (topic: string, generatedQuestions: Question[]) => {
    setTopic(topic);
    setQuestions(generatedQuestions);
    setQuizState('playing');
  };

  const endQuiz = () => {
    setQuizState('setup');
    setQuestions([]);
    setTopic('');
  };

  if (quizState === 'playing') {
    return <QuizSession topic={topic} questions={questions} onQuizEnd={endQuiz} />;
  }

  return <QuizSetup onQuizStart={startQuiz} />;
}
