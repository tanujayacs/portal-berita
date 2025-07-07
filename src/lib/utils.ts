import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getOptimizedDriveThumbnail = (id: string, width = 800) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;