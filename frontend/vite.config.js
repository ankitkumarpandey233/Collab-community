import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure the output directory matches Vercel configuration
    rollupOptions: {
      external: [],  // Ensure no dependencies are externalized incorrectly
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:9002", // Backend server URL for development
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
