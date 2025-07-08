// src/components/LatestNewsSection.tsx
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import { NewsItem } from "@/types/news";
import { TrendingUp, Clock } from "lucide-react";

const LatestNewsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="group animate-pulse">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const LatestNewsSection = () => {
  const { data: latestNews, isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ["latestNews"],
    queryFn: getAllNews,
    select: (allNews) => {
      const sorted = [...allNews].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      return sorted.slice(0, 4);
    },
  });

  return (
    <section className="my-16 px-6 md:px-20">
      {/* Minimalist Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Latest Hot News
          </h2>
          <p className="text-lg text-gray-600">Good for Curiosity</p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">UP TO DATE</span>
        </div>
      </div>

      {isLoading && <LatestNewsSkeleton />}

      {isError && (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-600 font-medium">Gagal memuat berita terbaru.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {latestNews?.map((news) => (
          <div
            key={news.id}
            className="transition-transform duration-300 hover:scale-[1.03]"
          >
            <NewsCard news={news} />
          </div>
        ))}
      </div>

      {!isLoading && !isError && (!latestNews || latestNews.length === 0) && (
        <div className="text-center py-20">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Latest News</h3>
            <p className="text-gray-500">Belum ada berita terbaru saat ini.</p>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-64"></div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
