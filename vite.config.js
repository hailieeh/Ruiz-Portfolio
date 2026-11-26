import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // relative base so the build works from any GitHub Pages path (user.github.io/repo-name/)
  base: "./",
  plugins: [react(), tailwindcss()],
});
