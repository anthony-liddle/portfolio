/**
 * Shared diagnostics for the /lately sections.
 *
 * Both of these exist because Reading and Listening rendered empty in
 * production for weeks without anyone noticing, and two separate gaps let that
 * happen:
 *
 * 1. An empty section is ambiguous. "Nothing logged just now" is the correct
 *    output both when a source file legitimately has no rows and when it could
 *    not be read at all. The discriminator is whether the source read and
 *    parsed, never how many entries came back: zero is a valid result, so a
 *    length check cannot tell the two cases apart. It would also break the day
 *    the log is genuinely emptied.
 * 2. Nothing logged the outcome. Every message described a cause ("ENOENT")
 *    and none stated the consequence ("this section rendered zero items"), so
 *    a broken section was indistinguishable from a quiet one at a glance.
 */

/**
 * Thrown when a section's source could not be read or parsed.
 *
 * Distinct from a section simply having nothing to show. Because /lately is
 * prerendered at build time and never revalidates, letting this escape fails
 * the build, which leaves the previous good deployment serving. That is the
 * fallback the page used to get from ISR's stale-page behavior, relocated to
 * deploy granularity.
 */
export class SectionSourceError extends Error {
  constructor(section: string, detail: string, options?: ErrorOptions) {
    super(
      `${section}: source could not be read or parsed (${detail})`,
      options,
    );
    this.name = 'SectionSourceError';
  }
}

/**
 * True when `error` is a filesystem error raised against one of `paths`.
 *
 * Packages that read their input with a bare `readFile` surface a missing file
 * as a thrown Node error carrying the offending `path`. Matching on that path
 * is what separates "the source file is gone" from every other throw the same
 * call might produce, most importantly a failed cache write, which must never
 * be treated as a broken source: the entries were already assembled correctly
 * by the time the cache write is attempted.
 */
export function isSourceReadError(
  error: unknown,
  paths: readonly string[],
): boolean {
  if (typeof error !== 'object' || error === null) return false;
  const { path } = error as { path?: unknown };
  return typeof path === 'string' && paths.includes(path);
}

/**
 * Throw if any warning matches a pattern meaning the source itself was
 * unusable.
 *
 * Needed because a package can report an unreadable or unparseable source as a
 * warning rather than a throw, in which case a caller's `catch` is never
 * entered and the section goes quietly empty. Patterns are supplied by the
 * caller since each package words its warnings differently.
 */
export function assertSourceUsable(
  section: string,
  warnings: readonly string[],
  brokenSourcePatterns: readonly RegExp[],
): void {
  const broken = warnings.find((warning) =>
    brokenSourcePatterns.some((pattern) => pattern.test(warning)),
  );
  if (broken !== undefined) throw new SectionSourceError(section, broken);
}

/**
 * Log how many entries a section is about to render.
 *
 * Only ever called once the source is known to be readable, so a zero here is
 * the legitimate kind and says so. This is the line that makes a quiet section
 * visible in the build output.
 */
export function logSectionOutcome(section: string, count: number): void {
  if (count === 0) {
    console.warn(
      `lately: ${section} rendered 0 items (source read and parsed cleanly, nothing to show)`,
    );
    return;
  }
  console.info(
    `lately: ${section} rendered ${count} item${count === 1 ? '' : 's'}`,
  );
}

/**
 * Log that a section fell back to an empty render after a failure that was not
 * worth failing the build over.
 *
 * The counterpart to logSectionOutcome, so that every section emits exactly one
 * outcome line on every path. Without this, a degraded section is signalled by
 * the *absence* of a line, and absence is precisely what nobody notices: the
 * original bug hid for weeks behind messages that named a cause and never
 * stated the consequence.
 */
export function logSectionDegraded(section: string, error: unknown): void {
  console.error(
    `lately: ${section} rendered 0 items (degraded, build left intact)`,
    error,
  );
}
