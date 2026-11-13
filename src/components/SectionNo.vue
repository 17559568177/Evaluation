<template>
  <p class="section-no">{{ no }}&nbsp; / &nbsp;{{ text }}</p>
</template>

<script>
export default {
  name: 'SectionNo',
  props: { no: String, text: String }
}
</script>
