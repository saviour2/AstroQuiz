"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const CURRENT_USER_KEY = 'cosmic-quizzer-currentUser';
const ALL_USERS_KEY = 'cosmic-quizzer-allUsers';

export interface User {
  username: string;
  totalScore: number;
}

interface UserContextType {
  currentUser: User | null;
  leaderboard: User[];
  login: (username: string) => void;
  logout: () => void;
  addPoints: (points: number) => void;
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
    updatedUsers.sort((a, b) => b.totalScore - a.score);
    setAllUsers(updatedUsers);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(updatedUsers));
  }

  const login = useCallback((username: string) => {
    let user = allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      user = { username, totalScore: 0 };
      updateAllUsers([...allUsers, user]);
    }
    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER_KEY, user.username);
  }, [allUsers]);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  }, []);

  const addPoints = useCallback((points: number) => {
    if (!currentUser) return;
    
    const updatedUsers = allUsers.map(u => 
      u.username === currentUser.username
        ? { ...u, totalScore: u.totalScore + points }
        : u
    );
    
    updateAllUsers(updatedUsers);
    const updatedCurrentUser = updatedUsers.find(u => u.username === currentUser.username);
    if(updatedCurrentUser) {
      setCurrentUser(updatedCurrentUser);
    }

  }, [currentUser, allUsers]);

  const leaderboard = allUsers.sort((a, b) => b.totalScore - a.totalScore).slice(0, 10);

  return (
    <UserContext.Provider value={{ currentUser, leaderboard, login, logout, addPoints, isLoading }}>
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
