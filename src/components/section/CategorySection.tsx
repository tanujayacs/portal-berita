import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";

interface Props {
  title: string;
  kategori: string;
  highlightFirst?: boolean;
}

// Komponen Skeleton untuk CategorySection
const CategorySectionSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 animate-pulse">
        <div className="h-[400px] md:col-span-3 bg-gray-200 rounded-xl"></div>
        <div className="md:col-span-2 space-y-4">
            <div className="flex bg-gray-200 rounded-xl w-full h-28"></div>
            <div className="flex bg-gray-200 rounded-xl w-full h-28"></div>
            <div className="flex bg-gray-200 rounded-xl w-full h-28"></div>
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
    <section className="my-10 px-6 md:px-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          {title} <span className="text-black capitalize">{kategori}</span>
        </h2>
        <button
          onClick={() => navigate(`/kategori/${kategori.toLowerCase()}`)}
          className="bg-white border border-gray-300 px-5 py-2 rounded-full shadow text-sm hover:bg-gray-100 transition"
        >
          Explore {kategori}
        </button>
      </div>

      {isLoading && <CategorySectionSkeleton />}
      {isError && <p className="text-red-500 text-center">Gagal memuat berita.</p>}

      { !isLoading && !isError && newsList && newsList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {highlightFirst && featured && (
            <Link to={`/berita/${featured.slug}`} className="relative rounded-xl overflow-hidden h-[400px] md:col-span-3 group">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                    style={{
                        backgroundImage: `url(https://drive.google.com/thumbnail?id=${featured.gambar})`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                    <span className="text-xs opacity-80">Featured</span>
                    <h3 className="text-xl font-bold">{featured.judul}</h3>
                    <p className="text-sm opacity-80">{featured.penulis}</p>
                </div>
            </Link>
          )}

          <div className="md:col-span-2 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 h-[400px]">
            <div className="flex flex-col gap-4">
              {others.length === 0 ? (
                <div className="text-gray-500 italic flex items-center justify-center h-full">
                  Belum ada berita lain di kategori ini.
                </div>
              ) : (
                others.map((news) => (
                  <Link to={`/berita/${news.slug}`} key={news.id} className="flex bg-white rounded-xl shadow w-full overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={`https://drive.google.com/thumbnail?id=${news.gambar}`}
                      alt={news.judul}
                      className="w-28 h-28 object-cover flex-shrink-0"
                    />
                    <div className="p-3 flex flex-col justify-between">
                      <h4 className="font-semibold text-sm line-clamp-3">{news.judul}</h4>
                      <p className="text-xs text-gray-500 mt-1">{news.penulis}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      { !isLoading && !isError && (!newsList || newsList.length === 0) && (
        <div className="text-center text-gray-500 py-10">
            Tidak ada berita dalam kategori <span className="font-semibold capitalize">{kategori}</span> saat ini.
        </div>
      )}
    </section>
  );
};

export default CategorySection;