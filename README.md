# CreaClan

クレアクラン（CREA CLAN）公式サイトです。
ビルド不要の静的サイト（HTML / CSS / JavaScript）なので、GitHub Pages にそのまま置いて公開できます。

- 公開URL：https://kamiena.github.io/CreaClan/（`main` ブランチの内容が公開されます）
- デザイン：白ベース × ロゴの積み木カラー（オレンジ・ピンク・水色・ミント・クリーム）。見出しはアルファベットの積み木、フッターは積み木の街並み。

## ページ構成

**トップページ（`index.html`）1枚に、すべての情報をまとめています。** 上から順に：

| 場所（URL） | 内容 |
| --- | --- |
| （いちばん上） | ピックアップ（スライド）と、各場所へのショートカット |
| `#works` | 作品（リリース順）。概要・価格・プラットフォームなどをカードで表示し、各作品の公式サイトへ1クリックで移動 |
| `#about` | クレアクランとは（紹介文・看板娘・代表カミエナ） |
| `#news` | ニュース。カテゴリーで絞り込み・「もっと見る」。タイトルを押すと、その場で本文が開きます |
| `#news-<id>` | そのニュースを開いた状態で表示（X などで共有するときのURL） |
| `#media` | メディア掲載・実況動画（テレビ／WEB記事／実況・プレイ動画。はじめは一部だけ表示し「もっと見る」で全部） |
| `#history` | これまでのあゆみ（年表。はじめは途中まで表示し「すべて見る」で全部） |
| `#contents` | コンテンツ：公式X・クレアクラン放送局（YouTube）・クレアクランカフェ（番組）・開発のウラ側（代表カミエナ）・グッズ展開・BOOTH |
| `#goods` | グッズの一覧（コンテンツの中） |
| `#guideline` | ゲーム実況・動画配信ガイドライン（全文） |

ヘッダーのメニュー（WORKS / ABOUT / NEWS / MEDIA / CONTENTS / 配信ガイドライン）を押すと、その場所までスクロールします。

- `news.html` `works.html` `about.html` `creators.html` `creator-kamiena.html` `goods.html` `guideline.html` は、以前のページのURLから来た人を、トップページの該当する場所へ転送するためだけのページです（`news.html?id=記事のid` → `#news-記事のid`）。
- `404.html` … ページが見つからないとき

ニュース・作品・メディア掲載・グッズ・ピックアップは、`assets/data/` のデータファイルから自動で表示しています。
**ニュースには、メディア掲載は載せません**（MEDIA 欄の `assets/data/media.js` にまとめます）。
**ふだんの更新は、データファイルを書き換えるだけ**で、トップページに反映されます。

## ニュースを追加する（いちばんよく使う作業）

### Claude にお願いするとき

「◯◯のニュースを追加して」と、**日付・タイトル・内容・画像（あれば）・リンク**を伝えるだけで大丈夫です。
手順は `CLAUDE.md` に書いてあるので、Claude がそのとおりに追加・確認・公開まで進めます。

### 自分で追加するとき

1. 画像があれば `assets/img/news/` に入れます（横 960px くらい、横長 16:9 がおすすめ。なくてもOK）。
2. `assets/data/news.js` を開き、`window.CC_NEWS = [` のすぐ下に、次のかたまりを貼り付けて書き換えます。

   ```js
     {
       id: "2026-11-01-sample",          // ニュースの名前（URLの #news-<id> になる。半角英数字とハイフン。ほかと重ならないように）
       date: "2026-11-01",               // 日付
       category: "event",                // 下の表のどれか
       title: "◯◯に出展します！",
       image: "assets/img/news/2026-11-01-sample.webp",
       work: "garden-hunt",              // 関係する作品（なくてもOK）→ 本文の下に作品のリンクが出ます
       body: `
   本文をここに書きます。
   空行を入れると段落が分かれます。
   `,
       links: [{ label: "X の投稿を見る", url: "https://x.com/..." }],  // 本文の下のボタン（なくてもOK）
     },
   ```

3. `node tools/check-data.mjs` を実行して、書き間違いがないか確認します（`sitemap.xml` も自動で更新されます）。
4. `main` ブランチに反映（push、または作業ブランチのプルリクエストをマージ）すると、数分でサイトに反映されます。

| category | 表示 | 色 |
| --- | --- | --- |
| `info` | お知らせ | オレンジ |
| `release` | 作品 | ピンク |
| `event` | イベント | ミント |
| `goods` | グッズ | クリーム |

**本文で使える書き方**

| 書き方 | 表示 |
| --- | --- |
| 空行 | 段落を分ける（ふつうの改行はそのまま改行） |
| `## 見出し` | 小見出し |
| `- 項目` | 箇条書き |
| `**文字**` | 太字 |
| `[文字](https://...)` | リンク（外部サイトは新しいタブで開きます。ページ内の場所は `#guideline` など） |
| `![説明](assets/img/news/xxx.webp)` | 画像（1行で書く） |
| `---` | 区切り線 |

- 英語の本文がある場合は `bodyEn` に書くと、本文の下に「English」として表示されます（押すと開きます）。
- 本文を書かずに、押したら外部の記事を開くようにしたいときは、`body` のかわりに `url: "https://..."` を書きます。
- 日付から30日以内のニュースには、自動で「NEW」マークが付きます。

## そのほかの更新

| やりたいこと | 書き換えるファイル |
| --- | --- |
| トップのスライド（ピックアップ）を変える | `assets/data/pickup.js`（画像は `assets/img/pickup/`、1600×900。リンク先はURLか `#works`・`#news-ニュースのid` など） |
| 作品を追加・変更する | `assets/data/works.js`（画像は `assets/img/works/<作品のid>/`）。まだ発表前の作品は `secret: true` で「？？？」のカードになります |
| グッズを追加する | `assets/data/goods.js`（画像は `assets/img/goods/`。`link` は BOOTH で買えるものだけ） |
| メディア掲載・実況動画を足す | `assets/data/media.js`（WEB記事は `articles`、テレビは `tv`、実況動画は `videos` に YouTube の動画ID） |
| 「これまでのあゆみ」を足す | `index.html` の `HISTORY`（`<section … id="history">`）のところ |
| 紹介文・看板娘・代表の紹介を変える | `index.html` の `ABOUT`（`<section … id="about">`）のところ |
| コンテンツ（SNS・番組・グッズ・ショップ）の案内を変える | `index.html` の `CONTENTS`（`<section … id="contents">`）のところ |
| 配信ガイドラインを変える | `index.html` の `GUIDELINE`（`<section … id="guideline">`）のところ |

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

GitHub Pages で公開しています（**Settings → Pages**：Deploy from a branch、`main` / `/ (root)`）。
`main` ブランチに変更が入ると、数分で https://kamiena.github.io/CreaClan/ に反映されます。
Claude の作業ブランチ（`claude/…`）に入れただけでは公開されないので、`main` に反映するのを忘れずに。

**公開後にやること（旧サイトからの切り替え）**

- 公式X（@creaclan_game）のプロフィールのWebサイト欄を新しいURLに変更
- 各作品サイト（ガーデンハント・走れ！クレアちゃん・トラップス）やポートフォリオにある「クレアクラン公式HP」のリンク（`sites.google.com/view/creaclan`）を新しいURLに変更
  - 『走れ！クレアちゃん』サイトの「配信ガイドラインを見る」は `https://kamiena.github.io/CreaClan/#guideline` へ
- 旧サイト（Google サイト）のトップに、新しいサイトへの案内を載せる
- Google Search Console に `https://kamiena.github.io/CreaClan/sitemap.xml` を送信すると、検索に出やすくなります

**独自ドメインなど別のURLで公開する場合**は、次の4か所の `https://kamiena.github.io/CreaClan/` を書き換えてください。

- `index.html` の `canonical` / `og:url` / `og:image` / JSON-LD（と転送用ページの `canonical`）
- `404.html` の `<base href="/CreaClan/">`（サイトの場所。独自ドメインの直下なら `/`）
- `tools/check-data.mjs` の `BASE`
- `sitemap.xml`（`node tools/check-data.mjs` で作り直されます）

## 更新するときの注意

- CSS や JS（`assets/css/style.css`・`assets/js/*.js`）を変えたら、全 HTML の `?v=20261110c` の数字を新しくしてください（見に来た人のブラウザに古いファイルが残らないように）。データファイル（`assets/data/*.js`）は不要です。
- ヘッダー・フッターは `index.html` と `404.html` に同じものが入っています（404 では `./#news` のように、トップページの場所を指しています）。メニューを変えるときは両方を書き換えてください。
- JavaScript がオフのときは、ニュースや作品の一覧のかわりに案内文が表示されます。

## ファイル構成

```
index.html                 … サイト本体（1ページ）
404.html                   … ページが見つからないとき
news.html, works.html, about.html, creators.html,
creator-kamiena.html, goods.html, guideline.html … 以前のURLからトップページへの転送用
favicon.ico / favicon.svg / apple-touch-icon.png
sitemap.xml                … tools/check-data.mjs で自動作成
assets/
  css/style.css            … デザイン（色は先頭の :root）
  css/fonts.css            … フォントの読み込み設定（tools/update_fonts.py で作成）
  js/main.js               … データからの表示、ニュースの開閉、スライド、メニュー、スクロール演出など
  js/icons.js              … アイコン（X・YouTube・Steam など）
  data/news.js             … ニュース
  data/works.js            … 作品
  data/goods.js            … グッズ
  data/pickup.js           … トップのスライド
  data/media.js            … メディア掲載・実況動画
  img/                     … 画像（logo, bg, pickup, works, chara, news, goods, creators, contents）
                             works/new/ は「？？？」の新作
tools/
  check-data.mjs           … データの確認と sitemap.xml の更新
  update_fonts.py          … fonts.css の作り直し
```

## 画像について

- 旧公式HP（Google サイト）、各作品の公式サイト、カミエナのポートフォリオ、公式Xの投稿の画像を、縮小・WebP 変換して使っています。
- 組み合わせて作った画像（描き足し・背景の切り抜きはしていません）
  - `assets/img/logo/logo-h-120.webp`・`logo-h-240.webp`：いただいたロゴの積み木と、横書きの文字ロゴ（小さめ・薄いドロップシャドウ）を横に並べたもの（ヘッダー用）
  - `assets/img/works/new/kv.webp`・`assets/img/pickup/new.webp`：積み木の床＋はてなマークの積み木（開発中の新作用）
  - `assets/img/contents/x-crea.webp`・`kamiena.webp`：正方形のイラストをそのまま中央に置き、左右を同じ画像のぼかしで広げたもの（16:9 の枠に見切れずに収めるため）
  - `assets/img/ogp.jpg`・`assets/img/news/2026-10-14-renewal.webp`：積み木の床＋ロゴ＋看板娘3人（SNS でシェアされたときの画像）
  - `assets/img/news/prj-rain.webp`：正方形の画像の左右を、同じ画像のぼかしで埋めたもの
- `assets/img/logo/mark.svg`・`favicon.svg` は、ロゴの積み木を図形で描き直したもの（形・色はロゴと同じ）です。

## 確認してほしいところ

- 『トラップス』のクマチの紹介文は、トラップス公式サイトの紹介文（仮）をもとにしています。
- 「36,000DL突破」「クレアクラン放送局 登録者1,000人突破」は、ポートフォリオ・YouTube の情報をもとにしています。数字が変わったら `assets/data/works.js`（badge）・`assets/data/pickup.js`・`index.html`（CONTENTS のバッジ）を更新してください。
- 実況動画は、カミエナの YouTube の再生リスト「【実況まとめ】ガーデンハント／走れ！クレアちゃん」から作っています。
- 旧サイトの「App Store」リンクは現在ページが無くなっているため、「スマートフォン版は現在公開停止中」と表記しています。
