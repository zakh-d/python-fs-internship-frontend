import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }:{mode: string}) => { 
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  
  return defineConfig({
    plugins: [react()],
    server: {
      host: process.env.REACT_APP_HOST || 'localhost',
      port: parseInt(process.env.REACT_APP_PORT || '3000' ),
    }
  })
}
