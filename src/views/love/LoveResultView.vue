<template>
  <div class="result-view">
    <div class="result-head">
      <SectionNo no="01" text="恋爱依恋 · 你的底色" />
      <ResultCard variant="love" :kicker="'ATTACHMENT  /  ' + d.code"
                  :title="d.title" :desc="d.desc"
                  :serial="'SELF NOTE  ·  ' + d.sub + '  ·  ' + today">
        <div class="result-seal" aria-hidden="true">{{ d.seal }}</div>
        <RarityLine :value="d.rarity" prefix="约有" suffix="的人和你拥有同一种底色" />
        <div class="keyword-row">
          <span v-for="k in d.keywords" :key="k" class="keyword-chip">{{ k }}</span>
        </div>
      </ResultCard>
    </div>

    <section class="result-section">
      <SectionNo no="坐标" text="WHERE YOU STAND" />
      <AxisMap :a="bars[0].value" :v="bars[1].value" :type-key="r.key" />
      <PrecisionNote text="二维坐标由 3 个阶段 · 10 项选择共同推算，点落在哪里，比单一百分比更接近你" />
    </section>

    <section class="result-section">
      <SectionNo no="阶段画像" text="STAGE PROFILE" />
      <StageProfile :stages="r.stages" />
    </section>

    <section class="result-section">
      <div class="note-box note-box--lift">
        <span class="note-kicker">相处建议</span>
        <p>{{ d.note }}</p>
      </div>
    </section>

    <div class="result-actions">
      <button type="button" class="btn btn-primary btn-block" @click="store.openPoster('love')">
        生成专属海报 <span class="arrow">↓</span>
      </button>
      <button type="button" class="btn btn-outline btn-block" @click="store.reset('love')">再测一次</button>
      <button type="button" class="text-link" style="align-self:center" @click="store.copyLink()">
        复制入口链接，发给想 @ 的人 →
      </button>
    </div>
    <hr class="rule" style="margin:16px 0 0">
    <p class="body-s muted result-disclaimer">结果仅供娱乐 · 不构成心理评估</p>
  </div>
</template>

<script>
import { useSessionStore } from '../../stores/session'
import { fmtDate } from '../../utils/format'
import SectionNo from '../../components/SectionNo.vue'
import ResultCard from '../../components/ResultCard.vue'
import RarityLine from '../../components/RarityLine.vue'
import AxisMap from '../../components/AxisMap.vue'
import StageProfile from '../../components/StageProfile.vue'
import PrecisionNote from '../../components/PrecisionNote.vue'

export default {
  name: 'LoveResultView',
  components: { SectionNo, ResultCard, RarityLine, AxisMap, StageProfile, PrecisionNote },
  setup() { return { store: useSessionStore(), today: fmtDate() } },
  computed: {
    cfg() { return this.store.loveData },
    r() { return this.store.love.result || { key: 'secure', stages: [], a: 0, v: 0 } },
    d() { return this.cfg.results[this.r.key] || this.cfg.results.secure },
    bars() {
      const r = this.r, c = this.cfg
      return [
        { label: c.barLabels[0], value: c.toBar(r.a) },
        { label: c.barLabels[1], value: c.toBar(r.v) }
      ]
    }
  }
}
</script>
