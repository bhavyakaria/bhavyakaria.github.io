/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ["'iA Writer Mono'", 'ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
				'mono': ["'iA Writer Mono'", 'ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
			},
			colors: {
				'surface': 'rgb(var(--color-bg) / <alpha-value>)',
				't-primary': 'rgb(var(--color-text) / <alpha-value>)',
				't-accent': 'rgb(var(--color-accent) / <alpha-value>)',
				'b-color': 'rgb(var(--color-border) / <alpha-value>)',
			},
		},
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		themes: ["light", "dark"],
		darkTheme: "dark",
		logs: false,
	}
}
