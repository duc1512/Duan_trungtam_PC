"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks";

export interface FavoriteItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  addedAt: string;
  inStock: boolean;
}

interface FavoritesContextType {
  items: FavoriteItem[];
  addToFavorites: (product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    inStock: boolean;
  }) => boolean;
  removeFromFavorites: (id: string) => void;
  isInFavorites: (id: string) => boolean;
  clearFavorites: () => void;
  totalItems: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isLoggedIn, userProfile, isLoading: isAuthLoading } = useAuth();

  const getFavoritesKey = () => {
    if (userProfile?.email) {
      return `favorites_${userProfile.email}`;
    }
    return null;
  };

  useEffect(() => {
    if (isAuthLoading) return;
    
    const favoritesKey = getFavoritesKey();
    if (favoritesKey) {
      const savedFavorites = localStorage.getItem(favoritesKey);
      if (savedFavorites) {
        try {
          setItems(JSON.parse(savedFavorites));
        } catch {
          setItems([]);
        }
      } else {
        setItems([]);
      }
    } else {
      setItems([]);
    }
    setIsLoaded(true);
  }, [userProfile?.email, isAuthLoading]);

  useEffect(() => {
    if (!isLoaded) return;
    
    const favoritesKey = getFavoritesKey();
    if (favoritesKey) {
      localStorage.setItem(favoritesKey, JSON.stringify(items));
    }
  }, [items, userProfile?.email, isLoaded]);

  const addToFavorites = useCallback((product: Omit<FavoriteItem, 'addedAt'>): boolean => {
    if (!isLoggedIn) return false;

    setItems((currentItems) => {
      if (currentItems.some((i) => i.id === product.id)) {
        return currentItems;
      }
      return [...currentItems, { ...product, addedAt: new Date().toISOString() }];
    });
    return true;
  }, [isLoggedIn]);

  const removeFromFavorites = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((i) => i.id !== id));
  }, []);

  const isInFavorites = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const clearFavorites = useCallback(() => {
    setItems([]);
    const favoritesKey = getFavoritesKey();
    if (favoritesKey) {
      localStorage.removeItem(favoritesKey);
    }
  }, [userProfile?.email]);

  const totalItems = items.length;

  return (
    <FavoritesContext.Provider
      value={{
        items,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        clearFavorites,
        totalItems,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
