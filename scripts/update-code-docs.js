/* eslint-disable unicorn/prevent-abbreviations */

import fs from 'node:fs/promises';
import path from 'node:path';

import axios from 'axios';
import { Parser } from 'xml2js';

// --- Configuration ---
const SITEMAP_URL = 'https://code.claude.com/docs/sitemap.xml';
const URL_PREFIX = 'https://code.claude.com/docs/en/';
const DOCS_DIR = 'docs';
// NOTE: key and type MUST be the same
const DOCS = {
  code: {
    name: 'Claude Code',
    readmePath: `${DOCS_DIR}/code/README.md`,
    type: 'code',
  },
};

/**
 * Removes previously generated files and directories to ensure a clean build.
 */
async function cleanPreviousBuild() {
  console.log('🧼 1. Cleaning up previous build...');

  const subdirs = Object.keys(DOCS);

  for (const d of subdirs) {
    const directoryPath = path.join(DOCS_DIR, d);

    await fs.rm(directoryPath, { force: true, recursive: true });
    /* eslint-disable-next-line security-node/detect-crlf */
    console.log(`   -> Directory '${directoryPath}' removed.`);

    await fs.mkdir(directoryPath, { recursive: true });
    /* eslint-disable-next-line security-node/detect-crlf */
    console.log(`   -> Directory '${directoryPath}' created.`);
  }

  console.log('   Cleanup complete.');
}

/**
 * Downloads each document, rewrites its internal links to be relative,
 * and saves it to the docs directory.
 */
async function downloadAndSaveDocs(allUrls) {
  console.log('📖 3. Downloading, rewriting, and saving documentation...');
  const downloadPromises = [];

  for (const url of allUrls) {
    const urlMdFile = `${url}.md`;
    const fileSlug = path.basename(url);
    const filePath = path.join(DOCS_DIR, DOCS.code.type, `${fileSlug}.md`);

    downloadPromises.push(
      axios.get(urlMdFile, { responseType: 'text' })
        .then((response) => {
          /* eslint-disable-next-line security-node/detect-crlf */
          console.log(`   -> Processing ${filePath}`);
          const rewrittenContent = rewriteLocalLinks(response.data, filePath);
          return fs.writeFile(filePath, rewrittenContent, 'utf8');
        })
        .catch((error) => console.error(`   ! Failed to process ${urlMdFile}: ${error.message}`)),
    );
  }

  await Promise.all(downloadPromises);
  console.log('   File processing complete.');
}

/**
 * Fetches all URLs from the site's sitemap and filters for the target documentation.
 */
async function fetchAllUrlsFromSitemap() {
  console.log('🗺️ 2. Fetching all URLs from the sitemap...');
  const response = await axios.get(SITEMAP_URL, {
    headers: {
      'Accept': 'application/xml, text/xml',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    },
  });
  const parser = new Parser();
  const result = await parser.parseStringPromise(response.data);
  const allUrls = result.urlset.url.map((url) => url.loc[0]);
  const claudeUrls = allUrls.filter((url) => url.startsWith(URL_PREFIX));
  const logMessage = `${claudeUrls.length} Claude Code URLs found.`;
  /* eslint-disable-next-line security-node/detect-crlf */
  console.log(`   ${logMessage}`);

  if (claudeUrls.length <= 0) {
    /* eslint-disable-next-line security-node/detect-crlf */
    console.log(`   ‼️ ${logMessage}`);
    throw new Error(logMessage);
  }

  return claudeUrls;
}

/**
 * Generates a README.md file with a complete table of contents
 * linking to all the mirrored documentation files.
 */
async function generateReadme(allUrls) {
  console.log('👓 4. Generating README.md...');
  let readmeContent = '# Claude Code Docs\n\n';
  /* eslint-disable-next-line @stylistic/max-len */
  readmeContent += `_This repository is a mirror of the official [Claude Code](${URL_PREFIX}) documentation. It is updated automatically._\n\n`;
  readmeContent += `**Last updated:** ${new Date().toUTCString()}\n\n`;
  readmeContent += '---\n\n';

  readmeContent += '## Documentation\n\n';
  for (const url of allUrls) {
    const fileSlug = path.basename(url);
    const title = fileSlug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    readmeContent += `- [${title}](./${DOCS_DIR}/${DOCS.code.type}/${fileSlug}.md)\n`;
  }
  readmeContent += '\n';

  await fs.writeFile(DOCS.code.readmePath, readmeContent);
  console.log('   README.md successfully generated.');
}

/**
 * Rewrites absolute documentation links within the downloaded Markdown content
 * to relative local file links.
 */
function rewriteLocalLinks(content) {
  // This regex finds internal links like "/en/costs#fragment" or the older
  // "/en/docs/claude-code/page#fragment" and captures the slug and fragment.
  const linkRegex = /\]\(\/en\/(?:docs\/claude-code\/)?([^"#)]+)(#[^")]*)?\)/g;

  return content.replaceAll(linkRegex, (match, targetSlug, fragment = '') => {
    const safeFragment = fragment;

    // Reconstruct the Markdown link with a relative path to the local file.
    return `](./${targetSlug}.md${safeFragment})`;
  });
}

/**
 * The main function that orchestrates the entire mirroring process.
 */
async function run() {
  await cleanPreviousBuild();
  const allUrls = await fetchAllUrlsFromSitemap();
  await downloadAndSaveDocs(allUrls);
  await generateReadme(allUrls);
  console.log('\n✅ Claude Code documentation updated successfully!');
}

/**
 * Export.
 */
export default {
  DOCS,
  run,
};

// run().catch((error) => {
//   console.error('\n❌ A fatal error occurred during the process:', error);
//   process.exit(1);
// });
