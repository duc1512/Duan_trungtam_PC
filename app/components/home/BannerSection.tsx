import MainBanner from "./MainBanner";
import FeaturedProducts from "./FeaturedProducts";
import SideBanners from "./SideBanners";

export default function BannerSection() {
  return (
    <section className="flex flex-col md:flex-row gap-4">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Main Banner */}
        <MainBanner />
        
        {/* Featured Products */}
        <FeaturedProducts />
      </div>

      {/* Right Banners */}
      <SideBanners />
    </section>
  );
}
