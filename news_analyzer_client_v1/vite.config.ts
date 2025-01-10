import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactRefresh from '@vitejs/plugin-react-refresh'
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin(), reactRefresh()],
  server: {
    port: 3000,
  }
})
