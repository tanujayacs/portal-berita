import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import ZentaraLayout from "@/layout/ZentaraLayout";
import { Search, FileText, Clock, Filter, User, Tag, X, ArrowLeft, TrendingUp, ChevronDown } from "lucide-react";

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { data: allNews, isLoading, isError } = useQuery<NewsItem[], Error>({
    queryKey: ["allNews"],
    queryFn: getAllNews,
  });

  const { categories, authors } = useMemo(() => {
    if (!allNews) return { categories: [], authors: [] };

    const cats = [...new Set(allNews.map(news => news.kategori))].sort();
    const auths = [...new Set(allNews.map(news => news.penulis))].sort();

    return { categories: cats, authors: auths };
  }, [allNews]);

  const filteredNews = useMemo(() => {
    if (!allNews) return [];

    let filtered = allNews.filter(news => {
      const matchesSearch = !searchQuery ||
        news.judul.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || news.kategori === selectedCategory;
      const matchesAuthor = !selectedAuthor || news.penulis === selectedAuthor;

      return matchesSearch && matchesCategory && matchesAuthor;
    });

    if (sortBy === "title") {
      filtered.sort((a, b) => a.judul.localeCompare(b.judul));
    }

    return filtered;
  }, [allNews, searchQuery, selectedCategory, selectedAuthor, sortBy]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    setSearchParams(params);
  }, [searchQuery, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleNewSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("");
    setSelectedAuthor("");
    setSortBy("newest");
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedAuthor("");
    setSortBy("newest");
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  const activeFiltersCount = [selectedCategory, selectedAuthor].filter(Boolean).length;

  // Helper function to determine if user has actually searched
  const hasSearched = searchQuery || selectedCategory || selectedAuthor;

  return (
    <ZentaraLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Hasil Pencarian</h1>
            </div>
            {searchQuery && (
              <p className="text-lg text-gray-600 mb-2">
                Pencarian untuk: <span className="font-semibold text-blue-600">"{searchQuery}"</span>
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Bar Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari berita, topik, atau kata kunci..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none outline-none text-gray-700 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearchQuery}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                    {activeFiltersCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Kembali</span>
                  </button>
                </div>
              </div>

              {/* Filter Section */}
              {showFilters && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Filter Pencarian</h3>
                    {activeFiltersCount > 0 && (
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                        Hapus Filter
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <Tag className="w-4 h-4 inline mr-2" />Kategori
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="">Semua Kategori</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <User className="w-4 h-4 inline mr-2" />Penulis
                      </label>
                      <div className="relative">
                        <select
                          value={selectedAuthor}
                          onChange={(e) => setSelectedAuthor(e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="">Semua Penulis</option>
                          {authors.map(author => (
                            <option key={author} value={author}>{author}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <Clock className="w-4 h-4 inline mr-2" />Urutkan
                      </label>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="newest">Terbaru</option>
                          <option value="oldest">Terlama</option>
                          <option value="title">Judul A-Z</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Hasil Pencarian</h2>
              </div>
              {!isLoading && filteredNews && (
                <div className="text-sm text-gray-600">
                  {hasSearched ? `${filteredNews.length} berita ditemukan` : 'Mulai pencarian untuk melihat hasil'}
                </div>
              )}
            </div>

            {(selectedCategory || selectedAuthor) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <Tag className="w-3 h-3" />{selectedCategory}
                    </span>
                  )}
                  {selectedAuthor && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      <User className="w-3 h-3" />{selectedAuthor}
                    </span>
                  )}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />Mencari berita...
                </p>
              </div>
            )}

            {isError && (
              <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <div className="text-red-600 mb-2">⚠️</div>
                  <p className="text-red-700 font-medium">Terjadi kesalahan saat mencari berita</p>
                  <p className="text-red-600 text-sm mt-2">Silakan coba lagi nanti</p>
                </div>
              </div>
            )}

            {!isLoading && !isError && !hasSearched && (
              <div className="text-center py-16">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-blue-600 mb-4">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Mulai Pencarian Anda
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Ketikkan kata kunci yang ingin Anda cari pada kolom pencarian di atas
                  </p>
                  <div className="text-gray-400 text-xs">
                    💡 Tips: Coba cari berdasarkan judul berita, topik, atau kategori
                  </div>
                </div>
              </div>
            )}

            {!isLoading && !isError && hasSearched && filteredNews && filteredNews.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Tidak ada berita yang ditemukan
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Coba kata kunci yang berbeda atau ubah filter pencarian
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      clearAllFilters();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <X className="w-4 h-4" />Reset Pencarian
                  </button>
                </div>
              </div>
            )}

            {!isLoading && !isError && hasSearched && filteredNews && filteredNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
          </div>

          {!hasSearched && !isLoading && allNews && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Topik Populer</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.slice(0, 8).map(category => (
                  <button
                    key={category}
                    onClick={() => handleNewSearch(category)}
                    className="p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                  >
                    <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                      {category}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {allNews.filter(news => news.kategori === category).length} berita
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default SearchResultPage;