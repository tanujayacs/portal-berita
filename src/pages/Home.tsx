import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider"; // 1. Import HeroSlider
import LatestNewsSection from "@/components/section/LatestNewsSection";
import CategorySection from "@/components/section/CategorySection";


import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import { useBookmark } from "@/context/BookmarkContext";

const Home = () => {
  // 2. Hapus semua useEffect dan useState dari sini.
  // Biarkan setiap seksi mengelola datanya sendiri dengan useQuery.
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { bookmarks } = useBookmark();

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

  console.log("✅ Berita yang di-bookmark:", bookmarks);

  if (loading) return <p className="text-center mt-10">Loading berita...</p>;

  return (
    <div>
      <Navbar />
      <main>
        {/* 3. Tambahkan HeroSlider di sini */}
        <HeroSlider />

        {/* Seksi-seksi berita */}
        <LatestNewsSection />
        <CategorySection title="Hot News in" kategori="politik" />
        <CategorySection title="Popular in" kategori="kesehatan" />
        <CategorySection title="Awareness on" kategori="bencana alam" />

        {/* 4. Grid berita yang sebelumnya ada di sini dihapus */}

        {/* karena sudah ter-cover oleh seksi-seksi di atas. */}

        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {newsList.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
