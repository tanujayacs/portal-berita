import ZentaraLayout from "@/layout/ZentaraLayout";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Mail } from "lucide-react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Apa itu Zentara?",
      answer: "Zentara adalah portal berita digital yang menyajikan informasi terpercaya dari berbagai kategori untuk pengguna Indonesia."
    },
    {
      question: "Apakah saya perlu membuat akun?",
      answer: "Tidak perlu. Bookmark dan interaksi dasar dapat dilakukan tanpa login menggunakan penyimpanan lokal browser."
    },
    {
      question: "Bagaimana cara menghubungi tim Zentara?",
      answer: "Silakan gunakan formulir pada halaman Kontak atau kirim email langsung ke team@zentara.com."
    },
    {
      question: "Apakah Zentara menyediakan newsletter?",
      answer: "Ya, Anda dapat berlangganan newsletter kami di bagian bawah halaman utama untuk mendapatkan berita terbaru setiap minggunya."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ZentaraLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-gray-600 text-lg">
            Temukan jawaban untuk pertanyaan umum tentang Zentara
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {index + 1}. {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Masih ada pertanyaan?
            </h3>
            <p className="text-gray-600 mb-4">
              Tim support kami siap membantu Anda
            </p>
            <a
              href="/kontak"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </ZentaraLayout>
  );
};

export default FAQPage;