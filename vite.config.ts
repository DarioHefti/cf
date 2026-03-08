import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages requires the app to be served from a sub-path.
// Set VITE_BASE to '/<repo-name>/' when building for Pages.
// Locally, it defaults to '/'.
const base = process.env.VITE_BASE ?? '/';

export default defineConfig({
  plugins: [react()],
  base,
});
