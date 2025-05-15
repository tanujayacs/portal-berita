import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import DetailPage from "@/pages/DetailPage";
import KategoriPage from "@/pages/KategoriPage";
import SearchResultPage from "@/pages/SearchResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/berita/:slug" element={<DetailPage />} />
        <Route path="/kategori/:kategori" element={<KategoriPage />} />
        <Route path="/search" element={<SearchResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
