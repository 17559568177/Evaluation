<template>
  <div class="loading">
    <div class="loading-orbit">
      <svg viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="66" cy="66" r="60" stroke="currentColor" stroke-opacity=".2"/>
        <circle cx="66" cy="66" r="47" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="2 7"/>
        <path d="M66 6 A60 60 0 0 1 126 66" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="66" cy="6" r="2.4" fill="currentColor"/>
      </svg>
      <div class="loading-core">{{ dark ? '☾' : '◐' }}</div>
    </div>
    <div class="loading-text">{{ text }}</div>
    <div class="loading-sub">{{ sub }}</div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'LoadingOrbit',
  props: { lines: Array, sub: String, dark: Boolean },
  emits: ['done'],
  setup(props, ctx) {
    const text = ref(props.lines[0] || '')
    const timers = []
    onMounted(function () {
      props.lines.forEach(function (line, i) {
        if (i > 0) timers.push(setTimeout(function () { text.value = line }, i * 540))
      })
      timers.push(setTimeout(function () { ctx.emit('done') }, 2250))
    })
    onUnmounted(function () { timers.forEach(clearTimeout) })
    return { text }
  }
}
</script>
