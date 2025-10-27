import axios from "axios";
import { NewsItem } from "@/types/news";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;


export const getAllNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    // ✅ Cek apakah response.data.data ada
    const data = Array.isArray(response.data)
      ? response.data
      : response.data.data;

    console.log("✅ API response:", data);

    return data;
  } catch (error) {
    console.error("❌ Gagal fetch API:", error);
    return [];
  }
};
