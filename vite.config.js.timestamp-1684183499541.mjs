// vite.config.js
import { defineConfig } from "file:///D:/Alpha%20Lion%20Repo/alpha-lion-react-vite-webApp/node_modules/vite/dist/node/index.js";
import { terser } from "file:///D:/Alpha%20Lion%20Repo/alpha-lion-react-vite-webApp/node_modules/rollup-plugin-terser/rollup-plugin-terser.mjs";
import imageminPlugin from "file:///D:/Alpha%20Lion%20Repo/alpha-lion-react-vite-webApp/node_modules/vite-plugin-imagemin/dist/index.mjs";
import react from "file:///D:/Alpha%20Lion%20Repo/alpha-lion-react-vite-webApp/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    host: true
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        terser({
          compress: {
            unused: true
          },
          mangle: true
        }),
        imageminPlugin({
          // optimize images with the "medium" preset
          gifsicle: {
            optimizationLevel: 3
          },
          jpegtran: {
            progressive: true
          },
          optipng: {
            optimizationLevel: 5
          },
          pngquant: {
            quality: [0.7, 0.9],
            speed: 1
          },
          svgo: {
            plugins: [{ removeViewBox: false }, { cleanupIDs: true }]
          }
        })
      ],
      output: {
        manualChunks: {
          react: ["react", "react-dom"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBbHBoYSBMaW9uIFJlcG9cXFxcYWxwaGEtbGlvbi1yZWFjdC12aXRlLXdlYkFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQWxwaGEgTGlvbiBSZXBvXFxcXGFscGhhLWxpb24tcmVhY3Qtdml0ZS13ZWJBcHBcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0FscGhhJTIwTGlvbiUyMFJlcG8vYWxwaGEtbGlvbi1yZWFjdC12aXRlLXdlYkFwcC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyB0ZXJzZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXRlcnNlcic7XHJcbmltcG9ydCBpbWFnZW1pblBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZW1pbic7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogdHJ1ZSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdGVyc2VyKHtcclxuICAgICAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgICAgIHVudXNlZDogdHJ1ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtYW5nbGU6IHRydWUsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaW1hZ2VtaW5QbHVnaW4oe1xyXG4gICAgICAgICAgLy8gb3B0aW1pemUgaW1hZ2VzIHdpdGggdGhlIFwibWVkaXVtXCIgcHJlc2V0XHJcbiAgICAgICAgICBnaWZzaWNsZToge1xyXG4gICAgICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogMyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBqcGVndHJhbjoge1xyXG4gICAgICAgICAgICBwcm9ncmVzc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvcHRpcG5nOiB7XHJcbiAgICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA1LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBuZ3F1YW50OiB7XHJcbiAgICAgICAgICAgIHF1YWxpdHk6IFswLjcsIDAuOV0sXHJcbiAgICAgICAgICAgIHNwZWVkOiAxLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN2Z286IHtcclxuICAgICAgICAgICAgcGx1Z2luczogW3sgcmVtb3ZlVmlld0JveDogZmFsc2UgfSwgeyBjbGVhbnVwSURzOiB0cnVlIH1dLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICByZWFjdDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VSxTQUFTLG9CQUFvQjtBQUN0VyxTQUFTLGNBQWM7QUFDdkIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1AsT0FBTztBQUFBLFVBQ0wsVUFBVTtBQUFBLFlBQ1IsUUFBUTtBQUFBLFVBQ1Y7QUFBQSxVQUNBLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxRQUNELGVBQWU7QUFBQTtBQUFBLFVBRWIsVUFBVTtBQUFBLFlBQ1IsbUJBQW1CO0FBQUEsVUFDckI7QUFBQSxVQUNBLFVBQVU7QUFBQSxZQUNSLGFBQWE7QUFBQSxVQUNmO0FBQUEsVUFDQSxTQUFTO0FBQUEsWUFDUCxtQkFBbUI7QUFBQSxVQUNyQjtBQUFBLFVBQ0EsVUFBVTtBQUFBLFlBQ1IsU0FBUyxDQUFDLEtBQUssR0FBRztBQUFBLFlBQ2xCLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQSxNQUFNO0FBQUEsWUFDSixTQUFTLENBQUMsRUFBRSxlQUFlLE1BQU0sR0FBRyxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsVUFDMUQ7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixPQUFPLENBQUMsU0FBUyxXQUFXO0FBQUEsUUFDOUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
