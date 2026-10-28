/* ============================================================================
   程式邏輯 —— 把 content.js 的內容畫成網頁（行程、結算），並切換分頁
   一般維護不需要動這個檔案，改文字請去 content.js
   ========================================================================== */

(function () {
  "use strict";

  var TAB_KEY = "canada2026-tab";           // 記住上次看的分頁
  var STATUS_TEXT = { booked: "已訂", confirmed: "已確認", tbd: "待補" };

  /* --------------------------------------------------------------
     小工具
     -------------------------------------------------------------- */

  // 建立元素：el("div", { class: "x" }, ["文字", 其他元素])
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  // 每個項目的儲存代號：用「段落id + 文字」，
  // 這樣新增或搬動項目時，其他項目的勾選狀態不會跑掉
  function keyOf(sectionId, text) {
    return sectionId + "|" + text;
  }

  // 瀏覽器儲存：讀不到或存不了都不影響使用
  function storeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* 忽略 */ }
  }

  // 狀態標籤：已訂／待確認／待補
  function badge(status) {
    if (!status || !STATUS_TEXT[status]) return null;
    return el("span", { class: "badge " + status, text: STATUS_TEXT[status] });
  }

  function append(parent, child) {
    if (child) parent.appendChild(child);
  }

  /* --------------------------------------------------------------
     共用：頁首、頁尾
     -------------------------------------------------------------- */

  function renderHeader() {
    document.getElementById("pageHeader").appendChild(
      el("div", null, [
        el("h1", null, [CONTENT.title, el("br"), CONTENT.subtitle]),
        el("p", { class: "dates", text: CONTENT.dates })
      ])
    );
    document.title = CONTENT.title + " " + CONTENT.subtitle;
  }

  function renderFooter() {
    var foot = document.getElementById("foot");
    (CONTENT.footer || []).forEach(function (line, i) {
      if (i > 0) foot.appendChild(el("br"));
      if (line) foot.appendChild(document.createTextNode(line));
    });
    if (CONTENT.updated) {
      foot.appendChild(el("span", { class: "updated", text: "內容最後更新：" + CONTENT.updated }));
    }
  }

  /* --------------------------------------------------------------
     結算分頁
     -------------------------------------------------------------- */

  // 金額加上千分位：125000 → 125,000
  function money(n) {
    return "NT$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 各項目的顏色（上方長條和每一項前面的圓點用同一個顏色），依項目順序套用
  var FEE_COLORS = ["#1f3864", "#4a78c2", "#2e9e8f", "#e0a030", "#d06a4c", "#8a6bbf"];

  function renderSettlement() {
    var st = CONTENT.settlement;
    var root = document.getElementById("settle");
    if (!st) return;
    var total = 0;
    st.items.forEach(function (it) { total += it.amount; });
    function color(i) { return FEE_COLORS[i % FEE_COLORS.length]; }

    var sec = el("section", { id: "fee" }, [el("h2", { text: st.title })]);

    // 最上面：每人團費
    sec.appendChild(el("div", { class: "feetotal" }, [
      el("span", { class: "lbl", text: "每人團費" }),
      el("strong", { text: money(total) }),
      st.heroNote ? el("span", { class: "sub", text: st.heroNote }) : null
    ]));

    // 分段長條：看各項比例
    var stack = el("div", { class: "feestack", "aria-hidden": "true" });
    st.items.forEach(function (it, i) {
      stack.appendChild(el("span", {
        style: "width:" + (it.amount / total * 100).toFixed(2) + "%;background:" + color(i),
        title: it.name
      }));
    });
    sec.appendChild(stack);

    // 每人分攤
    sec.appendChild(el("h3", { class: "feeh", text: "每人分攤" }));
    var list = el("div", { class: "feelist" });
    st.items.forEach(function (it, i) {
      list.appendChild(el("div", { class: "feerow" }, [
        el("div", { class: "fhead" }, [
          el("span", { class: "name" }, [
            el("i", { class: "dot", style: "background:" + color(i) }), it.name
          ]),
          el("span", { class: "amt", text: money(it.amount) })
        ]),
        it.note ? el("small", { text: it.note }) : null
      ]));
    });
    list.appendChild(el("div", { class: "feerow sum" }, [
      el("div", { class: "fhead" }, [
        el("span", { class: "name", text: "每人合計" }),
        el("span", { class: "amt", text: money(total) })
      ])
    ]));
    sec.appendChild(list);

    if (st.footnote) sec.appendChild(el("p", { class: "hint feefoot", text: st.footnote }));
    root.appendChild(sec);
  }

  /* --------------------------------------------------------------
     行程分頁
     -------------------------------------------------------------- */

  function weatherOf(id) {
    var cards = (CONTENT.weather && CONTENT.weather.cards) || [];
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id === id) return cards[i];
    }
    return null;
  }

  function mapUrl(stay) {
    var q = stay.address + (stay.city ? ", " + stay.city : "") + ", Canada";
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  // 可收合的區塊（交通、住宿、活動、提醒）
  function block(title, list, renderItem, open) {
    if (!list || !list.length) return null;
    var d = el("details", { class: "blk" }, [el("summary", null, [el("span", { text: title })])]);
    if (open) d.open = true;
    var body = el("div", { class: "blk-body" });
    list.forEach(function (item) { append(body, renderItem(item)); });
    d.appendChild(body);
    return d;
  }

  // 依標題／備註裡的關鍵字，自動配對交通方式的圖示
  var TRANSPORT_ICON_RULES = [
    { icon: "\u2708\uFE0F", test: /航空|[A-Z]{2}\d{2,4}/ },              // 飛機
    { icon: "\uD83D\uDE86", test: /VIA Rail|火車|高鐵/ },                     // 火車
    { icon: "\uD83D\uDE97", test: /自駕|租車|Hertz|取車|還車|極光團|接送/ }, // 開車／租車／接送
    { icon: "\uD83D\uDE95", test: /Uber|計程車/ },                       // 叫車
    { icon: "\uD83D\uDE87", test: /skytrain|地鐵|纜車|Funiculaire/i }     // 大眾運輸
  ];
  function iconFor(t) {
    var hay = (t.title || "") + " " + (t.note || "");
    for (var i = 0; i < TRANSPORT_ICON_RULES.length; i++) {
      if (TRANSPORT_ICON_RULES[i].test.test(hay)) return TRANSPORT_ICON_RULES[i].icon;
    }
    return "";
  }

  // 選填的外部連結：在項目裡加 link: "https://..."、linkText: "顯示文字"
  function linkOf(x) {
    if (!x.link) return null;
    return el("a", { class: "maplink extlink", href: x.link, target: "_blank", rel: "noopener", text: x.linkText || "開啟連結" });
  }

  function renderTransport(t) {
    var icon = iconFor(t);
    var row = el("div", { class: "trow" }, [
      icon ? el("span", { class: "ticon", text: icon }) : null,
      t.when ? el("span", { class: "twhen", text: t.when }) : null,
      el("span", { class: "ttitle" }, [t.title, badge(t.status)])
    ]);
    return el("div", { class: "item" }, [
      row,
      t.note ? el("small", { text: t.note }) : null,
      linkOf(t)
    ]);
  }

  function renderTransportGroup(g) {
    var box = el("div", { class: "tgroup" }, [el("h3", { text: g.date })]);
    (g.items || []).forEach(function (t) { box.appendChild(renderTransport(t)); });
    return box;
  }

  function renderStay(s) {
    var lines = el("div", { class: "item" }, [el("div", { class: "what" }, [s.name, badge(s.status)])]);
    if (s.address) {
      lines.appendChild(el("div", { class: "line" }, [
        s.address + " ",
        el("a", { class: "maplink", href: mapUrl(s), target: "_blank", rel: "noopener", text: "開地圖" })
      ]));
    }
    if (s.checkin) lines.appendChild(el("div", { class: "line", text: "入住：" + s.checkin }));
    if (s.checkout) lines.appendChild(el("div", { class: "line", text: "退房：" + s.checkout }));
    if (s.rooms) lines.appendChild(el("div", { class: "line", text: "房型：" + s.rooms }));
    if (s.features && s.features.length) {
      lines.appendChild(el("div", { class: "line", text: "設備：" + s.features.join("、") }));
    }
    if (s.parking) lines.appendChild(el("div", { class: "line", text: "停車：" + s.parking }));
    if (s.note) lines.appendChild(el("small", { text: s.note }));
    return lines;
  }

  function renderDay(d) {
    var box = el("div", { class: "day" }, [
      el("h3", { text: d.date + (d.title ? "｜" + d.title : "") })
    ]);
    if (d.note) box.appendChild(el("p", { class: "daynote", text: d.note }));
    var ul = el("ul");
    (d.items || []).forEach(function (it) {
      ul.appendChild(el("li", null, [
        el("span", { class: "t", text: it.time || "" }),
        el("div", { class: "b" }, [
          el("span", { class: "what" }, [it.text, badge(it.status)]),
          it.note ? el("small", { text: it.note }) : null,
          linkOf(it)
        ])
      ]));
    });
    box.appendChild(ul);
    return box;
  }

  function renderSimple(x) {
    return el("div", { class: "item simple" }, [
      el("span", null, [x.text, badge(x.status)]),
      x.note ? el("small", { text: x.note }) : null,
      linkOf(x)
    ]);
  }

  function renderContact(ct) {
    return el("div", { class: "contact" }, [
      el("strong", { text: ct.name }),
      el("a", { href: "tel:" + ct.phone.replace(/[^\d+]/g, ""), text: ct.phone }),
      ct.note ? el("small", { text: ct.note }) : null
    ]);
  }

  function renderCity(c) {
    var sec = el("section", { class: "city", id: c.id }, [el("h2", { text: c.name })]);
    sec.appendChild(el("p", { class: "meta", text: c.dates + (c.nights ? "・住 " + c.nights + " 晚" : "") }));
    var w = c.weather ? weatherOf(c.weather) : null;
    if (w) sec.appendChild(el("p", { class: "wline", text: "天氣：" + w.temp }));
    if (c.alert) sec.appendChild(el("div", { class: "alert", text: c.alert }));

    append(sec, block("交通", c.transport, renderTransportGroup, false));
    append(sec, block("住宿", c.stay, renderStay, false));
    append(sec, block("活動", c.days, renderDay, true));
    append(sec, block("聯絡電話", c.contacts, renderContact, false));
    append(sec, block("提醒", c.tips, renderSimple, false));
    return sec;
  }

  function renderItinerary() {
    var it = CONTENT.itinerary;
    var root = document.getElementById("itin");
    if (!it || !it.cities) {
      root.appendChild(el("p", { class: "hint", text: "行程還在整理中。" }));
      return;
    }

    // 路線總覽
    var overview = el("section", { id: "route" }, [el("h2", { text: "路線總覽" })]);
    if (it.intro) overview.appendChild(el("p", { class: "hint", text: it.intro }));
    var tbody = el("tbody");
    it.cities.forEach(function (c) {
      tbody.appendChild(el("tr", null, [
        el("td", { class: "d", text: c.dates }),
        el("td", null, [el("a", { href: "#" + c.id, text: c.name })]),
        el("td", { class: "n", text: c.nights ? c.nights + " 晚" : "—" })
      ]));
    });
    overview.appendChild(el("table", { class: "route" }, [
      el("thead", null, [el("tr", null, [
        el("th", { text: "日期" }), el("th", { text: "地點" }), el("th", { class: "n", text: "住" })
      ])]),
      tbody
    ]));
    root.appendChild(overview);

    // 城市跳頁按鈕
    var btns = el("div", { class: "navbtns" });
    it.cities.forEach(function (c) {
      btns.appendChild(el("a", { href: "#" + c.id, text: c.nav || c.name }));
    });
    if (it.contacts && it.contacts.length) {
      btns.appendChild(el("a", { href: "#general", text: "聯絡電話" }));
    }
    root.appendChild(el("nav", { class: "citynav" }, [
      el("p", { text: "點下面的按鈕可以直接跳到那個城市：" }), btns
    ]));

    // 各城市
    it.cities.forEach(function (c) { root.appendChild(renderCity(c)); });

    // 全程資訊
    if (it.contacts && it.contacts.length) {
      var gen = el("section", { id: "general" }, [el("h2", { text: "全程資訊" })]);
      it.contacts.forEach(function (ct) { gen.appendChild(renderContact(ct)); });
      root.appendChild(gen);
    }
  }

  /* --------------------------------------------------------------
     分頁切換
     -------------------------------------------------------------- */

  var TABS = ["itinerary", "settlement"];
  var panels = {};

  function showTab(name, opts) {
    opts = opts || {};
    TABS.forEach(function (k) {
      var on = k === name;
      panels[k].hidden = !on;
      var b = document.getElementById("tab-" + k);
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    storeSet(TAB_KEY, name);
    if (opts.hash) {
      try { history.replaceState(null, "", "#" + name); } catch (e) { /* 忽略 */ }
    }
    if (opts.toTop) {
      var h = document.getElementById("pageHeader").offsetHeight;
      if (window.pageYOffset > h) window.scrollTo(0, h);
    }
  }

  function hashTarget() {
    var h = location.hash.slice(1);
    try { h = decodeURIComponent(h); } catch (e) { /* 忽略 */ }
    return h;
  }

  // 網址 # 後面是分頁名稱或某一段的 id 時，打開對應分頁
  function applyHash() {
    var h = hashTarget();
    if (!h) return false;
    if (TABS.indexOf(h) >= 0) { showTab(h); return true; }
    var target = document.getElementById(h);
    if (!target) return false;
    for (var i = 0; i < TABS.length; i++) {
      if (panels[TABS[i]].contains(target)) {
        showTab(TABS[i]);
        setTimeout(function () { target.scrollIntoView(); }, 0);
        return true;
      }
    }
    return false;
  }

  function defaultTab() {
    var saved = storeGet(TAB_KEY);
    if (TABS.indexOf(saved) >= 0) return saved;
    return "itinerary";
  }

  function setupTabs() {
    TABS.forEach(function (k) {
      panels[k] = document.getElementById("panel-" + k);
      document.getElementById("tab-" + k).addEventListener("click", function () {
        showTab(k, { hash: true, toTop: true });
      });
    });

    // 鍵盤左右鍵切換分頁
    document.getElementById("tabs").addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var cur = TABS.indexOf(document.activeElement.id.replace("tab-", ""));
      if (cur < 0) return;
      var next = TABS[(cur + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
      showTab(next, { hash: true, toTop: true });
      document.getElementById("tab-" + next).focus();
      e.preventDefault();
    });

    window.addEventListener("hashchange", applyHash);
    if (!applyHash()) showTab(defaultTab());
  }

  /* --------------------------------------------------------------
     列印：先把收合的區塊全部打開，印完再還原
     -------------------------------------------------------------- */

  function setupPrint() {
    var saved = [];
    window.addEventListener("beforeprint", function () {
      saved = [];
      Array.prototype.forEach.call(document.querySelectorAll("details"), function (d) {
        saved.push([d, d.open]);
        d.open = true;
      });
    });
    window.addEventListener("afterprint", function () {
      saved.forEach(function (pair) { pair[0].open = pair[1]; });
    });
  }

  /* --------------------------------------------------------------
     啟動
     -------------------------------------------------------------- */

  function init() {
    if (typeof CONTENT === "undefined") {
      document.body.innerHTML = "<p style='padding:24px'>找不到 content.js，請確認檔案在同一個資料夾。</p>";
      return;
    }

    renderHeader();
    renderItinerary();
    renderSettlement();
    renderFooter();

    document.getElementById("topBtn").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    setupTabs();
    setupPrint();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
