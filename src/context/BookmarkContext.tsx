import { createContext, useContext, useState, useEffect } from "react";
import { NewsItem } from "@/types/news";

const LOCAL_KEY = "bookmarked_news";

interface BookmarkContextType {
  bookmarks: NewsItem[];
  toggleBookmark: (news: NewsItem) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const cleanNews = (news: NewsItem): NewsItem => {
  return {
    id: news.id,
    user_id: news.user_id,
    judul: news.judul,
    penulis: news.penulis,
    kategori: news.kategori,
    status: news.status,
    deskripsi: news.deskripsi,
    gambar: news.gambar,
    slug: news.slug,
    visitor_count: news.visitor_count,
    created_at: news.created_at,
    updated_at: news.updated_at,
  };
};


export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBookmarks(parsed);
        console.log("📦 Loaded bookmark from localStorage:", parsed);
      } catch (err) {
        console.error("❌ Gagal parsing localStorage:", err);
      }
    }
  }, []);

  const isBookmarked = (id: string) => bookmarks.some((item) => item.id === id);

  const toggleBookmark = (news: NewsItem) => {
    const cleaned = cleanNews(news);
    const updated = isBookmarked(news.id)
      ? bookmarks.filter((item) => item.id !== news.id)
      : [...bookmarks, cleaned];

    setBookmarks(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    console.log("💾 Bookmark disimpan ke localStorage:", updated);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useBookmark must be used within a BookmarkProvider");
  return context;
};
