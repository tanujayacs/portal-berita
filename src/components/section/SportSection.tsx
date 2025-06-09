import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";

const SportSection = () => {
  const navigate = useNavigate();
  const [sportNews, setSportNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchSportNews = async () => {
      try {
        const allNews = await getAllNews();
        const filtered = allNews.filter(
          (item) => item.kategori.toLowerCase() === "sport"
        );
        const sorted = [...filtered].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setSportNews(sorted);
      } catch (error) {
        console.error("Gagal fetch sport news:", error);
      }
    };

    fetchSportNews();
  }, []);

  const featured = sportNews[0];
  const others = sportNews.slice(1);

  return (
    <section className="my-10 px-6 md:px-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Latest For You <br />
          in <span className="text-black">Sport</span>
        </h2>
        <button
          onClick={() => navigate("/kategori/sport")}
          className="bg-white border border-gray-300 px-5 py-2 rounded-full shadow text-sm hover:bg-gray-100 transition"
        >
          Explore Sport News
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {featured && (
          <div
            className="relative rounded-xl overflow-hidden h-[400px] md:col-span-3"
            style={{
              backgroundImage: `url(https://drive.google.com/thumbnail?id=${featured.gambar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black via-transparent text-white w-full">
              <span className="text-xs opacity-80">Featured</span>
              <h3 className="text-xl font-bold">{featured.judul}</h3>
              <p className="text-sm opacity-80">
                {featured.penulis}
              </p>
            </div>
          </div>
        )}

        <div className="md:col-span-2 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 h-[400px]">
          <div className="flex flex-col gap-4">
            {others.length === 0 ? (
              <div className="text-gray-500 italic">
                No other Sport news yet. More coming soon!
              </div>
            ) : (
              others.map((news) => (
                <div
                  key={news.id}
                  className="flex bg-white rounded-xl shadow w-full overflow-hidden"
                >
                  <img
                    src={`https://drive.google.com/thumbnail?id=${news.gambar}`}
                    alt={news.judul}
                    className="w-28 h-28 object-cover"
                  />
                  <div className="p-3 flex flex-col justify-between">
                    <h4 className="font-semibold text-sm line-clamp-2">
                      {news.judul}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {news.penulis}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportSection;