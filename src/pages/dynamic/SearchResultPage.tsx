import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import ZentaraLayout from "@/layout/ZentaraLayout";
import { Search, FileText, Clock } from "lucide-react";

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
    <ZentaraLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Hasil Pencarian
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-2">
              Pencarian untuk: <span className="font-semibold text-blue-600">"{query}"</span>
            </p>
            {filteredNews && (
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                {filteredNews.length} berita ditemukan
              </p>
            )}
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mencari berita...
                </p>
              </div>
            ) : isError ? (
              <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <div className="text-red-600 mb-2">⚠️</div>
                  <p className="text-red-700 font-medium">Terjadi kesalahan saat mencari berita</p>
                  <p className="text-red-600 text-sm mt-2">Silakan coba lagi nanti</p>
                </div>
              </div>
            ) : filteredNews && filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">📰</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Tidak ada berita yang ditemukan
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Coba kata kunci yang berbeda atau periksa ejaan pencarian Anda
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNews?.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default SearchResultPage;