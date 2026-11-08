/* ==========================================================================
   クレアクラン ニュース

   ▼ ニュースの追加のしかた
     下の CC_NEWS の「[」のすぐ下に、{ … }, のかたまりを1つ足すだけです。
     トップページの「NEWS」に自動で反映されます（並び順は日付の新しい順。はじめは新しい6件を表示）。
     タイトルを押すと、その場で本文が開きます。各ニュースは https://kamiena.github.io/CreaClan/#news-<id> で直接開けます。

     {
       id: "2026-10-20-sample",        // ニュースの名前（URLの #news-<id> になる。半角英数字とハイフン。ほかと重ならないように）
       date: "2026-10-20",             // 日付（YYYY-MM-DD）
       category: "info",               // info / release / event / goods（下の CC_NEWS_CATEGORIES）
                                       // ※メディア掲載はニュースに載せず、media.js にまとめます
       title: "タイトル",
       image: "assets/img/news/2026-10-20-sample.webp", // 画像（16:9がおすすめ。なくてもOK）
       work: "garden-hunt",            // 関係する作品（works.js の id。なくてもOK）
       body: `
本文をここに書きます。空行で段落が分かれます。

## 小見出し
- 箇条書き
**太字** や [リンクの文字](https://example.com) も使えます。
![画像の説明](assets/img/news/xxx.webp)
`,
       bodyEn: `English text (optional)`,      // 英語の本文（なくてもOK）
       links: [ { label: "ボタンの文字", url: "https://..." } ], // 本文の下に出すボタン（なくてもOK）
       // url: "https://...",          // ← 本文なしで、押したら外部ページを開きたいときだけ
     },

   ▼ 画像は assets/img/news/ に入れてください（横幅 960px 程度の WebP / JPG / PNG）。
   ▼ 追加したら `node tools/check-data.mjs` で書き間違いがないか確認できます。
   ========================================================================== */

window.CC_NEWS_CATEGORIES = {
  info:    { label: "お知らせ", color: "orange" },
  release: { label: "作品",     color: "pink" },
  event:   { label: "イベント", color: "mint" },
  goods:   { label: "グッズ",   color: "yellow" },
};

window.CC_NEWS = [
  {
    id: "2026-11-08-c109",
    date: "2026-11-08",
    category: "event",
    title: "冬コミC109、念願の「壁サークル」で参加決定！🎉",
    image: "assets/img/news/2026-11-08-c109.webp",
    imageAlt: "コミックマーケット109のサークル配置。クレアクランは壁サークル",
    body: `
やっっったぁーー！🎉 クレアクランを設立したときからずーっと夢だった「コミケの壁サークル」が、ついに叶いました！！✨

**コミックマーケット109　2日目　東地区 "Ａ"ブロック－39ab**

頒布物などの詳細は、決まりしだいお知らせします。ぜひ遊びに来てください♪
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2119382571893293098" }],
  },
  {
    id: "2026-10-17-zentame",
    date: "2026-10-17",
    category: "event",
    title: "第9回 全国エンタメまつり（ぜんため）に初出展しました！",
    image: "assets/img/news/2026-10-17-zentame.webp",
    imageAlt: "ぜんため会場のクレアクランのテントブース",
    work: "garden-hunt",
    body: `
2026年10月17日（土）・18日（日）に岐阜県・各務原市民公園で開催された「第9回 全国エンタメまつり（ぜんため）」に、クレアクランとして初めて出展しました！🎉
ブースは**41番**。大自然の中のテントで、日陰でゲームを遊んでいただけました✨

- 『ガーデンハント』を出展
- 新グッズ「メイナのぬいぐるみ」の販売をスタート
- イベント限定の『ガーデンハント』パッケージROM版は、2日目に完売しました🙏
- クローズドで、新作未発表ゲームのテストプレイも行いました🤫

![ブースに並んだメイナのぬいぐるみ](assets/img/news/2026-10-17-zentame-plush.webp)

![ぜんため会場の各務原市民公園](assets/img/news/2026-10-17-zentame-venue.webp)

![完売したパッケージ版と、ぬいぐるみ・アクスタ](assets/img/news/2026-10-17-zentame-soldout.webp)

遊びに来てくださった皆様、本当にありがとうございました！ パッケージ版は、次回のイベントでも販売できるように準備しておきます！
`,
    links: [
      { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2111282393030226205" },
      { label: "完売のお知らせ（X）", url: "https://x.com/KamiEna_Game/status/2111637282281382073" },
    ],
  },
  {
    id: "2026-10-14-renewal",
    date: "2026-10-14",
    category: "info",
    title: "公式ホームページをリニューアルしました！",
    image: "assets/img/news/2026-10-14-renewal.webp",
    imageAlt: "クレアクランのロゴと、看板娘のクレア・メイナ・クマチ",
    body: `
クレアクラン公式ホームページをリニューアルしました！🎉

ニュース・作品・クレアクランの紹介・グッズ・[ゲーム実況・動画配信ガイドライン](#guideline)を、1つのページにぎゅっとまとめました。
上のメニューを押すと、その場所までスクロールして移動します。ニュースは、タイトルを押すとその場で開いて読めます♪

作品は、それぞれの公式サイトへワンクリックで移動できます。

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
ずっと夢だった「ぬいぐるみ化」が実現！ 『ガーデンハント』の主人公「メイナ」のぬいぐるみが、ついに完成しました！🎉
制作にあたっては、Made in Heaven様にご協力いただきました。

ゲームのキャラクターが、こうやって実物になるのはとってもうれしいです……！

![メイナのぬいぐるみ](assets/img/news/2026-09-20-meina-plush-2.webp)

【追記】10月の「全国エンタメまつり（ぜんため）」で販売をスタートしました！ 今後も各地のイベントで販売予定です♪
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

## 追記（8/16）
設営完了！ 東7ホールの同人ゲームエリアで、クレアクラン名物の雛壇でお待ちしていました✨
パッケージ版は、いつものように手作りで作成。多めに用意していましたが、当日は残りわずかになるほど手に取っていただけました！ ありがとうございました！

![C108 クレアクランのブース](assets/img/news/2026-08-15-c108-booth.webp)

![クレアクラン名物の雛壇](assets/img/news/2026-08-15-c108-hinadan.webp)

![手作りの『ガーデンハント』パッケージ版](assets/img/news/2026-08-15-c108-package.webp)
`,
    links: [
      { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2088432357695271340" },
      { label: "当日のブース（X）", url: "https://x.com/KamiEna_Game/status/2088802114181169566" },
    ],
  },
  {
    id: "2026-07-11-traps-kv",
    date: "2026-07-11",
    category: "release",
    title: "新作アナログゲーム『トラップス』のキービジュアルが完成！",
    image: "assets/img/works/traps/kv.webp",
    imageAlt: "『トラップス』キービジュアル",
    work: "traps",
    body: `
新作のキービジュアルが完成しました🎉

いたずら好きな「クマチ」から村を守れ🐻 罠を活用して、相手の村にクマチを押し込む、カードタイプの2人対戦ゲームです♪
アナログゲーム初心者でも、相手の裏を読み合う心理戦で盛り上がれる、簡単ルール！ でも奥深い！！ ユニークな作品です✨
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2075596153614205136" }],
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

くわしくは[ゲーム実況・動画配信ガイドライン](#guideline)をご覧ください。
`,
    links: [{ label: "ガイドラインを見る", url: "#guideline" }],
  },
  {
    id: "2026-05-20-404-game-center",
    date: "2026-05-20",
    category: "event",
    title: "常設展示「404ゲームセンター：ars●bitセレクション」第1弾で『ガーデンハント』を展示！",
    image: "assets/img/news/2026-05-20-404-game-center.webp",
    imageAlt: "404 Not Found に置かれた『ガーデンハント』の筐体",
    work: "garden-hunt",
    body: `
渋谷サクラステージの「404 Not Found」で始まった常設展示「404ゲームセンター：ars●bitセレクション」の第1弾作品として、『ガーデンハント』が展示されています！

プロジェクト特製のオリジナルアップライト筐体（立って遊ぶアーケード筐体）で遊ぶことができます🎮

- 会期：2026年5月20日〜7月31日（予定）
- 会場：404 Not Found（Shibuya Sakura Stage 4F）

▼くわしくはこちら
[常設展示「404ゲームセンター：ars●bitセレクション」が、開業2周年を迎える渋谷404 Not Foundにて始動！（ars●bit）](https://www.arsobit.com/exhibitions-20260626/)
`,
    links: [{ label: "筐体の写真（X）", url: "https://x.com/KamiEna_Game/status/2065751043665748369" }],
  },
  {
    id: "2026-05-09-new-character",
    date: "2026-05-09",
    category: "release",
    title: "新作のキャラクターデザインを公開しました！",
    image: "assets/img/news/2026-05-09-new-character.webp",
    imageAlt: "新作のキャラクター（のちのクマチ）",
    work: "traps",
    body: `
新作のキャラクターデザインを公開しました🎉
デザインは、クレアクランのイラストレーター・アシモ953さんです♪

アナログゲームになる予定です。続報をお楽しみに✨

【追記】このキャラクターは「クマチ」として、新作アナログゲーム『トラップス』に登場します！
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2053076156644225323" }],
  },
  {
    id: "2026-05-06-plush-decided",
    date: "2026-05-06",
    category: "goods",
    title: "『ガーデンハント』メイナのぬいぐるみ化が決定！",
    image: "assets/img/news/2026-05-06-plush-decided.webp",
    imageAlt: "メイナのぬいぐるみのデザイン",
    work: "garden-hunt",
    body: `
『ガーデンハント』のメイナが、ぬいぐるみになることが決定しました！🎉
Made in Heaven様にご協力いただき、制作を進めています。完成までもう少々お待ちください✨

【追記】9月に完成し、10月の「ぜんため」から販売をスタートしました！
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2051978733859569897" }],
  },
  {
    id: "2026-05-03-tgd12",
    date: "2026-05-03",
    category: "event",
    title: "東京ゲームダンジョン12に出展しました！",
    image: "assets/img/works/garden-hunt/ss-7.webp",
    work: "garden-hunt",
    body: `
2026年5月3日（日）に開催された「東京ゲームダンジョン12」に出展しました！
ブースに遊びに来てくださった皆様、ありがとうございました！

▼イベントレポート
[【東京ゲームダンジョン12】イベントレポ（Kaburanai Games）](https://gamersizayuke.com/tyokyogamedungeon12_report/)
`,
  },
  {
    id: "2026-02-06-shibuya-games-week",
    date: "2026-02-06",
    category: "event",
    title: "SHIBUYA GAMES WEEK 2026「エキマエゲームパーク」に『ガーデンハント』を出展！",
    image: "assets/img/news/2026-02-06-shibuya-games-week.webp",
    imageAlt: "エキマエゲームパークの『ガーデンハント』の試遊台",
    work: "garden-hunt",
    body: `
渋谷の街を舞台にした都市型ゲームフェス「SHIBUYA GAMES WEEK 2026」（2月6日〜15日）の「エキマエゲームパーク」（渋谷サクラステージ3階）に、『ガーデンハント』を出展しました！
渋谷の巨大モニターから、メイナの声が鳴り響いていました♪

![エキマエゲームパークの展示](assets/img/news/2026-02-06-shibuya-games-week-booth.webp)

`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2019650151586107882" }],
  },
  {
    id: "2026-01-23-figure",
    date: "2026-01-23",
    category: "goods",
    title: "メイナのミニフィギュア、増産＆再販が決定！",
    image: "assets/img/news/2026-01-23-figure.webp",
    imageAlt: "メイナのミニフィギュア",
    work: "garden-hunt",
    body: `
すぐに在庫切れになってしまった『ガーデンハント』のメイナのミニフィギュアについて、Trend3D様のご協力のもと、増産＆再販が決定しました👏

イベント会場だけでなく、オンライン販売も予定しています。詳細をお待ちください♪
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2014652199855599669" }],
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
    id: "2026-01-14-new-pv",
    date: "2026-01-14",
    category: "release",
    title: "『ガーデンハント』新PVを公開しました！",
    image: "assets/img/works/garden-hunt/ss-1.webp",
    imageAlt: "『ガーデンハント』のゲーム画面",
    work: "garden-hunt",
    body: `
メイナとオババが掛け合いながら、『ガーデンハント』の遊び方を説明してくれる新しいPVを作りました！🎉

- メイナ役：柊 優花さん
- オババ役：森沢 芙美さん
`,
    links: [{ label: "PV を見る（X）", url: "https://x.com/KamiEna_Game/status/2011392858037825829" }],
  },
  {
    id: "2026-01-07-signed-package",
    date: "2026-01-07",
    category: "goods",
    title: "サイン入り『ガーデンハント』パッケージを BOOTH で抽選販売！",
    image: "assets/img/news/2026-01-07-signed-package.webp",
    imageAlt: "柊 優花さんのサイン入り『ガーデンハント』パッケージ",
    work: "garden-hunt",
    body: `
冬コミで先行販売していた、メイナ役・柊 優花さんのサイン入り『ガーデンハント』パッケージを、BOOTHでオンライン販売します！🙌

数が15個限りのため、抽選を行ったうえでの販売です。くわしくは X の投稿をご確認ください✨
`,
    links: [
      { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2008856150352023989" },
      { label: "公式BOOTHショップ", url: "https://creaclan.booth.pm/" },
    ],
  },
  {
    id: "2026-01-06-booth-goods",
    date: "2026-01-06",
    category: "goods",
    title: "冬コミの新グッズを BOOTH で販売開始！",
    image: "assets/img/news/2026-01-06-booth-goods.webp",
    imageAlt: "ゲーム機アクキー（ガーデンハント）",
    body: `
冬コミで販売していた新グッズを、BOOTHの公式ショップに追加しました！🎉

- ゲーム機アクキー
- クレア ホログラム缶バッチ

『ガーデンハント』の主人公「メイナ」のひょっこり缶バッジも、引き続き販売中です✨

![クレア ホログラム缶バッチ](assets/img/news/2026-01-06-booth-goods-badge.webp)
`,
    links: [
      { label: "公式BOOTHショップ", url: "https://creaclan.booth.pm/" },
      { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2008499859918377449" },
    ],
  },
  {
    id: "2025-12-24-c107",
    date: "2025-12-24",
    category: "event",
    title: "冬コミC107で『ガーデンハント』完成版パッケージを先行頒布！（12/31 南1 m-09ab）",
    image: "assets/img/news/2025-12-24-c107.webp",
    imageAlt: "C107 クレアクランのブース",
    work: "garden-hunt",
    body: `
長らく開発していたドットイート風 ヌメヌメ×おにごっこアクション『ガーデンハント』が、ついに完成！🎉
コミックマーケット107で、完成版のパッケージを先行頒布します！（Steamでのダウンロード版は、このあと配信）

**12月31日（水）2日目　南1ホール【m-09ab】**

## 頒布物
- 『ガーデンハント』限定パッケージ版：500円
- ひょっこり♪キャラ缶バッチ：各300円
- メイナ 3Dプリンター ミニフィギュア：2,500円

さらに、メイナ役の声優・柊 優花さんの**サイン入り限定パッケージ**を、先着15名様で頒布しました！

![C107 お品書き](assets/img/news/2025-12-24-c107-menu.webp)

![柊 優花さんのサイン入り限定パッケージ](assets/img/news/2025-12-24-c107-signed.webp)

いつもブースに来てくださり、進捗途中のROMを購入してくださった皆様、本当にありがとうございました！
`,
    links: [
      { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2003798212013150354" },
      { label: "当日のブース（X）", url: "https://x.com/KamiEna_Game/status/2006171161441255430" },
    ],
  },
  {
    id: "2025-12-23-voice-cast",
    date: "2025-12-23",
    category: "release",
    title: "『ガーデンハント』主人公メイナの声優は、柊 優花さんに決定！",
    image: "assets/img/pickup/garden-hunt.webp",
    imageAlt: "『ガーデンハント』キービジュアル",
    work: "garden-hunt",
    body: `
『ガーデンハント』の主人公「メイナ」の声を、柊 優花さんにご担当いただきます！👏
とーーっても可愛くお声をつけていただきました。ぜひ聞いてみてください✨

ストーリーパートのマンガ表現は炒芽もやしさん、オババ役は森沢 芙美さんにご担当いただいています。
`,
    links: [{ label: "ボイスを聞く（X）", url: "https://x.com/KamiEna_Game/status/2003420323929104496" }],
  },
  {
    id: "2025-11-22-sakura-creators-market",
    date: "2025-11-22",
    category: "event",
    title: "SAKURA CREATOR'S MARKET XG に出展しました！（渋谷サクラステージ）",
    image: "assets/img/news/2025-11-22-sakura-creators-market.webp",
    imageAlt: "SAKURA CREATOR'S MARKET XG のクレアクランのブース",
    body: `
11月22日（土）〜24日（月）に渋谷サクラステージ4階で開催された「SAKURA CREATOR'S MARKET XG」に、**【P-10】**のブースで出展しました！🎉

グッズの販売とゲームの試遊を行い、代表カミエナの処女作『ちんあなご』のステッカーも販売しました♪

![新しく作ったグッズ](assets/img/news/2025-11-22-sakura-goods.webp)

会場が渋谷サクラステージということもあり、家族連れの方など、普段は出会えないたくさんの方に作品を遊んでいただけました✨ 子どもたちの笑顔に、とても癒やされた3日間でした！
`,
    links: [
      { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1992101680700326202" },
      { label: "新グッズ（X）", url: "https://x.com/KamiEna_Game/status/1992783828545569275" },
    ],
  },
  {
    id: "2025-11-08-tgd10",
    date: "2025-11-08",
    category: "event",
    title: "東京ゲームダンジョン10に出展します！（11/9 3P-8）",
    image: "assets/img/news/2025-11-08-tgd10.webp",
    imageAlt: "『ガーデンハント』",
    work: "garden-hunt",
    body: `
11月9日（日）開催の「東京ゲームダンジョン10」に出展します！🎉

ナメツムリが庭園を駆け回る「ヌメヌメ × おにごっこ」な、ドットイート風3Dアクションゲーム『ガーデンハント』を展示予定です✨

**会場3階【3P-8】**でお待ちしております～！

▼イベントレポート（追記）
[【イベントレポ】: 東京ゲームダンジョン10（Raspberlyのブログ）](https://raspberly.hateblo.jp/entry/TokyoGameDungeon10)
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1986811126475051468" }],
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
    id: "2025-08-09-c106-beta",
    date: "2025-08-09",
    category: "event",
    title: "夏コミC106で『ガーデンハント』β版ROMを頒布します！",
    image: "assets/img/news/2025-08-09-c106-beta.webp",
    imageAlt: "『ガーデンハント』β版ROMのパッケージ",
    work: "garden-hunt",
    body: `
夏コミ C106 で頒布する、『ガーデンハント』β版ROMのパッケージデザインができました✨

**8月17日（日）2日目　東7ホール【V01ab】（同人ソフトエリア）**

- 『ガーデンハント』β版ROM：100円
- ひょっこり♪キャラ缶バッチ：各300円
- クレアクラン イラスト＆名刺カード：無料

前回のα版から、かなりパワーアップしています！ 試遊もできるので、ぜひブースに遊びに来てください♪

![C106 お品書き](assets/img/news/2025-08-09-c106-menu.webp)

【追記】β版ROMは、ディスク版・ダウンロード版ともに完売しました！ ありがとうございました！
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1954135570306773268" }],
  },
  {
    id: "2025-07-30-tgd9",
    date: "2025-07-30",
    category: "event",
    title: "東京ゲームダンジョン9に出展します！（8/3 4L-2）",
    image: "assets/img/news/2025-07-30-tgd9.webp",
    imageAlt: "『ガーデンハント』",
    work: "garden-hunt",
    body: `
8月3日（日）開催の「東京ゲームダンジョン9」に、クレアクランも出展します！🎉

ブースは**4階【4L-2】**。開発中の新作『ガーデンハント』を展示します。
ぜひぜひ、遊びに来てください😄
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1950529053297115360" }],
  },
  {
    id: "2025-07-01-garden-hunt-steam-page",
    date: "2025-07-01",
    category: "release",
    title: "『ガーデンハント』のSteamストアページを公開しました！",
    image: "assets/img/news/2025-07-01-steam-page.webp",
    imageAlt: "『ガーデンハント』のSteamストアページ",
    work: "garden-hunt",
    body: `
開発中の新作『ガーデンハント』の、Steamストアページを公開しました！🎉

ヌメヌメ ✕ おにごっこ！？ ナメツムリが駆けまわる、新感覚のドットイート風アクションゲームです🐌

ストアページの公開にあわせて、メディア各社様にも記事を掲載していただきました。

- 4Gamer.net：[ナメツムリの少女を操作して，スライムを捕獲していく鬼ごっこアクション「ガーデンハント」，Steamストアページを公開。リリース時期は年内](https://www.4gamer.net/games/925/G092584/20250702004/)
- Gamer：[ナメツムリの少女がスライムを追うヌメヌメおにごっこアクション「ガーデンハント」のSteamストアページが公開！誰かが通ると地面に残る「ヌメリ道」を活かしてステージクリアを目指そう](https://www.gamer.ne.jp/news/202507020067/)
`,
    links: [
      { label: "Steamストアページ", url: "https://store.steampowered.com/app/3820430/" },
      { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1940002473378558013" },
    ],
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
    id: "2025-06-07-c106",
    date: "2025-06-07",
    category: "event",
    title: "夏コミC106に当選しました！",
    image: "assets/img/news/2025-06-07-c106.webp",
    imageAlt: "C106 サークルカット",
    body: `
夏コミ（コミックマーケット106）に当選しました！🎉

**2日目 日曜日　東地区 “Ｖ”ブロック－01ab（東7ホール）**

新作『ガーデンハント』の開発、頑張ります！💪

▼サークルページ
[https://webcatalog.circle.ms/Perma/Circle/10463569/](https://webcatalog.circle.ms/Perma/Circle/10463569/)
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1931305138540736852" }],
  },
  {
    id: "2025-05-26-game-sekai",
    date: "2025-05-26",
    category: "event",
    title: "「ゲーム世界展開会議」で『ガーデン ハント』のブース展示が決定！",
    image: "assets/img/works/garden-hunt/ss-6.webp",
    work: "garden-hunt",
    body: `
DMM.com様の本社で開催されるイベント「ゲーム世界展開会議」にて、開発中の新作『ガーデン ハント』のブース展示が決定しました✨

出展、頑張ってきます！💪
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1926986185915724251" }],
  },
  {
    id: "2025-05-04-tgd8",
    date: "2025-05-04",
    category: "event",
    title: "東京ゲームダンジョン8に初出展しました！",
    image: "assets/img/news/2025-05-04-tgd8.webp",
    imageAlt: "東京ゲームダンジョン8 のクレアクランのブース",
    work: "garden-hunt",
    body: `
5月4日（日）開催の「東京ゲームダンジョン8」に、クレアクランとして初めて出展しました！🎉

ブースは3階【3S-12】。開発中の新作『PRJ rain（仮）』（現『ガーデンハント』）を無料で試遊していただきました。

本当にたくさんの方にゲームを遊んでいただけて、非常に実りのある1日になりました✨ 応援の言葉もたくさんいただいたので、完成に向けて開発頑張ります！💪

![東京ゲームダンジョン8 のブース](assets/img/news/2025-05-04-tgd8-booth.webp)
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1919000056327184855" }],
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
    id: "2024-11-08-c105",
    date: "2024-11-08",
    category: "event",
    title: "冬コミC105に当選しました！",
    image: "assets/img/news/2024-11-08-c105.webp",
    imageAlt: "C105 サークルカット",
    body: `
冬コミ（コミックマーケット105）に当選しました！🎉

サークル「クレアクラン」は**月曜日　西地区 “き”ブロック－27ab（西2ホール）**に配置されました！

新作の開発、ガンガン進めます！💪

▼コミケWebカタログ
[https://webcatalog.circle.ms/Perma/Circle/10463569/](https://webcatalog.circle.ms/Perma/Circle/10463569/)
`,
    links: [{ label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1854827625736552937" }],
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
