"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function AuthPage() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  if (isSigningUp) {
    return <SignupForm onShowLogin={() => setIsSigningUp(false)} />;
  }

  return <LoginForm onShowSignup={() => setIsSigningUp(true)} />;
}
