import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 開発サーバーのポート設定
    open: true, // サーバー起動時にブラウザを自動で開く
    proxy: {
      "/proxy": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
});
