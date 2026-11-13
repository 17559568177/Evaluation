import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router/index.js'
import { attachRouter } from './router/navigation.js'
import { setupGuards } from './router/guards.js'
import { initSession } from './stores/session.js'
import { sn } from './store.js'

/* 样式顺序即层叠顺序：基础 → 两套皮肤 → 组件层 → 星空与特效层 */
import './styles/base.css'
import './styles/theme-love.css'
import './styles/theme-zodiac.css'
import './styles/components.css'
import './styles/sky.css'

const app = createApp(App)

app.use(createPinia())      // 状态：Pinia
initSession()               // 进度持久化 + 全局 Esc
attachRouter(router)        // 让 Pinia action 能调用 router.push
setupGuards(router)         // 导航守卫 + 路由元信息同步
app.use(router)             // 路由：Vue Router

app.config.globalProperties.$sn = sn
app.config.errorHandler = function (err) {
  console.error('[SELF NOTE]', err)
  sn.toast('页面出了点小状况，刷新一下就好')
}

app.mount('#app')
