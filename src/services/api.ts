import axios from "axios";
import { NewsItem } from "@/types/news";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;

export const getAllNews = async (): Promise<NewsItem[]> => {
  const response = await axios.get<NewsItem[]>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};
