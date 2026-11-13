<template>
  <svg :class="home ? 'hc-deco hc-orbit' : 'zodiac-orbit-deco'" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="105" cy="105" r="96" stroke="#D9BE8F" stroke-opacity=".38"/>
    <circle cx="105" cy="105" r="70" stroke="#D9BE8F" stroke-opacity=".24"/>
    <circle cx="105" cy="105" r="44" stroke="#D9BE8F" stroke-opacity=".16"/>
    <circle cx="105" cy="9" r="2.5" fill="#EED5A8"/>
    <circle cx="201" cy="105" r="1.8" fill="#EED5A8" opacity=".8"/>
    <circle cx="35" cy="176" r="1.6" fill="#EED5A8" opacity=".7"/>
    <path d="M28 44v12M22 50h12M180 158v10M175 163h10" stroke="#D9BE8F" stroke-opacity=".55" stroke-linecap="round"/>
  </svg>
</template>

<script>
export default {
  name: 'OrbitDeco',
  props: { home: Boolean }
}
</script>
