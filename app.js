/* ============================================================================
   程式邏輯 —— 把 content.js 的內容畫成網頁、切換分頁，並記住勾選狀態
   一般維護不需要動這個檔案，改文字請去 content.js
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "canada2026-packing";   // 打包勾選紀錄。不要改，改了家人的勾選會消失
  var TAB_KEY = "canada2026-tab";           // 記住上次看的分頁
  var TRIP_START = new Date("2026-10-08T00:00:00+08:00"); // 出發後預設開「行程」
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
     打包清單分頁
     -------------------------------------------------------------- */

  function renderNotice() {
    var n = CONTENT.notice;
    if (!n) return;
    var box = el("div", { class: "notice" }, [el("h2", { text: n.heading })]);
    n.items.forEach(function (item) {
      // bold 是選填：有就先印一段粗體，沒有就只印 text（兩種寫法都支援）
      var parts = [];
      if (item.bold) parts.push(el("strong", { text: item.bold }));
      if (item.text) parts.push(item.text);
      box.appendChild(el("p", null, parts));
    });
    document.getElementById("notice").appendChild(box);
  }

  function renderNav() {
    var links = [{ id: "weather", nav: "天氣" }, { id: "layers", nav: "怎麼穿" }]
      .concat(CONTENT.checklists.map(function (c) { return { id: c.id, nav: c.nav }; }));

    var btns = el("div", { class: "navbtns" });
    links.forEach(function (l) {
      btns.appendChild(el("a", { href: "#" + l.id, text: l.nav }));
    });

    var nav = document.getElementById("nav");
    nav.appendChild(el("p", { text: "點下面的按鈕可以直接跳到那一段：" }));
    nav.appendChild(btns);
  }

  function renderWeather() {
    var w = CONTENT.weather;
    if (!w) return null;
    var sec = el("section", { id: "weather" }, [el("h2", { text: w.title })]);
    if (w.hint) sec.appendChild(el("p", { class: "hint", text: w.hint }));

    w.cards.forEach(function (c) {
      sec.appendChild(el("div", { class: "wcard" + (c.highlight ? " cold" : "") }, [
        el("div", { class: "place", text: c.place }),
        el("div", { class: "temp", text: c.temp }),
        el("div", { class: "tip", text: c.tip })
      ]));
    });
    return sec;
  }

  function renderLayers() {
    var l = CONTENT.layers;
    if (!l) return null;
    var sec = el("section", { id: "layers" }, [el("h2", { text: l.title })]);
    if (l.hint) sec.appendChild(el("p", { class: "hint", text: l.hint }));

    l.items.forEach(function (item, i) {
      sec.appendChild(el("div", { class: "layer" }, [
        el("div", { class: "num", text: String(i + 1) }),
        el("div", { class: "body" }, [
          el("strong", { text: item.title }),
          el("span", { text: item.desc })
        ])
      ]));
    });
    return sec;
  }

  function renderChecklist(group) {
    var sec = el("section", { id: group.id }, [el("h2", { text: group.title })]);
    if (group.hint) sec.appendChild(el("p", { class: "hint", text: group.hint }));

    var ul = el("ul", { class: "list" });
    group.items.forEach(function (item) {
      var box = el("input", { type: "checkbox" });
      box.dataset.key = keyOf(group.id, item.text);

      var txt = el("span", { class: "txt" }, [
        item.must ? el("strong", { class: "must", text: item.text })
                  : document.createTextNode(item.text),
        item.note ? el("small", { text: item.note }) : null
      ]);

      ul.appendChild(el("li", null, [el("label", null, [box, txt])]));
    });

    sec.appendChild(ul);
    return sec;
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

  function renderTransport(t) {
    return el("div", { class: "item" }, [
      t.when ? el("div", { class: "when", text: t.when }) : null,
      el("div", { class: "what" }, [t.title, badge(t.status)]),
      t.note ? el("small", { text: t.note }) : null
    ]);
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
          it.note ? el("small", { text: it.note }) : null
        ])
      ]));
    });
    box.appendChild(ul);
    return box;
  }

  function renderSimple(x) {
    return el("div", { class: "item simple" }, [
      el("span", null, [x.text, badge(x.status)]),
      x.note ? el("small", { text: x.note }) : null
    ]);
  }

  function renderCity(c) {
    var sec = el("section", { class: "city", id: c.id }, [el("h2", { text: c.name })]);
    sec.appendChild(el("p", { class: "meta", text: c.dates + (c.nights ? "・住 " + c.nights + " 晚" : "") }));
    var w = c.weather ? weatherOf(c.weather) : null;
    if (w) sec.appendChild(el("p", { class: "wline", text: "天氣：" + w.temp }));
    if (c.alert) sec.appendChild(el("div", { class: "alert", text: c.alert }));

    append(sec, block("交通", c.transport, renderTransport, false));
    append(sec, block("住宿", c.stay, renderStay, false));
    append(sec, block("活動", c.days, renderDay, true));
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
      it.contacts.forEach(function (ct) {
        gen.appendChild(el("div", { class: "contact" }, [
          el("strong", { text: ct.name }),
          el("a", { href: "tel:" + ct.phone.replace(/[^\d+]/g, ""), text: ct.phone }),
          ct.note ? el("small", { text: ct.note }) : null
        ]));
      });
      root.appendChild(gen);
    }
  }

  /* --------------------------------------------------------------
     分頁切換
     -------------------------------------------------------------- */

  var TABS = ["itinerary", "packing"];
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
    return new Date() >= TRIP_START ? "itinerary" : "packing";
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
     勾選狀態：存在瀏覽器裡，關掉再打開還會在
     -------------------------------------------------------------- */

  var boxes = [];
  var ptext, pbar;

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;
      boxes.forEach(function (b) { b.checked = !!saved[b.dataset.key]; });
    } catch (e) {
      // 讀不到就當作全新的清單，不影響使用
    }
  }

  function saveState() {
    try {
      var data = {};
      boxes.forEach(function (b) { if (b.checked) data[b.dataset.key] = true; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // 存不了也不影響使用
    }
  }

  function paint() {
    var done = 0;
    boxes.forEach(function (b) {
      var label = b.closest("label");
      if (b.checked) { done++; label.classList.add("done"); }
      else { label.classList.remove("done"); }
    });
    ptext.textContent = "打包進度 " + done + " / " + boxes.length;
    pbar.style.width = boxes.length ? (done / boxes.length * 100) + "%" : "0%";
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

    // 打包清單分頁
    renderNotice();
    renderNav();
    var main = document.getElementById("main");
    [renderWeather(), renderLayers()].forEach(function (s) { if (s) main.appendChild(s); });
    CONTENT.checklists.forEach(function (g) { main.appendChild(renderChecklist(g)); });

    // 行程分頁
    renderItinerary();

    renderFooter();

    // 進度只算打包清單裡的勾選框
    ptext = document.getElementById("ptext");
    pbar = document.getElementById("pbar");
    boxes = Array.prototype.slice.call(main.querySelectorAll('input[type="checkbox"]'));

    boxes.forEach(function (b) {
      b.addEventListener("change", function () { paint(); saveState(); });
    });

    document.getElementById("resetBtn").addEventListener("click", function () {
      if (!window.confirm("確定要清除全部勾選嗎？")) return;
      boxes.forEach(function (b) { b.checked = false; });
      paint();
      saveState();
    });

    document.getElementById("topBtn").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    loadState();
    paint();

    setupTabs();
    setupPrint();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
