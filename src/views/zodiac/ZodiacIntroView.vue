<template>
  <div class="stack gap-28 pad-y-44">
    <div class="stack gap-20">
      <SectionNo no="02" text="星座星语 / STAR NOTE" />
      <h1 class="display">{{ cfg.intro.title }}</h1>
      <p class="lede">{{ cfg.intro.lede }}</p>
    </div>
    <OrbitDeco :home="false" />
    <div class="step-preview step-preview--dark">
      <div v-for="s in cfg.steps" :key="s.no" class="sp-item">
        <span class="sp-no">{{ s.no }}</span>
        <b>{{ s.title }}</b>
        <small>{{ s.caption }}</small>
      </div>
    </div>
    <FactList :rows="cfg.intro.facts" />
    <NoticeBox :text="cfg.intro.notice" />
    <PrecisionNote :text="cfg.intro.stepHint" />
    <button type="button" class="btn btn-primary btn-block" @click="store.reset('zodiac')">
      开始第一步 <span class="arrow">→</span>
    </button>
    <RouterLink class="text-link" style="align-self:center" to="/">← 回首页，看看别的测试</RouterLink>
  </div>
</template>

<script>
import { useSessionStore } from '../../stores/session'
import SectionNo from '../../components/SectionNo.vue'
import OrbitDeco from '../../components/OrbitDeco.vue'
import FactList from '../../components/FactList.vue'
import NoticeBox from '../../components/NoticeBox.vue'
import PrecisionNote from '../../components/PrecisionNote.vue'

export default {
  name: 'ZodiacIntroView',
  components: { SectionNo, OrbitDeco, FactList, NoticeBox, PrecisionNote },
  setup() { return { store: useSessionStore() } },
  computed: { cfg() { return this.store.zodiacData } }
}
</script>
