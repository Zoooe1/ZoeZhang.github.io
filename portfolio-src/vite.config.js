import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",                   // relative asset paths
  build: {
    outDir: "../portfolio",     // <- build into ZoeWeb/portfolio
    emptyOutDir: true           // auto-clear on each build
  }
});