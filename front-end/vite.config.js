import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT,
    allowedHosts: [
      'patient-possibility-production.up.railway.app'
    ]
  }
});