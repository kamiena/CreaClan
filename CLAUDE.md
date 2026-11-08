# クレアクラン公式サイト — Claude 向けメモ

静的サイト（GitHub Pages）。**トップページ `index.html` 1枚**に全部をまとめた構成（上から 作品 `#works` → クレアクランとは `#about` → ニュース `#news` → メディア `#media` → あゆみ `#history` → コンテンツ `#contents`（公式X・クレアクラン放送局・クレアクランカフェ・開発のウラ側・グッズ展開・BOOTH。グッズ一覧 `#goods` もこの中）→ 配信ガイドライン `#guideline`。ヘッダーのメニューはそこへスクロール）。ページを増やさない（入れ子にしない）。作品のくわしい情報は各作品の公式サイト（`works.js` の `site`）に任せる。
ニュース・作品・メディア掲載・グッズ・トップのスライドは `assets/data/*.js` のデータから `assets/js/main.js` が表示する。HTML を直接いじらなくても、データを足せばトップページに反映される。ニュースはその場で開閉し、`#news-<id>` で直接開ける。`news.html` などは以前のURLからの転送用。くわしくは `README.md`。

## ニュースに載せるもの・載せないもの

- 載せる：イベント出展、新しいグッズ、新作・作品の情報、サークルのお知らせ（ファンの人が「次は何がある？」を知るためのもの）
- 載せない：メディア掲載・テレビ出演・実況動画 → `assets/data/media.js`（トップの MEDIA 欄。WEB記事は `articles` の先頭に足す、実況動画は `videos` に YouTube の動画IDを足す）
- 代表カミエナ個人の活動（CÔGEIMU など、クレアクランの作品ではないもの）は載せない

## 「ニュースを追加して」と頼まれたら

1. 日付・タイトル・内容・画像・リンクを確認する。足りない情報（特に日付）は推測せず聞く。事実として確認できないこと（売上・数字・出演者など）は書かない。
2. 画像があれば WebP にして `assets/img/news/<id>.webp` に置く。
   - 横長は 960×540（16:9）に `PIL.ImageOps.fit` で合わせる。縦長・正方形・お品書きなどは、そのまま本文の画像（`![説明](パス)`）として使い、一覧用には 16:9 の別画像を用意する（なければ `image` を省略すると、ロゴの積み木の画像が自動で出る）。
   - 画像のルール：縮小・トリミング・いただいた素材どうしの合成は OK。絵の描き足し・背景の切り抜き（透過）はしない。
3. `assets/data/news.js` の `window.CC_NEWS = [` の直後に追加する。
   - `id`：`YYYY-MM-DD-英語の短い名前`（例 `2026-11-01-c109`）
   - `category`：`info`（お知らせ）/ `release`（作品）/ `event`（イベント）/ `goods`（グッズ）。メディア掲載はニュースにせず `media.js` へ
   - 作品に関係するなら `work` に作品の id（`garden-hunt` / `traps` / `crea-run`）。発表前の新作（`new`、`secret: true`）のことは、本人が公開した範囲しか書かない
   - X の投稿などがあれば `links` にボタンとして入れる
4. 必要に応じて、ほかも更新する：
   - トップのスライド → `assets/data/pickup.js`（大きなお知らせのとき）
   - グッズ → `assets/data/goods.js`（`link` は BOOTH で買えるものだけ。イベント販売のものは付けない）
   - 「これまでのあゆみ」→ `index.html` の HISTORY（`id="history"`。年表。月単位）
   - 数字（DL数・登録者数など）→ `works.js` の `badge`、`pickup.js`、`index.html` の CONTENTS のバッジ
   - 作品の情報（価格・配信日・状態など）→ `assets/data/works.js`（並び順はリリース順。新作は下に足す）
5. `node tools/check-data.mjs` を実行してエラーがないことを確認する（`sitemap.xml` も更新される）。
6. できればブラウザで `index.html#news-<id>`（そのニュースが開く）とトップを確認する（`python3 -m http.server 8000`）。
7. コミットしてプッシュする。公開されるのは `main` ブランチ（GitHub Pages：`main` / `(root)`）。作業ブランチにプッシュしただけでは公開されないので、公開まで頼まれたら `main` にも反映し、数分後に https://kamiena.github.io/CreaClan/ で表示を確認する。

### 文章のトーン

- 明るく親しみやすい口調（「〜しました！」「〜です♪」）。絵文字は少しだけ（🎉✨♪ など）。
- メディア掲載：「◯◯様に『作品名』を掲載いただきました」＋本文に `▼記事` と記事タイトルのリンク。
- イベント出展：日付・場所（ホール・スペース番号）・頒布物と価格を箇条書きで。

## 本文の書き方（main.js の renderText）

空行で段落／`## 見出し`／`- 箇条書き`／`**太字**`／`[文字](URL)`（ページ内は `#guideline` など）／`![説明](画像)`（1行で）／`---`。HTML はそのまま文字として表示される（エスケープされる）。英語の本文は `bodyEn`。

## デザインまわりの約束

- 色は `assets/css/style.css` の `:root`。色のセットはクラス `c-orange` / `c-pink` / `c-sky` / `c-mint` / `c-yellow`（`--c` `--c-soft` `--c-light` `--c-deep` `--c-text` が切り替わる）。文字色には `--c-text`（白地でコントラスト 4.5 以上）を使い、`--c-deep` は影・線だけに使う。
- ボタンは `.btn`（置かれた場所の色を受け継ぐ）。`.btn--sm` `.btn--white` `.btn--steam` `.btn--x` `.btn--yt` `.btn--spotify`。
- 見出しは `<h2 class="sec-title"><span class="sec-title__en">NEWS</span><span class="sec-title__ja">ニュース</span></h2>`（英字が自動で積み木になる）。
- ヘッダー・フッターは `index.html` と `404.html` に同じものが入っている（404 は `./#news` のように書く）。変えるときは両方を置換する。
- クリエイター紹介は載せない（代表カミエナを ABOUT で軽く紹介するだけ）。
- 画像は枠で見切れないようにする（16:9 の枠に正方形・縦長を入れるときは、左右を同じ画像のぼかしで広げて合成する）。
- 看板娘のイラストは2頭身（`assets/img/chara/crea.webp` `meina.webp` `kumachi.webp`）でそろえる。トップの左右に3人、ABOUT にカード。作品カードにはキャラを置かない。
- ヘッダーの横ロゴ `logo-h-120.webp`（2倍用 `logo-h-240.webp`）は、ロゴの積み木＋横書きの文字ロゴ（文字は小さめ・薄いドロップシャドウ）。
- CSS / JS を変えたら `index.html` と `404.html` の `?v=YYYYMMDD` を更新する（データファイルは不要）。
- アイコンは `assets/js/icons.js`（`<svg class="icon"><use href="#i-名前"></use></svg>`）。
