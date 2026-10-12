#!/usr/bin/env node
/* ==========================================================================
   データの書き間違いチェック ＋ sitemap.xml の更新

   使い方（リポジトリのいちばん上のフォルダで）:
     node tools/check-data.mjs

   - assets/data/*.js（ニュース・作品・グッズ・ピックアップ）の必須項目、日付、id の重複、
     カテゴリー名、画像ファイルがあるかどうかを確認します。
   - 各ページ（*.html）の中の画像・リンク先のファイルがあるかどうかも確認します。
   - 問題がなければ sitemap.xml を作り直します（ニュース記事のURLも含めます）。
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
function exists(p) {
  if (!p || /^(https?:)?\/\//.test(p) || /^(mailto|tel):/.test(p) || p.startsWith('#')) return true;
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
  ['id', 'title', 'titleEn', 'status', 'statusLabel', 'color', 'genre', 'catch', 'image', 'site'].forEach((k) => { if (!w[k]) err(where, `${k} がありません`); });
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

// ピックアップ
CC_PICKUP.forEach((p, i) => {
  const where = `pickup.js #${i + 1}`;
  if (!p.image || !exists(p.image)) err(where, `画像 ${p.image} が見つかりません`);
  if (!p.title) err(where, 'title がありません');
  if (!p.url) err(where, 'url がありません');
  if (p.color && !COLORS.includes(p.color)) err(where, `color は ${COLORS.join(' / ')} のどれかにしてください`);
  const m = String(p.url || '').match(/^news\.html\?id=(.+)$/);
  if (m && !ids.has(decodeURIComponent(m[1]))) err(where, `ニュース "${m[1]}" が news.js にありません`);
});

/* ---------- 各ページの画像・リンク ---------- */
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
pages.forEach((file) => {
  if (file === '404.html') return; // 404 は <base> でサイトの場所を指定しているので対象外
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  for (const m of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
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
const sorted = CC_NEWS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
const latest = sorted[0] ? sorted[0].date : undefined;
const urls = [
  { loc: BASE, lastmod: latest },
  { loc: BASE + 'news.html', lastmod: latest },
  { loc: BASE + 'works.html' },
  { loc: BASE + 'about.html' },
  { loc: BASE + 'creators.html' },
  { loc: BASE + 'creator-kamiena.html' },
  { loc: BASE + 'goods.html' },
  { loc: BASE + 'guideline.html' },
  ...sorted.filter((n) => n.body).map((n) => ({ loc: `${BASE}news.html?id=${encodeURIComponent(n.id)}`, lastmod: n.date })),
];
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url><loc>${u.loc.replace(/&/g, '&amp;')}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
  '\n</urlset>\n';
const sitemapPath = path.join(ROOT, 'sitemap.xml');
const before = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
if (before !== xml) fs.writeFileSync(sitemapPath, xml);

console.log(`OK！ ニュース ${CC_NEWS.length} 件・作品 ${CC_WORKS.length} 件・グッズ ${CC_GOODS.length} 件・ピックアップ ${CC_PICKUP.length} 件、ページ ${pages.length} 枚を確認しました。` +
  (before !== xml ? '（sitemap.xml を更新しました）' : ''));
