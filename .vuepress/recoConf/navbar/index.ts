const createNavbar = () => [
	{ text: '指南', link: '/docs', icon: 'Home' },
	{
		text: '概览',
		icon: 'Compass',
		children: [
			{
				text: 'JavaScript',
				link: '/docs/js/index.md'
			},
			{
				text: 'Linux',
				link: '/docs/linux/index.md'
			},
			{
				text: '运行环境',
				link: '/docs/env/index.md'
			}
		]
	},
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
		link: '/docs/about'
	}
]

export default createNavbar()
