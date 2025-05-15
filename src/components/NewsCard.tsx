import { NewsItem } from "@/types/news";
import { Link } from "react-router-dom";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link to={`/berita/${news.slug}`}>
      <div className="border rounded-lg bg-white overflow-hidden transition duration-300 hover:border-blue-500 cursor-pointer">
        <div className="relative">
          {news.gambar && (
            <img
              src={`https://drive.google.com/thumbnail?id=${news.gambar}`}
              alt={news.judul}
              className="w-full h-48 object-cover"
            />
          )}
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
            {news.kategori.toUpperCase()}
          </span>
        </div>
        <div className="p-4">
          <h2 className="text-base font-semibold mb-1">{news.judul}</h2>
          <p className="text-sm text-gray-600">By {news.penulis}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
