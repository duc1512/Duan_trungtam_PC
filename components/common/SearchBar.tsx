"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products, formatPrice } from "@/data/products";
import type { Product } from "@/data/products";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Search products based on query
  const searchProducts = useCallback((searchQuery: string): Product[] => {
    if (!searchQuery.trim()) return [];
    
    const lowerQuery = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.brand.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8); // Limit to 8 suggestions
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const results = searchProducts(value);
      setSuggestions(results);
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          // Navigate to product detail
          router.push(`/product/${suggestions[highlightedIndex].id}`);
          setIsOpen(false);
          setQuery("");
        } else if (query.trim()) {
          // Navigate to search page
          router.push(`/search?q=${encodeURIComponent(query)}`);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle product click
  const handleProductClick = (productId: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/product/${productId}`);
  };

  // Handle search button click
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder="Bạn cần tìm linh kiện, máy tính gì hôm nay?"
          className="w-full border-2 border-white bg-white/90 rounded-md py-2.5 pl-4 pr-12 focus:outline-none focus:ring-0 text-sm text-gray-800 placeholder-gray-600"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#e30019] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (query.trim() || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          {suggestions.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              {/* Product Suggestions */}
              <div className="py-2">
                <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sản phẩm gợi ý
                </div>
                {suggestions.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors ${
                      index === highlightedIndex
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder-product.png"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">
                          {product.brand}
                        </span>
                        <span className="text-xs text-gray-300">|</span>
                        <span className="text-sm font-semibold text-[#e30019]">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* View All Results */}
              <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
                <button
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="w-full text-center text-sm text-[#e30019] font-medium hover:underline"
                >
                  Xem tất cả kết quả cho &quot;{query}&quot;
                </button>
              </div>
            </div>
          ) : (
            // No results
            <div className="px-4 py-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                Không tìm thấy sản phẩm nào
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Thử tìm kiếm với từ khóa khác
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
