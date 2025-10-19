"use client";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-primary/50 shadow-lg shadow-primary/20">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl text-primary" style={{textShadow: '0 0 8px hsl(var(--primary))'}}>Welcome, Cosmic Traveler</CardTitle>
                <CardDescription className="text-muted-foreground pt-2">Enter your call sign to begin your journey.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Your call sign..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-center text-lg h-12"
                        required
                        aria-label="Username"
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={!username.trim()}>
                        <LogIn className="mr-2"/>
                        Enter the Cosmos
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
