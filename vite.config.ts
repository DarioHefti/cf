import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project from the repository sub-path.
// For https://<user>.github.io/<repo>/ the base must be '/<repo>/'.
// Default to this repository name, but allow CI to override via VITE_BASE.
const base = process.env.VITE_BASE ?? '/custom-furniture/';

export default defineConfig({
  plugins: [react()],
  base,
});
