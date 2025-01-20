const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(destDir, { recursive: true });
    const items = await fs.readdir(srcDir, { withFileTypes: true });

    for (const item of items) {
      const srcPath = path.join(srcDir, item.name);
      const destPath = path.join(destDir, item.name);

      if (item.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    }
    console.log('Copy complete!');
  } catch (err) {
    console.error('Error', err);
  }
}

copyDir();
