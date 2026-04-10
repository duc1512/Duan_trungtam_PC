"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import type { JSX } from "react";
import { useAuth } from "./useAuth";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxQuantity?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (id: string) => boolean;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isLoggedIn, userProfile, isLoading: isAuthLoading } = useAuth();

  // Get cart key based on user email
  const getCartKey = () => {
    if (userProfile?.email) {
      return `cart_${userProfile.email}`;
    }
    return null;
  };

  // Load cart from localStorage when user changes (after auth is loaded)
  useEffect(() => {
    if (isAuthLoading) return; // Wait for auth to finish loading
    
    const cartKey = getCartKey();
    if (cartKey) {
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
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

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      const cartKey = getCartKey();
      if (cartKey) {
        localStorage.setItem(cartKey, JSON.stringify(items));
      }
    }
  }, [items, isLoaded, userProfile?.email]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1): boolean => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxQuantity || 99) }
            : i
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
    return true;
  }, [isLoggedIn, setShowLoginModal]);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 99) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Clear cart only when user logs out (not when logging in)
  const prevIsLoggedIn = useRef(isLoggedIn);
  useEffect(() => {
    if (prevIsLoggedIn.current && !isLoggedIn) {
      // User just logged out
      setItems([]);
    }
    prevIsLoggedIn.current = isLoggedIn;
  }, [isLoggedIn]);

  const isInCart = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
