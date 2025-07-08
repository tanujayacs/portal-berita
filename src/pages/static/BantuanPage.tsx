import ZentaraLayout from "@/layout/ZentaraLayout";
import { 
  Home, 
  Search, 
  Bookmark, 
  Share2, 
  Users, 
  Shield, 
  LifeBuoy,
  ArrowRight 
} from "lucide-react";

const BantuanPage = () => {
  const navigationItems = [
    { icon: Home, title: "Beranda", desc: "Temukan berita terbaru dan unggulan dari berbagai kategori." },
    { icon: Search, title: "Cari", desc: "Gunakan fitur pencarian untuk menemukan berita sesuai kata kunci." },
    { icon: Bookmark, title: "Bookmark", desc: "Simpan berita favorit Anda untuk dibaca kembali nanti." },
  ];

  const features = [
    { icon: Share2, title: "Berbagi Artikel", desc: "Gunakan tombol share untuk membagikan berita ke sosial media Anda." },
    { icon: LifeBuoy, title: "Laporan", desc: "Temukan bug atau konten tidak pantas? Silakan hubungi kami melalui formulir kontak." },
    { icon: Users, title: "Newsletter", desc: "Berlangganan untuk update berita langsung ke email Anda." },
  ];

  return (
    <ZentaraLayout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <LifeBuoy className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Bantuan</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selamat datang di halaman Bantuan Zentara! Kami ingin memastikan bahwa pengalaman Anda
            menjelajahi situs kami tetap nyaman dan efisien.
          </p>
        </div>

        {/* Navigation Guide */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Home className="w-6 h-6 mr-2 text-blue-600" />
            Navigasi Situs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {navigationItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <item.icon className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Share2 className="w-6 h-6 mr-2 text-purple-600" />
            Fitur Tambahan
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <feature.icon className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community & Privacy */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <Users className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Komunitas & Panduan</h3>
            <p className="text-gray-600 mb-4">
              Kami ingin menciptakan komunitas pembaca yang sehat dan konstruktif. Silakan baca Panduan Komunitas kami
              untuk menjaga etika dalam berdiskusi dan berkomentar.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <Shield className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Privasi & Ketentuan</h3>
            <p className="text-gray-600 mb-4">
              Untuk mengetahui lebih lanjut tentang bagaimana kami mengelola data Anda, silakan kunjungi halaman Kebijakan Privasi kami.
            </p>
            <a 
              href="/kebijakan-privasi" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
            >
              Baca Kebijakan Privasi
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default BantuanPage;
