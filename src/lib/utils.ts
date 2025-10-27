import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getOptimizedDriveThumbnail = (gambar?: string, width = 800, height = 450) => {
  if (!gambar) return "https://via.placeholder.com/800x450?text=No+Image";

  const driveUrl = `https://drive.google.com/uc?export=view&id=${gambar}`;
  const proxyBase = "https://images.weserv.nl";

  return `${proxyBase}/?url=${encodeURIComponent(driveUrl)}&w=${width}&h=${height}&fit=cover&q=90&we&sharp=1&output=webp`;
};


