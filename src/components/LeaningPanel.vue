<template>
  <div class="leaning-panel">
    <div class="leaning-head">
      <span class="leaning-code">{{ leaning.code }} / {{ leaning.short }} 主导</span>
      <b>三维倾向分布</b>
    </div>
    <div class="leaning-bars">
      <div
        v-for="(row, i) in rows"
        :key="row.key"
        class="leaning-row"
        :class="{ 'is-top': row.key === leaningTop }"
      >
        <span class="leaning-name">{{ row.label }}</span>
        <div class="leaning-track">
          <div class="leaning-fill" :style="{ width: shown[row.key] + '%', '--d': i }"></div>
        </div>
        <span class="leaning-num">{{ profile[row.key] }}</span>
      </div>
    </div>
    <p class="leaning-note">{{ leaning.note }}</p>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'

export default {
  name: 'LeaningPanel',
  props: { dims: Array, profile: Object, leaning: Object },
  setup(props) {
    const shown = reactive({ i: 0, o: 0, w: 0 })
    onMounted(function () {
      setTimeout(function () {
        shown.i = props.profile.i
        shown.o = props.profile.o
        shown.w = props.profile.w
      }, 160)
    })
    return { shown }
  },
  computed: {
    leaningTop() {
      return (this.profile && this.profile.top) || 'i'
    },
    rows() {
      const keys = ['i', 'o', 'w']
      return (this.dims || []).map(function (label, i) {
        return { label: label, key: keys[i] }
      })
    }
  }
}
</script>
