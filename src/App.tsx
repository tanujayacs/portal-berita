import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import DetailPage from "@/pages/DetailPage";
import KategoriPage from "@/pages/KategoriPage";
import SearchResultPage from "@/pages/SearchResultPage";
import NotFound from "@/pages/NotFound";
import BookmarkPage from "@/pages/BookmarkPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/berita/:slug" element={<DetailPage />} />
        <Route path="/kategori/:kategori" element={<KategoriPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;