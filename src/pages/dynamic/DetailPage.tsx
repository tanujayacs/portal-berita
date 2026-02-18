import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import ZentaraLayout from "@/layout/ZentaraLayout";
import NewsCard from "@/components/NewsCard";
import { getOptimizedDriveThumbnail } from "@/lib/utils";
import { getTopKRecommendationsHybrid } from "@/utils/tfidf";
import {
  Clock,
  User,
  Tag,
  ArrowLeft,
  BookOpen,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const DetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  const [recommendedNews, setRecommendedNews] = useState<NewsItem[]>([]);

  const { data: allNews, isLoading } = useQuery<NewsItem[]>({
    queryKey: ["allNews"],
    queryFn: getAllNews,
  });

  const news = allNews?.find((n) => n.slug === slug);

  useEffect(() => {
    if (!news || !allNews) return;

    const index = allNews.findIndex((n) => n.id === news.id);
    const top = getTopKRecommendationsHybrid(index, allNews, 3, searchQuery);
    const matched = top
      .map((sim) => allNews.find((n) => n.id === sim.id))
      .filter(Boolean) as NewsItem[];

    setRecommendedNews(matched);
  }, [news, allNews, searchQuery]);

  const getCategoryColor = (category: string) => {
    const colors = {
      default: "from-blue-600 to-purple-600",
    };
    return colors[category?.toLowerCase() as keyof typeof colors] || colors.default;
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  if (!news) {
    return (
      <ZentaraLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-2">404 - Berita Tidak Ditemukan</h2>
            <p className="text-gray-500 mb-6">URL tidak valid atau berita telah dihapus.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </ZentaraLayout>
    );
  }

  return (
    <ZentaraLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
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
                <span>
                  {new Date(news.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        {news.gambar && (
          <div className="w-full px-4 md:px-12 lg:px-20 mb-8">
            <img
              src={getOptimizedDriveThumbnail(news.gambar)}
              alt={news.judul}
              className="rounded-2xl w-full max-h-[600px] object-cover shadow-xl"
            />
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
                    className="prose prose-lg max-w-none text-base/7 tracking-wide text-gray-700 font-medium"
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

        {/* Recommendations */}
        {recommendedNews.length > 0 && (
          <div className="px-4 md:px-12 lg:px-20 py-10">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-7xl mx-auto">
              <div className="mb-6 text-center">
                <div className="flex justify-center items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Rekomendasi untuk Anda
                  </h2>
                </div>
                <p className="text-gray-600 text-sm">
                  Berita serupa yang mungkin Anda sukai
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700 font-medium">
                      Dipilih khusus berdasarkan konten yang Anda baca
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {recommendedNews.length} rekomendasi berita
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ZentaraLayout>
  );
};

export default DetailPage;
