import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'


export default defineConfig(() => ({
  plugins: [
    inspectAttr(),
    react(),

    // // важливо: вмикаємо ТІЛЬКИ на build
    // ...(command === 'build'
    //     ? [
    //       htmlPrerender({
    //         staticDir: path.join(__dirname, 'dist'),
    //         routes: ['/'], // лендінг
    //       }),
    //     ]
    //     : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

