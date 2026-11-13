<template>
  <div class="seg">
    <button
      v-for="(p, i) in items"
      :key="p.key"
      type="button"
      class="seg-item"
      :class="{ 'is-on': value === p.key, 'is-tap': tap === p.key }"
      :style="{ '--i': i }"
      :title="p.range"
      @click="onPick(p.key)"
    >
      <span class="sg-icon">{{ sym(p.icon) }}</span>
      <span class="sg-text">{{ p.text }}</span>
      <span class="sg-range">{{ p.range }}</span>
    </button>
  </div>
</template>

<script>
import { sn } from '../store'

export default {
  name: 'SegPicker',
  props: { items: Array, value: String },
  emits: ['update'],
  data() { return { tap: null, timer: null } },
  setup() { return { sn } },
  beforeUnmount() { clearTimeout(this.timer) },
  methods: {
    sym(s) { return sn.sym(s) },
    onPick(key) {
      this.tap = key
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.tap = null }, 320)
      this.$emit('update', key)
    }
  }
}
</script>
