"use client";

import Link from "next/link";
import { Rocket, Trophy, LogOut, Sparkles, Shield, Orbit } from "lucide-react";
import { useUser } from "@/context/user-context";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Header = () => {
  const { currentUser, logout } = useUser();

  return (
    <header className="py-4 px-4 sm:px-8 flex justify-between items-center bg-background/50 backdrop-blur-sm border-b border-border/50">
      <Link href="/" className="flex items-center gap-3">
        <Rocket className="text-primary" size={32} style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}}/>
        <h1 className="text-2xl font-headline font-bold text-primary-foreground" style={{textShadow: '0 0 8px hsl(var(--primary))'}}>
          Cosmic Quizzer
        </h1>
      </Link>
      <nav className="flex items-center gap-2">
        {currentUser && (
          <>
            {currentUser.isAdmin && (
               <Button variant="destructive" asChild>
                <Link href="/admin">
                    <Shield className="mr-2"/> Admin Panel
                </Link>
            </Button>
            )}
            <div className="hidden sm:flex items-center gap-4 text-sm bg-card/50 px-4 py-2 rounded-lg border border-border/50">
              <span className="font-medium text-foreground">{currentUser.username}</span>
              <span className="flex items-center gap-1 font-bold text-accent" style={{textShadow: '0 0 8px hsl(var(--accent))'}}>
                <Trophy size={16} />
                {currentUser.totalScore} pts
              </span>
            </div>
            <Button variant="ghost" asChild className="text-accent hover:bg-accent/10 hover:text-accent" style={{textShadow: '0 0 8px hsl(var(--accent))'}}>
                <Link href="/missions">
                    <Sparkles className="mr-2"/> Missions
                </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground hover:text-foreground">
              <LogOut size={18} />
              <span className="sr-only">Log Out</span>
            </Button>
          </>
        )}
        <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild 
                className="text-accent hover:bg-accent hover:text-accent-foreground animate-pulse"
                style={{
                    filter: 'drop-shadow(0 0 3px hsl(var(--accent)))',
                    animationDuration: '3s'
                }}
              >
                <a href="https://solarxplorer.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Orbit size={18} />
                  <span className="sr-only">Go to SolarXplorer</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Explore SolarXplorer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </header>
  );
};

export default Header;
