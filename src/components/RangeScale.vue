<template>
  <div class="range-field" :class="'range-field--' + theme">
    <div class="range-value">
      <b>{{ shown }}</b>
      <span>/ 100</span>
      <em class="range-mid-tag" v-if="shown === 50">正中间也可以</em>
    </div>

    <div class="range-track-wrap">
      <div class="range-ticks" aria-hidden="true">
        <span v-for="t in ticks" :key="t" :class="{ 'is-mid': t === 50, 'is-on': shown >= t }"></span>
      </div>
      <input
        class="range-input"
        type="range"
        min="0"
        max="100"
        step="1"
        :value="shown"
        :style="{ '--range': shown + '%' }"
        @input="onInput"
        aria-label="程度校准"
      >
      <span class="range-thumb-glow" :style="{ left: shown + '%' }" aria-hidden="true"></span>
    </div>

    <div class="range-labels">
      <span>{{ low }}</span>
      <span class="range-mid-label">50</span>
      <span>{{ high }}</span>
    </div>
    <p class="range-hint">拖到更像你的位置即可 · 停在 50 也完全没问题</p>
  </div>
</template>

<script>
import { sn } from '../store'

export default {
  name: 'RangeScale',
  props: { value: [Number, String], low: String, high: String },
  emits: ['update'],
  setup() { return { sn } },
  computed: {
    shown() { return this.value == null ? 50 : Number(this.value) },
    theme() { return sn.state.theme === 'zodiac' ? 'zodiac' : 'love' },
    ticks() { return [0, 25, 50, 75, 100] }
  },
  mounted() {
    /* 默认 50 直接写入答案，允许不拖就继续 */
    if (this.value == null) this.$emit('update', 50)
  },
  methods: {
    onInput(e) { this.$emit('update', Number(e.target.value)) }
  }
}
</script>
