import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const categories = ["News", "Technology", "Health", "Lifestyle", "Movie", "Automotive", "Culture"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setIsOpen(false);
      setSearch("");
    }
  };

  const handleCategoryClick = (cat: string) => {
    const slug = cat.toLowerCase();
    navigate(`/kategori/${slug}`);
    setIsOpen(false);
  };

  return (
    <header className="border-b shadow-sm sticky top-0 bg-white z-50 p-4 mx-10">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center gap-2 ml-3">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-6 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="hidden md:flex items-center gap-4 ml-8">
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
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col md:hidden mt-4 gap-4">
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

          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="border rounded-full px-3 py-1 hover:bg-gray-100 w-full text-left"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="hidden md:flex flex-wrap justify-center gap-4 mt-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="border rounded-full px-3 py-1 hover:bg-gray-100"
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navbar;