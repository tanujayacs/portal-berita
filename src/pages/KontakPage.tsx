const KontakPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Hubungi Kami</h1>
      <p className="mb-4">
        Jika Anda memiliki pertanyaan, saran, atau ingin bekerja sama dengan kami, silakan hubungi tim Zentara melalui formulir di bawah ini atau email kami secara langsung.
      </p>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Nama</label>
          <input type="text" id="name" className="w-full border px-3 py-2 rounded" placeholder="Nama Anda" />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input type="email" id="email" className="w-full border px-3 py-2 rounded" placeholder="email@domain.com" />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">Pesan</label>
          <textarea id="message" className="w-full border px-3 py-2 rounded" rows={5} placeholder="Tulis pesan Anda di sini..." />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Kirim Pesan</button>
      </form>
    </div>
  );
};

export default KontakPage;