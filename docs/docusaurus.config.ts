import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: 'Etch Documentation',
	tagline: 'Build beautiful websites with Etch',
	favicon: 'img/favico.png',
	headTags: [
		{
			tagName: 'meta',
			attributes: {
				name: 'algolia-site-verification',
				content: '689BF4C41D86E4E4',
			},
		},
		// Responsive modern favicon
        {
            tagName: 'link',
            attributes: {
                rel: 'icon',
                href: '/img/favicon-light.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'icon',
                href: '/img/favicon-dark.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                media: 'only screen and (prefers-color-scheme: dark)',
            }
        },
        // Legacy fallback favicon
        {
            tagName: 'link',
            attributes: {
                rel: 'icon',
                href: '/img/favicon.ico',
                sizes: '32x32',
            }
        },
        // iOS + PWA icons
        {
            tagName: 'link',
            attributes: {
                rel: 'apple-touch-icon',
                href: '/img/apple-touch-icon.png',
                sizes: '180x180',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'apple-mobile-web-app-title',
                content: 'Etch Docs',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'apple-mobile-web-app-status-bar-style',
                content: '#18181B',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'manifest',
                content: '/site.webmanifest',
            }
        },
        // Safari Pinned Tab Icon
        {
            tagName: 'link',
            attributes: {
                rel: 'mask-icon',
                href: '/img/safari-pinned-tab.svg',
                color: '#18181B',
            }
        },
	],

	// Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
	future: {
		v4: true // Improve compatibility with the upcoming Docusaurus v4
	},

	// Set the production url of your site here
	url: 'https://docs.etchwp.com',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	// organizationName: 'kevingeary', // Usually your GitHub org/user name.
	// projectName: 'etch', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	trailingSlash: false,

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en']
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					routeBasePath: '/',
					showLastUpdateTime: true,
					showLastUpdateAuthor: false
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css'
				}
			} satisfies Preset.Options
		]
	],
	plugins: [
		[
			// Etch Studio is a separate product from Etch WP, not a newer version of it.
			// It gets its own docs instance rather than a versioned snapshot.
			'@docusaurus/plugin-content-docs',
			{
				id: 'studio',
				path: 'studio-docs',
				routeBasePath: '/studio',
				sidebarPath: './sidebarsStudio.ts',
				showLastUpdateTime: true,
				showLastUpdateAuthor: false
			}
		],
		[
			'@docusaurus/plugin-client-redirects',
			{
				redirects: [
					{
						from: '/troubleshooting/api-concurrency-limit',
						to: '/troubleshooting/performance-issues',
					},
				],
			},
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docs-cover-image',
		navbar: {
			title: 'Etch',
			logo: {
				alt: 'Etch Logo',
				src: 'img/etch-logo.svg',
				srcDark: 'img/etch-logo-white.svg'
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'tutorialSidebar',
					position: 'left',
					label: 'Documentation'
				},
				{ to: 'https://etchwp.com/pricing', label: 'Purchase', position: 'left' },
				{
					type: 'search',
					position: 'right'
				}
			]
		},
		footer: {
			style: 'dark',
			links: [
			],
			copyright: `Copyright © ${new Date().getFullYear()} Digital Gravy. Etch™ is a Trademark of Digital Gravy.`
		},
		prism: {
			theme: prismThemes.oneLight,
			darkTheme: prismThemes.nightOwl
		},
		algolia: {
			appId: 'DNEFN51RGE',
			apiKey: '1ef868b467a329b2c8112cb3f31e1eba',
			indexName: 'docs_etchwp_com_dnefn51rge_pages',
			contextualSearch: false,
			searchParameters: {},
			externalUrlRegex: 'external\\.com|domain\\.com',
			replaceSearchResultPathname: {
				from: '/',
				to: '/',
			},

			debug: true,
		}
	} satisfies Preset.ThemeConfig
};

export default config;
