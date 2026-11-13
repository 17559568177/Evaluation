import { useSessionStore } from '../stores/session'

/* 注册导航守卫：结果页不允许被直接敲地址访问；主题与页眉标签随路由同步 */
export function setupGuards(r) {
  r.beforeEach(function (to) {
    const s = useSessionStore()
    if (to.meta.needsResult === 'love' && !s.hasLoveResult) return { name: 'love-intro' }
    if (to.meta.needsResult === 'zodiac' && !s.hasZodiacResult) return { name: 'zodiac-intro' }
    return true
  })

  r.afterEach(function (to) {
    useSessionStore().syncRoute(to)
  })
}
