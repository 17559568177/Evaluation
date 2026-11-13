<template>
  <div class="sky-root" :data-sky="theme" aria-hidden="true">
    <div class="sky-nebula"></div>
    <canvas ref="canvas" class="sky-canvas"></canvas>
    <div class="sky-vignette"></div>
    <div class="sky-grain"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

/* ============================================================
   同一片星图，两种光线：
   zodiac = 深空夜幕（高密度 / 银河 / 冷白与金 / 常出现流星）
   love   = 纸上星尘（低密度 / 暖金细闪 / 极淡银河 / 偶有流星）
   ============================================================ */
const PALETTES = {
  zodiac: {
    density: 1,
    alpha: 1,
    milky: 1,
    milkyAlpha: 1,
    colors: ['255,246,226', '233,205,156', '196,196,232', '255,255,255'],
    meteor: [7000, 14000],
    meteorColor: '255,240,214',
    parallax: 16,
    spikes: true
  },
  love: {
    density: 0.72,
    alpha: 0.70,
    milky: 0.34,
    milkyAlpha: 0.42,
    colors: ['198,152,110', '176,120,94', '214,176,138', '255,248,236'],
    meteor: [12000, 24000],
    meteorColor: '205,158,116',
    parallax: 10,
    spikes: true
  }
}

const STAR_COUNT = 260
const MILKY_COUNT = 520

/* 固定种子：换主题 / 改窗口大小时，星图不会重新洗牌 */
function makeRandom(seed) {
  let s = seed >>> 0
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}
function gauss(rnd) {
  return (rnd() + rnd() + rnd() + rnd() - 2) / 2
}

function buildSky() {
  const rnd = makeRandom(20261113)
  const stars = []
  for (let i = 0; i < STAR_COUNT; i++) {
    const bright = rnd() > 0.9
    stars.push({
      x: rnd(),
      y: rnd(),
      r: bright ? 1.5 + rnd() * 0.9 : 0.35 + rnd() * 0.85,
      a: bright ? 0.72 + rnd() * 0.28 : 0.2 + rnd() * 0.6,
      speed: 0.35 + rnd() * 1.15,
      phase: rnd() * Math.PI * 2,
      depth: 0.25 + rnd() * 0.75,
      ci: Math.floor(rnd() * 4),
      glow: bright,
      spike: bright && rnd() > 0.42
    })
  }

  /* 银河带：沿一条斜线撒高斯分布的小点，远看是雾、近看是星 */
  const milky = []
  for (let i = 0; i < MILKY_COUNT; i++) {
    const t = rnd()
    const g = gauss(rnd)
    milky.push({
      x: 0.04 + t * 0.9 + g * 0.085,
      y: 0.02 + t * 0.9 - g * 0.07,
      a: 0.12 + rnd() * 0.42,
      r: rnd() > 0.93 ? 1.15 : 0.6,
      depth: 0.32,
      group: Math.floor(rnd() * 3)
    })
  }
  return { stars, milky }
}

/* 亮星的柔光贴图，预渲染一次，避免每帧重建渐变 */
function makeGlowSprites(colors) {
  return colors.map(function (color) {
    const c = document.createElement('canvas')
    c.width = c.height = 48
    const g = c.getContext('2d')
    const rg = g.createRadialGradient(24, 24, 0, 24, 24, 24)
    rg.addColorStop(0, 'rgba(' + color + ',.78)')
    rg.addColorStop(0.14, 'rgba(' + color + ',.42)')
    rg.addColorStop(0.42, 'rgba(' + color + ',.12)')
    rg.addColorStop(1, 'rgba(' + color + ',0)')
    g.fillStyle = rg
    g.fillRect(0, 0, 48, 48)
    return c
  })
}

export default {
  name: 'StarSky',
  setup() {
    const theme = ref(
      document.body.dataset.theme === 'zodiac' ? 'zodiac' : 'love'
    )
    const canvas = ref(null)

    let cv, ctx, W = 0, H = 0, dpr = 1
    const sky = buildSky()
    const sprites = {}
    Object.keys(PALETTES).forEach(function (k) {
      sprites[k] = makeGlowSprites(PALETTES[k].colors)
    })

    let raf = 0
    let lastTs = 0
    let lastDraw = 0
    let nextMeteor = 0
    const meteors = []
    let tarX = 0, tarY = 0, curX = 0, curY = 0
    let still = false
    let observer, motionQuery, resizeTimer

    function palette() { return PALETTES[theme.value] || PALETTES.zodiac }

    function resize() {
      if (!cv) return
      W = window.innerWidth
      H = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      cv.style.width = W + 'px'
      cv.style.height = H + 'px'
      ctx = cv.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (still) draw(0, 0)
    }

    function spawnMeteor(ts, p) {
      const rnd = Math.random
      meteors.push({
        x: W * (0.42 + rnd() * 0.7),
        y: -30 + H * rnd() * 0.22,
        dx: -0.88,
        dy: 0.47,
        speed: 430 + rnd() * 280,
        len: 80 + rnd() * 100,
        life: 1.05,
        max: 1.05
      })
      nextMeteor = ts + p.meteor[0] + rnd() * (p.meteor[1] - p.meteor[0])
    }

    function draw(t, dt) {
      if (!ctx) return
      const p = palette()
      const glows = sprites[theme.value] || sprites.zodiac

      ctx.clearRect(0, 0, W, H)

      /* --- 银河微星：按亮度分三批，减少状态切换 --- */
      const milkyN = Math.floor(sky.milky.length * p.milky)
      ctx.fillStyle = 'rgb(' + p.colors[0] + ')'
      for (let group = 0; group < 3; group++) {
        ctx.globalAlpha = (0.22 + group * 0.16) * p.milkyAlpha
        for (let i = 0; i < milkyN; i++) {
          const m = sky.milky[i]
          if (m.group !== group) continue
          const x = m.x * W + curX * p.parallax * m.depth
          const y = ((m.y * H + t * 0.9 * m.depth + curY * p.parallax * m.depth) % H + H) % H
          ctx.fillRect(x, y, m.r, m.r)
        }
      }

      /* --- 主星层：独立闪烁相位 + 视差 + 极缓慢漂移 --- */
      const count = Math.floor(sky.stars.length * p.density)
      for (let i = 0; i < count; i++) {
        const s = sky.stars[i]
        const x = s.x * W + curX * p.parallax * s.depth
        const y = ((s.y * H + t * 0.9 * s.depth + curY * p.parallax * s.depth) % H + H) % H
        const tw = 0.58 + 0.42 * Math.sin(t * s.speed + s.phase)
        const a = s.a * tw * p.alpha
        const color = p.colors[s.ci]

        if (s.glow) {
          const size = s.r * 15
          ctx.globalAlpha = a * 0.62
          ctx.drawImage(glows[s.ci], x - size / 2, y - size / 2, size, size)
        }
        ctx.globalAlpha = a
        ctx.fillStyle = 'rgb(' + color + ')'
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()

        if (s.spike && p.spikes && tw > 0.78) {
          const L = s.r * 7 * tw
          ctx.globalAlpha = a * 0.38
          ctx.strokeStyle = 'rgb(' + color + ')'
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(x - L, y)
          ctx.lineTo(x + L, y)
          ctx.moveTo(x, y - L * 0.72)
          ctx.lineTo(x, y + L * 0.72)
          ctx.stroke()
        }
      }

      /* --- 流星：细长拖尾 + 头部亮点 --- */
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.dx * m.speed * dt
        m.y += m.dy * m.speed * dt
        m.life -= dt
        if (m.life <= 0 || m.x < -180 || m.y > H + 180) {
          meteors.splice(i, 1)
          continue
        }
        const fade = Math.min(1, (m.max - m.life) / 0.16) * Math.min(1, m.life / 0.34)
        const tailX = m.x - m.dx * m.len
        const tailY = m.y - m.dy * m.len
        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y)
        grad.addColorStop(0, 'rgba(' + p.meteorColor + ',0)')
        grad.addColorStop(1, 'rgba(' + p.meteorColor + ',' + (fade * 0.75 * p.alpha) + ')')
        ctx.globalAlpha = 1
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(m.x, m.y)
        ctx.stroke()
        ctx.globalAlpha = fade * p.alpha
        ctx.fillStyle = 'rgb(' + p.meteorColor + ')'
        ctx.beginPath()
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function frame(ts) {
      raf = requestAnimationFrame(frame)
      if (ts - lastDraw < 32) return           // 约 30fps，够柔且省电
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0
      lastTs = ts
      lastDraw = ts

      curX += (tarX - curX) * 0.06
      curY += (tarY - curY) * 0.06

      const p = palette()
      if (ts > nextMeteor) spawnMeteor(ts, p)
      draw(ts / 1000, dt)
    }

    function startLoop() {
      if (raf || still || document.hidden) return
      lastTs = 0
      lastDraw = 0
      nextMeteor = performance.now() + 2600
      raf = requestAnimationFrame(frame)
    }
    function stopLoop() {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    function onPointer(e) {
      if (still) return
      tarX = (e.clientX / window.innerWidth - 0.5) * 2
      tarY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 120)
    }
    function onVisibility() {
      if (document.hidden) stopLoop()
      else startLoop()
    }
    function onMotionChange(e) {
      still = e.matches
      if (still) {
        stopLoop()
        meteors.length = 0
        curX = curY = tarX = tarY = 0
        draw(0, 0)
      } else {
        startLoop()
      }
    }
    function syncTheme() {
      theme.value = document.body.dataset.theme === 'zodiac' ? 'zodiac' : 'love'
      if (still) draw(0, 0)
    }

    onMounted(function () {
      cv = canvas.value
      if (!cv) return
      motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      still = motionQuery.matches
      resize()
      observer = new MutationObserver(syncTheme)
      observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] })
      window.addEventListener('resize', onResize, { passive: true })
      window.addEventListener('pointermove', onPointer, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionChange)
      else motionQuery.addListener(onMotionChange)
      if (still) draw(0, 0)
      else startLoop()
    })

    onUnmounted(function () {
      stopLoop()
      clearTimeout(resizeTimer)
      if (observer) observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      if (motionQuery && motionQuery.removeEventListener) motionQuery.removeEventListener('change', onMotionChange)
      else if (motionQuery) motionQuery.removeListener(onMotionChange)
    })

    return { theme, canvas }
  }
}
</script>
