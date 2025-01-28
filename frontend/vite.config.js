import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      // Proxy viewer worker scripts to CDN
      '^/lmvworker.js': {
        target: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/lmvworker.js',
        changeOrigin: true,
        rewrite: (path) => ''
      },
      '^/extensions/.*': {
        target: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}); 