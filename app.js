/* ============================================================================
   程式邏輯 —— 把 content.js 的內容畫成網頁，並記住勾選狀態
   一般維護不需要動這個檔案，改文字請去 content.js
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "canada2026-packing";

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

  /* --------------------------------------------------------------
     產生各區塊
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

  function renderNotice() {
    var n = CONTENT.notice;
    if (!n) return;
    var box = el("div", { class: "notice" }, [el("h2", { text: n.heading })]);
    n.items.forEach(function (item) {
      box.appendChild(el("p", null, [el("strong", { text: item.bold }), item.text]));
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
    renderNotice();
    renderNav();

    var main = document.getElementById("main");
    [renderWeather(), renderLayers()].forEach(function (s) { if (s) main.appendChild(s); });
    CONTENT.checklists.forEach(function (g) { main.appendChild(renderChecklist(g)); });

    renderFooter();

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
  }

  document.addEventListener("DOMContentLoaded", init);
})();
