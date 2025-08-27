import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ✅ You don't need "@tailwindcss/vite" in Tailwind v4
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
