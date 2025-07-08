import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import ZentaraLayout from "@/layout/ZentaraLayout";
import HeroSlider from "@/components/HeroSlider";
import LatestNewsSection from "@/components/section/LatestNewsSection";
import CategorySection from "@/components/section/CategorySection";

const Home = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getAllNews();
        setNewsList(data);
      } catch (error) {
        console.error("❌ Gagal fetch berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading berita...</p>;

  // 🧠 Proses data: kelompokkan berdasarkan kategori
  const categorizedMap: Record<string, NewsItem[]> = {};
  newsList.forEach((item) => {
    const key = item.kategori.toLowerCase();
    if (!categorizedMap[key]) {
      categorizedMap[key] = [];
    }
    categorizedMap[key].push(item);
  });

  // 🔍 Filter kategori yang punya ≥3 berita dan ambil 4 kategori pertama
  const eligibleCategories = Object.entries(categorizedMap)
    .filter(([_, items]) => items.length >= 3)
    .slice(0, 4); // maksimum 4 section

  return (
    <ZentaraLayout>
      <main>
        <HeroSlider />
        <LatestNewsSection />
        {eligibleCategories.map(([kategori]) => (
          <CategorySection
            key={kategori}
            title={`Berita Terkini di`}
            kategori={kategori}
          />
        ))}
      </main>
    </ZentaraLayout>
  );
};

export default Home;
