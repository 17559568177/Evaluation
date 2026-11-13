<template>
  <div class="sign-triad">
    <div v-for="(t, i) in trio" :key="i" class="sign-cell" :style="{ '--d': i }">
      <span class="sign-role">{{ t.role }}</span>
      <span class="sign-glyph">{{ sym(t.s.glyph) }}</span>
      <span class="sign-name">{{ t.s.name }}</span>
      <span class="sign-mood">{{ t.s.mood || t.s.first }}</span>
      <div class="sign-tags" v-if="t.s.keywords">
        <span v-for="k in t.s.keywords.slice(0, 2)" :key="k">{{ k }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { sn } from '../store'

export default {
  name: 'SignTriad',
  props: { trio: Array },
  setup() { return { sn } },
  methods: {
    sym(s) { return sn.sym(s) }
  }
}
</script>
