import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";

const SearchResultPage = () => {
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const allNews = await getAllNews();
        const filtered = allNews.filter(
          (news) =>
            news.judul.toLowerCase().includes(query) //keyword yang dicari hanya judul saja
          // ||
          //   news.kategori.toLowerCase().includes(query) 
        );
        setFilteredNews(filtered);
      } catch (err) {
        console.error("Gagal mengambil data berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilter();
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Hasil Pencarian untuk: "{query}"</h1>
        {loading ? (
          <p>Loading...</p>
        ) : filteredNews.length === 0 ? (
          <p>Tidak ada berita yang ditemukan.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;