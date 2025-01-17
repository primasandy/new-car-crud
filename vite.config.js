import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Pastikan base URL sesuai
  build: {
    outDir: "dist", // Direktori hasil build
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000',// Proxy tidak diperlukan jika tidak menggunakan backend
    },
  },
});
