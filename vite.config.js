import { defineConfig } from 'vite';

export default defineConfig({
    root: './src', // If your `index.html` is inside src/
    server: {
        port: 3000, // Change default port if needed
    }
});
