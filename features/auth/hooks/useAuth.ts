"use client";

import { useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn");
    const savedProfile = localStorage.getItem("userProfile");
    
    if (loginState === "true" && savedProfile) {
      const profile = JSON.parse(savedProfile);
      const updatedProfile = { 
        ...profile, 
        name: profile.role === 'admin' ? 'Admin' : (profile.name || 'Người dùng'),
        avatar: profile.role === 'admin' 
          ? 'https://i.pravatar.cc/150?img=5' 
          : (profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=e30019&color=fff&size=150`)
      };
      setIsLoggedIn(true);
      setUserProfile(updatedProfile);
    }
    setIsLoading(false);
  }, []);

  const login = (profile: UserProfile) => {
    const updatedProfile = { 
      ...profile, 
      name: profile.role === 'admin' ? 'Admin' : (profile.name || 'Người dùng'),
      avatar: profile.role === 'admin' 
        ? 'https://i.pravatar.cc/150?img=5' 
        : (profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=e30019&color=fff&size=150`)
    };
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setIsLoggedIn(true);
    setUserProfile(updatedProfile);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  const isAdmin = userProfile?.role === "admin";
  const isUser = userProfile?.role === "user";

  return {
    isLoggedIn,
    userProfile,
    isLoading,
    isAdmin,
    isUser,
    login,
    logout
  };
}
