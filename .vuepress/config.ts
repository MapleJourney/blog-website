import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import series from './series'
import navbar from './navbar'
export default defineUserConfig({
	title: 'Maple Journey',
	description: 'notes',
	head: [['link', { rel: 'icon', href: './favicon.ico' }]],
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
		navbar
	}),
	port: 5467,
	dest: 'dist',
	pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
	base: '/blog-website/'
})
