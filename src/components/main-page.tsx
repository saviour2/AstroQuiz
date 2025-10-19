"use client";
import { useUser } from "@/context/user-context";
import { Skeleton } from "./ui/skeleton";
import LoginForm from "./login-form";
import QuizWrapper from "./quiz-wrapper";
import Leaderboard from "./leaderboard";

export default function MainPage() {
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 pt-16">
        <Skeleton className="h-48 w-full max-w-md" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
            <div className="lg:col-span-2">
                <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-1">
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <QuizWrapper />
      </div>
      <div className="lg:col-span-1">
        <Leaderboard />
      </div>
    </div>
  );
}
