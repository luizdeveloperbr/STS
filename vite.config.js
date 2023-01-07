import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'
// import { viteVConsole } from 'vite-plugin-vconsole'
// import * as path from 'path'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react()
        // reactRefresh(),
        // viteVConsole({
        //     entry: path.resolve('src/main.jsx'),
        //     localEnabled: true,
        //     enabled: true,
        //     config:{
        //         theme: 'light'
        //     }
        // })
    ]
    }
)
