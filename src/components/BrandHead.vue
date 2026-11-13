<template>
  <header class="site-head">
    <RouterLink class="brand" to="/" aria-label="知我 SELF NOTE 首页">
      <span class="brand-cn">知我</span><span class="brand-en">SELF NOTE</span>
    </RouterLink>
    <div class="head-right">
      <span class="head-route">{{ sn.state.headLabel }}</span>
      <RouterLink class="head-link" to="/about">关于与隐私</RouterLink>
    </div>
  </header>
</template>

<script>
import { sn } from '../store'
export default { name: 'BrandHead', setup() { return { sn } } }
</script>
