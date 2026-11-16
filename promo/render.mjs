import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const dir = dirname(fileURLToPath(import.meta.url))
const files = [
  'love-xhs.svg',
  'zodiac-xhs.svg',
  'love-xianyu.svg',
  'zodiac-xianyu.svg'
]

for (const name of files) {
  const svg = readFileSync(join(dir, name), 'utf8')
  const resvg = new Resvg(Buffer.from(svg, 'utf8'), {
    fitTo: { mode: 'width', value: name.includes('xhs') ? 1080 : 1080 },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Microsoft YaHei'
    }
  })
  const png = resvg.render().asPng()
  const out = name.replace(/\.svg$/, '.png')
  writeFileSync(join(dir, out), png)
  console.log('wrote', out, png.length, 'bytes')
}
