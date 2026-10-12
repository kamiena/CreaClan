/* ==========================================================================
   クレアクラン 公式サイト
   - ニュース・作品・グッズ・ピックアップは assets/data/*.js のデータから自動で表示します
   - メニュー、スライダー、スクロール演出、画像の拡大表示など
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
  var SITE_NAME = 'クレアクラン（CREA CLAN）公式サイト';
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
        var tag = m[1].length === 2 ? 'h2' : 'h3';
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
  function plain(src) {
    return String(src || '')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/^#{2,3}\s+/gm, '')
      .replace(/\*\*/g, '')
      .replace(/^-\s+/gm, '')
      .replace(/▼/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function excerpt(item, n) {
    var s = item.summary || plain(item.body);
    return s.length > n ? s.slice(0, n) + '…' : s;
  }

  /* ---------- ニュースの部品 ---------- */
  function newsHref(item) {
    if (!item.body && item.url) return item.url;
    return 'news.html?id=' + encodeURIComponent(item.id);
  }
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
  function extMark(item) { return (!item.body && item.url) ? icon('ext', 'ext') + '<span class="visually-hidden">（外部サイト）</span>' : ''; }
  function newsCard(item) {
    var c = cat(item.category);
    return '<li><a class="card news-card c-' + c.color + '" ' + linkAttrs(newsHref(item)) + '>' +
      '<span class="news-card__img">' + newsThumb(item) + '</span>' +
      '<span class="news-card__body">' + newsMeta(item) +
      '<span class="news-card__title">' + esc(item.title) + extMark(item) + '</span></span></a></li>';
  }

  /* トップ：最新ニュース（大きい1件＋リスト） */
  function renderNewsTop(el) {
    var n = parseInt(el.getAttribute('data-news-top'), 10) || 6;
    var items = NEWS.slice(0, n);
    if (!items.length) { el.innerHTML = '<p class="empty">ニュースはまだありません。</p>'; return; }
    var first = items[0], c = cat(first.category);
    var html = '<a class="card news-feature c-' + c.color + ' reveal" ' + linkAttrs(newsHref(first)) + '>' +
      '<div class="news-feature__img">' + newsThumb(first) + '</div>' +
      '<div class="news-feature__body">' + newsMeta(first) +
      '<h3 class="news-feature__title">' + esc(first.title) + extMark(first) + '</h3>' +
      '<p class="news-feature__summary">' + esc(excerpt(first, 90)) + '</p></div></a>';
    html += '<ul class="news-rows">' + items.slice(1).map(function (item, i) {
      var ci = cat(item.category);
      return '<li class="reveal" style="--delay:' + (i * 0.06) + 's"><a class="card news-row c-' + ci.color + '" ' + linkAttrs(newsHref(item)) + '>' +
        '<span class="news-row__thumb">' + newsThumb(item) + '</span>' +
        '<span class="news-row__body">' + newsMeta(item) + '<span class="news-row__title">' + esc(item.title) + extMark(item) + '</span></span>' +
        icon('arrow', 'news-row__arrow') + '</a></li>';
    }).join('') + '</ul>';
    el.innerHTML = html;
  }

  /* ニュース一覧ページ */
  function renderNewsList(el) {
    var params = new URLSearchParams(location.search);
    var current = params.get('cat');
    if (current && !CATS[current]) current = null;
    var PAGE = 12, limit = PAGE;

    var counts = {};
    NEWS.forEach(function (n) { counts[n.category] = (counts[n.category] || 0) + 1; });
    var filters = '<div class="filters" role="group" aria-label="カテゴリーで絞り込み">' +
      '<button class="filter filter--all" type="button" data-cat="" aria-pressed="' + (!current) + '">すべて<small>' + NEWS.length + '</small></button>' +
      Object.keys(CATS).filter(function (k) { return counts[k]; }).map(function (k) {
        return '<button class="filter c-' + CATS[k].color + '" type="button" data-cat="' + esc(k) + '" aria-pressed="' + (current === k) + '">' +
          esc(CATS[k].label) + '<small>' + counts[k] + '</small></button>';
      }).join('') + '</div>';
    el.innerHTML = filters + '<div class="news-list" aria-live="polite"></div>';
    var listEl = $('.news-list', el);

    function draw() {
      var items = NEWS.filter(function (n) { return !current || n.category === current; });
      if (!items.length) { listEl.innerHTML = '<p class="empty">該当するニュースはありません。</p>'; return; }
      var shown = items.slice(0, limit), html = '', year = null;
      shown.forEach(function (item) {
        var y = item.date.slice(0, 4);
        if (y !== year) {
          if (year !== null) html += '</ul>';
          html += '<h2 class="news-year"><span class="news-year__label">' + y + '</span></h2><ul class="news-grid">';
          year = y;
        }
        html += newsCard(item);
      });
      html += '</ul>';
      if (items.length > limit) {
        html += '<div class="news-more"><button class="btn btn--white" type="button" data-more>もっと見る（あと' + (items.length - limit) + '件）' + icon('down', 'icon--after') + '</button></div>';
      }
      listEl.innerHTML = html;
      var more = $('[data-more]', listEl);
      if (more) more.addEventListener('click', function () {
        var nextIndex = limit;
        limit += PAGE;
        draw();
        var cards = $$('.news-card', listEl);
        if (cards[nextIndex]) cards[nextIndex].focus({ preventScroll: true });
      });
    }
    $$('.filter', el).forEach(function (b) {
      b.addEventListener('click', function () {
        current = b.getAttribute('data-cat') || null;
        limit = PAGE;
        $$('.filter', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        var url = new URL(location.href);
        if (current) url.searchParams.set('cat', current); else url.searchParams.delete('cat');
        history.replaceState(null, '', url);
        draw();
      });
    });
    draw();
  }

  /* ニュース記事ページ */
  function setMeta(title, desc, image, url) {
    document.title = title + '｜' + SITE_NAME;
    if (url) {
      var canon = $('link[rel="canonical"]'); if (canon) canon.setAttribute('href', url);
      var ou = $('meta[property="og:url"]'); if (ou) ou.setAttribute('content', url);
    }
    var d = $('meta[name="description"]');
    if (d && desc) d.setAttribute('content', desc);
    var ot = $('meta[property="og:title"]'); if (ot) ot.setAttribute('content', title);
    var od = $('meta[property="og:description"]'); if (od && desc) od.setAttribute('content', desc);
    if (image && !isExternal(image)) {
      var oi = $('meta[property="og:image"]');
      if (oi) oi.setAttribute('content', new URL(image, location.href).href);
    }
  }
  function renderArticle(el, id) {
    var idx = -1;
    for (var i = 0; i < NEWS.length; i++) if (NEWS[i].id === id) { idx = i; break; }
    var heroTitle = $('[data-page-title]');
    var crumb = $('[data-crumb-current]');
    if (idx < 0) {
      el.innerHTML = '<div class="article"><p class="empty">お探しのニュースが見つかりませんでした。</p>' +
        '<div class="btn-row btn-row--center"><a class="btn" href="news.html">ニュース一覧へ' + icon('arrow', 'icon--after') + '</a></div></div>';
      return;
    }
    var item = NEWS[idx], c = cat(item.category), w = workById(item.work);
    var articleUrl = location.origin + location.pathname + '?id=' + encodeURIComponent(item.id);
    setMeta(item.title, excerpt(item, 110), item.image, articleUrl);
    if (crumb) {
      crumb.innerHTML = '<a href="news.html">NEWS</a>';
      crumb.removeAttribute('aria-current');
      crumb.insertAdjacentHTML('afterend', '<li aria-current="page">' + esc(item.title.length > 24 ? item.title.slice(0, 24) + '…' : item.title) + '</li>');
    }
    // 記事ページでは記事のタイトルを h1 にするので、上の「NEWS」は見出しから外す
    if (heroTitle && heroTitle.tagName === 'H1') {
      var p = document.createElement('p');
      p.className = heroTitle.className;
      p.innerHTML = heroTitle.innerHTML;
      heroTitle.parentNode.replaceChild(p, heroTitle);
    }

    var html = '<article class="article c-' + c.color + '">' +
      '<header class="article__head">' + newsMeta(item) + '<h1 class="article__title">' + esc(item.title) + '</h1></header>';
    if (item.image) {
      html += '<figure class="article__img"><img src="' + esc(item.image) + '" alt="' + esc(item.imageAlt || '') + '" decoding="async"></figure>';
    }
    html += '<div class="prose">' + renderText(item.body || (item.summary ? item.summary : '')) + '</div>';
    if (!item.body && item.url) {
      html += '<div class="article__links btn-row"><a class="btn" ' + linkAttrs(item.url) + '>記事を読む' + icon('ext', 'icon--after') + '</a></div>';
    }
    if (item.links && item.links.length) {
      html += '<div class="article__links btn-row">' + item.links.map(function (l) {
        return '<a class="btn" ' + linkAttrs(l.url) + '>' + esc(l.label) + icon(isExternal(l.url) ? 'ext' : 'arrow', 'icon--after') + '</a>';
      }).join('') + '</div>';
    }
    if (item.bodyEn) {
      html += '<section class="article__en" lang="en" aria-label="English"><span class="article__en-label">English</span><div class="prose">' + renderText(item.bodyEn) + '</div></section>';
    }
    if (w) {
      html += '<aside class="article__work c-' + w.color + '"><p class="article__work-label">この記事の作品</p>' + miniWork(w) + '</aside>';
    }
    var shareUrl = articleUrl;
    var xText = item.title + '｜クレアクラン';
    html += '<div class="article__share"><span class="article__share-label">SHARE</span>' +
      '<a class="btn btn--sm btn--x" href="https://x.com/intent/post?text=' + encodeURIComponent(xText) + '&url=' + encodeURIComponent(shareUrl) + '" target="_blank" rel="noopener">' + icon('x') + 'ポストする</a>' +
      '<button class="btn btn--sm btn--white c-sky" type="button" data-copy>' + icon('link') + '<span>リンクをコピー</span></button></div>';

    var newer = NEWS[idx - 1], older = NEWS[idx + 1];
    html += '<nav class="article-nav" aria-label="前後のニュース">' +
      (older ? '<a class="card is-prev" href="' + esc(newsHref(older)) + '"><small>← PREV</small><span>' + esc(older.title) + '</span></a>' : '') +
      (newer ? '<a class="card is-next" href="' + esc(newsHref(newer)) + '"><small>NEXT →</small><span>' + esc(newer.title) + '</span></a>' : '') +
      '</nav>';
    html += '<div class="sec-more"><a class="btn" href="news.html">ニュース一覧へ' + icon('arrow', 'icon--after') + '</a></div>';
    html += '</article>';
    el.innerHTML = html;

    var copy = $('[data-copy]', el);
    if (copy) copy.addEventListener('click', function () {
      var label = $('span', copy);
      function done(ok) { label.textContent = ok ? 'コピーしました！' : 'コピーできませんでした'; setTimeout(function () { label.textContent = 'リンクをコピー'; }, 2200); }
      if (navigator.clipboard) navigator.clipboard.writeText(shareUrl).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
  }

  /* ---------- 作品 ---------- */
  function workLinkButtons(w, small) {
    var size = small ? ' btn--sm' : '';
    var html = '<a class="btn' + size + '" ' + linkAttrs(w.site) + '>公式サイトへ' + icon('ext', 'icon--after') + '</a>';
    (w.links || []).forEach(function (l) {
      if (small && l.type !== 'steam') return;
      var cls = l.type === 'steam' ? ' btn--steam' : l.type === 'youtube' ? ' btn--white' : ' btn--white';
      var ic = l.type === 'steam' ? icon('steam') : l.type === 'youtube' ? icon('yt') : '';
      html += '<a class="btn' + size + cls + '" ' + linkAttrs(l.url) + '>' + ic + esc(small && l.type === 'steam' ? 'Steam' : l.label) + '</a>';
    });
    return html;
  }
  function miniWork(w) {
    return '<div class="card mini-work"><a class="mini-work__img" ' + linkAttrs(w.site) + ' tabindex="-1" aria-hidden="true"><img src="' + esc(w.image) + '" alt="" loading="lazy"></a>' +
      '<div><p class="mini-work__genre">' + esc(w.genre) + '</p><p class="mini-work__title">' + esc(w.title) + '</p>' +
      '<div class="btn-row">' + workLinkButtons(w, true) + '</div></div></div>';
  }
  function workCard(w, i) {
    return '<article class="card work-card c-' + esc(w.color) + ' reveal" style="--delay:' + (i * 0.08) + 's">' +
      '<a class="work-card__visual" ' + linkAttrs(w.site) + ' tabindex="-1" aria-hidden="true">' +
      '<img src="' + esc(w.image) + '" alt="" loading="lazy" decoding="async" width="1280" height="720">' +
      '<span class="work-card__status">' + esc(w.statusLabel) + '</span>' +
      (w.badge ? '<span class="work-card__badge">' + esc(w.badge) + '</span>' : '') + '</a>' +
      (w.chara ? '<img class="work-card__chara" src="' + esc(w.chara) + '" alt="" loading="lazy" decoding="async">' : '') +
      '<div class="work-card__body">' +
      '<p class="work-card__genre">' + esc(w.genre) + '</p>' +
      '<h3 class="work-card__title"><a ' + linkAttrs(w.site) + '>' + esc(w.title) + '<span class="visually-hidden">（公式サイトを開く）</span></a><small lang="en">' + esc(w.titleEn) + '</small></h3>' +
      '<p class="work-card__catch">' + esc(w.catch) + '</p>' +
      '<ul class="chips">' + (w.tags || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '<div class="work-card__actions">' + workLinkButtons(w, true) + '</div>' +
      '</div></article>';
  }
  function workDetail(w, i) {
    var shots = (w.screenshots || []).map(function (s, j) {
      return '<button type="button" data-zoom="' + esc(s) + '" aria-label="画像を拡大（' + (j + 1) + '枚目）"><img src="' + esc(s) + '" alt="" loading="lazy" decoding="async"></button>';
    }).join('');
    return '<section class="work-detail c-' + esc(w.color) + '" id="' + esc(w.id) + '" aria-labelledby="work-' + esc(w.id) + '">' +
      '<div class="work-detail__grid">' +
      '<div class="work-detail__visual reveal">' +
      '<a class="work-detail__kv" ' + linkAttrs(w.site) + ' tabindex="-1" aria-hidden="true"><img src="' + esc(w.image) + '" alt="" ' + (i ? 'loading="lazy" ' : '') + 'decoding="async" width="1280" height="720"></a>' +
      (w.chara ? '<img class="work-detail__chara" src="' + esc(w.chara) + '" alt="" loading="lazy">' : '') +
      (shots ? '<div class="work-detail__shots' + (w.screenshotsSquare ? ' is-square' : '') + '">' + shots + '</div>' : '') +
      '</div>' +
      '<div class="work-detail__info reveal" style="--delay:.08s">' +
      (w.logo ? '<img class="work-detail__logo" src="' + esc(w.logo) + '" alt="" loading="lazy">' : '') +
      '<div class="work-detail__head"><span class="work-detail__status">' + esc(w.statusLabel) + '</span>' +
      (w.badge ? '<span class="work-card__badge" style="position:static">' + esc(w.badge) + '</span>' : '') + '</div>' +
      '<h2 class="work-detail__title" id="work-' + esc(w.id) + '">' + esc(w.title) + '<small lang="en">' + esc(w.titleEn) + '</small></h2>' +
      '<p class="work-detail__catch">' + esc(w.catch) + '</p>' +
      '<p class="work-detail__desc">' + esc(w.description) + '</p>' +
      '<dl class="spec">' + (w.specs || []).map(function (s) { return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('') + '</dl>' +
      (w.note ? '<p class="work-detail__note">※' + esc(w.note) + '</p>' : '') +
      '<div class="btn-row">' + workLinkButtons(w, false) + '</div>' +
      '</div></div></section>';
  }
  function renderWorks(el) {
    var mode = el.getAttribute('data-works');
    el.innerHTML = WORKS.map(mode === 'detail' ? workDetail : workCard).join('');
  }

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

  /* ---------- 画像の拡大 ---------- */
  function initZoom() {
    var dlg = null;
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-zoom]');
      if (!t) return;
      if (!dlg) {
        dlg = document.createElement('dialog');
        dlg.className = 'lightbox';
        dlg.innerHTML = '<button class="lightbox__close" type="button" aria-label="閉じる">×</button><img alt="">';
        document.body.appendChild(dlg);
        dlg.addEventListener('click', function (ev) { if (ev.target === dlg || ev.target.closest('.lightbox__close')) dlg.close(); });
      }
      $('img', dlg).src = t.getAttribute('data-zoom');
      if (dlg.showModal) dlg.showModal(); else window.open(t.getAttribute('data-zoom'), '_blank');
    });
  }

  /* ---------- 起動 ---------- */
  function init() {
    $$('[data-pickup]').forEach(renderPickup);
    $$('[data-news-top]').forEach(renderNewsTop);
    $$('[data-news-list]').forEach(function (el) {
      var id = new URLSearchParams(location.search).get('id');
      if (id) renderArticle(el, id); else renderNewsList(el);
    });
    $$('[data-works]').forEach(renderWorks);
    $$('[data-goods]').forEach(renderGoods);
    $$('.sec-title__en').forEach(function (el, i) { buildBlocks(el, i % COLORS.length); });
    initMenu();
    initToTop();
    initZoom();
    initReveal();
    // 画像やフォントの読み込みで位置がずれたあとも、見えているものは表示する
    window.addEventListener('load', initReveal);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // ほかのスクリプトから使えるように（テスト用）
  window.CC = { renderText: renderText, news: NEWS };
})();
