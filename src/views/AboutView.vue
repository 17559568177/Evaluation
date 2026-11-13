<template>
  <div class="stack gap-28 pad-y-44">
    <div class="stack gap-20">
      <p class="section-no">ABOUT  /  关于与隐私</p>
      <h1 class="display">关于这两个<br>小测试</h1>
      <p class="lede">知我 SELF NOTE 是一个纯前端的分步小测试。<br>没有后端，也不试图认识你的身份。</p>
    </div>
    <div class="about-list">
      <div v-for="(it, i) in items" :key="i" class="about-item">
        <h4>{{ it[0] }}</h4><p>{{ it[1] }}</p>
      </div>
    </div>
    <div class="notice">结果仅供娱乐，不构成心理评估或任何专业建议。请勿在测试中填写真实身份信息。</div>
    <RouterLink class="text-link" style="align-self:flex-start" to="/">← 回首页</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  computed: {
    items() {
      return [
        ['分步问卷怎么算的', '恋爱依恋由 3 个阶段、10 项选择共同得出两维得分与阶段画像；星座星语由出生坐标、4 道夜空情境、2 道程度校准和 1 组关键词，共同决定日月升与三维倾向。每一步都参与结果。'],
        ['为什么会「显得准」', '一题一屏、阶段可见、进度可见，最后再给一张能回溯到各阶段的结果卡。精准感来自可解释的过程，而不是把题量堆多。'],
        ['我的答案去了哪里', '全部计算都在浏览器里完成，答案只存在本机的会话存储中，关掉页面或清空浏览器数据即消失。没有账号、没有上传、没有第三方脚本。'],
        ['关于星座推算', '太阳按日期换算；月亮与上升采用「星语简版」近似，出生地按经度带做粗略校正，不是精确天文历，也不构成任何性格结论或心理评估。'],
        ['关于结果海报', '竖版海报由浏览器本地绘制，手机上长按即可保存。海报上目前是品牌文字入口，等有已备案域名后可换成可扫的短链与二维码。']
      ]
    }
  }
}
</script>
