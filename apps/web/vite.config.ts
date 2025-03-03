import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig, loadEnv, UserConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, path.resolve(__dirname, "../../"), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    define: {
      "import.meta.env.VITE_API_URL": `"http://localhost:${env.GATEWAY_PORT}/api/v${env.GATEWAY_VERSION}"`,
    },
  };
});
