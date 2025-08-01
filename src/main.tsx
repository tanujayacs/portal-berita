import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BookmarkProvider } from "@/context/BookmarkContext";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
