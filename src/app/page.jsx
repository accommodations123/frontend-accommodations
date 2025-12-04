import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/features/Hero";
// import { CategoryStrip } from "@/components/features/CategoryStrip";
import { FeaturedListings } from "@/components/features/FeaturedListings";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <CategoryStrip /> */}
      <FeaturedListings />
      <Footer />
    </main>
  );
}
