import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";

const KategoriPage = () => {
  const { kategori } = useParams<{ kategori: string }>();
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getAllNews();
        const filtered = data.filter((item) =>
          item.kategori.toLowerCase() === kategori?.toLowerCase()
        );
        setFilteredNews(filtered);
      } catch (error) {
        console.error("Gagal ambil data berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [kategori]);

  return (
    <div>
      <Navbar />
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold mb-4 capitalize text-center">Explore Our {kategori} News</h1>

        {loading ? (
          <p>Loading...</p>
        ) : filteredNews.length === 0 ? (
          <p className="text-gray-500">Tidak ada berita di kategori ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.slug} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default KategoriPage;
