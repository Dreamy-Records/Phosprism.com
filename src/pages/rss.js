import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { assertUniqueNewsSlugs, getNewsDescription, getNewsSlug } from '../utils/newsSlug';

export async function GET(context) {
  const articles = await getCollection('news');
  const sortedArticles = articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  assertUniqueNewsSlugs(sortedArticles);

  return rss({
    title: "Phos'Prism NEWS",
    description: "東方同人音楽アレンジサークル Phos'Prismの最新情報",
    site: context.site,
    trailingSlash: true,
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.date,
      description: getNewsDescription(article),
      link: `/news/${getNewsSlug(article)}/`,
      categories: [article.data.category],
    })),
    customData: '<language>ja</language>',
  });
}
