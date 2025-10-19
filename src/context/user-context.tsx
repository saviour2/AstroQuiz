"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { QuizTopic } from '@/lib/types';
import { isProfane } from '@/lib/profanity-filter';

const CURRENT_USER_KEY = 'cosmic-quizzer-currentUser';
const ALL_USERS_KEY = 'cosmic-quizzer-allUsers';

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;


export interface User {
  username: string;
  password?: string;
  scores: { [topic in QuizTopic]?: number };
  totalScore: number;
  isAdmin?: boolean;
}

interface UserContextType {
  currentUser: User | null;
  allUsers: User[];
  getLeaderboard: (topic?: QuizTopic) => User[];
  login: (username: string, password?: string) => void;
  signup: (username: string, password?: string) => void;
  logout: () => void;
  addPoints: (points: number, topic?: QuizTopic) => void;
  deleteUser: (username: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(ALL_USERS_KEY);
      const initialUsers = storedUsers ? JSON.parse(storedUsers) : [];
      
      const storedCurrentUserJSON = localStorage.getItem(CURRENT_USER_KEY);
      if (storedCurrentUserJSON) {
        const storedCurrentUser = JSON.parse(storedCurrentUserJSON);
        if (storedCurrentUser.username.toLowerCase() === ADMIN_USERNAME.toLowerCase() && storedCurrentUser.isAdmin) {
          setCurrentUser(storedCurrentUser);
        } else {
          const user = initialUsers.find((u: User) => u.username === storedCurrentUser.username);
          setCurrentUser(user || null);
        }
      }
      setAllUsers(initialUsers);
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const updateAllUsers = (updatedUsers: User[]) => {
    setAllUsers(updatedUsers);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(updatedUsers));
  }

  const login = useCallback((username: string, password?: string) => {
    if (username.toLowerCase() === ADMIN_USERNAME.toLowerCase()) {
        if (password === ADMIN_PASSWORD) {
            const adminUser: User = { username: ADMIN_USERNAME, totalScore: 0, scores: {}, isAdmin: true };
            setCurrentUser(adminUser);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
            return;
        } else {
            throw new Error("Incorrect admin password.");
        }
    } else {
        const user = allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());

        if (!user) {
            throw new Error("User not found. Please sign up.");
        }

        if (user.password !== password) {
          throw new Error("Incorrect password.");
        }
        
        setCurrentUser(user);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  }, [allUsers]);

  const signup = useCallback((username: string, password?: string) => {
    if (isProfane(username)) {
      throw new Error("Username contains inappropriate words. Please choose another.");
    }
    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters long.");
    }
    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
    }
    if (username.toLowerCase() === ADMIN_USERNAME.toLowerCase()) {
        throw new Error("This username is reserved.");
    }

    const existingUser = allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (existingUser) {
      throw new Error("Username is already taken. Please choose another.");
    }
    
    const newUser: User = { username, password, totalScore: 0, scores: {} };
    updateAllUsers([...allUsers, newUser]);
    
  }, [allUsers]);


  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
    window.location.href = '/';
  }, []);

  const addPoints = useCallback((points: number, topic?: QuizTopic) => {
    if (!currentUser || currentUser.isAdmin) return;
    
    const updatedUsers = allUsers.map(u => {
      if (u.username === currentUser.username) {
        const newTotalScore = u.totalScore + points;
        if (topic) {
          const newTopicScore = (u.scores?.[topic] || 0) + points;
          return { 
            ...u, 
            scores: { ...(u.scores || {}), [topic]: newTopicScore },
            totalScore: newTotalScore 
          };
        }
        return { ...u, totalScore: newTotalScore };
      }
      return u;
    });
    
    updateAllUsers(updatedUsers);
    const updatedCurrentUser = updatedUsers.find(u => u.username === currentUser.username);
    if(updatedCurrentUser) {
      setCurrentUser(updatedCurrentUser);
    }

  }, [currentUser, allUsers]);

  const getLeaderboard = useCallback((topic?: QuizTopic): User[] => {
    if (topic) {
      return [...allUsers]
        .filter(u => u.scores && u.scores[topic] && u.scores[topic]! > 0)
        .sort((a, b) => (b.scores?.[topic] || 0) - (a.scores?.[topic] || 0))
        .slice(0, 10);
    }
    return [...allUsers]
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);
  }, [allUsers]);

  const deleteUser = useCallback((username: string) => {
    if (!currentUser?.isAdmin) {
      throw new Error("You do not have permission to delete users.");
    }
    const updatedUsers = allUsers.filter(u => u.username !== username);
    updateAllUsers(updatedUsers);
  }, [currentUser, allUsers]);


  return (
    <UserContext.Provider value={{ currentUser, allUsers, getLeaderboard, login, signup, logout, addPoints, deleteUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
