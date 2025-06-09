import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";
import LatestNewsSection from "@/components/section/LatestNewsSection";
// import AutomotiveSection from "@/components/section/AutomotiveSection";
// // import BusinessSection from "@/components/section/BusinessSection";
// import EntertainmentSection from "@/components/section/EntertainmentSection";
// import FoodSection from "@/components/section/FoodSection";
// import HealthSection from "@/components/section/HealthSection";
// import PoliticsSection from "@/components/section/PoliticsSection";
// import SportSection from "@/components/section/SportSection";

const Home = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getAllNews();
        console.log("✅ API response:", data);

        if (!Array.isArray(data)) {
          throw new Error("Data dari API bukan array, cek endpoint atau struktur response-nya!");
        }

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

  return (
    <div>
      <Navbar />
      <LatestNewsSection />
      {/* <AutomotiveSection />
      <EntertainmentSection /> */}
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>

  );
};

export default Home;
