import { ReactNode } from "react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  icon: ReactNode;
  gradient: string;
  image?: string;
}
