/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				'sans': [
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'"Liberation Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
					// 中文字体
					'"PingFang SC"',
					'"Hiragino Sans GB"',
					'"Microsoft YaHei"',
					'"WenQuanYi Micro Hei"',
					'"Droid Sans Fallback"',
					'"Source Han Sans SC"',
					'"Noto Sans CJK SC"'
				],
				'serif': [
					'Georgia',
					'Cambria',
					'"Times New Roman"',
					'Times',
					'serif',
					// 中文衬线字体
					'"Songti SC"',
					'"SimSun"',
					'"Source Han Serif SC"',
					'"Noto Serif CJK SC"'
				],
				'mono': [
					'"SF Mono"',
					'Monaco',
					'Inconsolata',
					'"Roboto Mono"',
					'"Source Code Pro"',
					'Menlo',
					'Consolas',
					'"DejaVu Sans Mono"',
					'monospace',
					// 中文等宽字体
					'"Source Han Sans HW SC"',
					'"Noto Sans Mono CJK SC"'
				]
			},
			typography: {
				DEFAULT: {
					css: {
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
						// 只对内联代码应用背景样式（不在 pre 标签内的 code）
						'code:not(pre code)': {
							backgroundColor: '#f3f4f6',
							padding: '0.125rem 0.25rem',
							borderRadius: '0.25rem',
							fontSize: '0.875em',
							fontWeight: '400',
						},
						// 确保代码块中的代码保持原样
						'pre code': {
							backgroundColor: 'transparent',
							padding: '0',
							borderRadius: '0',
							fontSize: 'inherit',
							fontWeight: 'inherit',
						},
					},
				},
				invert: {
					css: {
						// 暗色模式下只对内联代码应用样式
						'code:not(pre code)': {
							backgroundColor: '#374151',
							color: '#f9fafb',
						},
						// 确保代码块在暗色模式下也保持原样
						'pre code': {
							backgroundColor: 'transparent',
							color: 'inherit',
						},
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
