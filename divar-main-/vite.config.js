import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      configs: "/src/configs",
      pages: "/src/pages",
      services: "/src/services",
      styles: "/src/styles",
      utils: "/src/utils",
      layout: "/src/layout",
      routes: "/src/routes",
      modules:"/src/modules"
    },
  },
});
