"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useAuth } from "./useAuth";

// ==================== TYPES ====================
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

  // Get favorites key based on user email
  const getFavoritesKey = () => {
    if (userProfile?.email) {
      return `favorites_${userProfile.email}`;
    }
    return null;
  };

  // Load favorites from localStorage when user changes (after auth is loaded)
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

  // Save favorites to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      const favoritesKey = getFavoritesKey();
      if (favoritesKey) {
        localStorage.setItem(favoritesKey, JSON.stringify(items));
      }
    }
  }, [items, isLoaded, userProfile?.email]);

  const addToFavorites = useCallback((product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    inStock: boolean;
  }): boolean => {
    if (!isLoggedIn) {
      return false;
    }

    setItems((prevItems) => {
      // Check if already in favorites
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems; // Already exists, don't add duplicate
      }

      const newItem: FavoriteItem = {
        ...product,
        addedAt: new Date().toISOString(),
      };

      return [...prevItems, newItem];
    });

    return true;
  }, [isLoggedIn]);

  const removeFromFavorites = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const isInFavorites = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const clearFavorites = useCallback(() => {
    setItems([]);
  }, []);

  // Clear favorites when user logs out
  useEffect(() => {
    if (!isLoggedIn && isLoaded) {
      setItems([]);
    }
  }, [isLoggedIn, isLoaded]);

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
