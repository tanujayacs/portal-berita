import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, Bookmark, Search, ChevronDown } from "lucide-react";
import { getAllNews } from "@/services/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await getAllNews();
      const uniqueCats = Array.from(
        new Set(data.map((item) => item.kategori.trim().toLowerCase()).filter(Boolean))
      );
      return uniqueCats;
    },
    staleTime: 1000 * 60 * 60 * 24
  });

  useEffect(() => {
    const match = location.pathname.match(/\/kategori\/(.+)/);
    if (match) {
      setActiveCategory(match[1]);
    } else {
      setActiveCategory(null);
    }
  }, [location.pathname]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setIsOpen(false);
      setSearch("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (cat: string) => {
    navigate(`/kategori/${cat.toLowerCase()}`);
    setIsOpen(false);
  };

  return (
    <header className="border-b shadow-sm sticky top-0 bg-white/95 backdrop-blur-sm z-50 transition-all duration-300">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <img
              src="/zentara.png"
              alt="Zentara Logo"
              className="w-8 h-8 object-cover rounded-lg cursor-pointer group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
              Zentara
            </span>
          </div>
        </div>

        {/* Center: Scrollable Categories */}
        <div className="flex-1 mx-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="flex gap-2 w-max py-2">
            {categories.map((cat) => {
              const slug = cat.toLowerCase();
              const isActive = activeCategory === slug;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-all duration-200 transform hover:scale-105
                  ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                >
                  {cat}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search + Bookmark */}
        <div className="flex items-center gap-3">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Cari berita..."
              className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6 py-2 font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Search
          </button>

          <button
            onClick={() => navigate("/bookmark")}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 transform hover:scale-110"
            title="Lihat Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
            Zentara
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cari berita..."
                className="border border-gray-300 rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6 py-3 w-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Search
            </button>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="text-sm font-medium text-gray-500 px-2 py-1">Kategori</div>
              {categories.map((cat) => {
                const slug = cat.toLowerCase();
                const isActive = activeCategory === slug;

                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-all duration-200 ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/bookmark");
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                Lihat Bookmark
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
