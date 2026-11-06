import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { members } from '../data/members';
import { labels } from '../data/labels';
import { assertUniqueNewsSlugs, getNewsSlug } from '../utils/newsSlug';
import { getNewsByLabel, newsListHref, pageCount } from '../utils/newsPages';

type SitemapEntry = {
  path: string;
  lastmod?: Date;
};

const staticPages: SitemapEntry[] = [
  { path: '/' },
  { path: '/about/' },
  { path: '/news/' },
  { path: '/members/' },
  { path: '/music/' },
  { path: '/events/' },
  { path: '/shop/' },
  { path: '/media/' },
  { path: '/contact/' },
  { path: '/privacy/' },
  { path: '/rss-info/' },
  { path: '/sitemap/' },
];

const toDate = (date: Date) => date.toISOString().slice(0, 10);

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL('https://dreamy-records.net');
  const articles = (await getCollection('news')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  assertUniqueNewsSlugs(articles);

  // /news/ は staticPages に含まれるので、それ以外のレーベル別一覧を追加する
  const newsByLabel = await getNewsByLabel();
  const newsPages: SitemapEntry[] = labels.flatMap((label) =>
    Array.from({ length: pageCount(newsByLabel[label.id]) }, (_, index) => ({
      path: newsListHref(label.id, index + 1),
    })).filter((entry) => entry.path !== '/news/'),
  );
  const articlePages: SitemapEntry[] = articles
    .filter((article) => !article.data.redirectTo)
    .map((article) => ({
      path: `/news/${getNewsSlug(article)}/`,
      lastmod: article.data.date,
    }));
  const memberPages: SitemapEntry[] = members.map((member) => ({
    path: `/members/${member.slug}/`,
  }));

  const urls = [...staticPages, ...newsPages, ...articlePages, ...memberPages]
    .map(({ path, lastmod }) => {
      const location = new URL(path, baseUrl).href;
      return `<url><loc>${location}</loc>${lastmod ? `<lastmod>${toDate(lastmod)}</lastmod>` : ''}</url>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
