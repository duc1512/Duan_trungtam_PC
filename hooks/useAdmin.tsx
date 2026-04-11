"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { products as initialProducts } from "@/data/products";

// Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "banned";
  joinDate: string;
  orders: number;
  totalSpent: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  status: "active" | "inactive" | "out_of_stock";
}

// Initial mock data
const initialUsers: AdminUser[] = [
  { id: "1", name: "Admin", email: "admin@gmail.com", phone: "0901234567", role: "admin", status: "active", joinDate: "2023-01-01", orders: 0, totalSpent: 0 },
  { id: "2", name: "Đức", email: "user@gmail.com", phone: "0912345678", role: "user", status: "active", joinDate: "2023-06-15", orders: 12, totalSpent: 125000000 },
  { id: "3", name: "Nguyễn Văn A", email: "nva@email.com", phone: "0923456789", role: "user", status: "active", joinDate: "2023-08-20", orders: 5, totalSpent: 45000000 },
  { id: "4", name: "Trần Thị B", email: "ttb@email.com", phone: "0934567890", role: "user", status: "inactive", joinDate: "2023-09-10", orders: 2, totalSpent: 12000000 },
  { id: "5", name: "Lê Văn C", email: "lvc@email.com", phone: "0945678901", role: "user", status: "banned", joinDate: "2023-10-05", orders: 0, totalSpent: 0 },
];

const initialOrders: AdminOrder[] = [
  { id: "ORD-001", customerName: "Nguyễn Văn A", customerEmail: "nguyenvana@email.com", date: "2024-04-05", total: 44990000, status: "delivered", items: 1 },
  { id: "ORD-002", customerName: "Trần Thị B", customerEmail: "tranthib@email.com", date: "2024-04-05", total: 32990000, status: "shipped", items: 1 },
  { id: "ORD-003", customerName: "Lê Văn C", customerEmail: "levanc@email.com", date: "2024-04-04", total: 79990000, status: "processing", items: 2 },
  { id: "ORD-004", customerName: "Phạm Thị D", customerEmail: "phamthid@email.com", date: "2024-04-04", total: 15490000, status: "pending", items: 1 },
  { id: "ORD-005", customerName: "Hoàng Văn E", customerEmail: "hoangvane@email.com", date: "2024-04-03", total: 38990000, status: "cancelled", items: 1 },
];

// Local storage keys
const USERS_KEY = "admin_users";
const ORDERS_KEY = "admin_orders";
const PRODUCTS_KEY = "admin_products";

interface AdminContextType {
  users: AdminUser[];
  orders: AdminOrder[];
  products: AdminProduct[];
  // Users CRUD
  addUser: (user: Omit<AdminUser, "id" | "joinDate" | "orders" | "totalSpent">) => void;
  updateUser: (id: string, user: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  banUser: (id: string) => void;
  unbanUser: (id: string) => void;
  // Products CRUD
  addProduct: (product: Omit<AdminProduct, "id">) => void;
  updateProduct: (id: string, product: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  // Orders CRUD
  addOrder: (order: Omit<AdminOrder, "id">) => void;
  updateOrder: (id: string, order: Partial<AdminOrder>) => void;
  deleteOrder: (id: string) => void;
  updateOrderStatus: (id: string, status: AdminOrder["status"]) => void;
}

const AdminContext = React.createContext<AdminContextType | null>(null);

import React from "react";

export function AdminProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage or use initial data
  const [users, setUsers] = useState<AdminUser[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(USERS_KEY);
      return saved ? JSON.parse(saved) : initialUsers;
    }
    return initialUsers;
  });

  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : initialOrders;
    }
    return initialOrders;
  });

  const [products, setProducts] = useState<AdminProduct[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      if (saved) return JSON.parse(saved);
      // Transform initial products to include status
      return initialProducts.map((p) => ({
        ...p,
        status: p.stock === 0 ? "out_of_stock" : "active",
      })) as AdminProduct[];
    }
    return initialProducts.map((p) => ({
      ...p,
      status: p.stock === 0 ? "out_of_stock" : "active",
    })) as AdminProduct[];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  // Users CRUD
  const addUser = useCallback((userData: Omit<AdminUser, "id" | "joinDate" | "orders" | "totalSpent">) => {
    const newUser: AdminUser = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split("T")[0],
      orders: 0,
      totalSpent: 0,
    };
    setUsers((prev) => [...prev, newUser]);
  }, []);

  const updateUser = useCallback((id: string, userData: Partial<AdminUser>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...userData } : user))
    );
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  const banUser = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: "banned" as const } : user))
    );
  }, []);

  const unbanUser = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: "active" as const } : user))
    );
  }, []);

  // Products CRUD
  const addProduct = useCallback((productData: Omit<AdminProduct, "id">) => {
    const newProduct: AdminProduct = {
      ...productData,
      id: `prod_${Date.now()}`,
    };
    setProducts((prev) => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((id: string, productData: Partial<AdminProduct>) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, ...productData } : product))
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  // Orders CRUD
  const addOrder = useCallback((orderData: Omit<AdminOrder, "id">) => {
    const newOrder: AdminOrder = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-6)}`,
    };
    setOrders((prev) => [...prev, newOrder]);
  }, []);

  const updateOrder = useCallback((id: string, orderData: Partial<AdminOrder>) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, ...orderData } : order))
    );
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  }, []);

  const value: AdminContextType = {
    users,
    orders,
    products,
    addUser,
    updateUser,
    deleteUser,
    banUser,
    unbanUser,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = React.useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
