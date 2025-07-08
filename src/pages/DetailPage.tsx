import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import ZentaraLayout from "@/layout/ZentaraLayout";
import NewsCard from "@/components/NewsCard";
import { getOptimizedDriveThumbnail } from "@/lib/utils";
import { getTopKRecommendations } from "@/utils/tfidf";

const DetailPageSkeleton = () => (
  <ZentaraLayout>
    <div className="animate-pulse">
      {/* Skeleton untuk header */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 text-center">
        <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="flex justify-center space-x-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Skeleton untuk gambar utama */}
      <div className="w-full h-64 md:h-96 bg-gray-200"></div>

      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Konten utama */}
          <div className="lg:col-span-8 space-y-4">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Sidebar artikel penulis */}
          <div className="lg:col-span-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-md p-3">
                <div className="h-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Rekomendasi berita */}
        <div className="mt-12">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </ZentaraLayout>
);

const DetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [recommendedNews, setRecommendedNews] = useState<NewsItem[]>([]);

  const { data: allNews, isLoading: loadingAll } = useQuery<NewsItem[], Error>({
    queryKey: ['allNews'],
    queryFn: getAllNews,
  });

  const news = allNews?.find((n: NewsItem) => n.slug === slug);

  useEffect(() => {
    if (!news || !allNews) return;
    const index = allNews.findIndex(n => n.id === news.id);
    const top3 = getTopKRecommendations(index, allNews, 3);
    const matched = top3
      .map(sim => allNews.find(n => n.id === sim.id))
      .filter(Boolean) as NewsItem[];
    setRecommendedNews(matched);
  }, [news, allNews]);

  if (loadingAll) {
    return <DetailPageSkeleton />;
  }

  if (!news) {
    return (
      <ZentaraLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">404 - Berita Tidak Ditemukan</h2>
            <p className="text-gray-500 mt-2">Maaf, berita yang Anda cari tidak ada atau URL-nya salah.</p>
            <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </ZentaraLayout>
    );
  }

  return (
    <ZentaraLayout>
      <div>
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            {news.judul}
          </h1>
          <p className="mt-4 text-gray-600">
            Oleh <span className="font-medium">{news.penulis}</span> • <span className="capitalize">{news.kategori}</span>
          </p>
        </div>

        {news.gambar && (
          <div className="w-full">
            <img
              src={`https://drive.google.com/thumbnail?id=${news.gambar}`}
              alt={news.judul}
              className="w-full h-auto max-h-[600px] object-cover"
            />
          </div>
        )}

        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <article
              className="prose prose-lg max-w-none lg:col-span-8 text-base/7 tracking-wide"
              dangerouslySetInnerHTML={{ __html: news.deskripsi }}
            />

            <aside className="space-y-4 lg:col-span-4">
              <h3 className="font-semibold text-xl border-b pb-2">
                Artikel Lain oleh {news.penulis}
              </h3>
              {allNews && allNews.filter(n => n.penulis === news.penulis && n.slug !== slug).length > 0 ? (
                allNews.filter(n => n.penulis === news.penulis && n.slug !== slug).slice(0, 3).map(item => (
                  <Link
                    key={item.id}
                    to={`/berita/${item.slug}`}
                    className="block border rounded-md overflow-hidden shadow hover:shadow-lg transition group"
                  >
                    {item.gambar && (
                      <img
                        src={getOptimizedDriveThumbnail(item.gambar)}
                        className="w-full h-32 object-cover"
                        alt={item.judul}
                      />
                    )}
                    <div className="p-3">
                      <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors">
                        {item.judul}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  Belum ada artikel lain dari penulis ini.
                </p>
              )}
            </aside>
          </div>

          {/* Rekomendasi Berita Berbasis Konten */}
          {recommendedNews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Rekomendasi Berita untuk Anda</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedNews.map(item => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default DetailPage;