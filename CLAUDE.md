# クレアクラン公式サイト — Claude 向けメモ

静的サイト（GitHub Pages）。ニュース・作品・グッズ・トップのスライドは `assets/data/*.js` のデータから `assets/js/main.js` が表示する。HTML を直接いじらなくても、データを足せばトップ・一覧・記事ページに反映される。くわしくは `README.md`。

## 「ニュースを追加して」と頼まれたら

1. 日付・タイトル・内容・画像・リンクを確認する。足りない情報（特に日付）は推測せず聞く。事実として確認できないこと（売上・数字・出演者など）は書かない。
2. 画像があれば WebP にして `assets/img/news/<id>.webp` に置く。
   - 横長は 960×540（16:9）に `PIL.ImageOps.fit` で合わせる。縦長・正方形・お品書きなどは、そのまま本文の画像（`![説明](パス)`）として使い、一覧用には 16:9 の別画像を用意する（なければ `image` を省略すると、ロゴの積み木の画像が自動で出る）。
   - 画像のルール：縮小・トリミング・いただいた素材どうしの合成は OK。絵の描き足し・背景の切り抜き（透過）はしない。
3. `assets/data/news.js` の `window.CC_NEWS = [` の直後に追加する。
   - `id`：`YYYY-MM-DD-英語の短い名前`（例 `2026-11-01-c109`）
   - `category`：`info`（お知らせ）/ `release`（作品）/ `event`（イベント）/ `media`（メディア）/ `goods`（グッズ）
   - 作品に関係するなら `work` に作品の id（`garden-hunt` / `traps` / `crea-run`）
   - X の投稿などがあれば `links` にボタンとして入れる
4. 必要に応じて、ほかも更新する：
   - トップのスライド → `assets/data/pickup.js`（大きなお知らせのとき）
   - グッズ → `assets/data/goods.js`
   - 「これまでのあゆみ」→ `about.html` の HISTORY（年表。月単位）
   - 作品の情報（価格・配信日・状態など）→ `assets/data/works.js`
5. `node tools/check-data.mjs` を実行してエラーがないことを確認する（`sitemap.xml` も更新される）。
6. できればブラウザで `news.html?id=<id>` とトップを確認する（`python3 -m http.server 8000`）。
7. コミットしてプッシュする。

### 文章のトーン

- 明るく親しみやすい口調（「〜しました！」「〜です♪」）。絵文字は少しだけ（🎉✨♪ など）。
- メディア掲載：「◯◯様に『作品名』を掲載いただきました」＋本文に `▼記事` と記事タイトルのリンク。
- イベント出展：日付・場所（ホール・スペース番号）・頒布物と価格を箇条書きで。

## 本文の書き方（main.js の renderText）

空行で段落／`## 見出し`／`- 箇条書き`／`**太字**`／`[文字](URL)`／`![説明](画像)`（1行で）／`---`。HTML はそのまま文字として表示される（エスケープされる）。英語の本文は `bodyEn`。

## デザインまわりの約束

- 色は `assets/css/style.css` の `:root`。色のセットはクラス `c-orange` / `c-pink` / `c-sky` / `c-mint` / `c-yellow`（`--c` `--c-soft` `--c-light` `--c-deep` `--c-text` が切り替わる）。文字色には `--c-text`（白地でコントラスト 4.5 以上）を使い、`--c-deep` は影・線だけに使う。
- ボタンは `.btn`（置かれた場所の色を受け継ぐ）。`.btn--sm` `.btn--white` `.btn--steam` `.btn--x` `.btn--yt` `.btn--spotify`。
- 見出しは `<h2 class="sec-title"><span class="sec-title__en">NEWS</span><span class="sec-title__ja">ニュース</span></h2>`（英字が自動で積み木になる）。
- ヘッダー・フッターは全 HTML に同じものが入っている。変えるときは全ページを一括で置換する。
- CSS / JS を変えたら全 HTML の `?v=YYYYMMDD` を更新する（データファイルは不要）。
- アイコンは `assets/js/icons.js`（`<svg class="icon"><use href="#i-名前"></use></svg>`）。
