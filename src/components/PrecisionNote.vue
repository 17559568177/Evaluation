<template>
  <div class="precision-note">
    <span class="pn-mark">✳</span><span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'PrecisionNote',
  props: { text: String }
}
</script>
