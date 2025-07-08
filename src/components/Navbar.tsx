import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Import
import { Menu, X, Bookmark } from "lucide-react";
import { getAllNews } from "@/services/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  const handleCategoryClick = (cat: string) => {
    navigate(`/kategori/${cat.toLowerCase()}`);
    setIsOpen(false);
  };

  return (
    <header className="border-b shadow-sm sticky top-0 bg-white z-50 p-4 md:px-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/public/logo.png"
            alt="Logo"
            className="h-6 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Center: Scrollable Categories (PERUBAHAN DI SINI) */}
        <div className="flex-1 mx-32 overflow-x-auto scrollbar-thin">
          <div className="flex mb-1 gap-1 w-max text-sm">
            {categories.map((cat) => {
              const slug = cat.toLowerCase();
              const isActive = activeCategory === slug;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`border rounded-full px-4 py-1 whitespace-nowrap capitalize transition
                  ${isActive ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search + Bookmark */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berita..."
            className="border rounded-full px-4 py-1 w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-full px-4 py-1"
          >
            Search
          </button>
          <button
            onClick={() => navigate("/bookmark")}
            className="ml-2 text-gray-600 hover:text-blue-600"
            title="Lihat Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Desktop Layout */}

      {/* Mobile Layout */}
      <div className="md:hidden flex justify-between items-center">
        <div className="flex items-center gap-2 ml-3">
          <img
            src="/public/logo.png"
            alt="Logo"
            className="h-6 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <span className="text-lg font-bold"></span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="mr-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berita..."
            className="border rounded-full px-4 py-1 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-full px-4 py-1 w-full"
          >
            Search
          </button>

          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="border rounded-full px-3 py-1 hover:bg-gray-100 w-full text-left capitalize"
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/bookmark");
              }}
              className="border rounded-full px-3 py-1 text-left hover:bg-gray-100"
            >
              🔖 Lihat Bookmark
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
