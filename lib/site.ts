/**
 * The one place the site's title pattern lives. The root title template,
 * every route's openGraph.title, and every OG image alt string build from
 * these, so changing the separator or the site name is a single edit here
 * instead of twenty-two scattered ones.
 */
export const SITE_NAME = 'Anthony Liddle';

const SEPARATOR = '·';

/** "{Page} · Anthony Liddle", the pattern for titles and OG image alts. */
export function siteTitle(page: string): string {
  return `${page} ${SEPARATOR} ${SITE_NAME}`;
}

/** The root layout's title template; must stay in step with siteTitle. */
export const TITLE_TEMPLATE = `%s ${SEPARATOR} ${SITE_NAME}`;
