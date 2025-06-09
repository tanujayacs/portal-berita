import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";
import NewsCard from "@/components/NewsCard";

const LatestNewsSection = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allNews = await getAllNews();
        const sorted = [...allNews].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setLatestNews(sorted.slice(0, 3));
      } catch (err) {
        console.error("Gagal fetch berita:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="my-10 px-6 md:px-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Latest Hot News</h2>
          <p className="text-lg text-gray-500">Good for Curiousity</p>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">UP TO DATE</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {latestNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </section>
  );
};

export default LatestNewsSection;
