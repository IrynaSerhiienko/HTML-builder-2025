const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const bundleFile = path.join(outputDir, 'bundle.css');

async function mergeStyles() {
  try {
    // Create the 'project-dist' folder if it doesn't exist
    await fs.promises.mkdir(outputDir, { recursive: true });

    // Read the contents of the 'styles' folder
    const files = await fs.promises.readdir(stylesDir, { withFileTypes: true });

    // Array for storing the content of CSS files
    const styles = [];

    for (const file of files) {
      // Check that this is a file and its extension is '.css'
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesDir, file.name);

        // Read the content of the CSS file
        const content = await fs.promises.readFile(filePath, 'utf-8');

        // Add the contents of the file to the array
        styles.push(content);
      }
    }
    // Combine all styles and write them in 'bundle.css'
    await fs.promises.writeFile(bundleFile, styles.join('\n'));
    console.log('Styles successfully merged into bundle.css!');
  } catch (err) {
    console.error('Error merging styles:', err);
  }
}

mergeStyles();
