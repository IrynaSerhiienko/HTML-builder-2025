const fs = require('fs').promises;
const path = require('path');
const copyDirectory = require('./../04-copy-directory');
const mergeStyles = require('./../05-merge-styles');

const projectDistDir = path.join(__dirname, 'project-dist');
const templateFilePath = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const outputCssFile = path.join(projectDistDir, 'style.css');
const outputHtmlFile = path.join(projectDistDir, 'index.html');

// Function for replacing template tags in HTML
async function replaceTemplateTags() {
  let templateContent = await fs.readFile(templateFilePath, 'utf-8');

  // Get a list of components in the components folder
  const componentFiles = await fs.readdir(componentsDir);

  for (const file of componentFiles) {
    const componentName = path.parse(file).name;
    const componentTag = `{{${componentName}}}`;

    if (path.extname(file) === '.html') {
      const componentContent = await fs.readFile(
        path.join(componentsDir, file),
        'utf-8',
      );
      // Replace the tags with the contents of the components
      templateContent = templateContent.replace(componentTag, componentContent);
    } else {
      console.error('Error: Component file does not have .html extension');
    }
  }

  // Write the result in index.html
  await fs.writeFile(outputHtmlFile, templateContent);
}

// Function for copying assets
async function copyAssets() {
  const outputAssetsDir = path.join(projectDistDir, 'assets');

  // Create a folder for assets if it does not exist
  await fs.mkdir(outputAssetsDir, { recursive: true });

  const assetFiles = await fs.readdir(assetsDir);
  for (const file of assetFiles) {
    const sourcePath = path.join(assetsDir, file);
    const destinationPath = path.join(outputAssetsDir, file);

    const stat = await fs.stat(sourcePath);
    if (stat.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}

// Main function for building the project
async function buildPage() {
  try {
    await fs.mkdir(projectDistDir, { recursive: true });
    await replaceTemplateTags();
    await mergeStyles(stylesDir, projectDistDir, outputCssFile);
    await copyAssets();
    console.log('Page has been built successfully!');
  } catch (error) {
    console.error('Error building the page', error);
  }
}

// Run
buildPage();
