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

interface PageMetadataOptions {
  /** The page's own name, unsuffixed. The root title template adds the rest. */
  title: string;
  description: string;
  /**
   * Route path with a leading and no trailing slash, matching the site's
   * `trailingSlash: false`. Resolved against `metadataBase` into `og:url`.
   */
  path: string;
}

/**
 * Builds a route's metadata so nothing the root layout declares goes missing.
 *
 * Next merges metadata shallowly: a page that exports its own `openGraph`
 * replaces the root's object outright rather than extending it, so any key the
 * page omits is dropped from the output instead of inherited. Every route here
 * needs its own og title and description, which used to mean every route also
 * silently lost `og:url`, `og:site_name`, and `og:type`. The same merge rule
 * runs the other way for `twitter`: pages declared none, so all of them
 * inherited the root's site-wide title and description and advertised the site
 * bio in place of the page.
 *
 * Restating the full set in one helper is what keeps both from happening
 * again. `siteName` and `type` are repeated from the root layout rather than
 * imported from it, because a page cannot read its parent's metadata; the root
 * layout stays the source of truth for the site's own card.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions) {
  return {
    title,
    description,
    openGraph: {
      title: siteTitle(title),
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: siteTitle(title),
      description,
    },
  };
}
