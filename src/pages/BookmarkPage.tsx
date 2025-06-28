import { useBookmark } from "@/context/BookmarkContext";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";

const BookmarkPage = () => {
  const { bookmarks } = useBookmark();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Berita yang Ditandai</h1>
        {bookmarks.length === 0 ? (
          <p className="text-gray-500">Belum ada berita yang di-bookmark.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;