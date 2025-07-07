import { NewsItem } from "@/types/news";
import { Link } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import { useBookmark } from "@/context/BookmarkContext";
import { getOptimizedDriveThumbnail } from "@/lib/utils";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { isBookmarked, toggleBookmark } = useBookmark();

  return (
    <div className="relative">
      <Link to={`/berita/${news.slug}`}>
        <div className="border rounded-lg bg-white overflow-hidden transition duration-300 hover:border-blue-500 cursor-pointer">
          <div className="relative">
            {news.gambar && (
              <img
                src={getOptimizedDriveThumbnail(news.gambar)}
                alt={news.judul}
                className="w-full h-60 object-cover"
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

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleBookmark(news);
        }}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow"
      >
        {isBookmarked(news.id) ? (
          <Heart className="text-red-500 w-5 h-5 fill-red-500" />
        ) : (
          <HeartOff className="text-gray-400 w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default NewsCard;
