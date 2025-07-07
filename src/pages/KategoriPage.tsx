import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";

const KategoriPage = () => {
  const { kategori = "" } = useParams<{ kategori: string }>();

  const { data: filteredNews, isLoading, isError } = useQuery<NewsItem[], Error, NewsItem[]>({
    queryKey: ['allNews'],
    queryFn: getAllNews,
    select: (allNews) =>
      allNews.filter((item) => item.kategori.toLowerCase() === kategori.toLowerCase())
  });

  return (
    <div>
      <Navbar />
      {/* FIX: Hapus 'max-w-6xl mx-auto' dan gunakan padding yang konsisten */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          Kategori: {kategori}
        </h1>

        {isLoading ? (
          <p className="text-center">Memuat berita...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Gagal memuat berita.</p>
        ) : filteredNews && filteredNews.length === 0 ? (
          <p className="text-gray-500 text-center">Tidak ada berita di kategori ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews?.map((news) => (
              <NewsCard key={news.slug} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KategoriPage;
