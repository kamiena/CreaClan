/* ==========================================================================
   クレアクラン ニュース

   ▼ ニュースの追加のしかた
     下の CC_NEWS の「[」のすぐ下に、{ … }, のかたまりを1つ足すだけです。
     トップページ・ニュース一覧・記事ページに自動で反映されます（並び順は日付の新しい順）。

     {
       id: "2026-10-20-sample",        // 記事のURLになる名前（半角英数字とハイフン。ほかと重ならないように）
       date: "2026-10-20",             // 日付（YYYY-MM-DD）
       category: "info",               // info / release / event / media / goods（下の CC_NEWS_CATEGORIES）
       title: "タイトル",
       image: "assets/img/news/2026-10-20-sample.webp", // 画像（16:9がおすすめ。なくてもOK）
       work: "garden-hunt",            // 関係する作品（works.js の id。なくてもOK）
       summary: "一覧に出す短い説明",   // なければ本文の最初から自動で作ります
       body: `
本文をここに書きます。空行で段落が分かれます。

## 小見出し
- 箇条書き
**太字** や [リンクの文字](https://example.com) も使えます。
![画像の説明](assets/img/news/xxx.webp)
`,
       bodyEn: `English text (optional)`,      // 英語の本文（なくてもOK）
       links: [ { label: "ボタンの文字", url: "https://..." } ], // 記事の下に出すボタン（なくてもOK）
       // url: "https://...",          // ← 本文なしで外部ページに直接とばしたいときだけ
     },

   ▼ 画像は assets/img/news/ に入れてください（横幅 960px 程度の WebP / JPG / PNG）。
   ▼ 追加したら `node tools/check-data.mjs` で書き間違いがないか確認できます。
   ========================================================================== */

window.CC_NEWS_CATEGORIES = {
  info:    { label: "お知らせ", color: "orange" },
  release: { label: "作品",     color: "pink" },
  event:   { label: "イベント", color: "mint" },
  media:   { label: "メディア", color: "sky" },
  goods:   { label: "グッズ",   color: "yellow" },
};

window.CC_NEWS = [
  {
    id: "2026-10-12-renewal",
    date: "2026-10-12",
    category: "info",
    title: "公式ホームページをリニューアルしました！",
    image: "assets/img/news/2026-10-12-renewal.webp",
    imageAlt: "クレアクランのロゴと、看板娘のクレア・メイナ・クマチ",
    body: `
クレアクラン公式ホームページをリニューアルしました！🎉

トップページから最新のニュースや作品をすぐに見られるようになり、各作品の公式サイトへもワンクリックで移動できるようになりました。

また、[ゲーム実況・動画配信ガイドライン](guideline.html)や[グッズ](goods.html)、[クリエイター](creators.html)のページも見やすくまとめています。

これからも、新作の開発情報やイベント出展、グッズなどの最新情報をどんどんお届けしていきます♪
引き続き、クレアクランをよろしくお願いいたします！
`,
  },

  {
    id: "2026-09-20-meina-plush",
    date: "2026-09-20",
    category: "goods",
    title: "『ガーデンハント』メイナのぬいぐるみが完成しました！",
    image: "assets/img/news/2026-09-20-meina-plush.webp",
    imageAlt: "メイナのぬいぐるみ3体",
    work: "garden-hunt",
    body: `
『ガーデンハント』の主人公「メイナ」のぬいぐるみが、ついに完成しました！🎉

ゲームのキャラクターが、こうやって実物になるのはとってもうれしいです……！

![メイナのぬいぐるみ](assets/img/news/2026-09-20-meina-plush-2.webp)

今後、イベントなどで販売予定です。続報をお楽しみに♪
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2101627937061556581" }],
  },

  {
    id: "2026-08-15-c108",
    date: "2026-08-15",
    category: "event",
    title: "コミックマーケット108に出展します！（8/16 東7 T-48ab）",
    image: "assets/img/news/2026-08-15-c108.webp",
    imageAlt: "メイナ・クレア・クマチのちびキャラアクリルスタンド",
    body: `
コミックマーケット108に、サークル「クレアクラン」として出展します！

**8月16日（日）2日目　東7 T-48ab**

新作グッズとして、クレアクランの看板娘「メイナ」「クレア」「クマチ」のちびキャラアクリルスタンドが登場します🎉

## 頒布物
- 『ガーデンハント』パッケージ版：500円（Windowsのみ対応。パッケージ版はイベントのみの限定販売です）
- ちびキャラ アクスタ（New!）：各1,000円
- ひょっこり♪キャラ缶バッチ：各300円

![C108 お品書き](assets/img/news/2026-08-15-c108-menu.webp)

新しいアクスタが登場！ ぜひ実物を見に来てみてください♪
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2088432357695271340" }],
  },

  {
    id: "2026-07-10-guideline",
    date: "2026-07-10",
    category: "info",
    title: "ゲーム実況・動画配信ガイドラインを公開しました",
    body: `
クレアクランのゲームの、実況・動画配信に関するガイドラインを公開しました！

私たちのゲームは、個人・法人問わず、どなたでも自由に実況・動画配信を行っていただけます。事前の連絡や確認も一切不要です。
動画配信プラットフォームの公式機能を利用した収益化も大歓迎です♪

くわしくは[ゲーム実況・動画配信ガイドライン](guideline.html)をご覧ください。
`,
    links: [{ label: "ガイドラインを見る", url: "guideline.html" }],
  },

  {
    id: "2026-07-07-kaiwai-hall-10",
    date: "2026-07-07",
    category: "media",
    title: "BSフジ『界隈ほーる』#10「インディーゲーム界隈」第2弾に、代表のカミエナが出演しました",
    body: `
BSフジ『界隈ほーる 〜偏愛の穴に落ちてみた〜』#10「インディーゲーム界隈」第2弾に、代表のカミエナが出演しました！

BitSummit を取材した、インディーゲーム特集の第2弾です。番組は、BSフジ公式の YouTube チャンネルでもご覧いただけます。
`,
    links: [{ label: "番組を見る（YouTube）", url: "https://www.youtube.com/watch?v=aq1FHu8H-Mg" }],
  },

  {
    id: "2026-05-05-kaiwai-hall-4",
    date: "2026-05-05",
    category: "media",
    title: "BSフジ『界隈ほーる』で『ガーデンハント』が紹介されました！",
    image: "assets/img/news/2026-05-05-kaiwai-hall.webp",
    imageAlt: "BSフジ『界隈ほーる』で、近藤春菜さんが『ガーデンハント』をプレイ",
    work: "garden-hunt",
    body: `
BSフジ『界隈ほーる 〜偏愛の穴に落ちてみた〜』#4「インディーゲーム界隈」に、代表のカミエナが出演しました！

番組では渋谷サクラステージの「404 Not Found」を訪問し、インディーゲームクリエイターとしてインタビューを受けました。
『ガーデンハント』も紹介していただき、スタジオでは近藤春菜さんに実際にプレイしていただきました！
`,
    links: [{ label: "番組を見る（YouTube）", url: "https://www.youtube.com/watch?v=DnmBOhPELe0&t=199s" }],
  },

  {
    id: "2026-02-13-gamemakers",
    date: "2026-02-13",
    category: "media",
    title: "ゲームメーカーズ様に『ガーデンハント』を掲載いただきました",
    image: "assets/img/works/garden-hunt/ss-5.webp",
    work: "garden-hunt",
    body: `
「SHIBUYA GAMES WEEK 2026」の現地レポート記事で、『ガーデンハント』を取り上げていただきました！

▼記事
[初開催の「SHIBUYA GAMES WEEK 2026」現地レポート！ゲームを楽しむ、そして“ゲームを通じて渋谷の街を知る”都市型ゲームフェス](https://gamemakers.jp/article/2026_02_13_131159/)
`,
  },

  {
    id: "2026-02-06-4gamer",
    date: "2026-02-06",
    category: "media",
    title: "4Gamer.net様に『ガーデンハント』を掲載いただきました",
    image: "assets/img/works/garden-hunt/ss-6.webp",
    work: "garden-hunt",
    body: `
都市型ゲームフェス「SHIBUYA GAMES WEEK」で遊べるインディーゲームのまとめ記事で、『ガーデンハント』を紹介していただきました！

▼記事
[渋谷に行くなら，ふらりとゲームも楽しもう。都市型ゲームフェス「SHIBUYA GAMES WEEK」で遊べるインディーゲームまとめ](https://www.4gamer.net/games/991/G999110/20260206031/)
`,
  },

  {
    id: "2026-01-20-mudauchi",
    date: "2026-01-20",
    category: "media",
    title: "ムダウチゲームズ様に『ガーデンハント』を掲載いただきました",
    image: "assets/img/works/garden-hunt/ss-2.webp",
    work: "garden-hunt",
    body: `
配信開始にあわせて、『ガーデンハント』を紹介していただきました！

▼記事
[『ガーデンハント』“あの角を曲がったら…？”のドキドキ感がやみつきになる！ヌメヌメ×おにごっこアクションが1月16日に配信開始。](https://mudauchi.info/428906)
`,
  },

  {
    id: "2026-01-17-dengeki",
    date: "2026-01-17",
    category: "media",
    title: "電撃オンライン様に『ガーデンハント』を掲載いただきました",
    image: "assets/img/works/garden-hunt/ss-3.webp",
    work: "garden-hunt",
    body: `
配信開始にあわせて、『ガーデンハント』を紹介していただきました！

▼記事
[ドットイート風ヌメヌメ×おにごっこアクション『ガーデンハント』が配信。ヌメヌメシステムが戦略要素をアツくする](https://dengekionline.com/article/202601/63360)
`,
  },

  {
    id: "2026-01-16-gamewith",
    date: "2026-01-16",
    category: "media",
    title: "GameWith様に『ガーデンハント』を掲載いただきました",
    image: "assets/img/works/garden-hunt/ss-1.webp",
    work: "garden-hunt",
    body: `
配信開始にあわせて、『ガーデンハント』を紹介していただきました！

▼記事
[『ガーデンハント』1月16日から発売開始！スライムを集めるドットイート風のヌメヌメおにごっこゲーム](https://gamewith.jp/gamedb/13858/articles/52181)
`,
  },

  {
    id: "2026-01-16-garden-hunt-release",
    date: "2026-01-16",
    category: "release",
    title: "『ガーデンハント』Steamにて配信開始！",
    image: "assets/img/pickup/garden-hunt.webp",
    imageAlt: "『ガーデンハント』キービジュアル",
    work: "garden-hunt",
    body: `
ドットイート風ヌメヌメ×おにごっこアクション『ガーデンハント』が、Steamにて配信開始しました！🎉

ナメツムリの少女「メイナ」を操作して、生垣や壁に囲まれた庭園迷路を駆け回り、エネミーから逃げつつスライムを集めるアクションゲームです。
自分や敵、スライムが通ったあとに残る「ヌメリ道」が攻略のカギ！ 曲がり角には気を付けて……！

## 製品情報
- タイトル：ガーデンハント（Garden Hunt）
- ジャンル：ドットイート風 ヌメヌメ×おにごっこアクション
- プラットフォーム：Steam（PC）
- 配信日：2026年1月16日 15:00（日本時間）
- 価格：500円（税込）
- 対応言語：日本語（フル音声＋字幕）、英語・フランス語・イタリア語・ドイツ語・スペイン語・中国語（簡体字／繁体字）・韓国語（字幕）
`,
    links: [
      { label: "『ガーデンハント』公式サイト", url: "https://kamiena.github.io/GardenHunt/" },
      { label: "Steamストアページ", url: "https://store.steampowered.com/app/3820430/" },
    ],
  },

  {
    id: "2025-12-06-automaton-west",
    date: "2025-12-06",
    category: "media",
    title: "AUTOMATON WEST様（英語）に『ガーデンハント』を掲載いただきました",
    image: "assets/img/works/garden-hunt/ss-7.webp",
    work: "garden-hunt",
    body: `
海外向けゲームメディア AUTOMATON WEST 様の、屋外が舞台の日本のインディーゲーム5本を紹介する記事で、『ガーデンハント』を取り上げていただきました！（英語の記事です）

▼記事
[Garden slug-girl action, masochistic platforming and summer vacation nostalgia: 5 outdoorsy Japanese indie games](https://automaton-media.com/en/news/garden-slug-girl-action-masochistic-platforming-and-summer-vacation-nostalgia-5-outdoorsy-japanese-indie-games/)
`,
  },

  {
    id: "2025-09-08-meina-figure",
    date: "2025-09-08",
    category: "goods",
    title: "メイナのミニフィギュアを制作していただきました！",
    image: "assets/img/goods/figure.webp",
    imageAlt: "メイナのミニフィギュア",
    work: "garden-hunt",
    body: `
Trend3D様に、『ガーデンハント』の主人公「メイナ」のフィギュアを制作していただきました！🎉

3Dプリンターで、ゲーム内の kawaii さを、とても忠実かつなめらかな曲線で再現していただきました😊
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1964983203388940475" }],
  },

  {
    id: "2025-07-02-garden-hunt-steam-page",
    date: "2025-07-02",
    category: "release",
    title: "『ガーデンハント』のSteamストアページを公開しました！",
    image: "assets/img/works/garden-hunt/ss-8.webp",
    work: "garden-hunt",
    body: `
開発中の新作『ガーデンハント』の、Steamストアページを公開しました！

ストアページの公開にあわせて、メディア各社様にも記事を掲載していただきました。

- 4Gamer.net：[ナメツムリの少女を操作して，スライムを捕獲していく鬼ごっこアクション「ガーデンハント」，Steamストアページを公開。リリース時期は年内](https://www.4gamer.net/games/925/G092584/20250702004/)
- Gamer：[ナメツムリの少女がスライムを追うヌメヌメおにごっこアクション「ガーデンハント」のSteamストアページが公開！誰かが通ると地面に残る「ヌメリ道」を活かしてステージクリアを目指そう](https://www.gamer.ne.jp/news/202507020067/)
`,
    links: [{ label: "Steamストアページ", url: "https://store.steampowered.com/app/3820430/" }],
  },

  {
    id: "2025-06-14-crearun-30000dl",
    date: "2025-06-14",
    category: "release",
    title: "『走れ！クレアちゃん』30,000ダウンロード突破！",
    image: "assets/img/news/2025-06-14-crearun-30000dl.webp",
    imageAlt: "祝！30,000DL『走れ！クレアちゃん』",
    work: "crea-run",
    body: `
『走れ！クレアちゃん』が、30,000ダウンロードを突破しました！🎉

プレイしてくださった皆様、本当にありがとうございます✨
これからも kawaii インディーゲームを届けていきます！ よろしくお願いいたします♪
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/creaclan_game/status/1933841850227663332" }],
  },

  {
    id: "2025-05-16-indie-freaks",
    date: "2025-05-16",
    category: "media",
    title: "Indie Freaks様に開発中の新作ゲーム「ガーデン ハント」を特集して頂けました！",
    image: "assets/img/news/prj-rain.webp",
    imageAlt: "『PRJ rain（仮）』（現『ガーデンハント』）",
    work: "garden-hunt",
    body: `
東京ゲームダンジョン8に出展した、開発中の新作『PRJ rain（仮）』（現『ガーデンハント』）のブースレポートを掲載していただきました！

▼記事
[ヌメヌメっと滑りながら庭園迷路を駆け回るアクションゲーム『PRJ rain（仮）』ブースレポート【東京ゲームダンジョン8】](https://www.indie-freaks.com/2025/05/tgd8-prj-rain)
`,
  },

  {
    id: "2025-05-09-realsound",
    date: "2025-05-09",
    category: "media",
    title: "リアルサウンド テック様に東京ゲームダンジョン8の出展ゲームを取り上げて頂きました",
    image: "assets/img/news/prj-rain.webp",
    imageAlt: "『PRJ rain（仮）』（現『ガーデンハント』）",
    work: "garden-hunt",
    body: `
「東京ゲームダンジョン8」の会場レポートで、出展した『PRJ rain（仮）』（現『ガーデンハント』）を取り上げていただきました！

▼記事
[レトロでかわいいタワーディフェンスから、子どもの大好きな“アレ”題材のアクションまで　「東京ゲームダンジョン8」会場レポート](https://realsound.jp/tech/2025/05/post-2013950.html)
`,
  },

  {
    id: "2025-02-09-radio",
    date: "2025-02-09",
    category: "info",
    title: "ラジオ「クレアクランカフェ」オープン！",
    image: "assets/img/news/2025-02-09-radio.webp",
    imageAlt: "ラジオ「クレアクランカフェ」第0回",
    body: `
## ラジオ「クレアクランカフェ」とは？
ここはクリエイターが集まる喫茶店…
喫茶店で作業していると、
ふと、隣席から興味深いモノづくり談義が聞こえてくるーー。
クリエイター達の雑談を聞き流しながら、
ゆったり作業する……
そんな、素敵な時間を過ごしませんか？

このラジオでは様々なジャンルのクリエイターを
ゲストとしてお呼びして、こだわりや考え方など
質問形式で深ぼっていくトークラジオです。

## 第０回公開！
クレアクランカフェ プレオープン！ということで
ラジオの紹介をしつつ代表のカミエナをゲストに見立てて
- なぜゲームを作り始めたのか？
- 創作視点で最近面白いと思ったコンテンツは？

などなど、色々モノづくり談義を繰り広げております♪
ぜひ、作業しながら、まったり聞いてみてください！

## 配信プラットフォーム
▼Spotify Podcast
[https://open.spotify.com/show/1z4FqQ5kkyGWxAdeQIVdQV](https://open.spotify.com/show/1z4FqQ5kkyGWxAdeQIVdQV)
▼YouTube
[https://www.youtube.com/watch?v=sTsHSJ9JMLY](https://www.youtube.com/watch?v=sTsHSJ9JMLY)
`,
    bodyEn: `
## What is the radio show "CréaClan Café"?
This is a café where creators gather...
When you're working at a café,
you might suddenly overhear an interesting conversation about creative work from the next table.
Listening to casual chats between creators
while leisurely working...
Wouldn't that be a wonderful way to spend your time?

In this radio show, we invite creators from various fields as guests
and delve into their passions and perspectives
through a Q&A-style talk session.

## Episode 0 is out!
To celebrate the pre-opening of CréaClan Café,
we introduce the radio show and welcome its representative, Kamiena, as our first guest!
Topics include:
- Why did they start making games?
- What recent content has been interesting from a creator's perspective?

...and much more about the world of creativity!
Feel free to listen while working and enjoy the relaxed atmosphere!

## Streaming Platforms
▼ Spotify Podcast
[https://open.spotify.com/show/1z4FqQ5kkyGWxAdeQIVdQV](https://open.spotify.com/show/1z4FqQ5kkyGWxAdeQIVdQV)
▼ YouTube
[https://www.youtube.com/watch?v=sTsHSJ9JMLY](https://www.youtube.com/watch?v=sTsHSJ9JMLY)
`,
    links: [
      { label: "YouTube で聴く", url: "https://www.youtube.com/watch?v=sTsHSJ9JMLY" },
      { label: "Spotify で聴く", url: "https://open.spotify.com/show/1z4FqQ5kkyGWxAdeQIVdQV" },
    ],
  },

  {
    id: "2025-01-03-c105",
    date: "2025-01-03",
    category: "event",
    title: "冬コミC105参加しました！",
    image: "assets/img/news/2025-01-03-c105.webp",
    imageAlt: "冬コミC105参加しました！",
    work: "garden-hunt",
    body: `
## C105冬コミお疲れさまでした！ 新刊を手に取ってくださった皆様、ありがとうございました！
12月29日～30日に開催されたC105冬のコミックマーケットにサークル「クレアクラン」として参加してきました。今回は前回よりも参加者が多いな……と感じていたのですが、なんと累計30万人も参加していたそうで、前回比+4万人という規模だったみたいです。いや～本当にびっくりですね！

## 2日目（30日）に出展しました！
クレアクランは、2日目の12月30日にブースを出展しておりました。今回の目玉は、現在開発中の「PRJ rain（仮称）」のα版を新刊として頒布したことです。ブースに足を運んでくださった皆様、本当にありがとうございます！

想定以上に多くの方が来てくださり、新刊が早い段階で完売してしまいました……。せっかくお越しいただいたにも関わらず、お渡しできなかった皆様には大変申し訳ございませんでした。次回は十分な数をご用意できるようにいたします！

## オンラインでのダウンロード販売も始まりました
コミケで頒布したα版については、「ダウンロード販売はありませんか？」という声も多くいただきましたので、さっそくBOOTHにてオンライン販売を開始しております！

▼BOOTH販売ページはこちら
[https://creaclan.booth.pm/items/6448523](https://creaclan.booth.pm/items/6448523)
当日手に取れなかった方は、ぜひこちらからチェックしていただけると嬉しいです。

## 次回の夏コミに向けて
もちろん、次回の夏コミにも応募予定です！ そして夏コミ開催のタイミングでは、いよいよ「PRJ rain」の完成版を販売できるように進めています。α版からどのように進化するのか、是非楽しみにお待ちください。

冬コミは外の寒さに負けないほど熱気に満ちた会場でしたねぇ～！ 皆さん本当にお疲れさまでした。改めて、当日クレアクランのブースに遊びに来てくださった皆様、そして新刊や作品に興味を持ってくださった全ての方に感謝を申し上げます。

これからもゲーム制作に励んでまいりますので、引き続き応援よろしくお願いいたします！
`,
    bodyEn: `
## Thank you so much for stopping by our booth at Winter Comiket (C105)! And a big thanks to everyone who picked up our new release!
We, Creaclan, took part in Comic Market C105 on December 29–30. We had a feeling the turnout was bigger than before, and it turns out there were around 300,000 attendees in total—about 40,000 more than the previous event. That number really caught us by surprise!

## We exhibited on Day 2 (December 30)!
Creaclan had its booth on Day 2, December 30. The main highlight was distributing the alpha version of our currently in-development game, “PRJ rain (working title)”, as our new release. A huge thank you to everyone who stopped by!

We had far more visitors than anticipated, and ended up selling out earlier than expected… To everyone who came by but couldn’t get a copy, we’re truly sorry. We’ll make sure to prepare enough copies next time!

## Online download sales have started
Many of you asked, “Is there a download version?” of the alpha distributed at Comiket. In response, we’ve started selling it online through BOOTH!

▼ Check out our BOOTH page here
[https://creaclan.booth.pm/items/6448523](https://creaclan.booth.pm/items/6448523)
If you missed out at the event, feel free to grab it there!

## Looking ahead to Summer Comiket
Of course, we’ll be applying for the upcoming Summer Comiket! By that time, we’re aiming to release the complete version of “PRJ rain”. We hope you’ll look forward to seeing how it’s evolved from the alpha.

It was so lively at Winter Comiket, you could really feel the excitement despite the chilly weather. Thank you again to everyone who joined us. And once more, our heartfelt thanks to everyone who visited our booth or showed interest in our new release and other works.

We’ll keep working hard on game development, and we hope you’ll continue to support us!
`,
    links: [{ label: "BOOTH 販売ページ", url: "https://creaclan.booth.pm/items/6448523" }],
  },

  {
    id: "2025-01-02-gamespark",
    date: "2025-01-02",
    category: "media",
    title: "Game*Spark様にC105出展ゲームを取り上げて頂きました",
    image: "assets/img/news/prj-rain.webp",
    imageAlt: "『PRJ rain（仮）』（現『ガーデンハント』）",
    work: "garden-hunt",
    body: `
「コミックマーケット105」のインディーゲームブースレポートで、出展した『PRJ rain（仮）』（現『ガーデンハント』）を取り上げていただきました！

▼記事
[「コミックマーケット105」インディーゲームブースレポート！ 昔ながらのイベントで出会った魅力的な作品を3本ピックアップ](https://www.gamespark.jp/article/2025/01/02/148188.html)
`,
  },

  {
    id: "2024-06-10-c104",
    date: "2024-06-10",
    category: "event",
    title: "夏コミC104参加決定！",
    image: "assets/img/news/2024-06-10-c104.webp",
    imageAlt: "夏コミC104参加決定！ 月曜 西け22ab",
    body: `
C104 夏コミに「クレアクラン」が無事当選しまして、参加決定です！！！
2日目の8月12日（月）「西地区 “け” ブロック 22ab」で出展します～
新作プロト版や新しいグッズなども用意する予定なのでぜひ遊びに来てください～♪

▼C104 webカタログ
[https://webcatalog-free.circle.ms/Circle/19006570](https://webcatalog-free.circle.ms/Circle/19006570)
`,
    bodyEn: `
C104 Summer Comiket: "CREA CLAN" has successfully been selected, and we will be participating!!!
We will be exhibiting on the second day, Monday, August 12th, in the "West Area 'Ke' Block 22ab."
We plan to have a prototype of our new work and new merchandise, so please come and visit us~♪

▼C104 Web Catalog
[https://webcatalog-free.circle.ms/Circle/19006570](https://webcatalog-free.circle.ms/Circle/19006570)
`,
  },

  {
    id: "2024-06-03-crearun-page",
    date: "2024-06-03",
    category: "info",
    title: "「走れ！クレアちゃん」のPRODUCTページを更新しました",
    image: "assets/img/news/2024-06-03-crearun-page.webp",
    imageAlt: "『走れ！クレアちゃん』PRODUCTページ追加♪",
    work: "crea-run",
    body: `
PRODUCTページに、「走れ！クレアちゃん」を追加しました！

※現在は、[『走れ！クレアちゃん』公式サイト](https://kamiena.github.io/CreaRun/)で作品の情報をご覧いただけます。
`,
  },

  {
    id: "2024-06-03-website",
    date: "2024-06-03",
    category: "info",
    title: "公式ホームページ作成しました！",
    image: "assets/img/news/2024-06-03-website.webp",
    imageAlt: "公式ホームページ作成しました！",
    body: `
クレアクラン公式のホームページを作成しました！
制作したゲームの情報はもちろん、イベント参加の情報など、いろいろと掲載していこうと思います♪
`,
  },

  {
    id: "2023-08-22-crearun-steam",
    date: "2023-08-22",
    category: "release",
    title: "Steam版『走れ！クレアちゃん』の配信を開始しました！",
    image: "assets/img/works/crea-run/kv.webp",
    imageAlt: "『走れ！クレアちゃん』ロゴと、積み木のロケットに乗るクレアちゃん",
    work: "crea-run",
    body: `
『走れ！クレアちゃん』のSteam版を配信開始しました！ 無料で遊べます♪

走って、飛んで、積み木を集めて…
集めた積み木とレシピを使って、乗り物をクラフト！ ラン＆ジャンプ＆クラフトのアクションゲームです。
`,
    links: [{ label: "Steamストアページ", url: "https://store.steampowered.com/app/2547610/" }],
  },

  {
    id: "2023-08-13-c102",
    date: "2023-08-13",
    category: "event",
    title: "コミックマーケット102に出展！ 初のオリジナルアクリルグッズを頒布しました",
    image: "assets/img/goods/crea-acsta.webp",
    imageAlt: "クレアのアクリルスタンド",
    body: `
コミックマーケット102に出展しました！

クレアクラン初のオリジナルアクリルグッズとして、看板娘「クレア」のアクリルスタンドとミニアクリルキーホルダーを頒布しました。
また、ブースでは新作の主人公「メイナ」を初お披露目しました！
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1690490118359113728" }],
  },
];
