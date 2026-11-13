import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoveIntroView from '../views/love/LoveIntroView.vue'
import LoveQuizView from '../views/love/LoveQuizView.vue'
import LoveLoadingView from '../views/love/LoveLoadingView.vue'
import LoveResultView from '../views/love/LoveResultView.vue'
import ZodiacIntroView from '../views/zodiac/ZodiacIntroView.vue'
import ZodiacQuizView from '../views/zodiac/ZodiacQuizView.vue'
import ZodiacLoadingView from '../views/zodiac/ZodiacLoadingView.vue'
import ZodiacResultView from '../views/zodiac/ZodiacResultView.vue'

const LOVE = { theme: 'love', label: '01 / 恋爱依恋' }
const STAR = { theme: 'zodiac', label: '02 / 星座星语' }

/* 11 条命名路由：每个阶段都是独立视图，而不是一个视图里用 v-if 切模式 */
export const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { theme: 'love', label: 'INDEX / 目录' } },
  { path: '/about', name: 'about', component: AboutView, meta: { theme: 'love', label: 'ABOUT / 关于' } },

  { path: '/love', name: 'love-intro', component: LoveIntroView, meta: { ...LOVE } },
  { path: '/love/quiz', name: 'love-quiz', component: LoveQuizView, meta: { ...LOVE } },
  { path: '/love/loading', name: 'love-loading', component: LoveLoadingView, meta: { ...LOVE, needsResult: 'love' } },
  { path: '/love/result', name: 'love-result', component: LoveResultView, meta: { ...LOVE, needsResult: 'love' } },

  { path: '/zodiac', name: 'zodiac-intro', component: ZodiacIntroView, meta: { ...STAR } },
  { path: '/zodiac/quiz', name: 'zodiac-quiz', component: ZodiacQuizView, meta: { ...STAR } },
  { path: '/zodiac/loading', name: 'zodiac-loading', component: ZodiacLoadingView, meta: { ...STAR, needsResult: 'zodiac' } },
  { path: '/zodiac/result', name: 'zodiac-result', component: ZodiacResultView, meta: { ...STAR, needsResult: 'zodiac' } },

  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } }
]

/* hash 模式：静态托管无需 rewrite，构建产物双击 file:// 也能正常切换路由 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior: function () { return { top: 0 } }
})
