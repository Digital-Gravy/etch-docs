import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: 'Etch Documentation',
	tagline: 'Build beautiful websites with Etch',
	favicon: 'img/favicon.ico',

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
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: ['rss', 'atom'],
						xslt: true
					},
					onInlineTags: 'warn',
					onInlineAuthors: 'warn',
					onUntruncatedBlogPosts: 'warn'
				},
				theme: {
					customCss: './src/css/custom.css'
				}
			} satisfies Preset.Options
		]
	],
	plugins: [
		[
			require.resolve('@easyops-cn/docusaurus-search-local'),
			{
				hashed: true,
				language: ['en'],
				highlightSearchTermsOnTargetPage: true,
				explicitSearchResultPath: true,
				searchBarPosition: 'right'
			}
		]
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docs-cover-image',
		colorMode: {
			defaultMode: 'dark',
		},
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
				{ to: 'https://etchwp.com/pricing', label: 'Purchase', position: 'left' }
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
		}
	} satisfies Preset.ThemeConfig
};

export default config;
