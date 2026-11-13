<template>
  <div>
    <section class="hero">
      <span class="kicker">SELF NOTE  /  INDEX</span>
      <h1 class="display">先认识一下<br>自己</h1>
      <p class="lede">两个分步的小测试。<br>不用登录，答完带走一张可以留很久的卡片。</p>
      <div class="hero-art"><HeroArt /></div>
    </section>
    <hr class="rule">
    <div class="home-list">
      <RouterLink class="home-card home-card--love" to="/love">
        <div class="hc-deco hc-seal"><b>10</b><span>项 · 3 阶段</span></div>
        <WaveDeco />
        <span class="hc-no">01  /  恋爱依恋</span>
        <h2 class="hc-title">在关系里，<br>你习惯站在哪里？</h2>
        <p class="hc-desc">3 个阶段 · 8 道情境 + 2 道程度校准<br>阶段画像 + 4 种依恋底色</p>
        <div class="hc-foot"><span>开始第一步 · 约 3 分钟</span><span class="hc-arrow">→</span></div>
      </RouterLink>
      <RouterLink class="home-card home-card--zodiac" to="/zodiac">
        <OrbitDeco :home="true" />
        <div class="hc-deco hc-moon"></div>
        <span class="hc-no">02  /  星座星语</span>
        <h2 class="hc-title">你的星语，<br>写在哪个夜晚</h2>
        <p class="hc-desc">3 个阶段 · 出生坐标 + 7 项选择<br>日月升组合 + 三维星语倾向</p>
        <div class="hc-foot"><span>开始第一步 · 约 2 分钟</span><span class="hc-arrow">→</span></div>
      </RouterLink>
    </div>
    <PrecisionNote text="两条测试共用一套分步问卷：每一步都参与结果，不是走个过场。" />
    <p class="body-s muted home-note">不收集身份信息 · 结果仅供娱乐 · 答案只留在本机</p>
  </div>
</template>

<script>
import HeroArt from '../components/HeroArt.vue'
import WaveDeco from '../components/WaveDeco.vue'
import OrbitDeco from '../components/OrbitDeco.vue'
import PrecisionNote from '../components/PrecisionNote.vue'

export default {
  name: 'HomeView',
  components: { HeroArt, WaveDeco, OrbitDeco, PrecisionNote }
}
</script>
