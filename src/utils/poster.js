/* 结果海报 · 纯 Canvas 本地出图，无服务端、无外部图片 */
var W = 750, H = 1334;
  var SERIF = '"Noto Serif SC","Songti SC","STSong","SimSun",serif';
  var SANS = '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';
  var MONO = '"Geist Mono","Consolas","Menlo",monospace';
  var SYMBOL = '"Segoe UI Symbol","Segoe UI","Arial Unicode MS",sans-serif';

  function canvas() {
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    return c;
  }
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
  function wrap(ctx, text, x, y, maxW, lh, maxLines) {
    var line = "", lines = [];
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === "\n") { lines.push(line); line = ""; continue; }
      if (ctx.measureText(line + ch).width > maxW && line) { lines.push(line); line = ch; }
      else line += ch;
    }
    if (line) lines.push(line);
    if (maxLines) lines = lines.slice(0, maxLines);
    lines.forEach(function (l, i) { ctx.fillText(l, x, y + i * lh); });
    return y + lines.length * lh;
  }
  /* 短文案按标点均衡断行，避免出现只有两三个字的孤行 */
  function balanced(ctx, text, x, y, lh, maxChars) {
    var lines = [], rest = text || "";
    while (rest.length > maxChars && lines.length < 2) {
      var lo = Math.floor(maxChars * .55), hi = Math.min(maxChars, rest.length), cut = maxChars;
      for (var i = lo; i <= hi; i++) {
        if ("。；，、！？".indexOf(rest.charAt(i - 1)) >= 0) cut = i;
      }
      lines.push(rest.slice(0, cut)); rest = rest.slice(cut);
    }
    lines.push(rest);
    lines.forEach(function (l, i) { ctx.fillText(l, x, y + i * lh); });
  }
  function dots(ctx, seed) {
    var s = seed || 7;
    for (var i = 0; i < 58; i++) {
      s = (s * 9301 + 49297) % 233280;
      var x = (s / 233280) * W;
      s = (s * 9301 + 49297) % 233280;
      var y = (s / 233280) * H * .82 + 20;
      s = (s * 9301 + 49297) % 233280;
      var r = .7 + (s / 233280) * 1.5;
      ctx.globalAlpha = .18 + (s / 233280) * .55;
      ctx.fillStyle = "#F5E6C6";
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function footer(ctx, dark, label) {
    var y = 1214;
    ctx.strokeStyle = dark ? "rgba(217,190,143,.35)" : "rgba(160,110,88,.30)";
    ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(64, y); ctx.lineTo(W - 64, y); ctx.stroke();
    ctx.fillStyle = dark ? "#E7D2A8" : "#8A5B47";
    ctx.font = "600 24px " + SERIF; ctx.textAlign = "left";
    ctx.fillText("知我", 64, y + 48);
    ctx.font = "18px " + MONO;
    ctx.fillText("SELF NOTE", 140, y + 46);
    ctx.textAlign = "right";
    ctx.font = "20px " + SANS;
    ctx.fillStyle = dark ? "rgba(230,220,240,.72)" : "#8C7360";
    ctx.fillText("来测测你的那一面 →", W - 64, y + 46);
    ctx.font = "17px " + SANS;
    ctx.fillStyle = dark ? "rgba(210,205,225,.5)" : "#AC9382";
    ctx.textAlign = "left";
    ctx.fillText(label, 64, y + 76);
    ctx.fillStyle = dark ? "rgba(210,205,225,.42)" : "#B5A091";
    ctx.fillText("结果仅供娱乐 · 不构成心理评估", 64, y + 104);
    ctx.textAlign = "left";
  }
  function brand(ctx, dark, no) {
    ctx.textAlign = "left";
    ctx.fillStyle = dark ? "#D9BE8F" : "#B9705A";
    ctx.font = "22px " + MONO;
    ctx.fillText(no, 64, 88);
    ctx.textAlign = "right";
    ctx.fillStyle = dark ? "rgba(240,227,203,.8)" : "#7C6455";
    ctx.font = "600 24px " + SERIF;
    ctx.fillText("知我  SELF NOTE", W - 64, 88);
    ctx.strokeStyle = dark ? "rgba(217,190,143,.28)" : "rgba(185,112,90,.3)";
    ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(64, 116); ctx.lineTo(W - 64, 116); ctx.stroke();
    ctx.textAlign = "left";
  }

  /* ---------- 恋爱依恋 · 柔光纸感海报 ---------- */
  function love(p) {
    var c = canvas(), ctx = c.getContext("2d");
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#FFFCF7"); g.addColorStop(.55, "#FCEFE3"); g.addColorStop(1, "#F3D5C2");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var glow = ctx.createRadialGradient(660, 130, 10, 660, 130, 560);
    glow.addColorStop(0, "rgba(242,198,180,.85)"); glow.addColorStop(1, "rgba(242,198,180,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    // 纸感细线
    ctx.strokeStyle = "rgba(170,124,98,.07)"; ctx.lineWidth = 1;
    for (var i = 0; i < 46; i++) { ctx.beginPath(); ctx.moveTo(0, i * 30 + 8); ctx.lineTo(W, i * 30 + 2); ctx.stroke(); }
    // 右上同心圆
    ctx.strokeStyle = "rgba(185,112,90,.18)";
    [110, 168, 226].forEach(function (r) { ctx.beginPath(); ctx.arc(690, 250, r, 0, Math.PI * 2); ctx.stroke(); });
    brand(ctx, false, "SELF NOTE / 01");

    ctx.fillStyle = "#B9705A"; ctx.font = "22px " + MONO; ctx.textAlign = "left";
    ctx.fillText("恋爱依恋  ·  YOUR ATTACHMENT", 64, 196);
    ctx.fillStyle = "#24211E"; ctx.font = "600 62px " + SERIF;
    var y = wrap(ctx, p.title, 64, 292, 610, 88, 3);

    // 印章
    ctx.strokeStyle = "rgba(185,112,90,.6)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(636, y + 2, 52, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#B9705A"; ctx.font = "600 44px " + SERIF; ctx.textAlign = "center";
    ctx.fillText(p.seal, 636, y + 18); ctx.textAlign = "left";

    ctx.fillStyle = "#C4432F"; ctx.fillRect(64, y + 36, 68, 3);
    ctx.fillStyle = "#5E5349"; ctx.font = "26px " + SANS;
    var y2 = wrap(ctx, p.desc, 64, y + 96, 606, 46, 3);

    // 维度条
    var by = Math.max(y2 + 56, 640);
    ctx.fillStyle = "#8C7A6C"; ctx.font = "21px " + SANS;
    ctx.fillText("在意程度", 64, by);
    ctx.textAlign = "right"; ctx.fillStyle = "#B9705A"; ctx.font = "22px " + MONO;
    ctx.fillText(p.a + "%", W - 64, by); ctx.textAlign = "left";
    ctx.fillStyle = "rgba(185,112,90,.16)"; rr(ctx, 64, by + 16, W - 128, 7, 4); ctx.fill();
    ctx.fillStyle = "#B9705A"; rr(ctx, 64, by + 16, (W - 128) * p.a / 100, 7, 4); ctx.fill();
    ctx.fillStyle = "#8C7A6C"; ctx.font = "21px " + SANS;
    ctx.fillText("独处需求", 64, by + 78);
    ctx.textAlign = "right"; ctx.fillStyle = "#B9705A"; ctx.font = "22px " + MONO;
    ctx.fillText(p.v + "%", W - 64, by + 78); ctx.textAlign = "left";
    ctx.fillStyle = "rgba(185,112,90,.16)"; rr(ctx, 64, by + 94, W - 128, 7, 4); ctx.fill();
    ctx.fillStyle = "#C98D74"; rr(ctx, 64, by + 94, (W - 128) * p.v / 100, 7, 4); ctx.fill();

    // 稀有度 + 关键词
    ctx.fillStyle = "#B9705A"; ctx.font = "600 46px " + MONO;
    ctx.fillText(p.rarity + "%", 64, by + 158);
    ctx.fillStyle = "#8C7A6C"; ctx.font = "21px " + SANS;
    ctx.fillText("的人和你拥有同一种底色 · " + p.code, 176, by + 156);
    var kx = 64;
    p.keywords.forEach(function (k) {
      ctx.font = "22px " + SANS;
      var w = ctx.measureText(k).width + 42;
      ctx.strokeStyle = "rgba(185,112,90,.42)"; ctx.lineWidth = 1;
      rr(ctx, kx, by + 190, w, 46, 23); ctx.stroke();
      ctx.fillStyle = "#A05E48"; ctx.textAlign = "center";
      ctx.fillText(k, kx + w / 2, by + 221); ctx.textAlign = "left";
      kx += w + 14;
    });
    // 相处建议：收住下半幅留白，也让卡片更值得被保存
    var ny = 966;
    ctx.strokeStyle = "rgba(185,112,90,.26)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(64, ny); ctx.lineTo(W - 64, ny); ctx.stroke();
    ctx.fillStyle = "#B9705A"; ctx.font = "20px " + MONO; ctx.textAlign = "left";
    ctx.fillText("A NOTE FOR YOU", 64, ny + 40);
    ctx.fillStyle = "#5E5349"; ctx.font = "24px " + SANS;
    balanced(ctx, p.note, 64, ny + 82, 40, 22);
    footer(ctx, false, "10 项选择 · 3 个阶段 · 在关系里，你习惯站在哪里？");
    return c;
  }

  /* ---------- 星座星语 · 调亮版星夜海报 ---------- */
  function zodiac(p) {
    var c = canvas(), ctx = c.getContext("2d");
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#2A3660"); g.addColorStop(.52, "#1E2849"); g.addColorStop(1, "#161E39");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var glow = ctx.createRadialGradient(375, 300, 20, 375, 300, 560);
    glow.addColorStop(0, "rgba(139,135,184,.42)"); glow.addColorStop(1, "rgba(139,135,184,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    var gold = ctx.createRadialGradient(690, 90, 10, 690, 90, 400);
    gold.addColorStop(0, "rgba(217,190,143,.20)"); gold.addColorStop(1, "rgba(217,190,143,0)");
    ctx.fillStyle = gold; ctx.fillRect(0, 0, W, H);
    dots(ctx, p.seed || 21);
    // 星轨 + 月相
    ctx.strokeStyle = "rgba(217,190,143,.26)"; ctx.lineWidth = 1;
    [150, 206, 262].forEach(function (r) { ctx.beginPath(); ctx.arc(375, 400, r, 0, Math.PI * 2); ctx.stroke(); });
    ctx.fillStyle = "#EED5A8"; ctx.beginPath(); ctx.arc(375, 400, 82, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#222C50"; ctx.beginPath(); ctx.arc(408, 376, 78, 0, Math.PI * 2); ctx.fill();
    brand(ctx, true, "SELF NOTE / 02");

    ctx.textAlign = "center";
    ctx.fillStyle = "#D9BE8F"; ctx.font = "22px " + MONO;
    ctx.fillText("星座星语  ·  YOUR STAR NOTE", W / 2, 196);
    // 三星座符号
    var trio = [p.sun, p.moon, p.rising];
    var roles = ["太阳", "月亮", "上升"];
    for (var i = 0; i < 3; i++) {
      var x = 150 + i * 225;
      ctx.fillStyle = "#EED5A8"; ctx.font = "76px " + SYMBOL;
      ctx.fillText(trio[i].glyph + "\uFE0E", x, 660);
      ctx.fillStyle = "#F3EADA"; ctx.font = "600 26px " + SERIF;
      ctx.fillText(trio[i].name, x, 706);
      ctx.fillStyle = "rgba(217,190,143,.72)"; ctx.font = "19px " + MONO;
      ctx.fillText(roles[i].toUpperCase(), x, 740);
    }
    ctx.strokeStyle = "rgba(217,190,143,.28)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(64, 786); ctx.lineTo(W - 64, 786); ctx.stroke();
    ctx.fillStyle = "#F7ECD6"; ctx.font = "600 58px " + SERIF;
    ctx.fillText(p.title, W / 2, 866);
    ctx.fillStyle = "#C9C6DE"; ctx.font = "25px " + SANS; ctx.textAlign = "left";
    wrap(ctx, p.desc, 82, 922, 586, 42, 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#D9BE8F"; ctx.font = "22px " + MONO;
    ctx.fillText("星语倾向  " + (p.short || "") + "    ·    同频稀有度  " + p.rarity + "%", W / 2, 1030);
    ctx.strokeStyle = "rgba(217,190,143,.28)";
    ctx.beginPath(); ctx.moveTo(64, 1072); ctx.lineTo(W - 64, 1072); ctx.stroke();
    ctx.fillStyle = "#F0E3CB"; ctx.font = "30px " + SERIF;
    wrap(ctx, "「" + p.daily + "」", W / 2, 1128, 586, 46, 2);
    footer(ctx, true, "出生坐标 " + (p.dateStr || "") + " · 7 项选择 · 你的星语，写在哪个夜晚");
    return c;
  }

const Poster = {
  make: function (kind, payload) { return kind === "zodiac" ? zodiac(payload) : love(payload); },
  toDataURL: function (kind, payload) { return this.make(kind, payload).toDataURL("image/png"); },
  download: function (kind, payload) {
    var c = this.make(kind, payload), name = "知我-" + (kind === "zodiac" ? "星座星语" : "恋爱依恋") + ".png";
    if (c.toBlob) {
      c.toBlob(function (blob) {
        var url = URL.createObjectURL(blob), a = document.createElement("a");
        a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      }, "image/png");
    } else {
      var a2 = document.createElement("a"); a2.href = c.toDataURL("image/png"); a2.download = name;
      document.body.appendChild(a2); a2.click(); a2.remove();
    }
    return name;
  }
};

export default Poster;
