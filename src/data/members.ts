export type Member = {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  icon?: string;
  bio: string[];
  socials: { label: string; href: string }[];
};
export const members: Member[] = [
  {
    slug: 'myon',
    name: 'みょん',
    nameEn: 'MYON',
    role: '編曲 / DJ / ボーカル / 代表',
    icon: '/assets/members/myon.webp',
    bio: [
      'Phos’Prism代表。\n中学生時代に東方アレンジなどに影響を受け、サークル活動を開始。\nTranceやHardmusicを得意としており、サークルの楽曲制作、ボーカル、DJなどをする他、踊ってみたでも活動しており、あつまれ東方ステーション2024Bad Apple!!feat.nomico踊ってみたで出演したりしてる。'

    ],
    socials: [
      { label: 'X / TWITTER', href: 'https://x.com/myondreamy/' },
      { label: "YOUTUBE(Phos'Prism)", href: 'https://www.youtube.com/@dreamy_records' },
    ],
  },
  {
    slug: 'Echi-Echi_Man_Takashi',
    name: 'えちえちマンたかし',
    nameEn: 'Echi-Echi Man Takashi',
    role: '作詞',
    icon: '/assets/members/takashi.png',
    bio: [
      'ダンカグのあのえちえちマンたかし本人かなまいの幻想入りRadioでハガキを投稿している。\n東方知ったのは鈴仙うどんげのエロ同人\n作詞担当気分が乗れば編曲とボーカルをいずれやるかも？\nいつのまにかサークルよりコスプレしかしてない人間\n東方ニコレクションのマツヨイナイトバグ歌ってみたでイイネ賞受賞\n一応最年長である。保護者ですよろしくね'
    ],
    socials: [
      { label: 'X / TWITTER', href: 'https://x.com/TOMATOkatuzetu' },
      { label: 'YOUTUBE', href: 'https://youtube.com/channel/UCxu7Md1PbkYe8tveON_jcGA?si=abA8kjrY8bJ6iWWx' },
    ],
  },
  {
    slug: 'penerope',
    name: 'ぺねろぺ',
    nameEn: 'PENEROPE',
    role: '作詞 / ボーカル',
    icon: '/assets/members/penerope.png',
    bio: [
      '依神紫苑ガチオタクのぺねろぺです。\n小学一年生の頃に東方Projectと出会い、その魅力に惹かれて今に至るまで東方を愛し続けています。中学生の頃にはネットラップに出会い、音楽への興味を深めていきました。\nそして19歳から、東方ヴォーカル・ラップの活動を開始。\n東方への愛を音楽に乗せ、自分らしい表現を追求しながら、日々精進していきます。\nよろしくお願いします！'
    ],
    socials: [
      { label: 'X / TWITTER', href: 'https://x.com/lv6_k0' },
      { label: 'YOUTUBE', href: 'https://youtube.com/@ぺねろぺちゃん' },
      { label: 'TIKTOK', href: 'https://tiktok.com/@k0ishi310' },

    ],
  },
  {
    slug: 'tokoyo_raika',
    name: '常世ライカ',
    nameEn: 'TOKOYO RAIKA',
    role: 'ボーカル',
    icon: '/assets/members/tokoyo_raika.jpeg',
    bio: [
      'はじめまして！\nこのたびボーカルとして参加させていただくことになりました、常世ライカと申します！🐼\n\n神奈川県民クォーターの1523歳、杏仁豆腐をこよなく愛する仙人です。\n\n普段は歌ってみたやゲーム配信を中心に活動しています！\n\n歌うことはもちろん、歌詞の解釈や感情表現が大好きで、綺麗に歌うのも、感情をぐちゃぐちゃにして歌うのも好きです。\n声色やニュアンスを使った表現が得意なので、楽曲の世界観に合わせていろいろな引き出しを開けていけたらと思っています！\n\n東方ボーカルは以前から好きで、いちファンとして聴いていました。\n原曲についてはまだまだ勉強中ですが、これからもっと東方の世界に浸っていきたいです。\n\n素敵な作品づくりに携われること、とても楽しみにしています！\nどうぞよろしくお願いいたします！✨'
    ],
    socials: [
      { label: 'X / TWITTER', href: 'https://x.com/tokoyo_raika' },
      { label: 'YOUTUBE', href: 'https://youtube.com/channel/UC6LzXDPM99TUeC6eqRQ7awA?si=7PMS71K7iMAZ9KR0' },
      { label: 'TIKTOK', href: 'https://tiktok.com/@tokoyo_raika' },

    ],
  },
  {
    slug: 'kudaken',
    name: 'くだけん',
    nameEn: 'KUDAKEN',
    role: '事務 / デザイン / 映像 / Web',
    icon: '/assets/members/kudaken.png',
    bio: [
      '栃木生まれ栃木育ち\nEDMと映画好き\nSkrillex愛してる',
    ],
    socials: [
      { label: 'OFFICIAL SITE', href: 'https://kudaken.com/' },      
      { label: 'X / TWITTER', href: 'https://x.com/kudaken0/' },
      { label: 'INSTAGRAM', href: 'https://www.instagram.com/kudaken0/' },
      { label: 'YOUTUBE', href: 'https://youtube.com/kudaken' },
      { label: 'GITHUB', href: 'https://github.com/kudaken0' },
      { label: 'BLUESKY', href: 'https://bsky.app/profile/kudaken.com' },
    ],
  },
  {
    slug: 'junkdaisuki',
    name: 'ジャンク大好き人間',
    nameEn: 'junkdaisuki',
    role: 'サポート',
    icon: '/assets/members/junk.png',
    bio: [
      'スマホやゲーム機などをよく修理しているジャンク大好き人間です♪\n誕生日は2月5日！生まれは東京都でも育ちは栃木県！\n一番の推しはフランドール·スカーレット！\n入ったばかりでまだ分からないこともありますがよろしくお願いします♪',
    ],
    socials: [
      { label: 'X / TWITTER', href: 'https://x.com/junkdaisuki_/' },
      { label: 'INSTAGRAM', href: 'https://www.instagram.com/junkdaisuki_/' },
      { label: 'YOUTUBE', href: 'https://youtube.com/@junkdaisuki' },
      { label: 'BLUESKY', href: 'https://bsky.app/profile/junkdaisuki.bsky.social' },
      { label: 'MIXI2', href: 'hhttps://mixi.social/@junkdaisuki_' },
      { label: 'MISSKEY', href: 'https://misskey.io/@DSidaisuki' },
    ],
  },
  {
    slug: 'naonot',
    name: 'ナオノット',
    nameEn: 'NAONOT',
    role: '運搬 / 搬入 / サポート',
    icon: '/assets/members/naonot.png',
    bio: [
      'オーエン中毒者末期\n運転手兼営業部長\n2013年（小2）からオーエンに狂う人\n殆どのイベントに出現する神奈川から這い出てくる奴',
    ],
    socials: [{ label: 'X / TWITTER', href: 'https://x.com/nao_not1222' }],
  },

];
