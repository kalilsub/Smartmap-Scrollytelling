import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import dsv from "@rollup/plugin-dsv"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), dsv()],
  base: "/2024-bT-kalil/", // Replace 'your-repo-name' with your actual GitLab repo name
  build: {
    outDir: "dist", // Output directory for the build
  },
})
