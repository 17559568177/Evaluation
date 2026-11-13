<template>
  <div class="progress-wrap">
    <div class="quiz-meta"><span>{{ caption }}</span><span>第 {{ current }} / {{ total }} 项</span></div>
    <div class="progress"><div class="progress-fill" :style="{ width: pct + '%' }"></div></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: { current: Number, total: Number, caption: String },
  computed: {
    pct() { return Math.round(this.current / this.total * 100) }
  }
}
</script>
