<template>
  <div class="tagpick">
    <div class="tagpick-head"><span>已选 {{ count }} / {{ max }}</span><span class="muted">点选或取消</span></div>
    <div class="tagpick-list">
      <button v-for="t in tags" :key="t.k" type="button" class="tagpick-item"
              :class="{ 'is-on': has(t.k) }" @click="toggle(t.k)">{{ t.k }}</button>
    </div>
  </div>
</template>

<script>
import { sn } from '../store'

export default {
  name: 'TagPicker',
  props: { tags: Array, value: Array, max: Number },
  emits: ['update'],
  setup() { return { sn } },
  computed: {
    count() { return (this.value || []).length }
  },
  methods: {
    has(k) { return (this.value || []).indexOf(k) >= 0 },
    toggle(k) {
      const v = (this.value || []).slice(), i = v.indexOf(k)
      if (i >= 0) v.splice(i, 1)
      else {
        if (v.length >= this.max) { sn.toast('最多选 ' + this.max + ' 个'); return }
        v.push(k)
      }
      this.$emit('update', v)
    }
  }
}
</script>
