// vite.config.js
import { defineConfig } from "file:///Users/chandan/development/alpha-lion-react-vite-webApp/node_modules/vite/dist/node/index.js";
import { terser } from "file:///Users/chandan/development/alpha-lion-react-vite-webApp/node_modules/rollup-plugin-terser/rollup-plugin-terser.mjs";
import imageminPlugin from "file:///Users/chandan/development/alpha-lion-react-vite-webApp/node_modules/vite-plugin-imagemin/dist/index.mjs";
import react from "file:///Users/chandan/development/alpha-lion-react-vite-webApp/node_modules/@vitejs/plugin-react/dist/index.mjs";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2hhbmRhbi9kZXZlbG9wbWVudC9hbHBoYS1saW9uLXJlYWN0LXZpdGUtd2ViQXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvY2hhbmRhbi9kZXZlbG9wbWVudC9hbHBoYS1saW9uLXJlYWN0LXZpdGUtd2ViQXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9jaGFuZGFuL2RldmVsb3BtZW50L2FscGhhLWxpb24tcmVhY3Qtdml0ZS13ZWJBcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHRlcnNlciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdGVyc2VyJztcbmltcG9ydCBpbWFnZW1pblBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZW1pbic7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdGVyc2VyKHtcbiAgICAgICAgICBjb21wcmVzczoge1xuICAgICAgICAgICAgdW51c2VkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFuZ2xlOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgaW1hZ2VtaW5QbHVnaW4oe1xuICAgICAgICAgIC8vIG9wdGltaXplIGltYWdlcyB3aXRoIHRoZSBcIm1lZGl1bVwiIHByZXNldFxuICAgICAgICAgIGdpZnNpY2xlOiB7XG4gICAgICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogMyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGpwZWd0cmFuOiB7XG4gICAgICAgICAgICBwcm9ncmVzc2l2ZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlwbmc6IHtcbiAgICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA1LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG5ncXVhbnQ6IHtcbiAgICAgICAgICAgIHF1YWxpdHk6IFswLjcsIDAuOV0sXG4gICAgICAgICAgICBzcGVlZDogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN2Z286IHtcbiAgICAgICAgICAgIHBsdWdpbnM6IFt7IHJlbW92ZVZpZXdCb3g6IGZhbHNlIH0sIHsgY2xlYW51cElEczogdHJ1ZSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgcmVhY3Q6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxvQkFBb0I7QUFDcFgsU0FBUyxjQUFjO0FBQ3ZCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQLE9BQU87QUFBQSxVQUNMLFVBQVU7QUFBQSxZQUNSLFFBQVE7QUFBQSxVQUNWO0FBQUEsVUFDQSxRQUFRO0FBQUEsUUFDVixDQUFDO0FBQUEsUUFDRCxlQUFlO0FBQUE7QUFBQSxVQUViLFVBQVU7QUFBQSxZQUNSLG1CQUFtQjtBQUFBLFVBQ3JCO0FBQUEsVUFDQSxVQUFVO0FBQUEsWUFDUixhQUFhO0FBQUEsVUFDZjtBQUFBLFVBQ0EsU0FBUztBQUFBLFlBQ1AsbUJBQW1CO0FBQUEsVUFDckI7QUFBQSxVQUNBLFVBQVU7QUFBQSxZQUNSLFNBQVMsQ0FBQyxLQUFLLEdBQUc7QUFBQSxZQUNsQixPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0EsTUFBTTtBQUFBLFlBQ0osU0FBUyxDQUFDLEVBQUUsZUFBZSxNQUFNLEdBQUcsRUFBRSxZQUFZLEtBQUssQ0FBQztBQUFBLFVBQzFEO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osT0FBTyxDQUFDLFNBQVMsV0FBVztBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
