/* 门面（Facade）：让现有组件继续用 `sn.xxx`，唯一数据源是 Pinia 的 useSessionStore。
 * 新写的路由视图直接用 useSessionStore()；这一层只为兼容已稳定的 30 个组件。 */
import { useSessionStore } from './stores/session'
import LOVE_DATA from './data/love.js'
import ZODIAC_DATA from './data/zodiac.js'
import { validDate, fmtDate, sym } from './utils/format.js'

function action(name) {
  return function () { return useSessionStore()[name].apply(useSessionStore(), arguments) }
}

export const sn = {
  L: LOVE_DATA,
  Z: ZODIAC_DATA,
  get state() { return useSessionStore() },
  go: action('go'),
  toast: action('notify'),
  sync: action('syncRoute'),
  setAnswer: action('setAnswer'),
  setCursor: action('setCursor'),
  reset: action('reset'),
  finish: action('finish'),
  openPoster: action('openPoster'),
  closePoster: action('closePoster'),
  downloadPoster: action('downloadPoster'),
  copyLink: action('copyLink'),
  lovePayload: action('lovePayload'),
  zodiacPayload: action('zodiacPayload'),
  validDate: validDate,
  fmtDate: fmtDate,
  sym: sym
}

export { useSessionStore }
