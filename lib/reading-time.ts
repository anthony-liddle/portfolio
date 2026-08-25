import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Reading time is computed from the MDX source at build time so the numbers
 * stay correct when an essay is revised. This module intentionally imports
 * only `node:fs` and `node:path`, with no `@/` aliases, so it can also be run
 * directly by a script to verify the counts outside a Next build.
 */

const WORDS_PER_MINUTE = 225;

const ESSAY_DIR = join(process.cwd(), 'app', 'writing');

/**
 * Drops a leading `import` or `export` statement and everything up to the
 * point where its brackets balance again. A regex cannot do this safely: the
 * `export const metadata = pageMetadata({ ... });` block spans several lines
 * and a lazy match to the first `;` would stop inside any description that
 * happened to contain one.
 */
function stripModuleStatements(source: string) {
  const lines = source.split('\n');
  const kept: string[] = [];
  let depth = 0;
  let inStatement = false;

  for (const line of lines) {
    if (!inStatement && !/^\s*(import|export)\s/.test(line)) {
      kept.push(line);
      continue;
    }

    inStatement = true;
    for (const char of line) {
      if (char === '{' || char === '(' || char === '[') depth += 1;
      if (char === '}' || char === ')' || char === ']') depth -= 1;
    }

    if (depth <= 0) {
      depth = 0;
      inStatement = false;
    }
  }

  return kept.join('\n');
}

/**
 * Reduces MDX to the prose a reader actually reads. Markdown links collapse to
 * their visible text rather than being deleted, since the words between the
 * brackets are read; the URL is not.
 */
export function extractProse(source: string) {
  return (
    stripModuleStatements(
      source
        // Frontmatter, if an essay ever grows one.
        .replace(/^---\n[\s\S]*?\n---\n/, ''),
    )
      // Fenced code blocks, then inline code (backticks dropped, token kept).
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]*)`/g, '$1')
      // JSX elements, should an essay ever embed a component.
      .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
      // Images before links, so alt text is dropped rather than counted.
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      // Headings, blockquotes, list markers, horizontal rules, table pipes.
      .replace(/^\s{0,3}#{1,6}\s+/gm, '')
      .replace(/^\s{0,3}>\s?/gm, '')
      .replace(/^\s{0,3}([-*+]|\d+\.)\s+/gm, '')
      .replace(/^\s{0,3}([-*_]\s?){3,}$/gm, ' ')
      .replace(/\|/g, ' ')
      // Emphasis markers.
      .replace(/[*_]{1,3}/g, '')
  );
}

export function countWords(prose: string) {
  return prose.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token))
    .length;
}

/**
 * Throws rather than returning 0 when a file cannot be read. A missing or
 * renamed essay should fail the build loudly instead of shipping as
 * "0 min read".
 */
export function readingTimeMinutes(slug: string) {
  const path = join(ESSAY_DIR, slug, 'page.mdx');

  let source: string;
  try {
    source = readFileSync(path, 'utf8');
  } catch (cause) {
    throw new Error(`Could not read the MDX source for "${slug}" at ${path}.`, {
      cause,
    });
  }

  const words = countWords(extractProse(source));

  if (words === 0) {
    throw new Error(
      `Parsed the MDX source for "${slug}" but found no prose to count.`,
    );
  }

  // Clamped to 1 so a very short essay never renders as "0 min read".
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function readingTimeLabel(slug: string) {
  return `${readingTimeMinutes(slug)} min read`;
}
