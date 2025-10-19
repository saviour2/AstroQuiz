"use client";

import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, ArrowLeft, Trash2, User as UserIcon } from "lucide-react";
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminClient() {
    const { currentUser, allUsers, deleteUser } = useUser();
    const { toast } = useToast();

    if (!currentUser || !currentUser.isAdmin) {
        return (
            <Card className="text-center bg-card/70 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline">Access Denied</CardTitle>
                    <CardDescription>You do not have permission to view this page.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2" />
                            Return Home
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }
    
    const regularUsers = allUsers.filter(user => !user.isAdmin);

    const handleDeleteUser = (username: string) => {
        try {
            deleteUser(username);
            toast({
                title: "User Deleted",
                description: `User "${username}" has been removed.`,
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Could not delete user.",
            });
        }
    };

    return (
        <div className="flex justify-center items-start">
            <Card className="w-full max-w-4xl bg-card/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <Button variant="ghost" asChild className="absolute top-4 left-4 text-muted-foreground hover:text-foreground">
                        <Link href="/">
                            <ArrowLeft className="mr-2" />
                            Back to Quizzes
                        </Link>
                    </Button>
                    <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2 text-destructive pt-10" style={{textShadow: '0 0 8px hsl(var(--destructive))'}}>
                        <Shield /> Admin Panel
                    </CardTitle>
                    <CardDescription>User Management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   {regularUsers.length > 0 ? (
                        <ul className="space-y-3">
                            {regularUsers.map(user => (
                                <li key={user.username} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                                    <div className="flex items-center gap-3">
                                        <UserIcon className="text-primary"/>
                                        <div>
                                            <p className="font-semibold">{user.username}</p>
                                            <p className="text-sm text-muted-foreground">Total Score: {user.totalScore}</p>
                                        </div>
                                    </div>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon">
                                            <Trash2 size={16} />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the user account for "{user.username}" and all their data.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDeleteUser(user.username)}>
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">No users to display.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
