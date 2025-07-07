const BantuanPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Bantuan</h1>
      <p className="mb-4">
        Selamat datang di halaman Bantuan Zentara! Kami ingin memastikan bahwa pengalaman Anda
        menjelajahi situs kami tetap nyaman dan efisien. Berikut beberapa panduan umum:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Navigasi Situs</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Beranda:</strong> Temukan berita terbaru dan unggulan dari berbagai kategori.</li>
        <li><strong>Kategori:</strong> Jelajahi berita berdasarkan tema seperti politik, kesehatan, dan teknologi.</li>
        <li><strong>Cari:</strong> Gunakan fitur pencarian untuk menemukan berita sesuai kata kunci.</li>
        <li><strong>Tentang:</strong> Baca lebih jauh tentang visi dan tim Zentara.</li>
        <li><strong>Bookmark:</strong> Simpan berita favorit Anda untuk dibaca kembali nanti.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Fitur Tambahan</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Berbagi Artikel:</strong> Gunakan tombol share untuk membagikan berita ke sosial media Anda.</li>
        <li><strong>Laporan:</strong> Temukan bug atau konten tidak pantas? Silakan hubungi kami melalui formulir kontak.</li>
        <li><strong>Newsletter:</strong> Berlangganan untuk update berita langsung ke email Anda.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Komunitas & Panduan</h2>
      <p className="mb-4">
        Kami ingin menciptakan komunitas pembaca yang sehat dan konstruktif. Silakan baca Panduan Komunitas kami
        untuk menjaga etika dalam berdiskusi dan berkomentar.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Privasi & Ketentuan</h2>
      <p>
        Untuk mengetahui lebih lanjut tentang bagaimana kami mengelola data Anda, silakan kunjungi halaman
        <a href="/kebijakan-privasi" className="text-blue-600 underline ml-1">Kebijakan Privasi</a>.
      </p>
    </div>
  );
};

export default BantuanPage;
