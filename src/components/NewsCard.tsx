import { NewsItem } from "@/types/news";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  function truncateTo20Sentences(htmlString: string): string {
    // Hilangkan HTML tags dulu biar kalimat bisa dipotong bersih
    const plainText = htmlString.replace(/<[^>]*>/g, "");

    // Pecah berdasarkan titik, tanda tanya, atau seru
    const sentences = plainText.match(/[^.!?]+[.!?]+/g);

    if (!sentences) return plainText;

    const limited = sentences.slice(0, 1).join(" ");

    return limited.trim() + (sentences.length > 25 ? "..." : "");
  }

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      {news.gambar && (
        <img
        src={`https://drive.google.com/thumbnail?id=${news.gambar}`}
          alt={news.judul}
          className="w-full h-100 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-xl font-semibold mb-2">{news.judul}</h2>
      <p className="text-gray-600 text-sm mb-4">By {news.penulis} - {news.kategori}</p>
      <p className="text-gray-600 text-sm mb-4">{news.created_at}</p>
      <p className="text-gray-600 text-sm mb-4">{news.gambar}</p>
      <p className="text-gray-600 text-sm mb-4">{news.id}</p>
      <p className="text-gray-600 text-sm mb-4">{news.id}</p>
      <p className="text-gray-800">
        {truncateTo20Sentences(news.deskripsi)}
      </p>

    </div>
  );
};

export default NewsCard;
