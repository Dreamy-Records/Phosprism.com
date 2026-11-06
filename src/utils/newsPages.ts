import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLabel, labelIds, labels, type LabelId } from '../data/labels';
import { getNewsSlug } from './newsSlug';

export const articlesPerPage = 10;

/** 初期表示のレーベルは /news/、それ以外は /news/{レーベル}/ */
export const newsListHref = (label: LabelId, page = 1) => {
  const base = label === defaultLabel ? '/news/' : `/news/${label}/`;
  return page === 1 ? base : `${base}page/${page}/`;
};

/**
 * 記事のレーベルは置き場所で決まる。
 * src/content/news/ 直下は Phos'Prism、src/content/news/dreamy-records/ は Dreamy Records。
 */
export const getNewsLabel = (entry: CollectionEntry<'news'>): LabelId => {
  const folder = entry.id.includes('/') ? entry.id.split('/')[0] : '';
  return labelIds.find((id) => id === folder) ?? defaultLabel;
};

const newsDescriptions: Record<LabelId, string> = {
  phosprism: "Phos'Prismの最新情報です。新譜、イベント参加、メンバーの活動などをお知らせします。",
  'dreamy-records': '解散したDreamy Recordsの、活動期間中のお知らせをまとめたアーカイブです。',
};

/** ニュース一覧ページの説明文（2ページ目以降はページ番号を付ける） */
export const newsListDescription = (label: LabelId, page = 1) =>
  page === 1 ? newsDescriptions[label] : `${newsDescriptions[label]}（${page}ページ目）`;

export type NewsByLabel = Record<LabelId, CollectionEntry<'news'>[]>;

/** 新しい順に並べた記事をレーベルごとに返す */
export const getNewsByLabel = async (): Promise<NewsByLabel> => {
  const articles = (await getCollection('news')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  // /news/{レーベル}/ と記事URLがぶつからないようにする
  const labelIds = new Set<string>(labels.map((label) => label.id));
  const conflict = articles.find((article) => labelIds.has(getNewsSlug(article)));
  if (conflict) {
    throw new Error(`ニュース記事のslug「${getNewsSlug(conflict)}」はレーベル名と重複しています。`);
  }

  return Object.fromEntries(
    labels.map((label) => [
      label.id,
      articles.filter((article) => getNewsLabel(article) === label.id),
    ]),
  ) as NewsByLabel;
};

export const countNews = (newsByLabel: NewsByLabel) =>
  Object.fromEntries(
    Object.entries(newsByLabel).map(([label, articles]) => [label, articles.length]),
  ) as Record<LabelId, number>;

export const pageCount = (articles: unknown[]) =>
  Math.max(Math.ceil(articles.length / articlesPerPage), 1);
