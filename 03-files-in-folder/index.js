const fs = require('fs');
const path = require('path');

// The path to the folder in which we will search for files
const folderPath = path.join(__dirname, 'secret-folder');

// Asynchronously read the contents of the folder
fs.promises
  .readdir(folderPath, { withFileTypes: true })
  .then((files) => {
    // Go through each file in the folder
    files.forEach((file) => {
      // Check that this is a file (not a directory)
      if (file.isFile()) {
        // Get the full path to the file
        const filePath = path.join(folderPath, file.name);

        // Get information about the file
        fs.promises
          .stat(filePath)
          .then((stats) => {
            const fileName = path.parse(file.name).name;
            const fileExtension = path.extname(file.name).slice(1);
            const fileSize = (stats.size / 1024).toFixed(3);

            console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
          })
          .catch((err) => console.error('Error reading  file stats:', err));
      }
    });
  })
  .catch((err) => console.error('Error reading directory:', err));
