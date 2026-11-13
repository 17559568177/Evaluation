<template>
  <div class="rarity">{{ prefix }} <b>{{ value }}%</b> {{ suffix }}</div>
</template>

<script>
export default {
  name: 'RarityLine',
  props: { value: Number, prefix: String, suffix: String }
}
</script>
