import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Output directory for the build
    emptyOutDir: true,  // Ensure the directory is cleaned before building
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
