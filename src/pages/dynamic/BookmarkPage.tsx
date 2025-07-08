import { useBookmark } from "@/context/BookmarkContext";
import NewsCard from "@/components/NewsCard";
import ZentaraLayout from "@/layout/ZentaraLayout";
import { Bookmark, Heart, BookmarkCheck } from "lucide-react";

const BookmarkPage = () => {
  const { bookmarks } = useBookmark();

  return (
    <ZentaraLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <BookmarkCheck className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Berita Tersimpan
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-2">
              Koleksi berita favorit Anda
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Bookmark className="w-4 h-4" />
              {bookmarks.length} berita tersimpan
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {bookmarks.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">🔖</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Belum ada berita yang disimpan
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Mulai menyimpan berita favorit Anda dengan mengklik ikon bookmark
                  </p>
                  <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 rounded-full px-4 py-2 text-sm">
                    <Bookmark className="w-4 h-4" />
                    Klik untuk menyimpan berita
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Stats Bar */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-gray-700 font-medium">
                        Total berita tersimpan: {bookmarks.length}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Diperbarui secara otomatis
                    </div>
                  </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {bookmarks.map((news) => (
                    <NewsCard key={news.id} news={news} />
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

export default BookmarkPage;