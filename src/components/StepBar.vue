<template>
  <div class="stepbar" aria-label="问卷阶段">
    <div v-for="(s, i) in steps" :key="i" class="stepbar-item"
         :class="{ 'is-current': i === current, 'is-done': isDone(i) }">
      <span class="sb-index">{{ label(i, s) }}</span>
      <span class="sb-body"><b>{{ s.title }}</b><small>{{ s.en }}</small></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepBar',
  props: { steps: Array, current: Number },
  methods: {
    isDone(i) { return i < this.current },
    label(i, s) { return this.isDone(i) ? '✓' : s.no }
  }
}
</script>
