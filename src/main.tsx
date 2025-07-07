import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BookmarkProvider } from "@/context/BookmarkContext";

// 1. Impor komponen dari React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. Buat instance dari QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 3. Bungkus semua provider dengan QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
