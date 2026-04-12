export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  image?: string;
  description?: string;
  specifications?: ProductSpec[];
  features?: string[];
  stock: number;
  sku?: string;
  warranty?: string;
  category: string;
  categoryId?: string;
  specs?: Record<string, string>;
  inStock?: boolean;
  status?: "active" | "inactive" | "out_of_stock";
  sales?: number;
  badge?: string;
}

export interface CategoryInfo {
  name: string;
  description: string;
}
