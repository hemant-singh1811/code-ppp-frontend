import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";
import imageminPlugin from "vite-plugin-imagemin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        terser({
          compress: {
            unused: true,
          },
          mangle: true,
        }),
        imageminPlugin({
          // optimize images with the "medium" preset
          gifsicle: {
            optimizationLevel: 3,
          },
          jpegtran: {
            progressive: true,
          },
          optipng: {
            optimizationLevel: 5,
          },
          pngquant: {
            quality: [0.7, 0.9],
            speed: 1,
          },
          svgo: {
            plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
          },
        }),
      ],
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
