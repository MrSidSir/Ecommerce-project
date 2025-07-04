import HeroSlider from '../src/components/Hero/HeroSlider';
import FlashSales from "@/components/FlashSales/FlashSales";
import BrowseCategory from '@/components/Category/BrowseCategory';
import BestSellerSlider from '@/components/BestSelling/BestSelling';
import CategoryOfferSection from '@/components/Category/CategoryOfferSection';
import OurProducts from '@/components/products/ourproducts';
import FeaturedNewArrival from '@/components/feature/FeaturedNewArrival';
import ServicesFeatures from '@/components/feature/ServicesFeatures';
import CategoryDropdown from '@/components/CategoryDropdown/CategoryDropdown';
import CartItem from '../src/components/cart/CartItem';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <HeroSlider />
      <FlashSales />
      <BrowseCategory />
      <BestSellerSlider />
      <CategoryOfferSection />
      <OurProducts />
      <FeaturedNewArrival />
      <ServicesFeatures />
      <CategoryDropdown />
    </div>
  );
}
