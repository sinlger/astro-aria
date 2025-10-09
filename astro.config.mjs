import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	output: "server",
	markdown: {
		// remarkPlugins: [remarkLint, remarkPresetLintRecommended],
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		},
		routes: {
			exclude: [
				"/_astro/*",
				"/favicon.ico",
				"/robots.txt",
				"/assets/**/*"
			]
		}
	}),
	integrations: [tailwind()],
});
