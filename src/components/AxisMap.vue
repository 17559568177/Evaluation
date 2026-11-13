<template>
  <div class="axis-map" :class="{ 'is-ready': ready }">
    <div class="axis-frame" :class="'is-' + typeKey">
      <span class="axis-corner tl">自处</span>
      <span class="axis-corner tr">潮汐</span>
      <span class="axis-corner bl">松弛</span>
      <span class="axis-corner br">确认</span>
      <span class="axis-edge axis-edge-x">在意 →</span>
      <span class="axis-edge axis-edge-y">独处 ↑</span>
      <div class="axis-cross axis-cross-x"></div>
      <div class="axis-cross axis-cross-y"></div>
      <div class="axis-quad q-tl"></div>
      <div class="axis-quad q-tr"></div>
      <div class="axis-quad q-bl"></div>
      <div class="axis-quad q-br"></div>
      <div class="axis-dot" :style="dotStyle">
        <span class="axis-pulse"></span>
      </div>
    </div>
    <div class="axis-legend">
      <div class="axis-legend-item">
        <span>在意程度</span>
        <b>{{ a }}%</b>
      </div>
      <div class="axis-legend-item">
        <span>独处需求</span>
        <b>{{ v }}%</b>
      </div>
    </div>
    <p class="axis-caption">{{ caption }}</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'AxisMap',
  props: {
    a: { type: Number, default: 50 },
    v: { type: Number, default: 50 },
    typeKey: { type: String, default: 'secure' }
  },
  setup(props) {
    const ready = ref(false)
    onMounted(function () {
      setTimeout(function () { ready.value = true }, 80)
    })
    const captions = {
      secure: '你落在偏松弛的一角——靠近和独处都不慌。',
      anxious: '你更靠近确认那一侧——信号一弱，会先认真起来。',
      avoidant: '你更靠近自处那一侧——需要一扇随时可关的门。',
      fearful: '你落在潮汐区——靠近和退开，往往同时发生。'
    }
    const dotStyle = computed(function () {
      const x = Math.max(8, Math.min(92, props.a))
      const y = Math.max(8, Math.min(92, 100 - props.v))
      return {
        left: ready.value ? x + '%' : '50%',
        top: ready.value ? y + '%' : '50%'
      }
    })
    const caption = computed(function () {
      return captions[props.typeKey] || captions.secure
    })
    return { ready, dotStyle, caption }
  }
}
</script>
