<template>
  <div class="quiz-shell">
    <div class="quiz-top">
      <StepBar :steps="steps" :current="cur.step" />
      <ProgressBar :current="cursor + 1" :total="items.length" :caption="caption" />
    </div>

    <Transition name="quiz-swap" mode="out-in">
      <div class="quiz-body" :key="cursor">
        <p class="q-stage">{{ step.no }} / {{ step.title }} <span>· {{ step.caption }}</span></p>
        <h1 class="quiz-q">{{ cur.q }}</h1>
        <p class="quiz-hint" v-if="cur.hint">{{ cur.hint }}</p>

        <ChoiceGroup v-if="cur.type === 'choice'" :options="cur.options" :value="answers[cursor]" @pick="pick" />
        <RangeScale v-else-if="cur.type === 'scale'" :low="cur.low" :high="cur.high"
                    :value="answers[cursor]" @update="onScale" />
        <TagPicker v-else-if="cur.type === 'multi'" :tags="cur.tags" :max="cur.max"
                   :value="answers[cursor] || []" @update="onTags" />
        <BirthForm v-else-if="cur.type === 'birth'" :birth="sn.state.zodiac.birth"
                   :periods="sn.Z.periods" :cities="sn.Z.cities" />
      </div>
    </Transition>

    <div class="quiz-foot">
      <button v-if="cursor > 0" type="button" class="text-link" @click="prev">← 上一项</button>
      <RouterLink v-else class="text-link" :to="'/' + line">← 退出测试</RouterLink>
      <button v-if="cur.type !== 'choice'" type="button" class="btn btn-primary btn-sm"
              :disabled="!canNext" @click="next">继续 <span class="arrow">→</span></button>
      <span class="body-s muted">{{ nextHint }}</span>
    </div>
    <p class="quiz-footnote">每一步都会写进结果 · 中途退出不留任何记录</p>
  </div>
</template>

<script>
import { sn } from '../store'
import StepBar from './StepBar.vue'
import ProgressBar from './ProgressBar.vue'
import ChoiceGroup from './ChoiceGroup.vue'
import RangeScale from './RangeScale.vue'
import TagPicker from './TagPicker.vue'
import BirthForm from './BirthForm.vue'

/* 两条路由共用的分步问卷骨架：题干、阶段、进度、校验、前进后退全在这里 */
export default {
  name: 'QuizShell',
  components: { StepBar, ProgressBar, ChoiceGroup, RangeScale, TagPicker, BirthForm },
  props: { line: String },
  setup() { return { sn } },
  data() { return { locked: false, timer: null } },
  computed: {
    cfg() { return this.line === 'love' ? sn.L : sn.Z },
    steps() { return this.cfg.steps },
    items() { return this.cfg.items },
    cursor() { return Math.min(sn.state[this.line].cursor, this.items.length - 1) },
    answers() { return sn.state[this.line].answers },
    cur() { return this.items[this.cursor] || this.items[0] },
    step() { return this.steps[this.cur.step] || this.steps[0] },
    caption() { return 'STEP ' + this.step.no + '  /  ' + this.step.title },
    canNext() {
      const t = this.cur.type, a = this.answers[this.cursor]
      if (t === 'multi') return Array.isArray(a) && a.length > 0
      if (t === 'birth') return sn.validDate(sn.state.zodiac.birth.date)
      if (t === 'scale') return true
      return true
    },
    nextHint() {
      if (this.cur.type === 'multi') return '至少选 1 个，再继续'
      if (this.cur.type === 'scale') return '中间也可以，调好后继续'
      if (this.cur.type === 'birth') return '填好生日再继续'
      return '点选即进入下一项'
    }
  },
  beforeUnmount() { clearTimeout(this.timer) },
  methods: {
    save(v) { sn.setAnswer(this.line, this.cursor, v) },
    onScale(v) { this.save(v) },
    onTags(v) { this.save(v) },
    pick(i) {
      if (this.locked) return
      this.locked = true
      this.save(i)
      /* 特效播一小段就翻题，别拖沓 */
      this.timer = setTimeout(() => { this.locked = false; this.advance() }, 340)
    },
    advance() {
      if (this.cursor < this.items.length - 1) sn.setCursor(this.line, this.cursor + 1)
      else sn.finish(this.line)
    },
    next() {
      if (!this.canNext) return
      if (this.cur.type === 'scale' && this.answers[this.cursor] == null) this.save(50)
      this.advance()
    },
    prev() {
      if (this.locked) return
      if (this.cursor > 0) sn.setCursor(this.line, this.cursor - 1)
    }
  }
}
</script>
