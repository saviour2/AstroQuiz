"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { generateQuizQuestions } from "@/lib/actions";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Loader2, Wand2 } from "lucide-react";
import type { Question } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
});

interface QuizSetupProps {
  onQuizStart: (topic: string, questions: Question[]) => void;
}

export default function QuizSetup({ onQuizStart }: QuizSetupProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    try {
      const questions = await generateQuizQuestions(values.topic, 5); // 5 questions for now
      if (questions && questions.length > 0) {
        onQuizStart(values.topic, questions);
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Could not generate a quiz for this topic. Please try another.",
        });
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while generating the quiz. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card className="bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Start a New Quiz</CardTitle>
        <CardDescription>Enter a topic and let our AI Quiz Master generate a challenge for you!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Solar System' or 'Black Holes'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Quiz'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
