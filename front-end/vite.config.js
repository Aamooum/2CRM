import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
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
        env.VITE_ALLOWED_HOST
      ]
    }
  };
});
