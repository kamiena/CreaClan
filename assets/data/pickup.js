/* ==========================================================================
   トップページいちばん上の「ピックアップ」スライド

   ▼ スライドを足すときは { … } を1つ追加してください（上から順に表示）。
     image … 横長 16:9 の画像（1600×900 くらい）。assets/img/pickup/ に入れてください
     label … 左上の小さなラベル
     title … 画像の下に出る文字
     url   … 押したときに開くページ（作品の公式サイト、ニュース記事 "news.html?id=…" など）
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
    image: "assets/img/pickup/traps.webp",
    alt: "『トラップス』キービジュアル",
    label: "新作・開発中",
    title: "新作カードゲーム『トラップス』開発中！",
    url: "https://kamiena.github.io/Traps/",
    color: "orange",
  },
  {
    image: "assets/img/pickup/meina-plush.webp",
    alt: "メイナのぬいぐるみ",
    label: "グッズ",
    title: "メイナのぬいぐるみが完成しました！",
    url: "news.html?id=2026-09-20-meina-plush",
    color: "yellow",
  },
  {
    image: "assets/img/pickup/crea-run.webp",
    alt: "『走れ！クレアちゃん』ロゴと、積み木のロケットにまたがるクレアちゃん",
    label: "無料配信中",
    title: "『走れ！クレアちゃん』Steamで無料配信中！",
    url: "https://kamiena.github.io/CreaRun/",
    color: "pink",
  },
  {
    image: "assets/img/pickup/radio.webp",
    alt: "ラジオ「クレアクランカフェ」",
    label: "ラジオ",
    title: "クリエイターが集まるラジオ「クレアクランカフェ」",
    url: "https://www.youtube.com/@CreaClanOfficial",
    color: "sky",
  },
];
