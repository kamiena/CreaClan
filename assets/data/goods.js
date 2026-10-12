/* ==========================================================================
   クレアクランのグッズ

   ▼ グッズを追加するときは、下の CC_GOODS の「[」のすぐ下に { … } を1つ足してください。
     トップページ（新しい順に4つ）と、グッズページ（goods.html）に自動で表示されます。
   ▼ status（販売のようす）の種類
     "booth"（BOOTHで販売中） / "event"（イベントで頒布） / "soon"（販売予定）
   ▼ 画像は assets/img/goods/ に入れてください（正方形か 16:9）。
   ========================================================================== */

window.CC_GOODS = [
  {
    name: "メイナのぬいぐるみ",
    year: "2026",
    status: "soon",
    image: "assets/img/goods/plush.webp",
    description: "『ガーデンハント』の主人公メイナのぬいぐるみ。イベントなどで販売予定です。",
    link: { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2101627937061556581" },
  },
  {
    name: "ちびキャラ アクスタ（メイナ・クレア・クマチ）",
    year: "2026",
    status: "event",
    image: "assets/img/goods/chibi-acsta.webp",
    description: "看板娘3人のちびキャラ・アクリルスタンド。並べて飾りたくなるデザインで、コミックマーケット108で初頒布しました。",
    link: { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/2088432357695271340" },
  },
  {
    name: "メイナ ミニフィギュア",
    year: "2025",
    status: "event",
    image: "assets/img/goods/figure.webp",
    description: "Trend3D様の3Dプリンターで制作。ゲームの中の kawaii さを、なめらかな曲線で再現しました。",
    link: { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1964983203388940475" },
  },
  {
    name: "ゲーム機アクキー",
    year: "2025",
    status: "booth",
    image: "assets/img/goods/keychain.webp",
    description: "『走れ！クレアちゃん』と『ガーデンハント』のキービジュアルが映る、ゲーム機風のミニアクリルキーホルダー。",
    link: { label: "BOOTH で見る", url: "https://creaclan.booth.pm/items/7844888" },
  },
  {
    name: "クレア ホログラム缶バッチ",
    year: "2025",
    status: "booth",
    image: "assets/img/goods/holo-badge.webp",
    description: "看板娘クレアの缶バッジ。ホログラム加工で、角度を変えるとキラキラ光ります（56mm）。",
    link: { label: "BOOTH で見る", url: "https://creaclan.booth.pm/items/7844865" },
  },
  {
    name: "ひょっこり♪キャラ缶バッチ（クレア／メイナ）",
    year: "2024",
    status: "booth",
    image: "assets/img/goods/badge.webp",
    description: "クレアとメイナが、ひょっこり顔を出しているデザインの缶バッジ（56mm）。",
    link: { label: "BOOTH で見る", url: "https://creaclan.booth.pm/items/6450471" },
  },
  {
    name: "『ちんあなご』ステッカー",
    year: "2025",
    status: "event",
    image: "assets/img/goods/sticker.webp",
    description: "代表カミエナの処女作『ちんあなご』のステッカー。チンアナゴとニシキアナゴ、どっちがどっち？",
    link: { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1992132737097154945" },
  },
  {
    name: "クレア アクリルスタンド",
    year: "2023",
    status: "event",
    image: "assets/img/goods/crea-acsta.webp",
    description: "はじめて作ったオリジナルのアクリルグッズ。看板娘クレアのアクリルスタンドとミニアクリルキーホルダーを、コミックマーケット102で頒布しました。",
    link: { label: "X の投稿を見る", url: "https://x.com/KamiEna_Game/status/1690490118359113728" },
  },
];

window.CC_GOODS_STATUS = {
  booth: { label: "BOOTHで販売中", color: "pink" },
  event: { label: "イベントで頒布", color: "mint" },
  soon:  { label: "販売予定",       color: "yellow" },
};
