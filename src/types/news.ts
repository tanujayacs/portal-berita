export interface NewsItem {
  id: string;
  user_id: string;
  judul: string;
  penulis: string;
  kategori: string;
  status: string;
  deskripsi: string;
  gambar: string;
  slug: string;
  visitor_count: number | null;
  created_at: string;
  updated_at: string;
}
