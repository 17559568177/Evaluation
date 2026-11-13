/* 纯函数工具：不依赖 Vue / 路由，可被 store 与组件直接引用 */
export function validDate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '')
  if (!m) return false
  const y = +m[1], mo = +m[2], d = +m[3]
  return y >= 1900 && y <= 2100 && mo >= 1 && mo <= 12 &&
    d >= 1 && d <= new Date(y, mo, 0).getDate()
}

export function fmtDate() {
  const d = new Date(), p = function (n) { return n < 10 ? '0' + n : '' + n }
  return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate())
}

/* 强制文本呈现，避免星座符号在 Windows 上被渲染成彩色 emoji */
export function sym(s) { return String(s) + '\uFE0E' }

export function copyText(text, onOk, onFail) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onOk).catch(function () { fallback(text, onOk, onFail) })
  } else fallback(text, onOk, onFail)
}
function fallback(text, onOk, onFail) {
  const ta = document.createElement('textarea')
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'
  document.body.appendChild(ta); ta.select()
  try { document.execCommand('copy'); onOk() } catch (e) { onFail() }
  ta.remove()
}
