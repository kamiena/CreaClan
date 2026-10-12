# CreaClan

クレアクラン（CREA CLAN）公式サイトです。
ビルド不要の静的サイト（HTML / CSS / JavaScript）なので、GitHub Pages にそのまま置いて公開できます。

- 公開予定URL：https://kamiena.github.io/CreaClan/
- デザイン：白ベース × ロゴの積み木カラー（オレンジ・ピンク・水色・ミント・クリーム）。見出しはアルファベットの積み木、フッターは積み木の街並み。

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | トップ。ピックアップ（スライド）→ ニュース → 作品 → クレアクランとは → ラジオ・動画・ショップ → グッズ → クリエイター → 配信ガイドライン |
| `news.html` | ニュース一覧（カテゴリーで絞り込み・年ごと）。`news.html?id=記事のid` で記事ページになります |
| `works.html` | 作品一覧（概要・価格・プラットフォームなど）。各作品の公式サイトへ1クリックで移動できます |
| `about.html` | クレアクランとは（紹介・看板娘・活動内容・これまでのあゆみ） |
| `creators.html` | クリエイター一覧 |
| `creator-kamiena.html` | カミエナの紹介（作品・映像・掲載記事・ラジオ・相談室・質問箱・グッズ） |
| `goods.html` | グッズ一覧と BOOTH への案内 |
| `guideline.html` | ゲーム実況・動画配信ガイドライン（配信規約） |
| `404.html` | ページが見つからないとき |

ニュース・作品・グッズ・ピックアップは、`assets/data/` のデータファイルから自動で表示しています。
**ふだんの更新は、データファイルを書き換えるだけ**で、トップページ・一覧・記事ページすべてに反映されます。

## ニュースを追加する（いちばんよく使う作業）

### Claude にお願いするとき

「◯◯のニュースを追加して」と、**日付・タイトル・内容・画像（あれば）・リンク**を伝えるだけで大丈夫です。
手順は `CLAUDE.md` に書いてあるので、Claude がそのとおりに追加・確認・公開まで進めます。

### 自分で追加するとき

1. 画像があれば `assets/img/news/` に入れます（横 960px くらい、横長 16:9 がおすすめ。なくてもOK）。
2. `assets/data/news.js` を開き、`window.CC_NEWS = [` のすぐ下に、次のかたまりを貼り付けて書き換えます。

   ```js
     {
       id: "2026-11-01-sample",          // 記事のURLになる名前（半角英数字とハイフン。ほかと重ならないように）
       date: "2026-11-01",               // 日付
       category: "event",                // 下の表のどれか
       title: "◯◯に出展します！",
       image: "assets/img/news/2026-11-01-sample.webp",
       work: "garden-hunt",              // 関係する作品（なくてもOK）→ 記事の下に作品のリンクが出ます
       body: `
   本文をここに書きます。
   空行を入れると段落が分かれます。
   `,
       links: [{ label: "X の投稿を見る", url: "https://x.com/..." }],  // 記事の下のボタン（なくてもOK）
     },
   ```

3. `node tools/check-data.mjs` を実行して、書き間違いがないか確認します（`sitemap.xml` も自動で更新されます）。
4. `main` ブランチに push すると、数分でサイトに反映されます。

| category | 表示 | 色 |
| --- | --- | --- |
| `info` | お知らせ | オレンジ |
| `release` | 作品 | ピンク |
| `event` | イベント | ミント |
| `media` | メディア | 水色 |
| `goods` | グッズ | クリーム |

**本文で使える書き方**

| 書き方 | 表示 |
| --- | --- |
| 空行 | 段落を分ける（ふつうの改行はそのまま改行） |
| `## 見出し` | 小見出し |
| `- 項目` | 箇条書き |
| `**文字**` | 太字 |
| `[文字](https://...)` | リンク（外部サイトは新しいタブで開きます） |
| `![説明](assets/img/news/xxx.webp)` | 画像（1行で書く） |
| `---` | 区切り線 |

- 英語の本文がある場合は `bodyEn` に書くと、記事の下に「English」として表示されます。
- 本文を書かずに外部の記事へ直接とばしたいときは、`body` のかわりに `url: "https://..."` を書きます。
- 日付から30日以内のニュースには、自動で「NEW」マークが付きます。

## そのほかの更新

| やりたいこと | 書き換えるファイル |
| --- | --- |
| トップのスライド（ピックアップ）を変える | `assets/data/pickup.js`（画像は `assets/img/pickup/`、1600×900） |
| 作品を追加・変更する | `assets/data/works.js`（画像は `assets/img/works/<作品のid>/`） |
| グッズを追加する | `assets/data/goods.js`（画像は `assets/img/goods/`） |
| 「これまでのあゆみ」を足す | `about.html` の `HISTORY` のところ |
| クリエイターを追加する | `creators.html` のカードを増やし、`creator-kamiena.html` をコピーして紹介ページを作る |

データを書き換えたら、毎回 `node tools/check-data.mjs` で確認してください。

## デザインのルール

- 色は `assets/css/style.css` の最初（`:root`）にまとめています。ロゴから取った色です。
  - オレンジ `#f96e09`／ピンク `#fe9599`／水色 `#76d7e7`／ミント `#78c0a8`／クリーム `#fed98d`／文字のブラウン `#5f423e`
  - 文字に色を付けるときは、読みやすさのため濃いめの `--orange-text` などを使います（`--orange-deep` などは積み木の影・線用）。
- 色のセットは `c-orange` `c-pink` `c-sky` `c-mint` `c-yellow` のクラスで切り替えます（ボタン・タグ・カードが同じ色になります）。
- 見出しの積み木文字は、`<span class="sec-title__en">NEWS</span>` と書くだけで自動で積み木になります（`data-color-offset="1"` で色の順番をずらせます）。
- フォント：英字は Fredoka、日本語は M PLUS Rounded 1c（Google Fonts）。Windows で文字がガタガタにならないよう、読み込み設定を `assets/css/fonts.css` に保存しています。フォントを変えたら `python3 tools/update_fonts.py` を実行してください。

## 手元で確認する

```sh
python3 -m http.server 8000
# → ブラウザで http://localhost:8000 を開く
```

## 公開（GitHub Pages）

1. このリポジトリの **Settings → Pages** を開く
2. Source を **Deploy from a branch**、Branch を `main` / `/ (root)` にして保存
3. 数分後に https://kamiena.github.io/CreaClan/ で公開されます

**公開後にやること（旧サイトからの切り替え）**

- 公式X（@creaclan_game）のプロフィールのWebサイト欄を新しいURLに変更
- 各作品サイト（ガーデンハント・走れ！クレアちゃん・トラップス）やポートフォリオにある「クレアクラン公式HP」のリンク（`sites.google.com/view/creaclan`）を新しいURLに変更
  - 『走れ！クレアちゃん』サイトの「配信ガイドラインを見る」は `guideline.html` へ
- 旧サイト（Google サイト）のトップに、新しいサイトへの案内を載せる
- Google Search Console に `https://kamiena.github.io/CreaClan/sitemap.xml` を送信すると、検索に出やすくなります

**独自ドメインなど別のURLで公開する場合**は、次の4か所の `https://kamiena.github.io/CreaClan/` を書き換えてください。

- 各 HTML の `canonical` / `og:url` / `og:image`（と `index.html` の JSON-LD）
- `404.html` の `<base href="/CreaClan/">`（サイトの場所。独自ドメインの直下なら `/`）
- `tools/check-data.mjs` の `BASE`
- `sitemap.xml`（`node tools/check-data.mjs` で作り直されます）

## 更新するときの注意

- CSS や JS（`assets/css/style.css`・`assets/js/*.js`）を変えたら、全 HTML の `?v=20261012` の数字を新しくしてください（見に来た人のブラウザに古いファイルが残らないように）。データファイル（`assets/data/*.js`）は不要です。
- ヘッダー・フッターは全ページに同じものが入っています。メニューを変えるときは全ページをまとめて書き換えてください。
- JavaScript がオフのときは、ニュースや作品の一覧のかわりに案内文が表示されます。

## ファイル構成

```
index.html, news.html, works.html, about.html, creators.html,
creator-kamiena.html, goods.html, guideline.html, 404.html
favicon.ico / favicon.svg / apple-touch-icon.png
sitemap.xml                … tools/check-data.mjs で自動作成
assets/
  css/style.css            … デザイン（色は先頭の :root）
  css/fonts.css            … フォントの読み込み設定（tools/update_fonts.py で作成）
  js/main.js               … データからの表示、スライド、メニュー、スクロール演出など
  js/icons.js              … アイコン（X・YouTube・Steam など）
  data/news.js             … ニュース
  data/works.js            … 作品
  data/goods.js            … グッズ
  data/pickup.js           … トップのスライド
  img/                     … 画像（logo, bg, pickup, works, chara, news, goods, creators, contents）
tools/
  check-data.mjs           … データの確認と sitemap.xml の更新
  update_fonts.py          … fonts.css の作り直し
```

## 画像について

- 旧公式HP（Google サイト）、各作品の公式サイト、カミエナのポートフォリオ、公式Xの投稿の画像を、縮小・WebP 変換して使っています。
- 組み合わせて作った画像（描き足し・背景の切り抜きはしていません）
  - `assets/img/logo/logo-h-*.webp`：ロゴの積み木と文字を横に並べたもの（ヘッダー用）
  - `assets/img/works/crea-run/kv.webp`・`assets/img/pickup/crea-run.webp`：タイトル画面の床＋ロゴ＋ロケットに乗ったクレアちゃん
  - `assets/img/ogp.jpg`・`assets/img/news/2026-10-12-renewal.webp`：積み木の床＋ロゴ＋看板娘3人（SNS でシェアされたときの画像）
  - `assets/img/news/prj-rain.webp`：正方形の画像の左右を、同じ画像のぼかしで埋めたもの
- `assets/img/logo/mark.svg`・`favicon.svg` は、ロゴの積み木を図形で描き直したもの（形・色はロゴと同じ）です。

## 確認してほしいところ

- 「公式ホームページをリニューアルしました！」のニュースの日付（`2026-10-12`）は、実際に公開する日に合わせて変更してください。
- 『トラップス』のクマチの紹介文は、トラップス公式サイトの紹介文（仮）をもとにしています。
- 旧サイトの「App Store」リンクは現在ページが無くなっているため、「スマートフォン版は現在公開停止中」と表記しています。
