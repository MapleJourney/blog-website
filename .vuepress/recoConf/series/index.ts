import { jsModule } from './modules/js'
import { linuxModule } from './modules/linux'

const createSeries = () => ({
	// '/' 就表示,在docs/index位置显示左侧
	'/': [linuxModule, jsModule]
})

export default createSeries()
