import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../../hooks/useCart";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#f1f2f6] text-gray-800 font-sans">
        <Header />
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#22c55e',
              color: '#fff',
              border: 'none',
            },
          }}
        />
      </div>
    </CartProvider>
  );
}
