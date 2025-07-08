import { NewsItem } from "@/types/news";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useBookmark } from "@/context/BookmarkContext";
import { getOptimizedDriveThumbnail } from "@/lib/utils";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { isBookmarked, toggleBookmark } = useBookmark();

  return (
    <div className="relative group">
      <Link to={`/berita/${news.slug}`}>
        <div className="border rounded-xl bg-white overflow-hidden transition-all duration-500 ease-out hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
          <div className="relative overflow-hidden rounded-t-xl">
            {news.gambar && (
              <img
                src={getOptimizedDriveThumbnail(news.gambar)}
                alt={news.judul}
                className="w-full h-60 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            
            <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl">
              {news.kategori.toUpperCase()}
            </span>
          </div>
          
          <div className="p-5">
            <h2 className="text-base font-bold mb-2 text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-500 ease-out">
              {news.judul}
            </h2>
            <p className="text-sm text-gray-500 font-medium transition-colors duration-500 ease-out group-hover:text-gray-600">
              By <span className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-500 ease-out">{news.penulis}</span>
            </p>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleBookmark(news);
        }}
        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-500 ease-out hover:bg-white hover:scale-110 hover:shadow-xl active:scale-95"
      >
        <Bookmark 
          className={`w-5 h-5 transition-all duration-500 ease-out ${
            isBookmarked(news.id) 
              ? 'text-blue-600 fill-blue-600 drop-shadow-sm' 
              : 'text-gray-400 hover:text-blue-600'
          }`} 
        />
      </button>
    </div>
  );
};

export default NewsCard;