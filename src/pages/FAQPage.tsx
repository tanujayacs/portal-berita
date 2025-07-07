import ZentaraLayout from "@/layout/ZentaraLayout";

const FAQPage = () => {
  return (
    <ZentaraLayout>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Pertanyaan yang Sering Diajukan (FAQ)</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">1. Apa itu Zentara?</h2>
          <p>Zentara adalah portal berita digital yang menyajikan informasi terpercaya dari berbagai kategori untuk pengguna Indonesia.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">2. Apakah saya perlu membuat akun?</h2>
          <p>Tidak perlu. Bookmark dan interaksi dasar dapat dilakukan tanpa login menggunakan penyimpanan lokal browser.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">3. Bagaimana cara menghubungi tim Zentara?</h2>
          <p>Silakan gunakan formulir pada halaman <a href="/kontak" className="text-blue-600 underline">Kontak</a>.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. Apakah Zentara menyediakan newsletter?</h2>
          <p>Ya, Anda dapat berlangganan newsletter kami di bagian bawah halaman utama untuk mendapatkan berita terbaru setiap minggunya.</p>
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default FAQPage;