/* 会话状态：Pinia store，承载两条测试线的答题数据、算分、海报与进度持久化 */
import { defineStore } from 'pinia'
import { watch } from 'vue'
import LOVE_DATA from '../data/love.js'
import ZODIAC_DATA from '../data/zodiac.js'
import Poster from '../utils/poster.js'
import { navigate } from '../router/navigation.js'
import { validDate, copyText } from '../utils/format.js'

const L = LOVE_DATA
const Z = ZODIAC_DATA
const P = Poster
const KEY = 'selfnote.v3'

function blankLove() { return { cursor: 0, answers: {}, result: null } }
function blankZodiac() {
  return { cursor: 0, answers: {}, result: null, birth: { date: '', period: 'dawn', city: 'east' } }
}
function readSaved() {
  try { return JSON.parse(sessionStorage.getItem(KEY) || 'null') } catch (e) { return null }
}

let toastTimer = null

export const useSessionStore = defineStore('session', {
  state: function () {
    const saved = readSaved()
    const love = Object.assign(blankLove(), (saved && saved.love) || {})
    const zodiac = Object.assign(blankZodiac(), (saved && saved.zodiac) || {})
    zodiac.birth = Object.assign(blankZodiac().birth, zodiac.birth || {})
    return {
      route: '/',
      theme: 'love',
      headLabel: 'INDEX / 目录',
      toast: '',
      poster: null,
      love: love,
      zodiac: zodiac
    }
  },

  getters: {
    loveData: function () { return L },
    zodiacData: function () { return Z },
    hasLoveResult: function (s) { return !!s.love.result },
    hasZodiacResult: function (s) { return !!s.zodiac.result }
  },

  actions: {
    /* ---------- 路由与外壳 ---------- */
    go(p) { return navigate(p) },
    syncRoute(to) {
      const p = to.path
      this.route = p
      this.theme = to.meta.theme || (p.indexOf('/zodiac') === 0 ? 'zodiac' : 'love')
      this.headLabel = to.meta.label || (this.theme === 'zodiac' ? '02 / 星座星语' : '01 / 恋爱依恋')
      document.body.setAttribute('data-theme', this.theme)
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', this.theme === 'zodiac' ? '#111728' : '#FBF6F0')
      window.scrollTo(0, 0)
    },
    notify(msg) {
      this.toast = msg
      clearTimeout(toastTimer)
      toastTimer = setTimeout(() => { this.toast = '' }, 2400)
    },

    /* ---------- 分步问卷 ---------- */
    setAnswer(line, idx, value) { this[line].answers[idx] = value },
    setCursor(line, idx) { this[line].cursor = Math.max(0, idx) },
    reset(line) {
      if (line === 'love') { this.love = blankLove(); this.go('/love/quiz') }
      else { this.zodiac = blankZodiac(); this.go('/zodiac/quiz') }
    },

    computeLove() {
      let a = 0, v = 0
      L.items.forEach(function (it, i) {
        const ans = this.love.answers[i]
        if (it.type === 'choice' && it.options[ans]) { a += it.options[ans].a; v += it.options[ans].v }
        else if (it.type === 'scale' && ans != null) {
          const x = (+ans) / 50
          if (it.dim === 'a') a += x; else v += x
        }
      }, this)
      this.love.result = { key: L.classify(a, v), a: a, v: v, stages: L.stageScores(this.love.answers) }
    },

    computeZodiac() {
      const b = this.zodiac.birth, m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(b.date || '')
      if (!m || !validDate(b.date)) return false
      const y = +m[1], mo = +m[2], d = +m[3]
      const city = Z.cities.filter(function (c) { return c.key === b.city })[0] || Z.cities[0]
      const period = Z.periods.filter(function (p) { return p.key === b.period })[0] || Z.periods[0]
      const si = Z.sunIndex(mo, d), mi = Z.moonIndex(y, mo, d)
      const ri = (Z.risingIndex(si, b.period) + city.offset + 12) % 12
      const profile = Z.computeProfile(this.zodiac.answers)
      const today = new Date()
      this.zodiac.result = {
        sun: si, moon: mi, rising: ri,
        profile: profile, leaning: profile.top,
        daily: Z.dailyLine(today.getMonth() + 1, today.getDate()),
        dateStr: mo + '月' + d + '日',
        city: city.text, periodText: period.text,
        rarity: Z.rarity(mi, ri, profile),
        seed: (y + mo * 31 + d) % 97 + 3
      }
      return true
    },

    /* 最后一项完成：算分 → 进入生成过渡页 */
    finish(line) {
      if (line === 'zodiac' && !this.computeZodiac()) {
        this.notify('请先填写一个有效的生日日期')
        this.setCursor('zodiac', 0)
        return false
      }
      if (line === 'love') this.computeLove()
      this.go('/' + line + '/loading')
      return true
    },

    /* ---------- 结果海报 ---------- */
    lovePayload() {
      const r = this.love.result, d = L.results[r.key]
      return {
        title: d.title, sub: d.sub, desc: d.desc, rarity: d.rarity, code: d.code,
        seal: d.seal, keywords: d.keywords, note: d.note,
        a: L.toBar(r.a), v: L.toBar(r.v)
      }
    },
    zodiacPayload() {
      const r = this.zodiac.result, ln = Z.leanings[r.leaning]
      return {
        sun: Z.signs[r.sun], moon: Z.signs[r.moon], rising: Z.signs[r.rising],
        title: ln.title, desc: ln.desc, short: ln.short,
        daily: r.daily, rarity: r.rarity, dateStr: r.dateStr, seed: r.seed
      }
    },
    openPoster(kind) {
      if ((kind === 'love' && !this.love.result) || (kind === 'zodiac' && !this.zodiac.result)) return
      const payload = kind === 'love' ? this.lovePayload() : this.zodiacPayload()
      this.poster = { kind: kind, payload: payload, url: P.toDataURL(kind, payload) }
    },
    closePoster() { this.poster = null },
    downloadPoster() {
      if (!this.poster) return
      this.notify('已生成 ' + P.download(this.poster.kind, this.poster.payload))
    },
    copyLink() {
      const link = location.href.split('#')[0] + '#/'
      copyText(link,
        () => this.notify('入口链接已复制'),
        () => this.notify('复制失败，请手动复制地址栏链接'))
    }
  }
})

/* 在 createPinia() 之后调用：进度持久化 + 全局 Esc 关海报 */
export function initSession() {
  const s = useSessionStore()
  watch(function () { return [s.love, s.zodiac] }, function () {
    try { sessionStorage.setItem(KEY, JSON.stringify({ love: s.love, zodiac: s.zodiac })) }
    catch (e) { /* 无痕模式忽略 */ }
  }, { deep: true })
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && s.poster) s.closePoster()
  })
  return s
}
