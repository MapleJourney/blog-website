import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import series from './series'
export default defineUserConfig({
	title: 'Maple Journey',
	description: 'notes',
	head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
	theme: recoTheme({
		// 自动设置分类
		// autoSetSeries: true,
		// home: '/',
		style: '@vuepress-reco/style-default',

		logo: '/logo.png',
		author: 'Maple Journey',
		docsRepo: 'https://github.com/MapleJourney/blog-website',
		docsBranch: 'main',
		lastUpdatedText: '',
		// series 为原 sidebar
		series,
		navbar: [
			{ text: '首页', link: '/' },
			{
				text: '参考',
				icon: 'Document',
				children: [
					{ text: 'Vuepress配置', link: 'https://v2.vuepress.vuejs.org/zh/reference/config.html' },
					{ text: 'theme-reco配置', link: 'https://vuepress-theme-reco.recoluan.com/docs/theme/frontmatter-home.html' }
				]
			},
			{
				text: '关于',
				icon: 'UserMultiple',
				link: './docs/about'
			}
		]
	}),
	port: 5467,
	dest: 'dist',
	pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
	base: '/blog-website/'
})
