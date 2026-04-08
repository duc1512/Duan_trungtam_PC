import BannerSection from "../components/home/BannerSection";
import FlashSale from "../components/home/FlashSale";
import BestSellers from "../components/home/BestSellers";
import PopularCategories from "../components/home/PopularCategories";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <BannerSection />
      <FlashSale />
      <BestSellers />
      <PopularCategories />
    </div>
  );
}