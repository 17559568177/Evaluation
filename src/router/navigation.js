/* 导航桥：让 Pinia action 能调用 Vue Router，同时避免 store ↔ router 的循环依赖。
 * main.js 在 app.use(router) 之前调用 attachRouter(router)。 */
let _router = null

export function attachRouter(r) { _router = r }

export function navigate(path) {
  if (!_router) { location.hash = '#' + path; return Promise.resolve() }
  if (_router.currentRoute.value.path === path) return Promise.resolve()
  return _router.push(path)
}
