<template>
  <div class="bar-row" :class="{ 'is-ready': ready }">
    <div class="bar-label"><span>{{ label }}</span><span>{{ value }}%</span></div>
    <div class="bar-track">
      <div class="bar-fill" :style="{ width: w + '%' }"></div>
      <span class="bar-dot" :style="{ left: w + '%' }"></span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'BarMeter',
  props: { label: String, value: Number },
  setup(props) {
    const w = ref(0)
    const ready = ref(false)
    onMounted(function () {
      setTimeout(function () {
        w.value = props.value
        ready.value = true
      }, 140)
    })
    return { w, ready }
  }
}
</script>
