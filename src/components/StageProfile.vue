<template>
  <div class="stage-journey">
    <div
      v-for="(s, i) in stages"
      :key="s.no"
      class="stage-card"
      :style="{ '--i': i }"
    >
      <div class="stage-head">
        <span class="stage-no">{{ s.no }}</span>
        <b class="stage-title">{{ s.title }}</b>
        <span class="stage-cap">{{ s.caption }}</span>
      </div>
      <div class="stage-dims">
        <div class="stage-dim">
          <span class="stage-dim-label">在意</span>
          <div class="stage-track"><div class="stage-fill" :style="{ width: bar(s, 'a') + '%' }"></div></div>
          <span class="stage-dim-num">{{ bar(s, 'a') }}</span>
        </div>
        <div class="stage-dim">
          <span class="stage-dim-label">独处</span>
          <div class="stage-track"><div class="stage-fill is-soft" :style="{ width: bar(s, 'v') + '%' }"></div></div>
          <span class="stage-dim-num">{{ bar(s, 'v') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StageProfile',
  props: { stages: Array },
  methods: {
    bar(s, key) {
      if (!s) return 50
      if (s[key] != null) return s[key]
      return key === 'a' ? (s.value || 50) : 50
    }
  }
}
</script>
