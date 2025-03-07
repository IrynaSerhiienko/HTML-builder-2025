const fs = require('fs').promises;
const path = require('path');

async function copyDirectory(srcDir, destDir) {
  try {
    // Delete the destination folder if it exists
    await fs.rm(destDir, { recursive: true, force: true });

    // Create the destination folder again
    await fs.mkdir(destDir, { recursive: true });

    // Read the contents of the source folder
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

if (require.main === module) {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');
  copyDirectory(srcDir, destDir);
}

module.exports = copyDirectory;
