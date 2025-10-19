"use client";
import { useUser } from "@/context/user-context";
import { Skeleton } from "./ui/skeleton";
import AuthPage from "./auth-page";
import QuizWrapper from "./quiz-wrapper";
import Leaderboard from "./leaderboard";
import { QuizTopic } from "@/lib/types";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function MainPage() {
  const { currentUser, isLoading } = useUser();
  const [leaderboardTopic, setLeaderboardTopic] = useState<QuizTopic | 'grand'>('grand');

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
    return <AuthPage />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <QuizWrapper />
      </div>
      <div className="lg:col-span-1 space-y-8">
        <Tabs defaultValue="grand" onValueChange={(value) => setLeaderboardTopic(value as QuizTopic | 'grand')}>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="grand">Overall</TabsTrigger>
                <TabsTrigger value="Solar System">Solar System</TabsTrigger>
                <TabsTrigger value="Black Holes">Black Holes</TabsTrigger>
            </TabsList>
            <TabsContent value="grand">
                <Leaderboard />
            </TabsContent>
            <TabsContent value="Solar System">
                <Leaderboard topic="Solar System" />
            </TabsContent>
            <TabsContent value="Black Holes">
                <Leaderboard topic="Black Holes" />
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
