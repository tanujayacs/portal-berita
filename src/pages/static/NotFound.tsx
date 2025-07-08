import ZentaraLayout from "@/layout/ZentaraLayout";
import { Home, Search, AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <ZentaraLayout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-md mx-auto">
          {/* Error Icon */}
          <div className="flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-8 mx-auto">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          
          {/* Error Message */}
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Berita Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Maaf, berita yang kamu cari tidak tersedia atau mungkin sudah dihapus. 
            Jangan khawatir, masih banyak berita menarik lainnya yang bisa kamu baca.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Kembali ke Beranda
            </a>
            
            <a 
              href="/cari" 
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Search className="w-5 h-5 mr-2" />
              Cari Berita
            </a>
          </div>

          {/* Back Link */}
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mt-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali ke halaman sebelumnya
          </button>
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default NotFound;
