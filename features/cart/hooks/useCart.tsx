"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import type { JSX } from "react";
import { useAuth } from "@/features/auth/hooks";

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
    if (isAuthLoading) return;
    
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

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isLoaded) return;
    
    const cartKey = getCartKey();
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(items));
    }
  }, [items, userProfile?.email, isLoaded]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1): boolean => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id);
      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          item.maxQuantity || 99
        );
        return currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
      }
      return [...currentItems, { ...item, quantity }];
    });
    return true;
  }, [isLoggedIn]);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((i) =>
        i.id === id ? { ...i, quantity: Math.min(quantity, i.maxQuantity || 99) } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    const cartKey = getCartKey();
    if (cartKey) {
      localStorage.removeItem(cartKey);
    }
  }, [userProfile?.email]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isInCart = useCallback((id: string) => items.some((i) => i.id === id), [items]);

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
