import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import ZentaraLayout from "@/layout/ZentaraLayout";
import { Tag, FileText, Clock, TrendingUp } from "lucide-react";

const KategoriPage = () => {
  const { kategori = "" } = useParams<{ kategori: string }>();

  const { data: filteredNews, isLoading, isError } = useQuery<NewsItem[], Error, NewsItem[]>({
    queryKey: ['allNews'],
    queryFn: getAllNews,
    select: (allNews) =>
      allNews.filter((item) => item.kategori.toLowerCase() === kategori.toLowerCase())
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'default': 'from-blue-600 to-purple-600'
    };
    return colors[category.toLowerCase() as keyof typeof colors] || colors.default;
  };

  return (
    <ZentaraLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className={`p-3 bg-gradient-to-r ${getCategoryColor(kategori)} rounded-full`}>
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 capitalize">
                {kategori}
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-2">
              Berita terkini dalam kategori <span className="font-semibold text-blue-600 capitalize">{kategori}</span>
            </p>
            {filteredNews && (
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                {filteredNews.length} berita tersedia
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
                  Memuat berita...
                </p>
              </div>
            ) : isError ? (
              <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <div className="text-red-600 mb-2">⚠️</div>
                  <p className="text-red-700 font-medium">Gagal memuat berita</p>
                  <p className="text-red-600 text-sm mt-2">Silakan coba lagi nanti</p>
                </div>
              </div>
            ) : filteredNews && filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">📂</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Tidak ada berita di kategori ini
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Belum ada berita yang dipublikasikan dalam kategori <span className="font-medium capitalize">{kategori}</span>
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Category Stats */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 font-medium">
                        Kategori: <span className="capitalize">{kategori}</span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {filteredNews?.length} berita
                    </div>
                  </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredNews?.map((news) => (
                    <NewsCard key={news.slug} news={news} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default KategoriPage;