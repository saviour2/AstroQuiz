"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import AdminLoginForm from "./admin-login-form";
import UserAuthWrapper from "./user-auth-wrapper";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
        <Tabs defaultValue="user" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
                <UserAuthWrapper />
            </TabsContent>
            <TabsContent value="admin">
                <AdminLoginForm />
            </TabsContent>
        </Tabs>
    </div>
  );
}
