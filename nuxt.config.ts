// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	devtools: { enabled: false },
	css: ['~/assets/css/main.css', '/node_modules/primeicons/primeicons.css'],
	modules: [
		'nuxt-primevue',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'nuxt-icon',
		'@vueuse/motion/nuxt',
		'@nuxt/image',
		'@formkit/auto-animate/nuxt',
		'@vite-pwa/nuxt',
	],
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1.0',
			title: 'Real Estate',
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/public/images/favicon.ico',
				},
			],
		},
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	primevue: {
		importPT: { from: '~/presets/wind/' },
		options: {
			ripple: true,
			unstyled: true,
		},
	},
	pwa: {
		manifest: {
			name: 'Propertier',
			short_name: 'Propertier',
			description: 'Real Estate Management',
			icons: [
				{
					src: 'images/icon_64x64.png',
					sizes: '64x64',
					type: 'image/png',
				},
				{
					src: 'images/icon_144x144.png',
					sizes: '144x144',
					type: 'image/png',
				},
				{
					src: 'images/icon_192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'images/icon_512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
			theme_color: '#ffffff',
			background_color: '#ffffff',
			display: 'standalone',
		},
		workbox: {
			navigateFallback: '/',
		},
		devOptions: {
			enabled: true,
			type: 'module',
		},
	},
	tailwindcss: {
		config: {
			content: ['presets/**/*.{js,vue,ts}'],
			theme: {
				extend: {
					colors: {
						'primary-50': 'rgb(var(--primary-50))',
						'primary-100': 'rgb(var(--primary-100))',
						'primary-200': 'rgb(var(--primary-200))',
						'primary-300': 'rgb(var(--primary-300))',
						'primary-400': 'rgb(var(--primary-400))',
						'primary-500': 'rgb(var(--primary-500))',
						'primary-600': 'rgb(var(--primary-600))',
						'primary-700': 'rgb(var(--primary-700))',
						'primary-800': 'rgb(var(--primary-800))',
						'primary-900': 'rgb(var(--primary-900))',
						'primary-950': 'rgb(var(--primary-950))',
						'surface-0': 'rgb(var(--surface-0))',
						'surface-50': 'rgb(var(--surface-50))',
						'surface-100': 'rgb(var(--surface-100))',
						'surface-200': 'rgb(var(--surface-200))',
						'surface-300': 'rgb(var(--surface-300))',
						'surface-400': 'rgb(var(--surface-400))',
						'surface-500': 'rgb(var(--surface-500))',
						'surface-600': 'rgb(var(--surface-600))',
						'surface-700': 'rgb(var(--surface-700))',
						'surface-800': 'rgb(var(--surface-800))',
						'surface-900': 'rgb(var(--surface-900))',
						'surface-950': 'rgb(var(--surface-950))',
					},
				},
			},
		},
	},
});
