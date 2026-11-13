/* 恋爱依恋 · 分步问卷与结果文案（3 个阶段 / 10 项选择） */
const LOVE_DATA = {
  intro: {
    title: "在关系里，\n你习惯站在哪里？",
    lede: "三个小阶段，10 个没有标准答案的瞬间。\n选最像你的那个就好。",
    facts: [
      ["结构", "3 个阶段 · 8 道情境题 + 2 道程度校准"],
      ["耗时", "约 3 分钟，可以随时退出"],
      ["结果", "4 种依恋底色 + 阶段画像 + 一张专属卡片"],
      ["隐私", "不收集任何身份信息，答案只留在本机"]
    ],
    notice: "这不是心理诊断，也不是给关系打分。它只是把你在某些瞬间下意识的反应，温柔地摊开给你看。",
    stepHint: "每一步只做一件事：先看信号，再看边界，最后看时间。"
  },
  loadingLines: ["正在把那些瞬间收拢", "把三个阶段慢慢对齐", "替你找一个合适的词", "快好了，再等一下"],
  steps: [
    { no: "01", title: "信号与回应", en: "SIGNAL", caption: "关系里的消息、靠近与争执" },
    { no: "02", title: "距离与边界", en: "DISTANCE", caption: "你需要多少自己的空气" },
    { no: "03", title: "时间与以后", en: "TIME", caption: "关于低落、承诺与位置" }
  ],
  /* a = 在意程度（焦虑向），v = 独处需求（回避向） */
  items: [
    { type: "choice", step: 0, q: "对方一整天没回消息，\n你更可能——", hint: "选第一反应，别选「应该」的反应", options: [
      { t: "照常过自己的一天，等他想聊自然会来", a: 0, v: 2 },
      { t: "有点在意，但不追问，晚点再说", a: 1, v: 0 },
      { t: "反复点开对话框，忍不住发一句「在吗」", a: 2, v: 0 },
      { t: "心里发紧，却决定也冷一下，谁都别先开口", a: 2, v: 2 }
    ] },
    { type: "choice", step: 0, q: "关系突然变得很亲近时，\n你第一反应是——", options: [
      { t: "挺自然，靠近本来就是件舒服的事", a: 0, v: 0 },
      { t: "开心，但会偷偷确认「他是不是也这么想」", a: 2, v: 0 },
      { t: "想往后退半步，留点自己的空气", a: 0, v: 2 },
      { t: "又想靠近又想躲，自己也说不清", a: 2, v: 2 }
    ] },
    { type: "choice", step: 0, q: "吵完架的那个晚上，\n你更需要——", options: [
      { t: "把话说开，哪怕聊到很晚", a: 0, v: 0 },
      { t: "一句明确的「我们没事」", a: 2, v: 0 },
      { t: "一个人待着，先把自己理顺", a: 0, v: 2 },
      { t: "又想被哄，又不想先示弱", a: 2, v: 2 }
    ] },
    { type: "choice", step: 1, q: "想象一段关系稳定下来，\n脑海里先浮现的是——", options: [
      { t: "两个人各做各的事，偶尔抬头对视", a: 0, v: 0 },
      { t: "每天都有说不完的话，和确定的晚安", a: 2, v: 0 },
      { t: "一间随时可以关上门的房间", a: 0, v: 2 },
      { t: "一张很暖的合照，和一点点想逃的冲动", a: 2, v: 2 }
    ] },
    { type: "choice", step: 1, q: "朋友说「你最近好像变了很多」，\n你会——", options: [
      { t: "笑笑，觉得自己确实松弛了些", a: 0, v: 0 },
      { t: "立刻回想是不是哪里做得不够好", a: 2, v: 0 },
      { t: "不太想解释，那是自己的事", a: 0, v: 2 },
      { t: "一边在意，一边把话题岔开", a: 2, v: 2 }
    ] },
    { type: "choice", step: 1, q: "深夜情绪低落，\n你更可能——", options: [
      { t: "找人说一会儿，说完就能睡", a: 0, v: 0 },
      { t: "等一个回复，等到手机暗下去", a: 2, v: 0 },
      { t: "自己消化，天亮就好了", a: 0, v: 2 },
      { t: "很想被找到，又怕真的被看见", a: 2, v: 2 }
    ] },
    { type: "choice", step: 2, q: "关于「以后」，\n你习惯——", options: [
      { t: "大致想想，不急着给答案", a: 0, v: 0 },
      { t: "反复确认彼此是不是在同一个版本里", a: 2, v: 0 },
      { t: "不轻易许诺，留一点余地", a: 0, v: 2 },
      { t: "一边计划，一边悄悄留好退路", a: 2, v: 2 }
    ] },
    { type: "choice", step: 2, q: "如果只能给关系留一个位置，\n你会把它放在——", options: [
      { t: "生活里，和别的事并排", a: 0, v: 0 },
      { t: "最显眼的地方，一眼就能看见", a: 2, v: 0 },
      { t: "靠窗的角落，光线好，也不被打扰", a: 0, v: 2 },
      { t: "手边，但随时能合上", a: 2, v: 2 }
    ] },
    { type: "scale", step: 2, dim: "a", q: "一段关系里出现安静时，\n你有多需要一句确认？", hint: "拖动校准，比二选一更接近真实", low: "安静也挺好", high: "很想听到回音" },
    { type: "scale", step: 2, dim: "v", q: "独处对你来说，\n有多像一次充电？", hint: "最后一题了", low: "更想有人陪", high: "几乎是必需" }
  ],
  barLabels: ["在意程度", "独处需求"],
  results: {
    secure: {
      code: "SECURE", seal: "稳", rarity: 38,
      title: "稳稳靠岸的人", sub: "THE STEADY ONE",
      desc: "你不太需要靠反复确认来安心。有人在场时你靠得过去，一个人时也过得很好——这种松弛，本身就是一种很稀有的能力。",
      note: "你最擅长的不是热烈，而是稳定。偶尔也可以把需要说出口，别总让对方猜。",
      keywords: ["松弛", "在场", "不慌"]
    },
    anxious: {
      code: "TENDER", seal: "真", rarity: 23,
      title: "把心动看得太重的人", sub: "THE TENDER ONE",
      desc: "你不是想太多，只是把每一句晚安都认真收好了。信号一弱，你会先替对方找理由，再悄悄怀疑自己。",
      note: "给「没回消息」留一点空白。你需要的是确定的回应，不是更快的回复。",
      keywords: ["认真", "敏感", "在意"]
    },
    avoidant: {
      code: "QUIET", seal: "自", rarity: 27,
      title: "留一盏灯给自己的人", sub: "THE QUIET ONE",
      desc: "你习惯把情绪整理好再拿出来。不是不在乎，而是需要一个能随时关上的门——那扇门后面，其实很暖。",
      note: "不用一次说很多。一句「我需要一点时间」，就足够让对方安心。",
      keywords: ["自持", "余地", "清醒"]
    },
    fearful: {
      code: "TIDAL", seal: "潮", rarity: 12,
      title: "又想靠近又想逃的人", sub: "THE TIDAL ONE",
      desc: "你像潮汐，靠近和退开都是真的。最想要的其实很朴素：有人愿意在你退回去的时候，还留在原地。",
      note: "先允许自己矛盾，再慢慢说出其中一半。被懂，不必一次到位。",
      keywords: ["潮汐", "矛盾", "赤诚"]
    }
  },
  /* 8 道选择题各 0–2 分 + 2 道滑杆各 0–2 分 = 每维 0–20
   * 临界缓冲：[9, 11] 为暧昧带——只有一侧够清楚时才归入焦虑/回避；两侧都暧昧则偏安全 */
  classify: function (a, v) {
    function band(x) {
      if (x < 9) return "lo";
      if (x > 11) return "hi";
      return "mid";
    }
    var ba = band(a), bv = band(v);
    if (ba === "lo" && bv === "lo") return "secure";
    if (ba === "hi" && bv === "lo") return "anxious";
    if (ba === "lo" && bv === "hi") return "avoidant";
    if (ba === "hi" && bv === "hi") return "fearful";
    if (ba === "mid" && bv === "mid") return "secure";
    if (ba === "mid") return bv === "hi" ? "avoidant" : "secure";
    if (bv === "mid") return ba === "hi" ? "anxious" : "secure";
    return "fearful";
  },
  toBar: function (score) { return Math.min(94, 20 + Math.round(score / 20 * 72)); },
  /* 每个阶段同时回溯「在意」与「独处」，让结果页有二维依据 */
  stageScores: function (answers) {
    var out = [], self = this;
    this.steps.forEach(function (s, si) {
      var sumA = 0, sumV = 0, nA = 0, nV = 0;
      self.items.forEach(function (it, i) {
        if (it.step !== si) return;
        var ans = answers[i];
        if (it.type === "choice" && it.options[ans]) {
          sumA += it.options[ans].a; nA++;
          sumV += it.options[ans].v; nV++;
        } else if (it.type === "scale" && ans != null) {
          var x = (+ans) / 50;
          if (it.dim === "a") { sumA += x; nA++; }
          else if (it.dim === "v") { sumV += x; nV++; }
        }
      });
      function pct(sum, n) {
        return n ? Math.min(94, 18 + Math.round(sum / (n * 2) * 76)) : 50;
      }
      var a = pct(sumA, nA), v = pct(sumV, nV);
      out.push({
        no: s.no, title: s.title, a: a, v: v, value: a,
        caption: self.stageCaption(a, v)
      });
    });
    return out;
  },
  stageCaption: function (a, v) {
    var hiA = a >= 66, loA = a < 38, hiV = v >= 66, loV = v < 38;
    if (loA && loV) return "偏松弛";
    if (hiA && loV) return "偏确认";
    if (loA && hiV) return "偏自处";
    if (hiA && hiV) return "又近又远";
    if (hiA) return "更在意回音";
    if (hiV) return "更需要空气";
    return "看具体情境";
  }
};

export default LOVE_DATA;
