#!/usr/bin/env node
/* ==========================================================================
   データの書き間違いチェック ＋ sitemap.xml の更新

   使い方（リポジトリのいちばん上のフォルダで）:
     node tools/check-data.mjs

   - assets/data/*.js（ニュース・作品・グッズ・ピックアップ）の必須項目、日付、id の重複、
     カテゴリー名、画像ファイルがあるかどうかを確認します。
   - 各ページ（*.html）の中の画像・リンク先のファイル、ページ内リンク（#news など）の行き先があるかどうかも確認します。
   - 問題がなければ sitemap.xml を作り直します。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://kamiena.github.io/CreaClan/';
const COLORS = ['orange', 'pink', 'sky', 'mint', 'yellow'];
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`✖ ${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`△ ${where}: ${msg}`);

function load(file) {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  return ctx.window;
}
// トップページの中にある場所（id）。ニュースは #news-<id> で開けます
const INDEX_HTML = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const anchors = new Set([...INDEX_HTML.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
let newsIds = new Set();
function exists(p) {
  if (!p) return true;
  if (p.startsWith('#') || p.startsWith('./#')) {
    const id = decodeURIComponent(p.slice(p.indexOf('#') + 1));
    if (!id) return true;
    if (id.startsWith('news-') && newsIds.has(id.slice(5))) return true;
    return anchors.has(id);
  }
  if (/^(https?:)?\/\//.test(p) || /^(mailto|tel):/.test(p)) return true;
  const clean = decodeURI(p.split('#')[0].split('?')[0]);
  if (!clean) return true;
  return fs.existsSync(path.join(ROOT, clean));
}
const isDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(new Date(d + 'T00:00:00').getTime());
const mdImages = (text) => [...String(text || '').matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]);
const mdLinks = (text) => [...String(text || '').matchAll(/(?<!!)\[[^\]]+\]\(([^)\s]+)\)/g)].map((m) => m[1]);

/* ---------- データ ---------- */
const { CC_NEWS = [], CC_NEWS_CATEGORIES = {} } = load('assets/data/news.js');
const { CC_WORKS = [] } = load('assets/data/works.js');
const { CC_GOODS = [], CC_GOODS_STATUS = {} } = load('assets/data/goods.js');
const { CC_PICKUP = [] } = load('assets/data/pickup.js');
const workIds = new Set(CC_WORKS.map((w) => w.id));
newsIds = new Set(CC_NEWS.map((n) => n.id));

// ニュース
const ids = new Set();
CC_NEWS.forEach((n, i) => {
  const where = `news.js ${n.id || `#${i + 1}`}`;
  if (!n.id) err(where, 'id がありません');
  else if (!/^[a-z0-9][a-z0-9-]*$/.test(n.id)) err(where, 'id は半角英小文字・数字・ハイフンだけにしてください');
  else if (ids.has(n.id)) err(where, 'id がほかのニュースと重なっています');
  ids.add(n.id);
  if (!isDate(n.date)) err(where, `date "${n.date}" は YYYY-MM-DD の形にしてください`);
  if (!CC_NEWS_CATEGORIES[n.category]) err(where, `category "${n.category}" は ${Object.keys(CC_NEWS_CATEGORIES).join(' / ')} のどれかにしてください`);
  if (!n.title) err(where, 'title がありません');
  if (!n.body && !n.url) err(where, 'body（本文）か url（外部リンク）のどちらかが必要です');
  if (n.image && !exists(n.image)) err(where, `画像 ${n.image} が見つかりません`);
  if (n.work && !workIds.has(n.work)) err(where, `work "${n.work}" は works.js にありません`);
  [...mdImages(n.body), ...mdImages(n.bodyEn)].forEach((src) => { if (!exists(src)) err(where, `本文の画像 ${src} が見つかりません`); });
  [...mdLinks(n.body), ...mdLinks(n.bodyEn)].forEach((href) => { if (!exists(href)) err(where, `本文のリンク先 ${href} が見つかりません`); });
  (n.links || []).forEach((l) => {
    if (!l.label || !l.url) err(where, 'links の中に label か url がないものがあります');
    else if (!exists(l.url)) err(where, `links のリンク先 ${l.url} が見つかりません`);
  });
  if (n.date && isDate(n.date) && new Date(n.date) > new Date(Date.now() + 86400000 * 60)) warn(where, '日付がかなり先になっています（書き間違いではありませんか？）');
});

// 作品
CC_WORKS.forEach((w, i) => {
  const where = `works.js ${w.id || `#${i + 1}`}`;
  ['id', 'title', 'titleEn', 'status', 'statusLabel', 'color', 'genre', 'catch', 'image'].forEach((k) => { if (!w[k]) err(where, `${k} がありません`); });
  if (!w.site && !w.secret) err(where, 'site（作品の公式サイトのURL）がありません（まだヒミツの作品なら secret: true）');
  if (w.color && !COLORS.includes(w.color)) err(where, `color は ${COLORS.join(' / ')} のどれかにしてください`);
  ['image', 'logo', 'chara'].forEach((k) => { if (w[k] && !exists(w[k])) err(where, `${k} の画像 ${w[k]} が見つかりません`); });
  (w.screenshots || []).forEach((s) => { if (!exists(s)) err(where, `スクリーンショット ${s} が見つかりません`); });
});

// グッズ
CC_GOODS.forEach((g, i) => {
  const where = `goods.js ${g.name || `#${i + 1}`}`;
  if (!g.name) err(where, 'name がありません');
  if (!CC_GOODS_STATUS[g.status]) err(where, `status "${g.status}" は ${Object.keys(CC_GOODS_STATUS).join(' / ')} のどれかにしてください`);
  if (!g.image || !exists(g.image)) err(where, `画像 ${g.image} が見つかりません`);
});

// メディア掲載・実況動画
const { CC_MEDIA = {} } = load('assets/data/media.js');
(CC_MEDIA.tv || []).forEach((t, i) => {
  const where = `media.js tv #${i + 1}`;
  if (!t.title || !t.url) err(where, 'title か url がありません');
  if (t.image && !exists(t.image)) err(where, `画像 ${t.image} が見つかりません`);
  if (t.work && !workIds.has(t.work)) err(where, `work "${t.work}" は works.js にありません`);
});
(CC_MEDIA.articles || []).forEach((a, i) => {
  const where = `media.js articles #${i + 1}`;
  if (!a.media || !a.title || !a.url) err(where, 'media・title・url のどれかがありません');
  if (a.date && !isDate(a.date)) err(where, `date "${a.date}" は YYYY-MM-DD の形にしてください`);
  if (a.work && !workIds.has(a.work)) err(where, `work "${a.work}" は works.js にありません`);
});
(CC_MEDIA.videos || []).forEach((v, i) => {
  const where = `media.js videos #${i + 1}`;
  if (!/^[\w-]{11}$/.test(v.id || '')) err(where, `YouTube の動画ID "${v.id}" が正しくありません`);
  if (v.work && !workIds.has(v.work)) err(where, `work "${v.work}" は works.js にありません`);
});

// ピックアップ
CC_PICKUP.forEach((p, i) => {
  const where = `pickup.js #${i + 1}`;
  if (!p.image || !exists(p.image)) err(where, `画像 ${p.image} が見つかりません`);
  if (!p.title) err(where, 'title がありません');
  if (!p.url) err(where, 'url がありません');
  if (p.color && !COLORS.includes(p.color)) err(where, `color は ${COLORS.join(' / ')} のどれかにしてください`);
  if (p.url && !exists(p.url)) err(where, `url の行き先 ${p.url} が見つかりません（ニュースなら "#news-ニュースのid"）`);
});

/* ---------- 各ページの画像・リンク ---------- */
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
pages.forEach((file) => {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  for (const m of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
    let url = m[1].replace(/&amp;/g, '&');
    if (file !== 'index.html' && url.startsWith('#') && !url.startsWith('#i-')) {
      if (file === '404.html') url = './' + url; // 404 は <base> でトップページの場所を指定している
      else continue;
    }
    if (url === '#top' || url === '#main' || url.startsWith('#i-') || url.startsWith('/')) continue; // #i-… はアイコン（icons.js）
    if (!exists(url)) err(file, `${url} が見つかりません`);
  }
});

/* ---------- 結果 ---------- */
warnings.forEach((w) => console.log(w));
if (errors.length) {
  errors.forEach((e) => console.log(e));
  console.log(`\n${errors.length} 件の問題が見つかりました。直してからもう一度実行してください。`);
  process.exit(1);
}

/* ---------- sitemap.xml ---------- */
// サイトはトップページ1枚（news.html などは、以前のURLからトップページへ転送するだけのページ）
const sorted = CC_NEWS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
const latest = sorted[0] ? sorted[0].date : undefined;
const urls = [{ loc: BASE, lastmod: latest }];
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url><loc>${u.loc.replace(/&/g, '&amp;')}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
  '\n</urlset>\n';
const sitemapPath = path.join(ROOT, 'sitemap.xml');
const before = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
if (before !== xml) fs.writeFileSync(sitemapPath, xml);

console.log(`OK！ ニュース ${CC_NEWS.length} 件・メディア ${(CC_MEDIA.articles || []).length + (CC_MEDIA.tv || []).length} 件・実況 ${(CC_MEDIA.videos || []).length} 件・作品 ${CC_WORKS.length} 件・グッズ ${CC_GOODS.length} 件・ピックアップ ${CC_PICKUP.length} 件、ページ ${pages.length} 枚を確認しました。` +
  (before !== xml ? '（sitemap.xml を更新しました）' : ''));
