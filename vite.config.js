import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, '../backend/ssl/server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, '../backend/ssl/server.cert'))
    // }
  }
})