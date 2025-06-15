import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getAllNews } from "@/services/api";
import { NewsItem } from "@/types/news";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllNews();
        const uniqueCats = Array.from(
          new Set(
            data
              .map((item) => item.kategori.trim().toLowerCase())
              .filter(Boolean)
          )
        );
        setCategories(uniqueCats);
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

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
    <header className="border-b shadow-sm sticky top-0 bg-white z-50 p-4 md:px-10">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 items-center gap-4">
        {/* Logo kiri */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-6 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <span className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}></span>
        </div>

        {/* Kategori di tengah scrollable */}
        <div className="overflow-x-auto scrollbar-hide -mx-20">
          <div className="flex gap-2 w-max px-4"> {/* PERUBAHAN: tambah px-4 di sini */}
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="border rounded-full px-3 py-1 hover:bg-gray-100 whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search kanan */}
        <div className="flex items-center justify-end gap-2">
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
      </div>


      {/* Mobile View */}
      <div className="md:hidden flex justify-between items-center">
        <div className="flex items-center gap-2 ml-3">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-6 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <span className="text-lg font-bold">Zentara</span>
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
                className="border rounded-full px-3 py-1 hover:bg-gray-100 w-full text-left"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
