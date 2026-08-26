/**
 * Fails when any page scrolls horizontally at a 320px viewport (WCAG 1.4.10).
 *
 * This exists because four separate reflow failures shipped and every one was
 * found by hand, after the fact: the three-item nav, the five-item nav, the
 * Soundscape h1 that had been scrolling sideways for months, and the
 * Bottleneck h1. Measuring headings with a ruler does not scale and did not
 * work.
 *
 * Two things this deliberately does that a naive check does not:
 *
 * 1. It reports two tiers. A page-level `scrollWidth` test alone found only
 *    one of the three h1 overflows that existed when this was written: the
 *    other two spilled into the container's 32px padding and stayed inside
 *    the viewport. Those are not 1.4.10 violations, but they are one longer
 *    word away from becoming one, so they are reported as warnings.
 *
 * 2. It self-tests. A checker that stays green on a known-broken page is
 *    worse than no checker, so every run re-breaks a page in memory and
 *    asserts the detector catches it. See runSelfTest.
 */

import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const VIEWPORT = { width: 320, height: 800 };
const PORT = Number(process.env.REFLOW_PORT ?? 4319);
const BASE = `http://127.0.0.1:${PORT}`;
const MANIFEST = '.next/prerender-manifest.json';

/** Warnings are informational by default; --strict makes them fail the run. */
const STRICT = process.argv.includes('--strict');

/**
 * Runs in the page. Returns the page-level overflow plus the specific leaf
 * elements whose own content is wider than their box, which is what turns
 * "something is 16px too wide" into a line of CSS to go fix.
 */
function collectOverflow() {
  const docEl = document.documentElement;
  const viewportWidth = docEl.clientWidth;
  const culprits = [];

  const name = (el) =>
    el.tagName.toLowerCase() +
    (el.className ? `.${String(el.className).split(' ')[0]}` : '');

  for (const el of document.querySelectorAll('*')) {
    if (el.clientWidth === 0) continue;

    // A pane that is meant to scroll sideways is not a defect. The site has
    // these deliberately for wide tables and code blocks.
    const style = getComputedStyle(el);
    if (['auto', 'scroll', 'hidden'].includes(style.overflowX)) continue;

    const shared = {
      selector: name(el),
      fontSize: style.fontSize,
      text: (el.textContent ?? '').trim().slice(0, 40),
    };

    // Case 1: the element's own content is wider than its box. Leaf elements
    // only, because an ancestor's scrollWidth just echoes its child's and
    // reporting both buries the offender under six wrappers. This is what
    // catches a single long word in a heading.
    if (el.children.length === 0 && el.scrollWidth > el.clientWidth + 1) {
      culprits.push({
        ...shared,
        kind: 'content wider than box',
        contentWidth: el.scrollWidth,
        boxWidth: el.clientWidth,
      });
      continue;
    }

    // Case 2: the box itself extends past the viewport. A wide image, a fixed
    // width, a negative margin. Case 1 cannot see these, because such an
    // element's content fits its box perfectly well; the box is the problem.
    // Reported only when no ancestor is already at fault, so one runaway
    // element does not print its whole subtree.
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.right > viewportWidth + 0.5) {
      const parent = el.parentElement;
      const parentRect = parent?.getBoundingClientRect();
      if (parentRect && parentRect.right > viewportWidth + 0.5) continue;
      culprits.push({
        ...shared,
        kind: 'box past viewport',
        right: Math.round(rect.right),
        boxWidth: Math.round(rect.width),
      });
    }
  }

  return {
    pageOverflow: docEl.scrollWidth - viewportWidth,
    scrollWidth: docEl.scrollWidth,
    culprits,
  };
}

function describe(c) {
  const measure =
    c.kind === 'content wider than box'
      ? `content ${c.contentWidth}px in ${c.boxWidth}px box`
      : `box ${c.boxWidth}px reaching x=${c.right}`;
  return `<${c.selector}> ${measure} @${c.fontSize} — "${c.text}"`;
}

/**
 * Routes come from the build manifest and are then filtered by response
 * content-type. Filtering on the path instead (dropping anything matching
 * `/opengraph-image`) would quietly stop covering a route the day someone
 * adds an image convention this script has never heard of.
 */
async function htmlRoutes() {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const all = Object.keys(manifest.routes ?? {}).sort();
  const html = [];

  for (const route of all) {
    const res = await fetch(BASE + route, { redirect: 'follow' });
    if ((res.headers.get('content-type') ?? '').includes('text/html')) {
      html.push(route);
    }
  }

  return { total: all.length, html };
}

/**
 * Refuses to run against a server this script did not start.
 *
 * This is not defensive padding. An earlier version killed only the `pnpm`
 * wrapper, leaving the real `next start` bound to the port; the next run then
 * happily measured that stale process, which was serving HTML pointing at a
 * stylesheet hash the rebuild had just invalidated. Every page came back
 * unstyled and the results looked authoritative: a page reported as 928px too
 * wide, and the genuinely broken page reported clean.
 *
 * A checker that silently measures the wrong build is the exact failure this
 * whole script exists to prevent, so an occupied port is a hard error.
 */
async function assertPortFree() {
  try {
    await fetch(BASE, {
      redirect: 'follow',
      signal: AbortSignal.timeout(2000),
    });
  } catch {
    return;
  }
  console.error(
    `Something is already listening on ${BASE}.\n` +
      'Refusing to run, because it may be serving a different build than the ' +
      'one you just made.\n' +
      `Stop it (\`kill $(lsof -ti:${PORT})\`) or set REFLOW_PORT to a free port.`,
  );
  process.exit(2);
}

async function startServer() {
  await assertPortFree();

  // detached so the whole process group can be signalled: `pnpm exec` forks
  // `next start`, and killing only the parent orphans the child on the port.
  const server = spawn('pnpm', ['exec', 'next', 'start', '-p', String(PORT)], {
    stdio: 'ignore',
    detached: true,
  });

  const stop = () => {
    try {
      process.kill(-server.pid, 'SIGKILL');
    } catch {
      // Already gone.
    }
  };
  // Covers Ctrl-C and an uncaught throw, either of which would otherwise
  // leave the port occupied and poison the next run.
  process.on('exit', stop);
  process.on('SIGINT', () => {
    stop();
    process.exit(130);
  });

  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      await fetch(BASE, { redirect: 'follow' });
      return { stop };
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  stop();
  throw new Error(`Server did not come up on ${BASE} within 60s.`);
}

/**
 * Proves the detector still detects. Loads a real page, forces the heading
 * back to the size that used to overflow, and asserts we catch it. If this
 * ever passes silently, every "0 routes overflow" above it is meaningless.
 */
async function runSelfTest(page) {
  await page.goto(`${BASE}/writing/soundscape`, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: '.prose h1 { font-size: 3rem !important; }',
  });

  const result = await page.evaluate(collectOverflow);
  const caught = result.pageOverflow > 0 && result.culprits.length > 0;

  if (!caught) {
    console.error(
      'Self-test FAILED: injected a known 320px overflow and the detector ' +
        'did not report it. Every result above this line is untrustworthy.',
    );
    return false;
  }

  console.log(
    `self-test ok  (injected 3rem h1 detected: ${result.pageOverflow}px over)`,
  );
  return true;
}

async function main() {
  if (!existsSync(MANIFEST)) {
    console.error(`Missing ${MANIFEST}. Run \`pnpm build\` first.`);
    process.exit(2);
  }

  const { stop } = await startServer();
  const browser = await chromium.launch();

  let failures = 0;
  let warnings = 0;

  try {
    const page = await browser.newPage({ viewport: VIEWPORT });
    const { total, html } = await htmlRoutes();

    console.log(
      `Checking ${html.length} HTML routes at ${VIEWPORT.width}px ` +
        `(${total} prerendered, ${total - html.length} non-HTML skipped).\n`,
    );

    for (const route of html) {
      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      const { pageOverflow, scrollWidth, culprits } =
        await page.evaluate(collectOverflow);

      if (pageOverflow > 0) {
        failures++;
        console.log(
          `FAIL ${route}\n     page scrolls ${pageOverflow}px past ` +
            `${VIEWPORT.width} (scrollWidth ${scrollWidth})`,
        );
        for (const c of culprits) console.log(`     ${describe(c)}`);
      } else if (culprits.length > 0) {
        warnings++;
        console.log(`WARN ${route}  content wider than its box, but the page`);
        console.log('     does not scroll yet. One longer word and it will.');
        for (const c of culprits) console.log(`     ${describe(c)}`);
      } else {
        console.log(`ok   ${route}`);
      }
    }

    console.log('');
    const selfTestPassed = await runSelfTest(page);

    console.log(
      `\n${failures} of ${html.length} routes overflow at ${VIEWPORT.width}px` +
        (warnings ? `, ${warnings} warned.` : '.'),
    );

    if (!selfTestPassed) process.exit(3);
    if (failures > 0) process.exit(1);
    if (warnings > 0 && STRICT) process.exit(1);
  } finally {
    await browser.close();
    stop();
  }
}

await main();
