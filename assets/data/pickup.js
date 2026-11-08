/* ==========================================================================
   トップページいちばん上の「ピックアップ」スライド

   ▼ スライドを足すときは { … } を1つ追加してください（上から順に表示）。
     image … 横長 16:9 の画像（1600×900 くらい）。assets/img/pickup/ に入れてください
     label … 画像の下の小さなラベル
     title … 画像の下に出る文字
     url   … 押したときに開くページ
             作品の公式サイト（https://…）や、ページ内の場所（"#works"、"#news-ニュースのid" など）
     color … ラベルの色（"orange" / "pink" / "sky" / "mint" / "yellow"）
   ========================================================================== */

window.CC_PICKUP = [
  {
    image: "assets/img/pickup/garden-hunt.webp",
    alt: "『ガーデンハント』キービジュアル",
    label: "好評配信中",
    title: "『ガーデンハント』Steamにて好評配信中！",
    url: "https://kamiena.github.io/GardenHunt/",
    color: "mint",
  },
  {
    image: "assets/img/pickup/new.webp",
    alt: "NEW GAME 新作、開発中…！",
    label: "新作",
    title: "新作ゲーム、開発中…！？",
    url: "#works",
    color: "sky",
  },
  {
    image: "assets/img/pickup/traps.webp",
    alt: "『トラップス』キービジュアル",
    label: "開発中",
    title: "新作カードゲーム『トラップス』開発中！",
    url: "https://kamiena.github.io/Traps/",
    color: "orange",
  },
  {
    image: "assets/img/pickup/kaiwai-hall.webp",
    alt: "BSフジ『界隈ほーる』で、近藤春菜さんが『ガーデンハント』をプレイ",
    label: "テレビ",
    title: "BSフジ『界隈ほーる』で、近藤春菜さんが『ガーデンハント』をプレイ！",
    url: "#media",
    color: "pink",
  },
  {
    image: "assets/img/pickup/crea-run-30000dl.webp",
    alt: "祝！30,000DL『走れ！クレアちゃん』",
    label: "無料配信中",
    title: "『走れ！クレアちゃん』30,000ダウンロード突破！（現在 36,000DL）",
    url: "https://kamiena.github.io/CreaRun/",
    color: "orange",
  },
  {
    image: "assets/img/pickup/channel-1000.webp",
    alt: "クレアクランのロゴと、メイナ・クレア",
    label: "YouTube",
    title: "YouTube「クレアクラン放送局」チャンネル登録者1,000人突破！",
    url: "#contents",
    color: "sky",
  },
  {
    image: "assets/img/pickup/meina-plush.webp",
    alt: "メイナのぬいぐるみ",
    label: "グッズ",
    title: "メイナのぬいぐるみ、イベントで販売中！",
    url: "#goods",
    color: "yellow",
  },
];
