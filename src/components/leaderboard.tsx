"use client";

import { useUser } from "@/context/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Trophy } from "lucide-react";

export default function Leaderboard() {
  const { leaderboard } = useUser();

  return (
    <Card className="bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl text-accent" style={{textShadow: '0 0 8px hsl(var(--accent))'}}>
          <Trophy />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboard.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user, index) => (
                <TableRow key={user.username}>
                  <TableCell className="font-bold text-lg text-accent">{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell className="text-right font-bold text-accent">{user.totalScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-center py-8">No scores yet. Be the first!</p>
        )}
      </CardContent>
    </Card>
  );
}
