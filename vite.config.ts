import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true // Ép buộc dùng cổng 3000 (nếu bị trùng mạng, nó sẽ báo lỗi chứ không tự nhảy sang 3001)
  },
  resolve: {
    alias: {
      // Thiết lập @ đại diện cho thư mục src
      '@': path.resolve(__dirname, './src')
    }
  }
});
