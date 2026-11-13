<template>
  <div v-if="sn.state.poster" class="poster-overlay" :class="{ 'is-on': on }" @click.self="sn.closePoster()">
    <div class="poster-panel">
      <div class="poster-head">
        <span>专属海报已生成</span>
        <button class="poster-x" @click="sn.closePoster()" aria-label="关闭">✕</button>
      </div>
      <div class="poster-scroll"><img :src="sn.state.poster.url" alt="你的结果海报"></div>
      <div class="poster-foot">
        <p>手机上长按图片即可保存 · 也可以下载原图</p>
        <button class="btn btn-primary btn-block" @click="sn.downloadPoster()">下载 PNG <span class="arrow">↓</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { sn } from '../store'

export default {
  name: 'PosterModal',
  setup() {
    const on = ref(false)
    watch(() => sn.state.poster, function (p) {
      if (p) requestAnimationFrame(function () { on.value = true })
      else on.value = false
    })
    return { sn, on }
  }
}
</script>
