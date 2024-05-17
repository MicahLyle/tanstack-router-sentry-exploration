import { sentryVitePlugin } from "@sentry/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite(),
		sentryVitePlugin({
			org: "tanstack-router-integration",
			project: "javascript-react",
		}),
	],

	build: {
		sourcemap: true,
	},
});
