import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project from the repository sub-path.
// For https://<user>.github.io/cf/ the base must be '/cf/'.
const base = process.env.VITE_BASE ?? '/cf/';

export default defineConfig({
  plugins: [react()],
  base,
});
