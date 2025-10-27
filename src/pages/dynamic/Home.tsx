import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import ZentaraLayout from "@/layout/ZentaraLayout";
import HeroSlider from "@/components/HeroSlider";
import LatestNewsSection from "@/components/section/LatestNewsSection";
import CategorySection from "@/components/section/CategorySection";
import NewsCard from "@/components/NewsCard";


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

  if (loading)
  return (
    <ZentaraLayout>
      <main className="px-6 md:px-20 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-700">
          Memuat Berita...
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-4 space-y-3 border border-gray-100"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </main>
    </ZentaraLayout>
  );


  const categorizedMap: Record<string, NewsItem[]> = {};
  newsList.forEach((item) => {
    const key = item.kategori.toLowerCase();
    if (!categorizedMap[key]) {
      categorizedMap[key] = [];
    }
    categorizedMap[key].push(item);
  });

  const eligibleCategories = Object.entries(categorizedMap)
    .filter(([_, items]) => items.length >= 3)
    .slice(0, 4); // maksimum 4 section

  {/* Semua Berita */ }
  <section className="my-16 px-6 md:px-20">
    <div className="flex justify-between items-center mb-10">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Semua Berita
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {newsList.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  </section>


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

        {/* Semua Berita - Section Baru */}
        <section className="my-16 px-6 md:px-20">
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Semua Berita
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newsList.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section> 

      </main>
    </ZentaraLayout>
  );
};

export default Home;
