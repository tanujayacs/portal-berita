import ZentaraLayout from "@/layout/ZentaraLayout";
import { 
  Target, 
  Eye, 
  Heart, 
  CheckCircle, 
  Users, 
  Mail,
  ArrowRight 
} from "lucide-react";

const TentangPage = () => {
  const values = [
    { icon: Heart, title: "Integritas", desc: "Menyampaikan informasi dengan kejujuran dan tanggung jawab editorial." },
    { icon: CheckCircle, title: "Akurasi", desc: "Mengutamakan fakta dan data yang terverifikasi dalam setiap publikasi." },
    { icon: Users, title: "Profesionalisme", desc: "Dikelola oleh tim yang berdedikasi dan berpengalaman di bidang jurnalistik serta teknologi media." },
    { icon: Eye, title: "Kebebasan Pers", desc: "Menjaga independensi pemberitaan dari pengaruh politik atau kepentingan komersial." },
  ];

  return (
    <ZentaraLayout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-1">
            <img
              src="/zentara.png"
              alt="Zentara Logo"/>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tentang Zentara</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Zentara adalah portal berita digital yang menyajikan informasi aktual dan terpercaya dari berbagai
            penjuru dunia. Kami berkomitmen untuk memberikan akses cepat dan mudah terhadap berita yang relevan,
            mendalam, dan inspiratif.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <Target className="w-10 h-10 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Misi Zentara adalah menjadi media informasi yang kredibel dan dapat diandalkan, dengan menyajikan konten berita yang akurat,
              netral, dan mendukung keterbukaan informasi publik. Kami percaya bahwa masyarakat yang terinformasi akan lebih berdaya
              dalam menghadapi dinamika sosial dan perkembangan zaman.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <Eye className="w-10 h-10 text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Visi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Menjadi salah satu platform berita digital unggulan di Indonesia yang diakui karena kualitas konten,
              keberagaman perspektif, dan ketepatan informasi. Zentara hadir sebagai mitra informasi masyarakat dalam
              membangun masa depan yang cerdas dan terhubung.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team & Contact */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
            <Users className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tim Kami</h3>
            <p className="text-gray-600 leading-relaxed">
              Zentara dikembangkan oleh tim muda profesional dari berbagai latar belakang — mulai dari jurnalisme, teknologi web, hingga riset digital.
              Kami berkolaborasi dengan semangat inovasi untuk menyajikan pengalaman membaca berita yang lebih modern, cepat, dan relevan.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
            <Mail className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Hubungi Kami</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Untuk pertanyaan, masukan, atau peluang kerja sama, Anda dapat menghubungi tim Zentara melalui formulir kontak atau
              melalui akun media sosial resmi kami.
            </p>
            <a 
              href="/kontak" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              Hubungi Kami
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default TentangPage;