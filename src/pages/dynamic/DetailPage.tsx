import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import ZentaraLayout from "@/layout/ZentaraLayout";
import NewsCard from "@/components/NewsCard";
import { getOptimizedDriveThumbnail } from "@/lib/utils";
import { getTopKRecommendations } from "@/utils/tfidf";
import { Clock, User, Tag, ArrowLeft, BookOpen, Sparkles, TrendingUp } from "lucide-react";

const DetailPageSkeleton = () => (
  <ZentaraLayout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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

  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    const colors = {
      'default': 'from-blue-600 to-purple-600'
    };
    return colors[category?.toLowerCase() as keyof typeof colors] || colors.default;
  };

  if (loadingAll) {
    return <DetailPageSkeleton />;
  }

  if (!news) {
    return (
      <ZentaraLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
              <div className="text-red-500 mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">404 - Berita Tidak Ditemukan</h2>
              <p className="text-gray-500 mb-6">Maaf, berita yang Anda cari tidak ada atau URL-nya salah.</p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </ZentaraLayout>
    );
  }

  return (
    <ZentaraLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${getCategoryColor(news.kategori)} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
                <Tag className="w-4 h-4" />
                {news.kategori.toUpperCase()}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 mb-6">
              {news.judul}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{news.penulis}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Dipublikasikan hari ini</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image */}
        {news.gambar && (
          <div className="w-full mb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={getOptimizedDriveThumbnail(news.gambar)}
                  alt={news.judul}
                  className="w-full h-auto max-h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Main Article */}
                <article className="lg:col-span-8">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 font-medium">Artikel Lengkap</span>
                    </div>
                  </div>
                  
                  <div
                    className="prose prose-lg max-w-none text-base/7 tracking-wide text-gray-700"
                    dangerouslySetInnerHTML={{ __html: news.deskripsi }}
                  />
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-semibold text-xl text-gray-800">
                        Artikel Lain oleh {news.penulis}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {allNews && allNews.filter(n => n.penulis === news.penulis && n.slug !== slug).length > 0 ? (
                        allNews.filter(n => n.penulis === news.penulis && n.slug !== slug).slice(0, 3).map(item => (
                          <Link
                            key={item.id}
                            to={`/berita/${item.slug}`}
                            className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group bg-white"
                          >
                            {item.gambar && (
                              <img
                                src={getOptimizedDriveThumbnail(item.gambar)}
                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                                alt={item.judul}
                              />
                            )}
                            <div className="p-4">
                              <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">
                                {item.judul}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-gray-400 mb-2">📝</div>
                          <p className="text-sm text-gray-600">
                            Belum ada artikel lain dari penulis ini.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendedNews.length > 0 && (
          <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Rekomendasi untuk Anda
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    Berita serupa yang mungkin Anda sukai
                  </p>
                </div>

                {/* Stats Bar */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 font-medium">
                        Dipilih khusus berdasarkan konten yang Anda baca
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {recommendedNews.length} rekomendasi
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendedNews.map(item => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ZentaraLayout>
  );
};

export default DetailPage;