/* ==========================================================================
   メディア掲載・実況動画（トップページの「MEDIA」）

   ▼ ニュース（news.js）には、メディア掲載は載せません。ここにまとめます。
   ▼ tv       … テレビ・番組（大きなカードで表示）
     articles … WEB記事（新しい順。はじめは上から 6 件だけ表示し、「もっと見る」で全部）
     videos   … 実況・プレイ動画（YouTube の動画ID。はじめは 8 件だけ表示）
                 KamiEna_Game の YouTube の再生リスト「【実況まとめ】…」から作っています
   ▼ work … 作品の id（works.js）。"garden-hunt" / "crea-run" / "traps"
   ========================================================================== */

window.CC_MEDIA = {
  tv: [
    {
      date: "2026-05-05", channel: "BSフジ", title: "界隈ほーる 〜偏愛の穴に落ちてみた〜 #4「インディーゲーム界隈」",
      text: "代表カミエナがインディーゲームクリエイターとして出演。スタジオでは近藤春菜さんが『ガーデンハント』をプレイしてくださいました！",
      image: "assets/img/pickup/kaiwai-hall.webp", url: "https://www.youtube.com/watch?v=DnmBOhPELe0&t=199s", work: "garden-hunt",
    },
    {
      date: "2026-07-07", channel: "BSフジ", title: "界隈ほーる 〜偏愛の穴に落ちてみた〜 #10「インディーゲーム界隈」第2弾",
      text: "BitSummit を取材したインディーゲーム特集の第2弾に、代表カミエナが出演しました。",
      image: "https://i.ytimg.com/vi/aq1FHu8H-Mg/hqdefault.jpg", url: "https://www.youtube.com/watch?v=aq1FHu8H-Mg",
    },
  ],

  articles: [
  { date: "2026-08-18", media: "ゲーム前線 / Gaming Frontline", title: "【徹底解説】ガーデンハント レビュー「パックマンライクなゲーム」", url: "https://gamezensen.hatenablog.com/entry/Garden_Hunt_rreview", work: "garden-hunt" },
  { date: "2026-06-26", media: "ars●bit", title: "常設展示「404ゲームセンター：ars●bitセレクション」が始動（第1弾で『ガーデンハント』を展示）", url: "https://www.arsobit.com/exhibitions-20260626/", work: "garden-hunt" },
  { date: "2026-05-07", media: "Kaburanai Games", title: "【東京ゲームダンジョン12】イベントレポ", url: "https://gamersizayuke.com/tyokyogamedungeon12_report/", work: "garden-hunt" },
  { date: "2026-02-13", media: "ゲームメーカーズ", title: "初開催の「SHIBUYA GAMES WEEK 2026」現地レポート", url: "https://gamemakers.jp/article/2026_02_13_131159/", work: "garden-hunt" },
  { date: "2026-02-06", media: "4Gamer.net", title: "都市型ゲームフェス「SHIBUYA GAMES WEEK」で遊べるインディーゲームまとめ", url: "https://www.4gamer.net/games/991/G999110/20260206031/", work: "garden-hunt" },
  { date: "2026-02-06", media: "Yahoo!ニュース", title: "渋谷の街をゲームがジャック！「SHIBUYA GAMES WEEK 2026」が本日開幕", url: "https://news.yahoo.co.jp/expert/articles/462e39e3aeae041c6d96e8cfef97c62e79add002", work: "garden-hunt" },
  { date: "2026-01-20", media: "ムダウチゲームズ", title: "“あの角を曲がったら…？”のドキドキ感がやみつきになる！ヌメヌメ×おにごっこアクション", url: "https://mudauchi.info/428906", work: "garden-hunt" },
  { date: "2026-01-17", media: "電撃オンライン", title: "ドットイート風ヌメヌメ×おにごっこアクション『ガーデンハント』が配信", url: "https://dengekionline.com/article/202601/63360", work: "garden-hunt" },
  { date: "2026-01-16", media: "GameWith", title: "『ガーデンハント』1月16日から発売開始！スライムを集めるドットイート風のヌメヌメおにごっこゲーム", url: "https://gamewith.jp/gamedb/13858/articles/52181", work: "garden-hunt" },
  { date: "2025-12-06", media: "AUTOMATON WEST", title: "Garden slug-girl action, masochistic platforming and summer vacation nostalgia: 5 outdoorsy Japanese indie games（英語記事）", url: "https://automaton-media.com/en/news/garden-slug-girl-action-masochistic-platforming-and-summer-vacation-nostalgia-5-outdoorsy-japanese-indie-games/", work: "garden-hunt" },
  { date: "2025-11-10", media: "Raspberlyのブログ", title: "【イベントレポ】: 東京ゲームダンジョン10", url: "https://raspberly.hateblo.jp/entry/TokyoGameDungeon10", work: "garden-hunt" },
  { date: "2025-07-02", media: "4Gamer.net", title: "ナメツムリの少女を操作して，スライムを捕獲していく鬼ごっこアクション「ガーデンハント」，Steamストアページ公開", url: "https://www.4gamer.net/games/925/G092584/20250702004/", work: "garden-hunt" },
  { date: "2025-07-02", media: "Gamer", title: "ナメツムリの少女がスライムを追うヌメヌメおにごっこアクション「ガーデンハント」のSteamストアページが公開！", url: "https://www.gamer.ne.jp/news/202507020067/", work: "garden-hunt" },
  { date: "2025-05-16", media: "Indie Freaks", title: "ヌメヌメっと滑りながら庭園迷路を駆け回るアクションゲーム『PRJ rain（仮）』ブースレポート【東京ゲームダンジョン8】", url: "https://www.indie-freaks.com/2025/05/tgd8-prj-rain", work: "garden-hunt" },
  { date: "2025-05-09", media: "リアルサウンド テック", title: "「東京ゲームダンジョン8」会場レポート（『PRJ rain』）", url: "https://realsound.jp/tech/2025/05/post-2013950.html", work: "garden-hunt" },
  { date: "2025-01-02", media: "Game*Spark", title: "「コミックマーケット105」インディーゲームブースレポート（『PRJ rain』）", url: "https://www.gamespark.jp/article/2025/01/02/148188.html", work: "garden-hunt" },
  { date: "", media: "4Gamer.net", title: "PC版 走れ！クレアちゃん まとめページ", url: "https://www.4gamer.net/games/732/G073281/", work: "crea-run" },
  { date: "", media: "トレジャーアプリ", title: "アクションゲーム【走れ！クレアちゃん】クラフトでステージを駆け抜けよう", url: "https://treasure-app.pw/apps/8589", work: "crea-run" },
  { date: "", media: "インディゲーム部", title: "[インディーゲーム紹介] 走れ！クレアちゃん", url: "https://gameition.xsrv.jp/review-kurea/", work: "crea-run" },
  ],

  videos: [
  { id: "Q8o9Ltclo7Q", work: "garden-hunt", channel: "ゲーム子 / Game-ko", title: "【ネタバレ注意】ユルい雰囲気でもヌルくはないヌメヌメアクション「ガーデンハント」プレイ【Steam】" },
  { id: "bQLmQeaJ_qk", work: "crea-run", channel: "相棒", title: "「可愛いイラストに癒されながら絶叫できるラン&ジャンプｗｗｗ」 #shorts #ゲーム実況 #インディーゲーム" },
  { id: "GOEDtdC2C5w", work: "garden-hunt", channel: "むらさきのゲームチャンネル", title: "ゲームニュース】ドットイート風 ヌメヌメ×おにごっこアクション『ガーデンハント』配信開始！【ドットイート風ACT・ガーデンハント】" },
  { id: "9lAInhlWzPU", work: "crea-run", channel: "翠端@SteamインディーズGAME発掘隊", title: "〈無料ゲー〉積み木で乗り物を作れ！ラン＆ジャンプゲーム【走れ！クレアちゃん】《四国めたん ずんだもん実況》" },
  { id: "yDoQKCvtmFM", work: "garden-hunt", channel: "天瀬モモ Amase Momo", title: "ゲーム下手くそVtuber、ガーデンハントやるぞ！！！ #天瀬モモ" },
  { id: "8aPFZCQ5_mA", work: "crea-run", channel: "けーしー劇場【ローグライク・インディーゲーム実況】", title: "【アプリ紹介】製作！破壊！爆走少女【走れ！クレアちゃん】" },
  { id: "Z62IY5C-rz8", work: "garden-hunt", channel: "Nyanco Channel", title: "Garden Hunt? Slug Tag in the Garden!" },
  { id: "LtoO77_HNPo", work: "crea-run", channel: "ホビドワ", title: "【単発実況】走れ！クレアちゃん【ラン＆ジャンプ＆クラフト！】" },
  { id: "_DdCMyDDk_M", work: "garden-hunt", channel: "被弾の人【インディーゲーム・DL専用ゲーム紹介】", title: "コミケで買った同人ゲーをひたすらやっていく→年越し角かじり会場【MHW:IB】" },
  { id: "3a6mh-EnXBk", work: "crea-run", channel: "スマホゲーム紹介ちゃんねる", title: "『走れ！クレアちゃん』パーツを集めながら走り、乗り物を組み立てて乗るランゲーム - 面白いゲーム情報 iOS,Android" },
  { id: "ZdF7rw3Yzig", work: "garden-hunt", channel: "狐森シオン", title: "【狐森シオン】ガーデンハント" },
  { id: "ieflqwykeoQ", work: "crea-run", channel: "九藤周 / AmaneKudou", title: "GWの10日間で作られた新鮮なゲームを遊ぶ【 #おうちGameJam 】" },
  { id: "J_Ecp8PRLrY", work: "garden-hunt", channel: "奈々々なつめぐ", title: "【#ワンワンバトル 】ちゃんと近所トラブルになったことがある声量を今、解き放つ【奈々々なつめぐ】" },
  { id: "P5O_hnH7LGM", work: "crea-run", channel: "M.M.D. play", title: "Correr! Clara - 走れ！クレアちゃん - Corte #走れ！クレアちゃん  #Correr!Clara #Corre!Clara" },
  { id: "o0tg4fHr5do", work: "garden-hunt", channel: "Pobre Gamer", title: "Garden Hunt - Cute Anime 3D Runner - Gameplay (PC)" },
  { id: "8TTV3_kFpz0", work: "crea-run", channel: "ezez game", title: "走れ！クレアちゃん (2 July 2023) Gameplay" },
  { id: "jOJGS_PJvLU", work: "garden-hunt", channel: "被弾の人【インディーゲーム・DL専用ゲーム紹介】", title: "『GardenHunt』の正式リリースが来ました配信！！" },
  { id: "5crQHJyHeIg", work: "crea-run", channel: "Eva Kamisato", title: "Gadis imut di dunia penuh warna warni - 走れ！クレアちゃん 『はしくれ』" },
  { id: "tgjtuvfgWXk", work: "garden-hunt", channel: "パジェミのゲーム紹介Ch", title: "『ガーデンハント』ストーリー1～ストーリー3冒頭まで【プレイ動画】" },
  { id: "ov9M8ADlryI", work: "crea-run", channel: "Isaka Ch. 猫崎 諫歌", title: "【走れ！クレアちゃん】アクションゲームは不得意だけど挑戦してみる…！【完全初見プレイ】" },
  { id: "Nr_9BHu_sfo", work: "garden-hunt", channel: "IndieJosh", title: "Garden Hunt | No Commentary Gameplay" },
  { id: "vUGD0HhUXVo", work: "crea-run", channel: "ezez game", title: "走れ！クレアちゃん (Run! Claire-chan)" },
  { id: "JLsGVZJ-N6o", work: "garden-hunt", channel: "紙銭のゲームライフ", title: "ガーデンハントをやっていこう" },
  { id: "aC8wsAJ98BU", work: "crea-run", channel: "りんご酢。", title: "走れ！クレアちゃん【#twitch #きりぬき】" },
  { id: "s6zJ7B-4HUw", work: "garden-hunt", channel: "higemarisa", title: "【初見】ガーデンハント-GardenHunt-メイナちゃんかわいいね🐌" },
  { id: "iIV660jFJ6k", work: "crea-run", channel: "かなめ@ゲーム実況活動17周年☆", title: "【走れ！クレアちゃん】実況！可愛い女の子とラン＆ジャンプでハイスコアを目指せ♪" },
  { id: "UTVVjEYjdUw", work: "garden-hunt", channel: "露木秋風", title: "かわいい鬼ごっこ？！ガーデンハントを二人で攻略していくぞ！！" },
  { id: "udKmbuf92iQ", work: "crea-run", channel: "Takashi Tsukasa", title: "2023/9/1 Game-19XX『走れ！クレアちゃん』" },
  { id: "GRAf_1dQkr8", work: "garden-hunt", channel: "露木秋風", title: "ガーデンハントかわいい鬼ごっこ？！ガーデンハントを二人で攻略していくぞ！！　その3" },
  { id: "-6JfDcv01_4", work: "crea-run", channel: "Rabbit-zero", title: "走れ！クレアちゃん" },
  { id: "YxMqY-vuJ_g", work: "garden-hunt", channel: "ましろ いちょ", title: "【ガーデンハント】ヌメヌメしていくぅ！？" },
  { id: "BsYuHsOpStA", work: "crea-run", channel: "二人は幸せな接吻をして終了【The two end up sharing a happy kiss】", title: "走れ！クレアちゃん プレイ動画【Run! Claire-chan】" },
  { id: "zyBon23ZEBs", work: "garden-hunt", channel: "露木秋風", title: "ガーデンハントかわいい鬼ごっこ？！ガーデンハントを二人で攻略していくぞ！！　その2" },
  { id: "tQuaYGe1gYs", work: "crea-run", channel: "Rabbit-zero", title: "走れ！クレアちゃん" },
  { id: "LlTQBP6FTAQ", work: "crea-run", channel: "Rabbit-zero", title: "走れ!クレアちゃん" },
  { id: "poK52GP_M-Y", work: "crea-run", channel: "相棒", title: "「積み木を集めて乗り物をクラフト！？」絶叫飛び交うスリル満点ラン&ジャンプｗｗｗ「走れ！クレアちゃん」【単発実況】" },
  { id: "wuxNvKTzJzs", work: "crea-run", channel: "M.M.D. play", title: "Correr! Clara - 走れ！クレアちゃん - Jogos que eu nunca ouvi falar T2-07" },
  { id: "dUezxoB179Q", work: "crea-run", channel: "東京ビスマルク", title: "行くぞー　「走れ！クレアちゃん」" },
  ],

  playlists: [
    { label: "『ガーデンハント』実況まとめ", url: "https://www.youtube.com/playlist?list=PL5zJtGSUvxlKUd6usWwGUE1ndCAKxiIDx", work: "garden-hunt" },
    { label: "『走れ！クレアちゃん』実況まとめ", url: "https://www.youtube.com/playlist?list=PL5zJtGSUvxlJiDSyrvXTae65Z9lQ-WLhT", work: "crea-run" },
  ],
};
