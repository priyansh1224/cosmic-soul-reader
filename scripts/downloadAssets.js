// scripts/downloadAssets.js
// Run with: node scripts/downloadAssets.js

import https from 'https';
import fs from 'fs';
import path from 'path';

const ASSETS = {
  'public/textures/nebula.jpg':
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=80',
  'public/textures/crystal.png':
    'https://images.unsplash.com/photo-1551122087-f99a80664b88?w=1024&q=80',
};

async function downloadFile(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const follow = (targetUrl) => {
      https.get(targetUrl, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          follow(response.headers.location);
        } else {
          const file = fs.createWriteStream(dest);
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }
      }).on('error', reject);
    };
    follow(url);
  });
}

async function main() {
  console.log('🌌 Downloading Cosmic Soul Reader assets...\n');

  for (const [dest, url] of Object.entries(ASSETS)) {
    console.log(`  Downloading ${dest}...`);
    try {
      await downloadFile(url, dest);
      console.log(`  ✓ Saved ${dest}`);
    } catch (e) {
      console.error(`  ✗ Failed: ${e.message}`);
    }
  }

  console.log('\n✨ Done!');
}

main();
