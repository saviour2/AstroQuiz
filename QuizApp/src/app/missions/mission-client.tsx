"use client";

import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Star, ArrowLeft } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function MissionClient() {
    const { addPoints, currentUser } = useUser();
    const { toast } = useToast();

    const handleCompleteMission = () => {
        const points = 50;
        addPoints(points);
        toast({
            title: "Mission Accomplished!",
            description: `You've earned ${points} points for exploring the nebula!`,
        });
    };
    
    if (!currentUser) {
        return (
            <Card className="text-center bg-card/70 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline">Access Denied</CardTitle>
                    <CardDescription>Please log in to access missions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2" />
                            Return to Login
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const missionImage = PlaceHolderImages.find(img => img.id === "deep-space-nebula");

    return (
        <div className="flex justify-center items-center">
            <Card className="w-full max-w-2xl bg-card/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <Button variant="ghost" asChild className="absolute top-4 left-4 text-muted-foreground hover:text-foreground">
                        <Link href="/">
                            <ArrowLeft className="mr-2" />
                            Back to Quizzes
                        </Link>
                    </Button>
                    <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2 text-accent pt-10" style={{textShadow: '0 0 8px hsl(var(--accent))'}}>
                        <Rocket /> Special Mission
                    </CardTitle>
                    <CardDescription>Explore the Eagle Nebula</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    {missionImage && (
                        <div className="overflow-hidden rounded-lg border border-primary/30">
                            <Image 
                                src={missionImage.imageUrl} 
                                alt={missionImage.description} 
                                width={800} 
                                height={600} 
                                className="w-full h-auto object-cover"
                                data-ai-hint={missionImage.imageHint}
                            />
                        </div>
                    )}
                    <p className="text-muted-foreground">
                        Journey to the Pillars of Creation within the Eagle Nebula. Your mission is to observe the star-forming region and report back. Completing this will earn you bonus points.
                    </p>
                    <Button size="lg" onClick={handleCompleteMission}>
                        <Star className="mr-2" />
                        Complete Mission & Claim 50 Points
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
