// src/utils/kategoriMapper.ts

export const normalizeCategory = (original: string): string => {
    const mapping: { [key: string]: string } = {
      // Standard
    "Budaya": "Culture",
    "Mental Health": "Health",
    "Lifestyle": "Lifestyle",
    "Teknologi": "Technology",
    "Film": "Movie",
    "Otomotif": "Automotive",
    "Kesehatan": "Health",
    "Kesehatan mental": "Health",
    "Hiburan": "Movie",
    "Peristiwa": "News",
    "Pendidikan": "News",
    "Duka - Kehilangan": "News",
    "Politik": "News",
    "Sejarah": "Culture",
    "Lingkungan": "News",
    "Sosiolinguistik": "Culture",
    "TREN": "Lifestyle",
    "Fashion": "Lifestyle",
    "Mental health": "Health",
    "Self Improvement": "Lifestyle",
    "Formula 1": "Automotive",
    "Soft News": "News",
    "Koleksi Penggemar": "Lifestyle",
    "Sosial Kemasyarakatan": "News",
    "Pendidikan dan Teknologi": "News",
    "Pop Culture, Hiburan dan Budaya": "Culture",
    "Ekonomi": "News",
    "Bioteknologi": "Technology",
    "Tokoh Dunia": "News",
    "Cuaca": "News",
    "Tahukah Kamu": "Lifestyle",
    "Hiburan dan Budaya": "Culture",
    };
  
    return mapping[original] || "News"; // fallback default
  };
  