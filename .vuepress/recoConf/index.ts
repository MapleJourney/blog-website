import series from './series'
import navbar from './navbar'

export const recoConfig = {
	// 自动设置分类
	autoSetSeries: true,
	// home: '/',
	style: '@vuepress-reco/style-default',
	logo: '/logo.png',
	author: 'Maple Journey',
	docsRepo: 'https://github.com/MapleJourney/notes',
	docsBranch: 'main',
	lastUpdatedText: '',
	// series 为原 sidebar
	series,
	navbar
}
