import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import Navbar from "@/components/Navbar";

const DetailPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const all = await getAllNews();
      const selected = all.find((n) => n.slug === slug);
      setNews(selected || null);
      setRelated(all.filter((n) => n.penulis === selected?.penulis && n.slug !== slug));
    };

    fetchNews();
  }, [slug]);

  if (!news) return <p className="text-center mt-10">Berita tidak ditemukan</p>;

  return (
    <div>
      <Navbar />
      <div className="mx-10 p-4 space-y-6">

        <h1 className="text-3xl font-bold text-center">{news.judul}</h1>


        <p className="text-gray-600 text-center">By {news.penulis} • {news.kategori}</p>


        {news.gambar && (
          <img
            src={`https://drive.google.com/thumbnail?id=${news.gambar}`}
            alt={news.judul}
            className="w-full h-96 object-cover rounded-md"
          />
        )}


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">

          <div className="md:col-span-2">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: news.deskripsi }}
            />
          </div>


          <aside className="space-y-4">
            <h3 className="font-semibold text-lg">Artikel Lain oleh {news.penulis}</h3>

            {related.length > 0 ? (
              related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => (window.location.href = `/berita/${item.slug}`)}
                  className="cursor-pointer border rounded-md overflow-hidden shadow hover:shadow-lg transition"
                >
                  {item.gambar && (
                    <img
                      src={`https://drive.google.com/thumbnail?id=${item.gambar}`}
                      className="w-full h-32 object-cover"
                      alt={item.judul}
                    />
                  )}
                  <div className="p-3">
                    <p className="text-sm font-semibold">{item.judul}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">Belum ada artikel lagi dari penulis</p>
            )}
          </aside>
        </div>
      </div>
    </div>

  );
};

export default DetailPage;
