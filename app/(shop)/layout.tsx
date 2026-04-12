import { CartProvider } from "@/features/cart";
import { FavoritesProvider } from "@/features/favorites";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  );
}
