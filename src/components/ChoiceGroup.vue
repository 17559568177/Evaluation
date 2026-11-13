<template>
  <div class="option-list">
    <button
      v-for="(o, i) in options"
      :key="i"
      type="button"
      class="option"
      :class="[
        'option--' + theme,
        { 'is-picked': value === i, 'is-flash': flash === i }
      ]"
      :style="{ '--i': i }"
      @click="onPick(i)"
    >
      <span class="option-fill" aria-hidden="true"></span>
      <span class="option-shine" aria-hidden="true"></span>

      <span v-if="theme === 'zodiac'" class="option-fx option-fx--zodiac" aria-hidden="true">
        <i class="fx-comet fx-comet--a"></i>
        <i class="fx-comet fx-comet--b"></i>
        <i class="fx-trail"></i>
        <i v-for="n in 8" :key="'s' + n" class="fx-star" :style="starStyle(n)"></i>
        <i v-for="n in 3" :key="'k' + n" class="fx-spark" :style="sparkStyle(n)"></i>
      </span>

      <span v-else class="option-fx option-fx--love" aria-hidden="true">
        <i class="fx-ink"></i>
        <i class="fx-wave"></i>
        <i class="fx-ripple"></i>
        <i v-for="n in 5" :key="'b' + n" class="fx-bloom" :style="bloomStyle(n)"></i>
      </span>

      <span class="option-key">{{ keys[i] }}</span>
      <span class="option-text">{{ o.t }}</span>
      <span class="option-check" aria-hidden="true">{{ theme === 'zodiac' ? '✧' : '✓' }}</span>
    </button>
  </div>
</template>

<script>
import { sn } from '../store'

export default {
  name: 'ChoiceGroup',
  props: { options: Array, value: [Number, String] },
  emits: ['pick'],
  setup() { return { sn } },
  data() { return { flash: null } },
  computed: {
    keys() { return ['A', 'B', 'C', 'D', 'E', 'F'] },
    theme() { return sn.state.theme === 'zodiac' ? 'zodiac' : 'love' }
  },
  methods: {
    starStyle(n) {
      const tops = [14, 32, 48, 66, 82, 24, 58, 72]
      const delays = [0, 0.03, 0.06, 0.02, 0.08, 0.04, 0.07, 0.05]
      const sizes = [3, 2, 4, 2, 3, 2, 3, 2]
      const dx = [480, 560, 620, 520, 580, 500, 640, 540]
      return {
        '--t': tops[n - 1] + '%',
        '--d': delays[n - 1] + 's',
        '--s': sizes[n - 1] + 'px',
        '--dx': dx[n - 1] + '%'
      }
    },
    sparkStyle(n) {
      const tops = [28, 52, 74]
      const delays = [0.04, 0.1, 0.07]
      return { '--t': tops[n - 1] + '%', '--d': delays[n - 1] + 's' }
    },
    bloomStyle(n) {
      const tops = [18, 42, 58, 74, 34]
      const delays = [0.02, 0.06, 0.04, 0.09, 0.07]
      const sizes = [16, 24, 14, 22, 18]
      return {
        '--t': tops[n - 1] + '%',
        '--d': delays[n - 1] + 's',
        '--s': sizes[n - 1] + 'px'
      }
    },
    onPick(i) {
      this.flash = null
      this.$nextTick(() => {
        this.flash = i
        this.$emit('pick', i)
      })
    }
  }
}
</script>
