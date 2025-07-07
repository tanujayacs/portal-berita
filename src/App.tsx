import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import Home from "@/pages/Home";
import DetailPage from "@/pages/DetailPage";
import KategoriPage from "@/pages/KategoriPage";
import SearchResultPage from "@/pages/SearchResultPage";
import NotFound from "@/pages/NotFound";
import BookmarkPage from "@/pages/BookmarkPage";
import BantuanPage from "@/pages/BantuanPage";
import FAQPage from "@/pages/FAQPage";
import KebijakanPrivasiPage from "@/pages/KebijakanPrivasiPage";
import KontakPage from "@/pages/KontakPage";
import PanduanKomunitasPage from "@/pages/PanduanKomunitasPage";
import TentangPage from "@/pages/TentangPage";


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
