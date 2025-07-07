import ZentaraLayout from "@/layout/ZentaraLayout";

const NotFound = () => {
  return (
    <ZentaraLayout>

      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Berita Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">Maaf, berita yang kamu cari tidak tersedia atau mungkin sudah dihapus.</p>
        <a href="/" className="text-blue-600 underline">Kembali ke Beranda</a>
      </div>
    </ZentaraLayout>
  );
};

export default NotFound;
