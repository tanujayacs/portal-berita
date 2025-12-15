import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ✅ UPDATE: Function untuk Supabase Storage (bukan Google Drive lagi)
export const getOptimizedDriveThumbnail = (imagePath: string) => {
  const SUPABASE_URL = "https://osxigymismtotyyefrsw.supabase.co";
  const BUCKET_NAME = "news-images";
  
  // Format Supabase Storage Public URL
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${imagePath}`;
};