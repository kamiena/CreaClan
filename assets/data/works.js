/* ==========================================================================
   クレアクランの作品

   ▼ 新しい作品を追加するときは、下の CC_WORKS に { … } を1つ足してください。
     トップページの「WORKS」と、作品一覧ページ（works.html）に自動で表示されます。
     並び順は、この配列の順番のままです（上にあるものほど先に表示）。

   ▼ status（状態）の種類
     "onsale"（好評配信中） / "free"（無料配信中） / "dev"（開発中）
   ▼ color（カードの色）
     "orange" / "pink" / "sky" / "mint" / "yellow"
   ▼ 画像は assets/img/works/<作品のid>/ に入れてください。
   ========================================================================== */

window.CC_WORKS = [
  {
    id: "garden-hunt",
    title: "ガーデンハント",
    titleEn: "Garden Hunt",
    status: "onsale",
    statusLabel: "好評配信中",
    color: "mint",
    genre: "ドットイート風 ヌメヌメ×おにごっこアクション",
    catch: "曲がり角には気を付けて… ナメツムリが庭園迷路を駆け回り、エネミーから逃げつつ、スライムを集める！",
    description: "ナメツムリの少女「メイナ」を操作して、生垣や壁に囲まれた庭園迷路を駆け回り、スライムを捕まえるアクションゲーム。自分や敵、スライムが通ったあとに残る「ヌメリ道」が攻略のカギ！ ストーリーは、マンガ演出＋フルボイスで展開します。",
    image: "assets/img/works/garden-hunt/kv.webp",
    imageAlt: "『ガーデンハント』キービジュアル。黄色いコートを着たナメツムリの少女メイナと、青いスライム、紫のスライム",
    logo: "assets/img/works/garden-hunt/logo.webp",
    chara: "assets/img/chara/meina.webp",
    charaName: "メイナ",
    site: "https://kamiena.github.io/GardenHunt/",
    tags: ["Steam（PC）", "500円", "9言語対応", "日本語フルボイス"],
    specs: [
      ["ジャンル", "ドットイート風 ヌメヌメ×おにごっこアクション"],
      ["プラットフォーム", "Steam（PC）"],
      ["配信日", "2026年1月16日"],
      ["価格", "500円（税込）"],
      ["プレイ人数", "1人"],
      ["対応言語", "日本語／英語／フランス語／イタリア語／ドイツ語／スペイン語／中国語（簡体字）／中国語（繁体字）／韓国語（日本語：フル音声＋字幕、その他8言語：字幕対応）"],
      ["キャスト", "メイナ役：柊 優花 様／オババ役：森沢 芙美 様"],
      ["漫画", "炒芽もやし 様"],
      ["開発／パブリッシュ", "クレアクラン（代表：カミエナ）"],
    ],
    links: [
      { type: "steam", label: "Steamストア", url: "https://store.steampowered.com/app/3820430/" },
      { type: "youtube", label: "ゲーム概要紹介PV", url: "https://youtu.be/88wuNyMprWA" },
      { type: "youtube", label: "ボイスコミック 第1話", url: "https://youtu.be/dxDVt_R9KJ8" },
    ],
    screenshots: [
      "assets/img/works/garden-hunt/ss-1.webp",
      "assets/img/works/garden-hunt/ss-3.webp",
      "assets/img/works/garden-hunt/ss-4.webp",
    ],
  },

  {
    id: "traps",
    title: "トラップス",
    titleEn: "Traps",
    status: "dev",
    statusLabel: "開発中",
    color: "orange",
    genre: "カードタイプの2人対戦ゲーム（アナログゲーム）",
    catch: "いたずら好きな「クマチ」から村を守れ！ トラップ（罠）を活用して、相手の村にクマチを押し込む！",
    description: "アナログゲーム初心者でも、相手の裏を読み合う心理戦で盛り上がれる、カードタイプの2人対戦ゲーム。自分のターンにやることは「うごかす」と「しかける」の2つだけ。簡単ルール！ でも奥深い！！",
    image: "assets/img/works/traps/kv.webp",
    imageAlt: "『トラップス』キービジュアル。クマの着ぐるみを着たクマチと、ハチミツのツボ",
    logo: "assets/img/works/traps/logo.webp",
    chara: "assets/img/chara/kumachi.webp",
    charaName: "クマチ",
    site: "https://kamiena.github.io/Traps/",
    tags: ["アナログゲーム", "2人対戦", "カードゲーム"],
    specs: [
      ["ジャンル", "カードゲーム（アナログゲーム）"],
      ["プレイ人数", "2人"],
      ["発売時期", "未定"],
      ["価格", "未定"],
      ["開発・販売", "クレアクラン"],
    ],
    note: "発売時期・価格は決まりしだいお知らせします。続報をお楽しみに！",
    links: [],
    screenshots: [
      "assets/img/works/traps/card-plus1.webp",
      "assets/img/works/traps/card-plus2.webp",
      "assets/img/works/traps/card-plus4.webp",
      "assets/img/works/traps/card-minus1.webp",
      "assets/img/works/traps/card-minus2.webp",
    ],
    screenshotsSquare: true,
  },

  {
    id: "crea-run",
    title: "走れ！クレアちゃん",
    titleEn: "Crea Run!",
    status: "free",
    statusLabel: "無料配信中",
    color: "pink",
    badge: "30,000DL突破！",
    genre: "ラン＆ジャンプ＆クラフトのアクションゲーム",
    catch: "走って、飛んで、積み木を集めて… 集めた積み木とレシピを使って、乗り物をクラフト！",
    description: "乗り物に乗っている間は獲得スコアがUPして、敵も障害物も倒せるように…！ たくさんクラフトして、ステージを駆け抜け、一気にスコアを稼ごう！ クレアクランの1作品目です。",
    image: "assets/img/works/crea-run/kv.webp",
    imageAlt: "『走れ！クレアちゃん』ロゴと、積み木のロケットにまたがるクレアちゃん",
    logo: "assets/img/works/crea-run/logo.webp",
    chara: "assets/img/chara/crea.webp",
    charaName: "クレア",
    site: "https://kamiena.github.io/CreaRun/",
    tags: ["Steam（Windows）", "無料"],
    specs: [
      ["ジャンル", "ラン＆ジャンプ＆クラフトのアクションゲーム"],
      ["プラットフォーム", "Steam（Windows）"],
      ["配信日", "2023年8月22日（Steam版）"],
      ["価格", "無料"],
      ["プレイ人数", "1人"],
      ["対応言語", "日本語"],
      ["開発・販売", "クレアクラン（CREA CLAN）／カミエナ"],
    ],
    note: "スマートフォン版（App Store／Google Play）は現在公開停止中です。",
    links: [
      { type: "steam", label: "Steamストア", url: "https://store.steampowered.com/app/2547610/" },
      { type: "youtube", label: "紹介映像", url: "https://youtu.be/AwsuFbgcJMI" },
    ],
    screenshots: [
      "assets/img/works/crea-run/ss-1.webp",
      "assets/img/works/crea-run/ss-2.webp",
      "assets/img/works/crea-run/ss-3.webp",
    ],
  },
];
