import path from "path"
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      // This allows you to use `@` as an alias for the `src` directory
      // For example, you can import a file like this:
      // import MyComponent from "@/components/MyComponent.jsx";
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
})
