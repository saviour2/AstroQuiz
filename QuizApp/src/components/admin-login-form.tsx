"use client";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const { loginAdmin } = useUser();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      try {
        // Securely check against the environment variable.
        if (password.trim() === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          loginAdmin();
          toast({
            title: "Admin Login Successful",
            description: "Welcome, Admin!",
          });
        } else {
          throw new Error("Incorrect admin password.");
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Admin Login Failed",
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="w-full bg-card/70 backdrop-blur-sm border-destructive/50 shadow-lg shadow-destructive/20">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl text-destructive" style={{textShadow: '0 0 8px hsl(var(--destructive))'}}>Admin Access</CardTitle>
        <CardDescription className="text-muted-foreground pt-2">Enter the master password to access the admin panel.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="password"
            placeholder="Master Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-center text-lg h-12"
            required
            aria-label="Password"
          />
          <Button type="submit" variant="destructive" size="lg" className="w-full" disabled={!password.trim()}>
            <Shield className="mr-2"/>
            Authenticate
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
