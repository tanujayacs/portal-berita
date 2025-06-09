import axios from "axios";
import { NewsItem } from "@/types/news";

const BASE_URL = "https://winnicode.com/api/publikasi-berita";

export const getAllNews = async (): Promise<NewsItem[]> => {
  const response = await axios.get<NewsItem[]>(BASE_URL, {
    headers: {
      Authorization: "Bearer a42278524bee772194f2ad0e9ac88a5893aa733db4d1c684d89c2dc08b7f718a",
    },
  });

  return response.data;
};
