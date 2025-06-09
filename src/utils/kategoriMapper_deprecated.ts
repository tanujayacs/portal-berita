export const normalizeCategory = (original: string): string => {
  const mapping: { [key: string]: string } = {
    // --- Entertainment ---
    "Hiburan": "Entertainment",
    "Pop Culture": "Entertainment",
    "Budaya": "Entertainment",
    "Film": "Entertainment",
    "Koleksi Penggemar": "Entertainment",
    "Fashion": "Entertainment",
    "Hiburan dan Budaya": "Entertainment",
    "pop culture": "Entertainment",
    "budaya": "Entertainment",
    "film": "Entertainment",
    "koleksi penggemar": "Entertainment",
    "Teknologi": "Entertainment",

    // --- Automotive ---
    "Otomotif": "Automotive",
    "Formula 1": "Automotive",
    "otomotif": "Automotive",
    "formula 1": "Automotive",

    // --- Health ---
    "Kesehatan": "Health",
    "Mental Health": "Health",
    "Kesehatan mental": "Health",
    "Mental health": "Health",
    "mental health": "Health",
    "Psikologi dan Pengembangan Diri": "Health",
    "Psikologi": "Health",

    // --- Politics ---
    "Politik": "Politics",
    "Hukum": "Politics",
    "Tokoh Dunia": "Politics",
    "Pendidikan": "Politics",
    "Pendidikan dan Teknologi": "Politics",
    "Lingkungan": "Politics",
    "Sosial": "Politics",
    "Sosial Kemasyarakatan": "Politics",
    "Soft News": "Politics",
    "Peristiwa": "Politics",
    "Duka - Kehilangan": "Politics",

    // --- Business ---
    "Ekonomi": "Business",
    "Bisnis": "Business",
    "Keuangan": "Business",

    // --- Sport ---
    "Olahraga": "Sport",
    "Militer": "Sport",

    // --- Foods ---
    "Kuliner": "Foods",
    "Tahukah Kamu": "Foods",
    "tahukah kamu": "Foods"
  };

  return mapping[original] || "entertainment";
};
