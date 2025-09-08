import { defineConfig, loadEnv } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode, ...props }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    ...props,
    define: {
      "process.env": env,
    },
  plugins: [tailwindcss(), react()],
  resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Correctly resolving @ to src
      },
    },
  }
})
