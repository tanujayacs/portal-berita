import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";

const SearchResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const { data: filteredNews, isLoading, isError } = useQuery<NewsItem[], Error, NewsItem[]>({
    queryKey: ['allNews'],
    queryFn: getAllNews,
    enabled: !!query,
    select: (allNews) =>
      allNews.filter(
        (news) => news.judul.toLowerCase().includes(query)
      ),
  });

  return (
    <div>
      <Navbar />
      {/* FIX: Hapus 'max-w-6xl mx-auto' dan gunakan padding yang konsisten */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold mb-4">
          Hasil Pencarian untuk: <span className="text-blue-600">"{query}"</span>
        </h1>
        
        {isLoading ? (
          <p className="text-center">Mencari...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Terjadi kesalahan saat mencari.</p>
        ) : filteredNews && filteredNews.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada berita yang ditemukan.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews?.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
