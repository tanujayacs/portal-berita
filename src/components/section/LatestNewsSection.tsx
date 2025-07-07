import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import { NewsItem } from "@/types/news";

// Komponen untuk UI loading (Skeleton)
const LatestNewsSkeleton = () => (
  <div className="grid md:grid-cols-3 gap-6">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="border rounded-lg bg-gray-100 animate-pulse">
        <div className="w-full h-60 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const LatestNewsSection = () => {
  // 1. Ganti useEffect + useState dengan satu hook useQuery.
  // 2. Logika sorting dan slicing dipindahkan ke opsi `select` agar lebih efisien.
  const { data: latestNews, isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ['latestNews'], // Kunci unik untuk query ini
    queryFn: getAllNews,
    select: (allNews) => {
      const sorted = [...allNews].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return sorted.slice(0, 4);
    }
  });

  return (
    <section className="my-10 px-6 md:px-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Latest Hot News</h2>
          <p className="text-lg text-gray-500">Good for Curiosity</p>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">UP TO DATE</span>
      </div>

      {/* 3. Tambahkan kondisi untuk loading dan error state */}
      {isLoading && <LatestNewsSkeleton />}
      {isError && <p className="text-red-500 text-center">Gagal memuat berita terbaru.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {latestNews?.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </section>
  );
};

export default LatestNewsSection;
