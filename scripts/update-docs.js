/* eslint-disable unicorn/prevent-abbreviations */
import fs from 'node:fs/promises';

import updateCodeDocs from './update-code-docs.js';
import updatePlatformDocs from './update-platform-docs.js';

const scripts = [
  updateCodeDocs,
  updatePlatformDocs,
];

// --- Configuration ---
const DOCS_DIR = 'docs';
const README_PATH = `${DOCS_DIR}/README.md`;

/**
 * Removes previously generated README.
 */
async function cleanPreviousBuild() {
  console.log('🧼 1. Cleaning up previous build...');

  await fs.rm(DOCS_DIR, { force: true, recursive: true });
  /* eslint-disable-next-line security-node/detect-crlf */
  console.log(`   -> Directory '${DOCS_DIR}' removed.`);

  await fs.mkdir(DOCS_DIR, { recursive: true });
  /* eslint-disable-next-line security-node/detect-crlf */
  console.log(`   -> Directory '${DOCS_DIR}' created.`);

  await fs.rm(README_PATH, { force: true });
  /* eslint-disable-next-line security-node/detect-crlf */
  console.log(`   -> File '${README_PATH}' removed.`);
}

/**
 * Generates a root README.md file with a complete table of contents
 * linking to all the documentation directories.
 */
async function generateReadme() {
  console.log('👓 4. Generating root README.md...');
  let readmeContent = '# Claude Mirror Docs\n\n';
  /* eslint-disable-next-line @stylistic/max-len */
  readmeContent += '_This section lists all the mirroring documentation from the official **Claude** documentation. It is updated automatically._\n\n';
  readmeContent += `**Last updated:** ${new Date().toUTCString()}\n\n`;
  readmeContent += '---\n\n';

  readmeContent += '## Documentation\n\n';

  for (const script of scripts) {
    const docs = { ...script.DOCS };

    for (const type of Object.keys(docs)) {
      readmeContent += `- [${docs[type].name}](${docs[type].readmePath.replace(DOCS_DIR, '.')})\n`;
    }
  }

  readmeContent += '\n';

  await fs.writeFile(README_PATH, readmeContent);
  /* eslint-disable-next-line security-node/detect-crlf */
  console.log(`   ${README_PATH} successfully generated.`);
}

/**
 * The main function that orchestrates the entire mirroring process.
 */
async function main() {
  await cleanPreviousBuild();
  await Promise.all([updatePlatformDocs.run(), updateCodeDocs.run()]);
  await generateReadme();
  console.log('\n✅ Documentation update process completed successfully!');
  /* eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit */
  process.exit(0);
}

/* eslint-disable-next-line unicorn/prefer-top-level-await */
main().catch((error) => {
  console.error('\n❌ A fatal error occurred during the process:', error);
  /* eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit */
  process.exit(1);
});
