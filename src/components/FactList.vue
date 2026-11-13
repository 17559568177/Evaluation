<template>
  <div class="fact-list">
    <div v-for="(r, i) in rows" :key="i" class="fact-row">
      <span class="fact-k">{{ r[0] }}</span><span class="fact-v">{{ r[1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FactList',
  props: { rows: Array }
}
</script>
