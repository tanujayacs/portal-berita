import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import Home from "@/pages/dynamic/Home";
import DetailPage from "@/pages/dynamic/DetailPage";
import KategoriPage from "@/pages/dynamic/KategoriPage";
import SearchResultPage from "@/pages/dynamic/SearchResultPage";
import NotFound from "@/pages/static/NotFound";
import BookmarkPage from "@/pages/dynamic/BookmarkPage";
import BantuanPage from "@/pages/static/BantuanPage";
import FAQPage from "@/pages/static/FAQPage";
import KebijakanPrivasiPage from "@/pages/static/KebijakanPrivasiPage";
import KontakPage from "@/pages/static/KontakPage";
import PanduanKomunitasPage from "@/pages/static/PanduanKomunitasPage";
import TentangPage from "@/pages/static/TentangPage";


function App() {
  return (
    <BrowserRouter>
      {/* <ScrollRestoration /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/berita/:slug" element={<DetailPage />} />
        <Route path="/kategori/:kategori" element={<KategoriPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/bantuan" element={<BantuanPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
        <Route path="/kontak" element={<KontakPage />} />
        <Route path="/panduan-komunitas" element={<PanduanKomunitasPage />} />
        <Route path="/tentang" element={<TentangPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
