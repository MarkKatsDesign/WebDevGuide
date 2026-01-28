import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// For GitHub Pages: https://username.github.io/webdevguide
			// Leave empty if using custom domain or username.github.io root
			base: process.env.NODE_ENV === 'production' ? '/webdevguide' : ''
		}
	}
};

export default config;
