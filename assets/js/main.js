/* ==========================================================================
   クレアクラン 公式サイト
   - ニュース・作品・グッズ・ピックアップは assets/data/*.js のデータから自動で表示します
   - メニュー（ページ内の各場所へスクロール）、スライダー、ニュースの開閉、スクロール演出など
   ========================================================================== */
(function () {
  'use strict';

  var CATS = window.CC_NEWS_CATEGORIES || {};
  var WORKS = window.CC_WORKS || [];
  var GOODS = window.CC_GOODS || [];
  var GOODS_STATUS = window.CC_GOODS_STATUS || {};
  var PICKUP = window.CC_PICKUP || [];
  var NEWS = (window.CC_NEWS || []).slice().sort(function (a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });
  var COLORS = ['orange', 'pink', 'sky', 'mint', 'yellow'];
  var NEW_DAYS = 30;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 小さな道具 ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function isExternal(url) { return /^https?:\/\//i.test(url || ''); }
  function safeUrl(url) {
    url = String(url || '').trim();
    if (/^(javascript|data|vbscript):/i.test(url)) return '#';
    return url;
  }
  function linkAttrs(url) {
    return 'href="' + esc(safeUrl(url)) + '"' + (isExternal(url) ? ' target="_blank" rel="noopener"' : '');
  }
  function icon(name, cls) {
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }
  function fmtDate(d) { return String(d || '').replace(/-/g, '.'); }
  function parseDate(d) {
    var m = String(d || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function isNew(d) {
    var t = parseDate(d);
    if (!t) return false;
    var diff = (Date.now() - t.getTime()) / 86400000;
    return diff >= -1 && diff <= NEW_DAYS;
  }
  function cat(key) { return CATS[key] || { label: key || 'お知らせ', color: 'orange' }; }
  function workById(id) {
    for (var i = 0; i < WORKS.length; i++) if (WORKS[i].id === id) return WORKS[i];
    return null;
  }

  /* ---------- 本文のかんたん書式 ---------- */
  function inline(s) {
    var out = esc(s);
    out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, text, url) {
      url = url.replace(/&amp;/g, '&');
      return '<a ' + linkAttrs(url) + '>' + text + (isExternal(url) ? '' : '') + '</a>';
    });
    return out;
  }
  function renderText(src) {
    if (!src) return '';
    var lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    var out = [], para = [], list = null, m;
    function flushPara() { if (para.length) { out.push('<p>' + para.map(inline).join('<br>') + '</p>'); para = []; } }
    function flushList() {
      if (list) { out.push('<ul>' + list.map(function (li) { return '<li>' + inline(li) + '</li>'; }).join('') + '</ul>'); list = null; }
    }
    lines.forEach(function (raw) {
      var line = raw.trim();
      if (!line) { flushPara(); flushList(); return; }
      if ((m = line.match(/^(#{2,3})\s+(.*)$/))) {
        flushPara(); flushList();
        // ニュースのタイトルが h3 なので、本文の見出しは h4 / h5 にする
        var tag = m[1].length === 2 ? 'h4' : 'h5';
        out.push('<' + tag + '>' + inline(m[2]) + '</' + tag + '>');
        return;
      }
      if (line === '---') { flushPara(); flushList(); out.push('<hr>'); return; }
      if ((m = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/))) {
        flushPara(); flushList();
        out.push('<figure><img src="' + esc(safeUrl(m[2])) + '" alt="' + esc(m[1]) + '" loading="lazy" decoding="async">' +
          (m[1] ? '<figcaption>' + esc(m[1]) + '</figcaption>' : '') + '</figure>');
        return;
      }
      if ((m = line.match(/^-\s+(.*)$/))) { flushPara(); (list = list || []).push(m[1]); return; }
      flushList(); para.push(line);
    });
    flushPara(); flushList();
    return out.join('');
  }
  /* ---------- ニュース（トップページの中で開いて読む） ---------- */
  function newsThumb(item) {
    var c = cat(item.category);
    if (item.image) {
      return '<img src="' + esc(item.image) + '" alt="" loading="lazy" decoding="async" width="960" height="540">';
    }
    return '<span class="thumb-fallback c-' + c.color + '"><img src="assets/img/logo/mark.svg" alt="" width="888" height="580"></span>';
  }
  function newsMeta(item) {
    var c = cat(item.category);
    return '<span class="news-meta"><time class="date" datetime="' + esc(item.date) + '">' + fmtDate(item.date) + '</time>' +
      '<span class="tag c-' + c.color + '">' + esc(c.label) + '</span>' +
      (isNew(item.date) ? '<span class="badge-new">NEW</span>' : '') + '</span>';
  }
  function newsItemHtml(item) {
    var c = cat(item.category);
    var external = !item.body && item.url;
    var head = '<span class="news-item__thumb">' + newsThumb(item) + '</span>' +
      '<span class="news-item__info">' + newsMeta(item) + '<span class="news-item__title">' + esc(item.title) + '</span></span>';
    if (external) {
      return '<li class="news-item c-' + c.color + '" id="news-' + esc(item.id) + '"><h3 class="news-item__h">' +
        '<a class="news-item__head" ' + linkAttrs(item.url) + '>' + head + '<span class="news-item__toggle is-ext">' + icon('ext') + '<span class="visually-hidden">（外部サイト）</span></span></a></h3></li>';
    }
    return '<li class="news-item c-' + c.color + '" id="news-' + esc(item.id) + '"><h3 class="news-item__h">' +
      '<button class="news-item__head" type="button" aria-expanded="false" aria-controls="news-' + esc(item.id) + '-panel">' + head +
      '<span class="news-item__toggle" aria-hidden="true"><i></i></span></button></h3>' +
      '<div class="news-item__panel" id="news-' + esc(item.id) + '-panel" hidden></div></li>';
  }
  function newsPanelHtml(item) {
    var w = workById(item.work);
    var html = '';
    if (item.image) html += '<figure class="news-item__img"><img src="' + esc(item.image) + '" alt="' + esc(item.imageAlt || '') + '" loading="lazy" decoding="async"></figure>';
    html += '<div class="prose">' + renderText(item.body) + '</div>';
    if (item.links && item.links.length) {
      html += '<div class="news-item__links btn-row">' + item.links.map(function (l) {
        return '<a class="btn btn--sm" ' + linkAttrs(l.url) + '>' + esc(l.label) + icon(isExternal(l.url) ? 'ext' : 'arrow', 'icon--after') + '</a>';
      }).join('') + '</div>';
    }
    if (item.bodyEn) {
      html += '<details class="news-item__en" lang="en"><summary>English</summary><div class="prose">' + renderText(item.bodyEn) + '</div></details>';
    }
    if (w && !w.secret) {
      html += '<div class="news-item__work c-' + esc(w.color) + '"><p class="news-item__work-label">この記事の作品</p>' + miniWork(w) + '</div>';
    }
    html += '<div class="news-item__share"><span>SHARE</span>' +
      '<a class="btn btn--sm btn--x" href="https://x.com/intent/post?text=' + encodeURIComponent(item.title + '｜クレアクラン') + '&url=' + encodeURIComponent(newsUrl(item)) + '" target="_blank" rel="noopener">' + icon('x') + 'ポストする</a>' +
      '<button class="btn btn--sm btn--white c-sky" type="button" data-copy="' + esc(newsUrl(item)) + '">' + icon('link') + '<span>リンクをコピー</span></button></div>';
    return html;
  }
  function newsUrl(item) { return location.origin + location.pathname + '#news-' + encodeURIComponent(item.id); }

  var newsApi = null;
  function renderNews(el) {
    var FIRST = parseInt(el.getAttribute('data-news'), 10) || 6, MORE = 10, limit = FIRST, current = null;
    var counts = {};
    NEWS.forEach(function (n) { counts[n.category] = (counts[n.category] || 0) + 1; });
    el.innerHTML = '<div class="filters" role="group" aria-label="ニュースをカテゴリーで絞り込み">' +
      '<button class="filter filter--all" type="button" data-cat="" aria-pressed="true">すべて<small>' + NEWS.length + '</small></button>' +
      Object.keys(CATS).filter(function (k) { return counts[k]; }).map(function (k) {
        return '<button class="filter c-' + CATS[k].color + '" type="button" data-cat="' + esc(k) + '" aria-pressed="false">' + esc(CATS[k].label) + '<small>' + counts[k] + '</small></button>';
      }).join('') + '</div><ol class="news-list"></ol><div class="news-more"></div>';
    var listEl = $('.news-list', el), moreEl = $('.news-more', el);

    function items() { return NEWS.filter(function (n) { return !current || n.category === current; }); }
    function draw() {
      var all = items();
      listEl.innerHTML = all.slice(0, limit).map(newsItemHtml).join('') || '<li class="empty">該当するニュースはありません。</li>';
      moreEl.innerHTML = all.length > limit
        ? '<button class="btn btn--white" type="button">もっと見る（あと' + (all.length - limit) + '件）' + icon('down', 'icon--after') + '</button>' : '';
    }
    function open(li, on) {
      var btn = $('.news-item__head', li), panel = $('.news-item__panel', li);
      if (!panel) return;
      var item = NEWS.filter(function (n) { return 'news-' + n.id === li.id; })[0];
      if (on && !panel.innerHTML) panel.innerHTML = newsPanelHtml(item);
      panel.hidden = !on;
      btn.setAttribute('aria-expanded', String(on));
      li.classList.toggle('is-open', on);
    }
    listEl.addEventListener('click', function (e) {
      var copy = e.target.closest('[data-copy]');
      if (copy) {
        var label = $('span', copy);
        var done = function (ok) { label.textContent = ok ? 'コピーしました！' : 'コピーできませんでした'; setTimeout(function () { label.textContent = 'リンクをコピー'; }, 2200); };
        if (navigator.clipboard) navigator.clipboard.writeText(copy.getAttribute('data-copy')).then(function () { done(true); }, function () { done(false); });
        else done(false);
        return;
      }
      var btn = e.target.closest('button.news-item__head');
      if (!btn) return;
      var li = btn.closest('.news-item');
      var on = btn.getAttribute('aria-expanded') !== 'true';
      open(li, on);
      if (on && history.replaceState) history.replaceState(null, '', '#' + li.id);
    });
    moreEl.addEventListener('click', function (e) {
      if (!e.target.closest('button')) return;
      var first = limit;
      limit += MORE; draw();
      var next = $$('.news-item__head', listEl)[first];
      if (next) next.focus({ preventScroll: true });
    });
    $$('.filter', el).forEach(function (b) {
      b.addEventListener('click', function () {
        current = b.getAttribute('data-cat') || null;
        limit = FIRST;
        $$('.filter', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        draw();
      });
    });
    draw();

    // #news-<id> で開く（ほかの場所のリンクや、共有されたURLから）
    newsApi = function (id) {
      var idx = -1;
      for (var i = 0; i < NEWS.length; i++) if (NEWS[i].id === id) { idx = i; break; }
      if (idx < 0) return false;
      current = null; limit = Math.max(limit, idx + 1);
      $$('.filter', el).forEach(function (x) { x.setAttribute('aria-pressed', String(!x.getAttribute('data-cat'))); });
      draw();
      var li = document.getElementById('news-' + id);
      if (!li) return false;
      open(li, true);
      requestAnimationFrame(function () { li.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); });
      var head = $('.news-item__head', li);
      if (head) head.focus({ preventScroll: true });
      return true;
    };
  }
  function openFromHash() {
    var m = location.hash.match(/^#news-(.+)$/);
    if (m && newsApi) newsApi(decodeURIComponent(m[1]));
  }

  /* ---------- 作品 ---------- */
  var CARD_SPECS = ['プラットフォーム', '価格', '配信日', '発売時期', 'プレイ人数', 'ジャンル'];
  function workLinkButtons(w, small) {
    var size = small ? ' btn--sm' : '';
    var html = w.site ? '<a class="btn' + size + '" ' + linkAttrs(w.site) + '>公式サイトへ' + icon('ext', 'icon--after') + '</a>' : '';
    (w.links || []).forEach(function (l) {
      if (l.type === 'steam') html += '<a class="btn' + size + ' btn--steam" ' + linkAttrs(l.url) + '>' + icon('steam') + 'Steam</a>';
      else if (l.type === 'x') html += '<a class="btn' + size + ' btn--x" ' + linkAttrs(l.url) + '>' + icon('x') + esc(l.label) + '</a>';
    });
    return html;
  }
  function miniWork(w) {
    return '<div class="card mini-work"><a class="mini-work__img" ' + linkAttrs(w.site) + ' tabindex="-1" aria-hidden="true"><img src="' + esc(w.image) + '" alt="" loading="lazy"></a>' +
      '<div><p class="mini-work__genre">' + esc(w.genre) + '</p><p class="mini-work__title">' + esc(w.title) + '</p>' +
      '<div class="btn-row">' + workLinkButtons(w, true) + '</div></div></div>';
  }
  function workCard(w, i) {
    var specs = CARD_SPECS.map(function (label) {
      for (var k = 0; k < (w.specs || []).length; k++) if (w.specs[k][0] === label) return w.specs[k];
      return null;
    }).filter(Boolean).slice(0, 3);
    var visual = '<img src="' + esc(w.image) + '" alt="' + (w.secret ? esc(w.imageAlt || '') : '') + '" loading="lazy" decoding="async" width="1280" height="720">' +
      '<span class="work-card__status">' + esc(w.statusLabel) + '</span>' +
      (w.badge ? '<span class="work-card__badge">' + esc(w.badge) + '</span>' : '');
    return '<article class="card work-card c-' + esc(w.color) + (w.secret ? ' is-secret' : '') + ' reveal" style="--delay:' + (i % 2 * 0.08) + 's">' +
      (w.site ? '<a class="work-card__visual" ' + linkAttrs(w.site) + ' tabindex="-1" aria-hidden="true">' + visual + '</a>'
        : '<div class="work-card__visual">' + visual + '</div>') +
      (w.chara ? '<img class="work-card__chara" src="' + esc(w.chara) + '" alt="" loading="lazy" decoding="async">' : '') +
      '<div class="work-card__body">' +
      '<p class="work-card__genre">' + esc(w.genre) + '</p>' +
      '<h3 class="work-card__title">' + (w.site ? '<a ' + linkAttrs(w.site) + '>' + esc(w.title) + '<span class="visually-hidden">（公式サイトを開く）</span></a>' : '<span>' + esc(w.title) + '</span>') +
      '<small lang="en">' + esc(w.titleEn) + '</small></h3>' +
      '<p class="work-card__catch">' + esc(w.catch) + '</p>' +
      ((w.tags || []).length ? '<ul class="chips">' + w.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
      (specs.length ? '<dl class="work-card__spec">' + specs.map(function (s) { return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('') + '</dl>' : '') +
      (w.note ? '<p class="work-card__note">※' + esc(w.note) + '</p>' : '') +
      '<div class="work-card__actions">' + workLinkButtons(w, true) + '</div>' +
      '</div></article>';
  }
  function renderWorks(el) { el.innerHTML = WORKS.map(workCard).join(''); }

  /* ---------- グッズ ---------- */
  function goodsCard(g, i) {
    var st = GOODS_STATUS[g.status] || { label: '', color: 'orange' };
    var url = g.link && g.link.url;
    var tagName = url ? 'a' : 'div';
    return '<li class="reveal" style="--delay:' + (i % 4 * 0.06) + 's"><' + tagName + ' class="card goods-card c-' + st.color + '"' + (url ? ' ' + linkAttrs(url) : '') + '>' +
      '<span class="goods-card__img"><img src="' + esc(g.image) + '" alt="" loading="lazy" decoding="async"></span>' +
      '<span class="goods-card__body"><span class="goods-card__meta"><span class="date">' + esc(g.year) + '</span>' +
      (st.label ? '<span class="tag c-' + st.color + '">' + esc(st.label) + '</span>' : '') + '</span>' +
      '<span class="goods-card__name">' + esc(g.name) + '</span>' +
      '<span class="goods-card__desc">' + esc(g.description) + '</span>' +
      (url ? '<span class="goods-card__link">' + esc(g.link.label) + icon(isExternal(url) ? 'ext' : 'arrow') + '</span>' : '') +
      '</span></' + tagName + '></li>';
  }
  function renderGoods(el) {
    var n = parseInt(el.getAttribute('data-goods'), 10);
    var items = n ? GOODS.slice(0, n) : GOODS;
    el.innerHTML = items.map(goodsCard).join('');
  }

  /* ---------- ピックアップ（スライダー） ---------- */
  function renderPickup(root) {
    var slides = PICKUP;
    if (!slides.length) { root.hidden = true; return; }
    var n = slides.length;
    var CLONES = n > 1 ? 2 : 0;
    function slideHtml(s, i, clone) {
      var color = s.color || COLORS[i % COLORS.length];
      return '<div class="pickup__slide c-' + esc(color) + '"' + (clone ? ' aria-hidden="true" data-clone' : ' role="group" aria-roledescription="スライド" aria-label="' + (i + 1) + ' / ' + n + '"') + '>' +
        '<a class="pickup__link" ' + linkAttrs(s.url) + (clone ? ' tabindex="-1"' : '') + '>' +
        '<span class="pickup__img"><img src="' + esc(s.image) + '" alt="' + esc(s.alt || '') + '" width="1600" height="900"' + (i === 0 && !clone ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></span>' +
        '<span class="pickup__caption">' + (s.label ? '<span class="pickup__label">' + esc(s.label) + '</span>' : '') + '<span class="pickup__title">' + esc(s.title) + (isExternal(s.url) ? icon('ext', 'pickup__ext') : '') + '</span>' + icon('arrow', 'pickup__go') + '</span>' +
        '</a></div>';
    }
    var html = '';
    for (var k = CLONES; k > 0; k--) html += slideHtml(slides[(n - k % n) % n], (n - k % n) % n, true);
    slides.forEach(function (s, i) { html += slideHtml(s, i, false); });
    for (var j = 0; j < CLONES; j++) html += slideHtml(slides[j % n], j % n, true);

    root.innerHTML =
      '<div class="pickup__viewport"><div class="pickup__track">' + html + '</div></div>' +
      (n > 1 ? '<button class="pickup__arrow pickup__arrow--prev" type="button" aria-label="前のスライド">' + icon('chev-l') + '</button>' +
        '<button class="pickup__arrow pickup__arrow--next" type="button" aria-label="次のスライド">' + icon('chev-r') + '</button>' +
        '<div class="pickup__dots">' + slides.map(function (s, i) {
          return '<button class="pickup__dot c-' + esc(s.color || COLORS[i % COLORS.length]) + '" type="button" aria-label="' + (i + 1) + '枚目のスライド：' + esc(s.title) + '"></button>';
        }).join('') + '</div>' : '');

    var track = $('.pickup__track', root);
    var all = $$('.pickup__slide', root);
    var dots = $$('.pickup__dot', root);
    var pos = CLONES; // track 上の位置
    var timer = null, paused = false, busy = false, busyTimer = null;

    function realIndex(p) { return ((p - CLONES) % n + n) % n; }
    function update(instant) {
      track.classList.toggle('is-instant', !!instant || reduceMotion);
      track.style.setProperty('--pos', pos);
      all.forEach(function (el, i) { el.classList.toggle('is-active', i === pos); });
      var r = realIndex(pos);
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === r)); });
      $$('.pickup__slide:not([data-clone]) .pickup__link', root).forEach(function (a, i) { a.tabIndex = i === r ? 0 : -1; });
    }
    function go(p) {
      if (p === pos || (busy && !reduceMotion)) return;
      pos = p; update(false);
      if (reduceMotion) { normalize(); return; }
      busy = true;
      clearTimeout(busyTimer);
      busyTimer = setTimeout(normalize, 1000); // transitionend が来なかったときの保険
    }
    function normalize() {
      busy = false;
      clearTimeout(busyTimer);
      if (pos < CLONES || pos >= CLONES + n) {
        pos = CLONES + realIndex(pos);
        update(true);
        void track.offsetWidth; // 再描画してから transition を戻す
        track.classList.remove('is-instant');
      }
    }
    track.addEventListener('transitionend', function (e) { if (e.target === track) normalize(); });
    function next() { go(pos + 1); }
    function prev() { go(pos - 1); }
    function start() { stop(); if (!reduceMotion && n > 1 && !paused && !document.hidden) timer = setInterval(next, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    var prevBtn = $('.pickup__arrow--prev', root), nextBtn = $('.pickup__arrow--next', root);
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); start(); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(CLONES + i); start(); }); });
    root.addEventListener('mouseenter', function () { paused = true; stop(); });
    root.addEventListener('mouseleave', function () { paused = false; start(); });
    root.addEventListener('focusin', function () { paused = true; stop(); });
    root.addEventListener('focusout', function (e) { if (!root.contains(e.relatedTarget)) { paused = false; start(); } });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { prev(); e.preventDefault(); }
    });
    // 隣のスライドを押したらそちらへ移動
    all.forEach(function (el, i) {
      el.addEventListener('click', function (e) {
        if (i !== pos) { e.preventDefault(); go(i); start(); }
      });
    });
    // スワイプ
    var startX = null, startY = 0, dx = 0, dragging = false;
    var viewport = $('.pickup__viewport', root);
    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' || n < 2) return;
      startX = e.clientX; startY = e.clientY; dx = 0; dragging = false;
    });
    viewport.addEventListener('pointermove', function (e) {
      if (startX === null) return;
      dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - startY)) { dragging = true; stop(); track.classList.add('is-instant'); }
      if (dragging) track.style.setProperty('--drag', dx + 'px');
    });
    function endDrag() {
      if (startX === null) return;
      track.classList.remove('is-instant');
      track.style.setProperty('--drag', '0px');
      if (dragging) {
        if (dx < -40) next(); else if (dx > 40) prev();
        var block = function (e) { e.preventDefault(); e.stopPropagation(); };
        viewport.addEventListener('click', block, { capture: true, once: true });
        setTimeout(function () { viewport.removeEventListener('click', block, { capture: true }); }, 50);
      }
      startX = null; dragging = false; start();
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    update(true);
    requestAnimationFrame(function () { track.classList.remove('is-instant'); });
    start();
  }

  /* ---------- 見出しの積み木 ---------- */
  var ROT = [-6, 4, -3, 5, -4, 3, -2, 6];
  function buildBlocks(el, offset) {
    var text = el.textContent.trim();
    var color = parseInt(el.getAttribute('data-color-offset'), 10);
    if (isNaN(color)) color = offset;
    var html = '', idx = 0;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === ' ') { html += '<span class="blk is-space"></span>'; continue; }
      html += '<span class="blk c-' + COLORS[(color + idx) % COLORS.length] + '" style="--i:' + idx + ';--r:' + ROT[(idx + color) % ROT.length] + 'deg">' + esc(ch) + '</span>';
      idx++;
    }
    el.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--n', text.length);
    el.innerHTML = html;
    el.classList.add('is-built');
    el.insertAdjacentHTML('afterend', '<span class="visually-hidden">' + esc(text) + '</span>');
  }

  /* ---------- ふわっと表示 ---------- */
  function initReveal() {
    var targets = $$('.reveal:not(.is-in), .sec-title:not(.is-in)');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      targets.forEach(function (t) { t.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- メニュー ---------- */
  function initMenu() {
    var btn = $('.menu-toggle');
    if (!btn) return;
    var root = document.documentElement;
    var label = $('.menu-toggle__label', btn);
    function set(open) {
      root.classList.toggle('is-menu-open', open);
      document.body.classList.toggle('is-locked', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      if (label) label.textContent = open ? 'CLOSE' : 'MENU';
    }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    $$('#gnav a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('is-menu-open')) { set(false); btn.focus(); } });
    var mq = window.matchMedia('(min-width: 1100px)');
    var onChange = function () { if (mq.matches) set(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
  }

  /* ---------- ページトップへ ---------- */
  function initToTop() {
    var b = $('.to-top');
    if (!b) return;
    var on = false;
    window.addEventListener('scroll', function () {
      var s = window.scrollY > 700;
      if (s !== on) { on = s; b.classList.toggle('is-shown', s); }
    }, { passive: true });
  }

  /* ---------- 「すべて見る」で開く部分（これまでのあゆみ など） ---------- */
  function initCollapse() {
    $$('[data-collapse]').forEach(function (box) {
      var btn = $('[data-collapse-toggle]', box.parentNode);
      if (!btn) return;
      var label = $('span', btn);
      btn.addEventListener('click', function () {
        var on = !box.classList.contains('is-open');
        box.classList.toggle('is-open', on);
        btn.setAttribute('aria-expanded', String(on));
        if (label) label.textContent = on ? '閉じる' : 'すべて見る';
        if (!on) box.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- いま見ている場所をメニューで光らせる ---------- */
  function initScrollSpy() {
    var links = $$('.gnav__link[href^="#"], .gnav__guide[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { var id = a.getAttribute('href').slice(1); (map[id] = map[id] || []).push(a); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        (map[en.target.id] || []).forEach(function (a) { a.setAttribute('aria-current', 'location'); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var sec = document.getElementById(id); if (sec) io.observe(sec); });
  }

  /* ---------- 起動 ---------- */
  function init() {
    $$('[data-pickup]').forEach(renderPickup);
    $$('[data-news]').forEach(renderNews);
    $$('[data-works]').forEach(renderWorks);
    $$('[data-goods]').forEach(renderGoods);
    $$('.sec-title__en').forEach(function (el, i) { buildBlocks(el, i % COLORS.length); });
    initMenu();
    initToTop();
    initCollapse();
    initScrollSpy();
    initReveal();
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    // ほかの場所（スライドなど）の「#news-<id>」リンクは、そのニュースを開いてスクロール
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#news-"]');
      if (!a || !newsApi || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var id = decodeURIComponent(a.getAttribute('href').slice(6));
      if (newsApi(id)) {
        e.preventDefault();
        if (history.pushState) history.pushState(null, '', '#news-' + encodeURIComponent(id));
      }
    });
    // 画像やフォントの読み込みで位置がずれたあとも、見えているものは表示する
    window.addEventListener('load', function () { initReveal(); if (/^#news-/.test(location.hash)) openFromHash(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // ほかのスクリプトから使えるように（テスト用）
  window.CC = { renderText: renderText, news: NEWS };
})();
