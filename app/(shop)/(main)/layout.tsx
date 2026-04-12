import { Header, Navigation, Footer } from "@/components/common";
import { CartProvider } from "@/features/cart";
import { FavoritesProvider } from "@/features/favorites";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-[#f1f2f6] text-gray-800 font-sans">
          <Header />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#22c55e",
                color: "#fff",
                border: "none",
              },
            }}
          />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}
