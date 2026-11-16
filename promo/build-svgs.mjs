import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))

function save(name, svg) {
  writeFileSync(join(dir, name), svg, 'utf8')
  console.log('svg', name)
}

save('love-xhs.svg', `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FBF6F0"/>
      <stop offset="55%" stop-color="#FAF1E8"/>
      <stop offset="100%" stop-color="#F3E0D2"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="12%" r="42%">
      <stop offset="0%" stop-color="#F2C6B4" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#F2C6B4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="8%" cy="72%" r="38%">
      <stop offset="0%" stop-color="#E2CDB4" stop-opacity=".35"/>
      <stop offset="100%" stop-color="#E2CDB4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1080" height="1440" fill="url(#bg)"/>
  <rect width="1080" height="1440" fill="url(#glow)"/>
  <rect width="1080" height="1440" fill="url(#glow2)"/>
  <g fill="#967458" opacity=".06">
    <circle cx="120" cy="220" r="1.5"/><circle cx="860" cy="180" r="1.2"/><circle cx="940" cy="420" r="1.4"/>
    <circle cx="200" cy="680" r="1.1"/><circle cx="760" cy="900" r="1.3"/><circle cx="140" cy="1100" r="1.2"/>
  </g>
  <text x="80" y="96" fill="#B9705A" font-family="Consolas,monospace" font-size="22" letter-spacing="6">SELF NOTE  /  01</text>
  <text x="80" y="168" fill="#24211E" font-family="Microsoft YaHei,SimSun,serif" font-size="42" font-weight="700">知我</text>
  <text x="176" y="164" fill="#9C8F82" font-family="Consolas,monospace" font-size="18" letter-spacing="3">SELF NOTE</text>
  <rect x="80" y="210" width="64" height="2" fill="#C4432F"/>
  <text x="80" y="310" fill="#B9705A" font-family="Consolas,monospace" font-size="20" letter-spacing="4">LOVE ATTACHMENT</text>
  <text x="80" y="400" fill="#24211E" font-family="Microsoft YaHei,SimSun,serif" font-size="58" font-weight="700">在关系里，</text>
  <text x="80" y="486" fill="#24211E" font-family="Microsoft YaHei,SimSun,serif" font-size="58" font-weight="700">你习惯站在哪里？</text>
  <text x="80" y="580" fill="#5E5349" font-family="Microsoft YaHei,sans-serif" font-size="26">三个小阶段，十个没有标准答案的瞬间。</text>
  <text x="80" y="624" fill="#5E5349" font-family="Microsoft YaHei,sans-serif" font-size="26">选最像你的那个就好。</text>
  <g transform="translate(820,280)">
    <circle r="78" fill="none" stroke="#B9705A" stroke-opacity=".45" stroke-width="1.5"/>
    <circle r="58" fill="none" stroke="#B9705A" stroke-opacity=".25" stroke-width="1"/>
    <text text-anchor="middle" y="16" fill="#B9705A" font-family="Microsoft YaHei,SimSun,serif" font-size="48" font-weight="700">稳</text>
  </g>
  <rect x="80" y="720" width="280" height="160" rx="4" fill="#FFFCF8" stroke="#E7CDBB"/>
  <text x="110" y="780" fill="#B9705A" font-family="Consolas,monospace" font-size="16" letter-spacing="2">TIME</text>
  <text x="110" y="830" fill="#24211E" font-family="Microsoft YaHei,sans-serif" font-size="30" font-weight="700">约 3 分钟</text>
  <rect x="400" y="720" width="280" height="160" rx="4" fill="#FFFCF8" stroke="#E7CDBB"/>
  <text x="430" y="780" fill="#B9705A" font-family="Consolas,monospace" font-size="16" letter-spacing="2">RESULT</text>
  <text x="430" y="830" fill="#24211E" font-family="Microsoft YaHei,sans-serif" font-size="30" font-weight="700">4 种底色</text>
  <rect x="720" y="720" width="280" height="160" rx="4" fill="#FFFCF8" stroke="#E7CDBB"/>
  <text x="750" y="780" fill="#B9705A" font-family="Consolas,monospace" font-size="16" letter-spacing="2">CARD</text>
  <text x="750" y="830" fill="#24211E" font-family="Microsoft YaHei,sans-serif" font-size="30" font-weight="700">专属卡片</text>
  <text x="80" y="980" fill="#5E5349" font-family="Microsoft YaHei,sans-serif" font-size="24">信号与回应 · 距离与边界 · 时间与以后</text>
  <text x="80" y="1034" fill="#9C8F82" font-family="Microsoft YaHei,sans-serif" font-size="22">不是诊断，只是把下意识的反应温柔摊开。</text>
  <rect x="80" y="1120" width="920" height="2" fill="#E8DED2"/>
  <text x="80" y="1200" fill="#24211E" font-family="Microsoft YaHei,SimSun,serif" font-size="32" font-weight="700">先认识一下自己</text>
  <text x="80" y="1260" fill="#9C8F82" font-family="Microsoft YaHei,sans-serif" font-size="22">不登录 · 不收集隐私 · 答案只留本机 · 仅供娱乐</text>
  <text x="80" y="1340" fill="#B9705A" font-family="Consolas,monospace" font-size="18" letter-spacing="3">XIAOHONGSHU  ·  LOVE</text>
</svg>`)

save('zodiac-xhs.svg', `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
  <defs>
    <linearGradient id="zbg" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#151B32"/>
      <stop offset="50%" stop-color="#111728"/>
      <stop offset="100%" stop-color="#0E1424"/>
    </linearGradient>
    <radialGradient id="zneb" cx="70%" cy="8%" r="45%">
      <stop offset="0%" stop-color="#8B87B8" stop-opacity=".34"/>
      <stop offset="100%" stop-color="#8B87B8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="zgold" cx="95%" cy="75%" r="35%">
      <stop offset="0%" stop-color="#D9BE8F" stop-opacity=".14"/>
      <stop offset="100%" stop-color="#D9BE8F" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1080" height="1440" fill="url(#zbg)"/>
  <rect width="1080" height="1440" fill="url(#zneb)"/>
  <rect width="1080" height="1440" fill="url(#zgold)"/>
  <g fill="#F0E3CB">
    <circle cx="140" cy="160" r="1.4" opacity=".7"/><circle cx="880" cy="180" r="1.6" opacity=".8"/>
    <circle cx="320" cy="240" r="1" opacity=".45"/><circle cx="960" cy="360" r="1.1" opacity=".5"/>
    <circle cx="200" cy="520" r="1.2" opacity=".55"/><circle cx="740" cy="480" r="1.5" opacity=".7"/>
    <circle cx="860" cy="980" r="1.4" opacity=".65"/><circle cx="90" cy="900" r="1.1" opacity=".5"/>
  </g>
  <g transform="translate(860,300)" fill="none" stroke="#D9BE8F" stroke-opacity=".28">
    <circle r="110" stroke-width="1"/>
    <circle r="78" stroke-width="1" stroke-opacity=".18"/>
    <circle r="3" cx="78" cy="0" fill="#D9BE8F" stroke="none" opacity=".8"/>
  </g>
  <text x="80" y="96" fill="#D9BE8F" font-family="Consolas,monospace" font-size="20" letter-spacing="5">SELF NOTE  /  02</text>
  <text x="80" y="168" fill="#F3EADA" font-family="Microsoft YaHei,SimSun,serif" font-size="42" font-weight="700">知我</text>
  <text x="176" y="164" fill="#8A88A8" font-family="Consolas,monospace" font-size="18" letter-spacing="3">SELF NOTE</text>
  <rect x="80" y="210" width="64" height="2" fill="#D9BE8F" opacity=".7"/>
  <text x="80" y="310" fill="#D9BE8F" font-family="Consolas,monospace" font-size="20" letter-spacing="4">STAR NOTE</text>
  <text x="80" y="400" fill="#F7ECD6" font-family="Microsoft YaHei,SimSun,serif" font-size="58" font-weight="700">你的星语，</text>
  <text x="80" y="486" fill="#F7ECD6" font-family="Microsoft YaHei,SimSun,serif" font-size="58" font-weight="700">写在哪个夜晚</text>
  <text x="80" y="580" fill="#C6C3D8" font-family="Microsoft YaHei,sans-serif" font-size="26">三步，一点点把星图对准你。</text>
  <text x="80" y="624" fill="#C6C3D8" font-family="Microsoft YaHei,sans-serif" font-size="26">出生坐标、夜空偏好、内在节奏。</text>
  <rect x="80" y="720" width="280" height="180" rx="4" fill="#262f4f" stroke="#5a4f3a"/>
  <text x="220" y="800" text-anchor="middle" fill="#EED5A8" font-family="Microsoft YaHei,sans-serif" font-size="28">太阳</text>
  <text x="220" y="850" text-anchor="middle" fill="#F3EADA" font-family="Microsoft YaHei,sans-serif" font-size="22">SUN</text>
  <rect x="400" y="720" width="280" height="180" rx="4" fill="#262f4f" stroke="#5a4f3a"/>
  <text x="540" y="800" text-anchor="middle" fill="#EED5A8" font-family="Microsoft YaHei,sans-serif" font-size="28">月亮</text>
  <text x="540" y="850" text-anchor="middle" fill="#F3EADA" font-family="Microsoft YaHei,sans-serif" font-size="22">MOON</text>
  <rect x="720" y="720" width="280" height="180" rx="4" fill="#262f4f" stroke="#5a4f3a"/>
  <text x="860" y="800" text-anchor="middle" fill="#EED5A8" font-family="Microsoft YaHei,sans-serif" font-size="28">上升</text>
  <text x="860" y="850" text-anchor="middle" fill="#F3EADA" font-family="Microsoft YaHei,sans-serif" font-size="22">RISING</text>
  <text x="80" y="980" fill="#C6C3D8" font-family="Microsoft YaHei,sans-serif" font-size="24">日月升组合 · 三维星语倾向 · 今日一句</text>
  <text x="80" y="1034" fill="#8A88A8" font-family="Microsoft YaHei,sans-serif" font-size="22">约 2 分钟 · 简版推算 · 仅供娱乐</text>
  <rect x="80" y="1120" width="920" height="1" fill="#5a4f3a"/>
  <text x="80" y="1200" fill="#F0E3CB" font-family="Microsoft YaHei,SimSun,serif" font-size="32" font-weight="700">先认识一下自己</text>
  <text x="80" y="1260" fill="#8A88A8" font-family="Microsoft YaHei,sans-serif" font-size="22">不登录 · 生日只用于本机推算 · 可生成星语海报</text>
  <text x="80" y="1340" fill="#D9BE8F" font-family="Consolas,monospace" font-size="18" letter-spacing="3">XIAOHONGSHU  ·  ZODIAC</text>
</svg>`)

save('love-xianyu.svg', `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="lbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FEF9F4"/>
      <stop offset="60%" stop-color="#F8E6DA"/>
      <stop offset="100%" stop-color="#EFCDBB"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#lbg)"/>
  <rect x="48" y="48" width="984" height="984" fill="none" stroke="#E7CDBB" stroke-width="2"/>
  <text x="540" y="160" text-anchor="middle" fill="#B9705A" font-family="Consolas,monospace" font-size="22" letter-spacing="6">SELF NOTE</text>
  <text x="540" y="250" text-anchor="middle" fill="#3B2A20" font-family="Microsoft YaHei,SimSun,serif" font-size="72" font-weight="700">知我</text>
  <text x="540" y="320" text-anchor="middle" fill="#7A5A48" font-family="Microsoft YaHei,sans-serif" font-size="28">恋爱依恋测试</text>
  <g transform="translate(540,470)">
    <circle r="70" fill="none" stroke="#B9705A" stroke-opacity=".5" stroke-width="1.5"/>
    <text text-anchor="middle" y="16" fill="#B9705A" font-family="Microsoft YaHei,SimSun,serif" font-size="44" font-weight="700">暖</text>
  </g>
  <text x="540" y="620" text-anchor="middle" fill="#3B2A20" font-family="Microsoft YaHei,SimSun,serif" font-size="36" font-weight="700">在关系里，你习惯站在哪里？</text>
  <text x="540" y="690" text-anchor="middle" fill="#7A5A48" font-family="Microsoft YaHei,sans-serif" font-size="24">约 3 分钟 · 4 种依恋底色 · 专属结果卡片</text>
  <text x="270" y="820" text-anchor="middle" fill="#5E5349" font-family="Microsoft YaHei,sans-serif" font-size="22">不登录</text>
  <text x="540" y="820" text-anchor="middle" fill="#5E5349" font-family="Microsoft YaHei,sans-serif" font-size="22">隐私本机</text>
  <text x="810" y="820" text-anchor="middle" fill="#5E5349" font-family="Microsoft YaHei,sans-serif" font-size="22">仅供娱乐</text>
  <text x="540" y="940" text-anchor="middle" fill="#B9705A" font-family="Consolas,monospace" font-size="18" letter-spacing="3">XIANYU  ·  LOVE</text>
</svg>`)

save('zodiac-xianyu.svg', `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="zsq" x1="0.15" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stop-color="#1C2542"/>
      <stop offset="100%" stop-color="#101629"/>
    </linearGradient>
    <radialGradient id="zn" cx="80%" cy="15%" r="40%">
      <stop offset="0%" stop-color="#8B87B8" stop-opacity=".32"/>
      <stop offset="100%" stop-color="#8B87B8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#zsq)"/>
  <rect width="1080" height="1080" fill="url(#zn)"/>
  <rect x="48" y="48" width="984" height="984" fill="none" stroke="#5a4f3a" stroke-width="2"/>
  <g fill="#F0E3CB" opacity=".7">
    <circle cx="180" cy="160" r="1.3"/><circle cx="900" cy="200" r="1.5"/>
    <circle cx="240" cy="880" r="1.1"/><circle cx="860" cy="820" r="1.4"/>
  </g>
  <g transform="translate(540,430)" fill="none" stroke="#D9BE8F" stroke-opacity=".35">
    <circle r="96" stroke-width="1"/>
    <circle r="64" stroke-width="1" stroke-opacity=".2"/>
    <circle r="3" cx="64" cy="0" fill="#EED5A8" stroke="none"/>
  </g>
  <text x="540" y="160" text-anchor="middle" fill="#D9BE8F" font-family="Consolas,monospace" font-size="22" letter-spacing="6">SELF NOTE</text>
  <text x="540" y="250" text-anchor="middle" fill="#F7ECD6" font-family="Microsoft YaHei,SimSun,serif" font-size="72" font-weight="700">知我</text>
  <text x="540" y="320" text-anchor="middle" fill="#C6C3D8" font-family="Microsoft YaHei,sans-serif" font-size="28">星座星语</text>
  <text x="540" y="620" text-anchor="middle" fill="#F0E3CB" font-family="Microsoft YaHei,SimSun,serif" font-size="36" font-weight="700">你的星语，写在哪个夜晚</text>
  <text x="540" y="690" text-anchor="middle" fill="#B4B1C9" font-family="Microsoft YaHei,sans-serif" font-size="24">太阳 · 月亮 · 上升 · 约 2 分钟</text>
  <text x="270" y="820" text-anchor="middle" fill="#8A88A8" font-family="Microsoft YaHei,sans-serif" font-size="22">简版推算</text>
  <text x="540" y="820" text-anchor="middle" fill="#8A88A8" font-family="Microsoft YaHei,sans-serif" font-size="22">今日星语</text>
  <text x="810" y="820" text-anchor="middle" fill="#8A88A8" font-family="Microsoft YaHei,sans-serif" font-size="22">可生成海报</text>
  <text x="540" y="940" text-anchor="middle" fill="#D9BE8F" font-family="Consolas,monospace" font-size="18" letter-spacing="3">XIANYU  ·  ZODIAC</text>
</svg>`)
