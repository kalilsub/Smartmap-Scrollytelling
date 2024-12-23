import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import dsv from "@rollup/plugin-dsv"
import path from "path" // Add this line to resolve paths

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), dsv()],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "./src/lib"), // Alias for `src/lib`
      $lib_components: path.resolve(__dirname, "./src/lib/components"), // Alias for `src/lib/components`
    },
  },
})
