"use client";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignupFormProps {
  onShowLogin: () => void;
}

export default function SignupForm({ onShowLogin }: SignupFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useUser();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Passwords do not match.",
      });
      return;
    }
    if (username.trim() && password.trim()) {
      try {
        signup(username.trim(), password.trim());
        toast({
          title: "Account Created!",
          description: "Please log in to continue.",
        });
        onShowLogin();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-primary/50 shadow-lg shadow-primary/20">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl text-primary" style={{textShadow: '0 0 8px hsl(var(--primary))'}}>Join the Cosmos</CardTitle>
                <CardDescription className="text-muted-foreground pt-2">Create your call sign to begin your journey.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Choose your call sign..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-center text-lg h-12"
                        required
                        aria-label="Username"
                    />
                    <Input
                        type="password"
                        placeholder="Set your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-center text-lg h-12"
                        required
                        aria-label="Password"
                    />
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-center text-lg h-12"
                        required
                        aria-label="Confirm Password"
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={!username.trim() || !password.trim() || !confirmPassword.trim()}>
                        <UserPlus className="mr-2"/>
                        Create Account
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
                <p>Already have a call sign?</p>
                <Button variant="link" onClick={onShowLogin} className="pl-2">Log In</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
