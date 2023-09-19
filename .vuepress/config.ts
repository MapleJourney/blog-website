import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import { recoConfig } from './recoConf'

export default defineUserConfig({
	title: 'Maple Journey',
	description: 'notes',
	head: [['link', { rel: 'icon', href: '/blog-website/favicon.ico' }]],
	theme: recoTheme(recoConfig),
	port: 5467,
	dest: 'dist',
	pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
	base: '/blog-website/'
})
