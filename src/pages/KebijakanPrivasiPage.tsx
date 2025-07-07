const KebijakanPrivasiPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Ketentuan & Kebijakan Privasi</h1>
            <p className="mb-4">
                Kebijakan Privasi Zentara bertujuan untuk memberikan pemahaman yang jelas kepada pengguna
                tentang bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda
                saat mengakses dan menggunakan layanan kami. Dengan menggunakan situs kami, Anda menyetujui
                ketentuan ini.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Informasi yang Kami Kumpulkan</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Data yang Anda kirim saat mengisi formulir, mendaftar, atau berlangganan newsletter.</li>
                <li>Riwayat aktivitas saat menggunakan situs kami seperti pencarian, klik, dan preferensi.</li>
                <li>Informasi teknis seperti perangkat, sistem operasi, lokasi, dan alamat IP.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Penggunaan Informasi</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Menghadirkan konten sesuai minat dan relevansi Anda.</li>
                <li>Menjawab permintaan layanan dan memberikan pembaruan.</li>
                <li>Menganalisis interaksi pengguna untuk peningkatan layanan dan pengembangan produk.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Perlindungan Data</h2>
            <p className="mb-4">
                Zentara menggunakan berbagai langkah teknis untuk menjaga keamanan informasi Anda. Meski begitu,
                kami mengakui tidak ada sistem yang sepenuhnya bebas risiko.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Berbagi Informasi</h2>
            <p className="mb-4">
                Kami tidak menjual atau membagikan data pribadi Anda ke pihak ketiga tanpa persetujuan,
                kecuali jika diwajibkan oleh hukum. Data anonim dapat digunakan untuk analisis dan peningkatan layanan.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Hak Pengguna</h2>
            <p className="mb-4">
                Anda berhak untuk mengakses, memperbarui, atau menghapus data pribadi Anda.
                Hubungi kami melalui formulir kontak yang tersedia di situs untuk permintaan atau pertanyaan.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Perubahan Kebijakan</h2>
            <p>
                Kebijakan ini dapat berubah sewaktu-waktu. Perubahan akan diumumkan melalui situs resmi kami.
                Dengan tetap menggunakan layanan kami, Anda menyetujui versi terbaru kebijakan ini.
            </p>
        </div>
    );
};

export default KebijakanPrivasiPage;