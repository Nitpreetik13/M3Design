import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const GOOGLE_APPS_SCRIPT_PROXY_PATH =
  "/macros/s/AKfycbxJuPvKS6mLC_md6wTtUDqIx1-Lbowg-61A8A0QFPaDeaINIeneTTxE5bzY01Rn1CVh5Q/exec";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Vite dev server does not run Vercel serverless functions.
  // This proxy keeps API calls working locally by forwarding to Apps Script.
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/contact": {
        target: "https://script.google.com",
        changeOrigin: true,
        secure: true,
        rewrite: () => GOOGLE_APPS_SCRIPT_PROXY_PATH,
      },
      "/api/products": {
        target: "https://script.google.com",
        changeOrigin: true,
        secure: true,
        rewrite: () => GOOGLE_APPS_SCRIPT_PROXY_PATH,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
