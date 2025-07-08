import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import { ArrowRight, Clock, User } from "lucide-react";
import { getOptimizedDriveThumbnail } from "@/lib/utils";

interface Props {
  title: string;
  kategori: string;
  highlightFirst?: boolean;
}

const CategorySectionSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-pulse">
    <div className="lg:col-span-3 space-y-4">
      <div className="h-[450px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
    </div>
    <div className="lg:col-span-2 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex bg-gray-200 rounded-xl h-32 space-x-4">
          <div className="w-32 h-32 bg-gray-300 rounded-xl flex-shrink-0"></div>
          <div className="flex-1 p-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CategorySection = ({ title, kategori, highlightFirst = true }: Props) => {
  const navigate = useNavigate();

  const { data: newsList, isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ['allNews'],
    queryFn: getAllNews,
    select: (allNews) =>
      allNews
        .filter((item) => item.kategori.toLowerCase() === kategori.toLowerCase())
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  });

  const featured = newsList?.[0];
  const others = newsList?.slice(1) || [];

  return (
    <section className="my-16 px-6 md:px-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title} <span className="text-blue-600 capitalize">{kategori}</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        <button
          onClick={() => navigate(`/kategori/${kategori.toLowerCase()}`)}
          className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="font-medium">Explore {kategori}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {isLoading && <CategorySectionSkeleton />}
      {isError && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Gagal memuat berita.</p>
        </div>
      )}

      {!isLoading && !isError && newsList && newsList.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {highlightFirst && featured && (
            <div className="lg:col-span-3">
              <Link 
                to={`/berita/${featured.slug}`} 
                className="group block relative rounded-2xl overflow-hidden h-[450px] shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url(https://drive.google.com/thumbnail?id=${featured.gambar})`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Featured
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-blue-200 transition-colors">
                      {featured.judul}
                    </h3>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{featured.penulis}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(featured.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  More from {kategori}
                </h4>
              </div>
              
              <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 h-[400px]">
                <div className="p-2">
                  {others.length === 0 ? (
                    <div className="text-gray-500 italic flex items-center justify-center h-full p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <p>Belum ada berita lain di kategori ini.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {others.map((news, index) => (
                        <Link 
                          to={`/berita/${news.slug}`} 
                          key={news.id} 
                          className="group flex bg-white hover:bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={getOptimizedDriveThumbnail(news.gambar)}
                              alt={news.judul}
                              className="w-28 h-28 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                          </div>
                          <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                            <h4 className="font-semibold text-sm line-clamp-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                              {news.judul}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <User className="w-3 h-3 text-gray-400" />
                              <p className="text-xs text-gray-500 truncate">{news.penulis}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && (!newsList || newsList.length === 0) && (
        <div className="text-center py-20">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No News Available</h3>
            <p className="text-gray-500">
              Tidak ada berita dalam kategori <span className="font-semibold capitalize text-blue-600">{kategori}</span> saat ini.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategorySection;