/* 星座星语 · 3 步星图问卷、倾向文案与简版推算 */
const ZODIAC_DATA = {
  intro: {
    title: "你的星语，\n写在哪个夜晚",
    lede: "三步，一点点把星图对准你。\n出生坐标、夜空偏好、内在节奏。",
    facts: [
      ["结构", "3 个阶段 · 出生坐标 + 7 项选择"],
      ["耗时", "约 2 分钟，可以随时退出"],
      ["结果", "日月升组合 + 三维星语倾向 + 每日一句"],
      ["隐私", "不收集任何身份信息，生日只用于本机推算"]
    ],
    notice: "月亮与上升采用「星语简版」推算，仅供娱乐，不是精确天文历；选择题只用于生成倾向描述，不构成任何心理评估。",
    stepHint: "先定坐标，再看你如何感受夜晚，最后校准内在节奏。"
  },
  loadingLines: ["正在翻到属于你的那一页", "对齐太阳、月亮与地平线", "把七项选择也放进星图", "快好了，就亮了"],
  steps: [
    { no: "01", title: "出生坐标", en: "WHERE", caption: "先定下时间与地点" },
    { no: "02", title: "夜空偏好", en: "NIGHT SKY", caption: "四个关于夜晚的小选择" },
    { no: "03", title: "内在节奏", en: "RHYTHM", caption: "最后校准你的倾向" }
  ],
  periods: [
    { key: "dawn", icon: "✧", text: "清晨", range: "05:00–10:00", offset: 0 },
    { key: "day", icon: "☉", text: "白日", range: "10:00–17:00", offset: 3 },
    { key: "dusk", icon: "◑", text: "傍晚", range: "17:00–22:00", offset: 6 },
    { key: "night", icon: "☾", text: "深夜", range: "22:00–05:00", offset: 9 }
  ],
  /* 出生地：以经度带近似，参与上升的简版偏移 */
  cities: [
    { key: "east", text: "华东 · 沿海", offset: 0 },
    { key: "north", text: "华北 · 东北", offset: 1 },
    { key: "south", text: "华南 · 港澳", offset: 1 },
    { key: "west", text: "西部 · 西北", offset: -2 },
    { key: "oversea", text: "海外 · 其它时区", offset: 3 }
  ],
  /* 扁平问卷项，step 指向 steps 下标。d = 直觉 / 秩序 / 温度 权重 */
  items: [
    { type: "birth", step: 0, q: "你来到世界的那一刻", hint: "生日、时段与出生地，会共同决定太阳、月亮与上升" },
    { type: "choice", step: 1, q: "如果今晚只能留一扇窗，\n你希望窗外是——", hint: "选第一眼就想住进去的那个", options: [
      { t: "下过雨的街道，映着零碎的灯", d: { i: 2, o: 0, w: 1 } },
      { t: "很整齐的屋檐，和一条笔直的路", d: { i: 0, o: 2, w: 0 } },
      { t: "有人还没关灯的那栋楼", d: { i: 1, o: 0, w: 2 } },
      { t: "看不清的远处，和一点风", d: { i: 2, o: 1, w: 0 } }
    ] },
    { type: "choice", step: 1, q: "深夜突然醒来，\n你更可能——", options: [
      { t: "躺着，把刚才的梦回想完", d: { i: 2, o: 0, w: 1 } },
      { t: "起身把没收好的东西归位", d: { i: 0, o: 2, w: 0 } },
      { t: "给谁发一句「睡了吗」", d: { i: 0, o: 0, w: 2 } },
      { t: "看一眼时间，再闭上眼", d: { i: 1, o: 1, w: 1 } }
    ] },
    { type: "choice", step: 1, q: "你更常被哪种时刻打动——", options: [
      { t: "没说出口，却刚好被懂的瞬间", d: { i: 2, o: 0, w: 1 } },
      { t: "所有东西终于各归其位", d: { i: 0, o: 2, w: 0 } },
      { t: "有人记得你不经意提过的小事", d: { i: 0, o: 1, w: 2 } },
      { t: "计划之外，忽然出现的好天气", d: { i: 1, o: 0, w: 1 } }
    ] },
    { type: "choice", step: 1, q: "替自己挑一句星语，\n你会选——", options: [
      { t: "「先跟着感觉走一段」", d: { i: 2, o: 0, w: 0 } },
      { t: "「每一步都算数」", d: { i: 0, o: 2, w: 0 } },
      { t: "「有人同行，就不算远」", d: { i: 0, o: 0, w: 2 } },
      { t: "「留一点给还没发生的事」", d: { i: 1, o: 1, w: 0 } }
    ] },
    { type: "scale", step: 2, dim: "i", q: "做决定时，\n你有多依赖第一直觉？", hint: "拖动校准，星图会更贴近你", low: "更看依据", high: "几乎是直觉" },
    { type: "multi", step: 2, q: "此刻最像你的三个词", hint: "选 1–3 个，不用凑满", max: 3, tags: [
      { k: "敏感", dim: "i" }, { k: "好奇", dim: "i" }, { k: "爱幻想", dim: "i" },
      { k: "有条理", dim: "o" }, { k: "慢热", dim: "o" }, { k: "笃定", dim: "o" },
      { k: "念旧", dim: "w" }, { k: "共情", dim: "w" }, { k: "热烈", dim: "w" }
    ] },
    { type: "scale", step: 2, dim: "w", q: "你有多愿意，\n替别人留出一个位置？", hint: "最后一项了", low: "先照顾好自己", high: "常常先想到别人" }
  ],
  dims: ["直觉", "秩序", "温度"],
  leanings: {
    i: {
      code: "MOONLIT", short: "直觉型", seal: "觉", title: "凭直觉认路的人",
      desc: "你不太需要把理由说全。心里那句「就是它了」，往往比推演更早到，也常常没错。",
      note: "你的判断有来处，只是不总说得清。留一点余地给临时改主意，也留一点给别人的确定感。"
    },
    o: {
      code: "STEADY", short: "秩序型", seal: "序", title: "替自己定坐标的人",
      desc: "你喜欢知道下一步落在哪里。不是拘谨，是想让在意的事，有个稳稳的落点。",
      note: "计划让你安心，也偶尔让你紧绷。允许有一晚不排行程，星图照样会亮。"
    },
    w: {
      code: "WARM", short: "温度型", seal: "暖", title: "替别人留灯的人",
      desc: "你总能先察觉到气氛里没说出口的那一层，然后悄悄给它留个位置。",
      note: "照顾别人很熟练，也记得给自己留一盏。被照顾不是麻烦谁，是关系本来的样子。"
    }
  },
  /* 索引顺序：0 摩羯 → 11 射手 */
  signs: [
    { name: "摩羯座", glyph: "♑", element: "土", title: "慢慢登顶的人", desc: "你不急着被看见，只把每一步踩实。", mood: "沉稳", first: "可靠", keywords: ["踏实", "长线", "笃定"] },
    { name: "水瓶座", glyph: "♒", element: "风", title: "留着一点不同", desc: "你总给世界留一个没被说服的角落。", mood: "疏朗", first: "特别", keywords: ["自由", "清醒", "不群"] },
    { name: "双鱼座", glyph: "♓", element: "水", title: "替世界做梦的人", desc: "你把别人没说出口的情绪，都轻轻接住了。", mood: "柔软", first: "温和", keywords: ["共情", "想象", "温柔"] },
    { name: "白羊座", glyph: "♈", element: "火", title: "先迈出去的人", desc: "你的勇气总比犹豫快半拍。", mood: "直接", first: "明亮", keywords: ["勇气", "开始", "热烈"] },
    { name: "金牛座", glyph: "♉", element: "土", title: "把日子过稳的人", desc: "你相信慢下来的东西才留得久。", mood: "安定", first: "从容", keywords: ["耐心", "质感", "守常"] },
    { name: "双子座", glyph: "♊", element: "风", title: "好奇心不熄的人", desc: "你对世界永远多问一句为什么。", mood: "流动", first: "机敏", keywords: ["好奇", "轻盈", "善谈"] },
    { name: "巨蟹座", glyph: "♋", element: "水", title: "记得很多细节的人", desc: "你把在意藏在很小的动作里。", mood: "细腻", first: "亲近", keywords: ["记得", "照顾", "念旧"] },
    { name: "狮子座", glyph: "♌", element: "火", title: "自带一点光的人", desc: "你一出现，气氛就有了重心。", mood: "坦荡", first: "有光", keywords: ["大方", "热烈", "在场"] },
    { name: "处女座", glyph: "♍", element: "土", title: "悄悄把事做好的人", desc: "你的温柔，是替别人多想了一步。", mood: "细致", first: "利落", keywords: ["分寸", "体贴", "认真"] },
    { name: "天秤座", glyph: "♎", element: "风", title: "替两端找平衡的人", desc: "你总在找一个谁都不委屈的位置。", mood: "平和", first: "好看", keywords: ["分寸", "体面", "和气"] },
    { name: "天蝎座", glyph: "♏", element: "水", title: "把话藏在深处的人", desc: "你看得比说出来的更多。", mood: "深", first: "有距离", keywords: ["直觉", "专注", "深"] },
    { name: "射手座", glyph: "♐", element: "火", title: "一直望向远处的人", desc: "你心里总留着一条没走完的路。", mood: "开阔", first: "松弛", keywords: ["远方", "坦率", "生长"] }
  ],
  sunTable: [
    { s: 20, a: 0, b: 1 }, { s: 19, a: 1, b: 2 }, { s: 21, a: 2, b: 3 },
    { s: 20, a: 3, b: 4 }, { s: 21, a: 4, b: 5 }, { s: 22, a: 5, b: 6 },
    { s: 23, a: 6, b: 7 }, { s: 23, a: 7, b: 8 }, { s: 23, a: 8, b: 9 },
    { s: 24, a: 9, b: 10 }, { s: 23, a: 10, b: 11 }, { s: 22, a: 11, b: 0 }
  ],
  dailyLines: [
    "今晚适合把没说完的话，先说给自己听。",
    "你惦记的那件事，会比想象中轻一点。",
    "别急着给情绪命名，让它先安静待一会儿。",
    "月亮不赶路，也照样到了该到的地方。",
    "有人正在用你不知道的方式记得你。",
    "慢一点不算落后，只是另一种准时。",
    "把窗开一条缝，让新的风自己进来。",
    "今天最该被照顾的，是那个不声不响的自己。",
    "不必把每个答案都凑齐，留一个给明天。",
    "你走过的夜路，都在替你认星星。",
    "允许自己什么都不做，也是一种完成。",
    "心里那点热，别急着解释给谁听。",
    "有些靠近，是安静地待在同一片夜色里。",
    "把标准放宽一寸，日子会松很多。",
    "你比自己以为的，更经得起等待。",
    "今天适合做一件很小、但只为自己的事。",
    "风会换方向，你不用一直站在原地。",
    "别把一句沉默，读成了一整段结论。",
    "所有的「还没」，都还不是「不会」。",
    "把灯留一盏给回来的人，也留一盏给自己。",
    "你温柔的部分，不必等到被看见才算数。",
    "星图只是提醒：你本来就有自己的轨道。",
    "今晚的答案是：先睡个好觉。",
    "你正在离自己更近一点，虽然很慢。"
  ],
  sunIndex: function (m, d) { var t = this.sunTable[m - 1]; return d < t.s ? t.a : t.b; },
  moonIndex: function (y, m, d) {
    var days = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(2000, 0, 6)) / 86400000);
    return ((Math.floor(days / 2.33) % 12) + 12) % 12;
  },
  risingIndex: function (sunIdx, periodKey) {
    var p = this.periods.filter(function (x) { return x.key === periodKey; })[0] || this.periods[0];
    return (sunIdx + p.offset) % 12;
  },
  dailyLine: function (m, d) { return this.dailyLines[(m * 31 + d) % this.dailyLines.length]; },
  rarity: function (moonIdx, risingIdx, profile) {
    var base = 6 + ((moonIdx * 7 + risingIdx * 3) % 18);
    var tweak = profile ? (Math.round(profile.i + profile.o * 2 + profile.w * 3) % 5) : 0;
    return Math.min(29, base + tweak);
  },
  /* 由 7 项选择算出三维倾向；返回百分比与主导维度 */
  computeProfile: function (answers) {
    var raw = { i: 0, o: 0, w: 0 }, self = this;
    this.items.forEach(function (it, idx) {
      var ans = answers[idx];
      if (it.type === "choice" && it.options[ans]) {
        var d = it.options[ans].d;
        raw.i += d.i; raw.o += d.o; raw.w += d.w;
      } else if (it.type === "scale" && ans != null && it.dim) {
        raw[it.dim] += (+ans) / 50;
      } else if (it.type === "multi" && ans && ans.length) {
        ans.forEach(function (k) {
          var tag = it.tags.filter(function (t) { return t.k === k; })[0];
          if (tag) raw[tag.dim] += 1;
        });
      }
    });
    function pct(x) { return Math.max(18, Math.min(95, 22 + Math.round(x / 8 * 70))); }
    var p = { i: pct(raw.i), o: pct(raw.o), w: pct(raw.w) };
    p.top = raw.i >= raw.o && raw.i >= raw.w ? "i" : (raw.o >= raw.w ? "o" : "w");
    p.total = L2(raw.i) + L2(raw.o) + L2(raw.w);
    function L2(x) { return Math.round(x * 10) / 10; }
    return p;
  }
};

export default ZODIAC_DATA;
