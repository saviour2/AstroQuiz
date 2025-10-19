"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { QuizTopic } from '@/lib/types';

const CURRENT_USER_KEY = 'cosmic-quizzer-currentUser';
const ALL_USERS_KEY = 'cosmic-quizzer-allUsers';

export interface User {
  username: string;
  scores: { [topic in QuizTopic]?: number };
  totalScore: number;
}

interface UserContextType {
  currentUser: User | null;
  getLeaderboard: (topic?: QuizTopic) => User[];
  login: (username: string) => void;
  logout: () => void;
  addPoints: (points: number, topic?: QuizTopic) => void;
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
      const allUsersData: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      setAllUsers(allUsersData);

      const storedCurrentUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedCurrentUser) {
        const foundUser = allUsersData.find((u: User) => u.username === storedCurrentUser);
        if (foundUser) {
          setCurrentUser(foundUser);
        }
      }
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

  const login = useCallback((username: string) => {
    let user = allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      user = { username, totalScore: 0, scores: {} };
      updateAllUsers([...allUsers, user]);
    }
    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER_KEY, user.username);
  }, [allUsers]);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  }, []);

  const addPoints = useCallback((points: number, topic?: QuizTopic) => {
    if (!currentUser) return;
    
    const updatedUsers = allUsers.map(u => {
      if (u.username === currentUser.username) {
        const newTotalScore = u.totalScore + points;
        if (topic) {
          const newTopicScore = ((u.scores && u.scores[topic]) || 0) + points;
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


  return (
    <UserContext.Provider value={{ currentUser, getLeaderboard, login, logout, addPoints, isLoading }}>
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
