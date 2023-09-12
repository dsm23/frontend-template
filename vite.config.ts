import fs from "node:fs";
import path from "node:path";
import { defineConfig, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "@nabla/vite-plugin-eslint";
import importMetaEnv from "@import-meta-env/unplugin";

export function tryStatSync(file: string): fs.Stats | undefined {
  try {
    return fs.statSync(file, { throwIfNoEntry: false });
  } catch {
    // Ignore errors
  }
}

const getValidEnvFile = (mode: ConfigEnv["mode"]) => {
  const envFiles = [
    /** mode local file */ `.env.${mode}.local`,
    /** mode file */ `.env.${mode}`,
    /** local file */ `.env.local`,
    /** default file */ `.env`,
  ];

  for (const file of envFiles) {
    const filePath = path.join(__dirname, file);
    if (tryStatSync(filePath)?.isFile()) {
      return file;
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint(),
    importMetaEnv.vite({
      env: getValidEnvFile(mode),
      example: ".env.example",
    }),
  ],
  resolve: {
    alias: {
      "~/components": path.resolve(__dirname, "./src/components"),
      "~/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
}));
