import type { CollectionEntry } from 'astro:content';

type NewsEntry = CollectionEntry<'news'>;

/**
 * Uses the Markdown filename as the default URL. A frontmatter slug always takes
 * precedence, so articles can still use a manually chosen URL when needed.
 * レーベル別のフォルダ（dreamy-records/ など）はURLに含めない。
 */
export const getNewsSlug = (entry: NewsEntry) => {
  if (entry.data.slug) return entry.data.slug;
  return entry.id.split('/').pop() ?? entry.id;
};

const plainTextFromMarkdown = (markdown: string) =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[`*_~>#|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Returns a manual description when present, otherwise a short summary from the article body. */
export const getNewsDescription = (entry: NewsEntry) => {
  const manualDescription = entry.data.description?.trim();
  if (manualDescription) return manualDescription;

  const text = plainTextFromMarkdown(entry.body ?? '');
  if (!text) return entry.data.title;

  const maximumLength = 120;
  const characters = Array.from(text);
  return characters.length > maximumLength
    ? `${characters.slice(0, maximumLength).join('')}…`
    : text;
};

export const assertUniqueNewsSlugs = (entries: NewsEntry[]) => {
  const slugs = entries.map(getNewsSlug);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

  if (duplicates.length) {
    throw new Error(`ニュースURLが重複しています: ${[...new Set(duplicates)].join(', ')}`);
  }
};
