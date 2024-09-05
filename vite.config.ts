import { copyFile, mkdir } from "fs/promises";
import { join } from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  optimizeDeps: { exclude: ["pyodide"] }, // For Pyodide
  plugins: [
    { // For Pyodide
      name: "vite-plugin-pyodide",
      generateBundle: async () => {
        const assetsDir = "dist/assets";
        await mkdir(assetsDir, { recursive: true });
        const files = [
          "pyodide-lock.json",
          "pyodide.asm.js",
          "pyodide.asm.wasm",
          "python_stdlib.zip",
        ];
        for (const file of files) {
          await copyFile(
            join("node_modules/pyodide", file),
            join(assetsDir, file)
          );
        }
      },
    },
    vue(),
  ],  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
