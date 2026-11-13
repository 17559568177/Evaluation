<template>
  <div class="result-card" :class="'result-card--' + variant">
    <div class="rc-deco" :class="variant === 'zodiac' ? 'rc-orbit' : 'rc-corner'"></div>
    <span class="kicker">{{ kicker }}</span>
    <h1 class="result-title">{{ title }}</h1>
    <p class="result-desc">{{ desc }}</p>
    <slot></slot>
    <div class="rc-serial">{{ serial }}</div>
  </div>
</template>

<script>
export default {
  name: 'ResultCard',
  props: { variant: String, kicker: String, title: String, desc: String, serial: String }
}
</script>
