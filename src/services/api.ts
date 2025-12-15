import axios from "axios";
import { NewsItem } from "@/types/news";

const BASE_URL = import.meta.env.VITE_API_URL || "https://zentara-backend-production.up.railway.app/api";
const LOGIN_EMAIL = import.meta.env.VITE_LOGIN_EMAIL || "frontend@zentara.com";
const LOGIN_PASSWORD = import.meta.env.VITE_LOGIN_PASSWORD || "zentara-frontend-2025";

// Storage key untuk token
const TOKEN_KEY = "zentara_api_token";

// Function untuk login dan mendapatkan token
const loginAndGetToken = async (): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: LOGIN_EMAIL,
      password: LOGIN_PASSWORD,
    });
    
    const token = response.data.api_key;
    
    // Simpan token ke localStorage
    localStorage.setItem(TOKEN_KEY, token);
    
    console.log("✅ Login berhasil, token disimpan");
    return token;
  } catch (error) {
    console.error("❌ Login gagal:", error);
    throw new Error("Gagal mendapatkan token autentikasi");
  }
};

// Function untuk mendapatkan token (dari storage atau login baru)
const getToken = async (): Promise<string> => {
  // Cek apakah sudah ada token tersimpan
  const savedToken = localStorage.getItem(TOKEN_KEY);
  
  if (savedToken) {
    console.log("🔑 Menggunakan token tersimpan");
    return savedToken;
  }
  
  console.log("🔄 Token tidak ada, melakukan login...");
  // Jika belum ada, lakukan login
  return await loginAndGetToken();
};

// Function untuk fetch berita dengan auto-login
export const getAllNews = async (): Promise<NewsItem[]> => {
  try {
    // Dapatkan token terlebih dahulu
    const token = await getToken();
    
    // Fetch data berita
    const response = await axios.get(`${BASE_URL}/publikasi-berita`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📰 Data berita berhasil diambil:", response.data);

    // Response format: { data: [...] }
    return response.data.data || response.data;
    
  } catch (error: any) {
    // Jika token expired (401), hapus token lama dan coba login ulang
    if (error.response?.status === 401) {
      console.log("🔄 Token expired, mencoba login ulang...");
      localStorage.removeItem(TOKEN_KEY);
      
      // Recursive call untuk retry dengan token baru
      return await getAllNews();
    }
    
    console.error("❌ Gagal fetch berita:", error);
    throw error;
  }
};