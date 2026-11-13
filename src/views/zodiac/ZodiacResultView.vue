<template>
  <div class="result-view">
    <div class="result-head">
      <SectionNo no="02" text="星座星语 · 你的星图" />
      <ResultCard variant="zodiac" :kicker="'STAR NOTE  /  ' + sun.name + '  ·  ' + r.dateStr"
                  :title="ln.title" :desc="ln.desc"
                  :serial="'SELF NOTE  ·  ' + ln.code + '  ·  ' + today">
        <div class="result-seal result-seal--zodiac" aria-hidden="true">{{ ln.seal }}</div>
        <RarityLine :value="r.rarity" prefix="这组星语的同频稀有度约" suffix="" />
        <div class="keyword-row">
          <span class="keyword-chip">{{ ln.short }}</span>
          <span class="keyword-chip">{{ sun.element }}象 · {{ sun.name }}</span>
          <span class="keyword-chip">{{ moon.mood }}情绪</span>
          <span class="keyword-chip">上升 · {{ rising.first }}</span>
        </div>
      </ResultCard>
    </div>

    <section class="result-section">
      <SectionNo no="太阳 · 月亮 · 上升" text="YOUR TRIAD" />
      <SignTriad :trio="trio" />
      <div class="meta-strip">
        <span>{{ r.dateStr }}</span>
        <span>{{ r.periodText }}</span>
        <span>{{ r.city }}</span>
      </div>
      <p class="body-s muted triad-note">
        月亮在{{ moon.name }}：情绪更像「{{ moon.mood }}」 · 上升在{{ rising.name }}：第一印象是「{{ rising.first }}」
      </p>
    </section>

    <section class="result-section">
      <SectionNo no="星语倾向" text="FROM YOUR CHOICES" />
      <LeaningPanel :dims="cfg.dims" :profile="r.profile" :leaning="ln" />
      <PrecisionNote text="由出生坐标 + 7 项选择共同生成：4 道夜空情境、2 道程度校准、1 组关键词" />
    </section>

    <section class="result-section">
      <div class="daily-panel">
        <span class="daily-kicker">今日星语</span>
        <p class="daily-quote">「{{ r.daily }}」</p>
        <p class="body-s muted" style="text-align:center">每天换一句 · 只留给这一天</p>
      </div>
    </section>

    <div class="result-actions">
      <button type="button" class="btn btn-primary btn-block" @click="store.openPoster('zodiac')">
        生成星语海报 <span class="arrow">↓</span>
      </button>
      <button type="button" class="btn btn-outline btn-block" @click="store.reset('zodiac')">重新校准</button>
      <button type="button" class="text-link" style="align-self:center" @click="store.copyLink()">
        复制入口链接，发给想 @ 的人 →
      </button>
    </div>
    <hr class="rule" style="margin:16px 0 0">
    <p class="body-s muted result-disclaimer">月亮与上升为星语简版推算 · 结果仅供娱乐</p>
  </div>
</template>

<script>
import { useSessionStore } from '../../stores/session'
import { fmtDate } from '../../utils/format'
import SectionNo from '../../components/SectionNo.vue'
import ResultCard from '../../components/ResultCard.vue'
import RarityLine from '../../components/RarityLine.vue'
import SignTriad from '../../components/SignTriad.vue'
import LeaningPanel from '../../components/LeaningPanel.vue'
import PrecisionNote from '../../components/PrecisionNote.vue'

export default {
  name: 'ZodiacResultView',
  components: { SectionNo, ResultCard, RarityLine, SignTriad, LeaningPanel, PrecisionNote },
  setup() { return { store: useSessionStore(), today: fmtDate() } },
  computed: {
    cfg() { return this.store.zodiacData },
    r() { return this.store.zodiac.result },
    ln() { return this.cfg.leanings[this.r ? this.r.leaning : 'i'] },
    sun() { return this.cfg.signs[this.r ? this.r.sun : 7] },
    moon() { return this.cfg.signs[this.r ? this.r.moon : 2] },
    rising() { return this.cfg.signs[this.r ? this.r.rising : 4] },
    trio() {
      return [
        { s: this.sun, role: '太阳' },
        { s: this.moon, role: '月亮' },
        { s: this.rising, role: '上升' }
      ]
    }
  }
}
</script>
