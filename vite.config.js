import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://3.147.226.49:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Host': 'accomodation.api.test.nextkinlife.live'
        },
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const setCookie = proxyRes.headers['set-cookie'];
            if (setCookie) {
              proxyRes.headers['set-cookie'] = setCookie.map(cookie => {
                // Remove Domain, Secure, SameSite and explicitly add SameSite=Lax
                return cookie
                  .replace(/;?\s*Domain=[^;]+/i, '')
                  .replace(/;?\s*Secure/i, '')
                  .replace(/;?\s*SameSite=[^;]+/i, '') + '; SameSite=Lax';
              });
            }
          });
        }
      },
      '/socket.io': {
        target: 'http://3.147.226.49:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        headers: {
          'Host': 'accomodation.api.test.nextkinlife.live'
        },
      },
      '/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/nominatim/, ''),
        headers: {
          'User-Agent': 'NextKinLife-Dev-Env/1.0' // Required by Nominatim
        }
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})