/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { assistantApiPlugin } from "./server/assistantPlugin";

export default defineConfig({
  base: process.env.DEMO_BASE || "/",
  plugins: [react(), tailwindcss(), assistantApiPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5197,
    host: true,
  },
  preview: {
    port: 5197,
    host: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}", "server/**/*.test.ts"],
  },
});
