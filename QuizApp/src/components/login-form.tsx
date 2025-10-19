"use client";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onShowSignup: () => void;
}

export default function LoginForm({ onShowSignup }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      try {
        login(username.trim(), password.trim());
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message,
        });
      }
    }
  };

  return (
      <Card className="w-full bg-card/70 backdrop-blur-sm border-primary/50 shadow-lg shadow-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-primary" style={{textShadow: '0 0 8px hsl(var(--primary))'}}>Welcome Back, Traveler</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">Enter your call sign and password to continue your journey.</CardDescription>
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
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center text-lg h-12"
              required
              aria-label="Password"
            />
            <Button type="submit" size="lg" className="w-full" disabled={!username.trim() || !password.trim()}>
              <LogIn className="mr-2"/>
              Enter the Cosmos
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
            <p>New to the cosmos?</p>
            <Button variant="link" onClick={onShowSignup} className="pl-2">Sign Up</Button>
        </CardFooter>
      </Card>
  );
}
