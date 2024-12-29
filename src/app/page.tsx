import FavoriteGenres from "@/components/molecules/favorite";
import HeroSection from "@/components/molecules/hero";
import PopularNovels from "@/components/molecules/popular";
import RecentNovels from "@/components/molecules/recent";
import SecondaryHero from "@/components/molecules/secondary-hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SecondaryHero />
      <PopularNovels />
      <RecentNovels />
      <FavoriteGenres />
    </main>
  );
}
