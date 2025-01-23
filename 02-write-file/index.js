const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

// Create a path to the file where we will write the text
const filePath = path.join(__dirname, 'output.txt');

// Create a stream of writing to the file
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

stdout.write(
  'Welcome! Enter the text you want to write to the file. To exit, enter "exit" or press Ctrl+C.:\n',
);

// Listen to user input
stdin.on('data', (data) => {
  const inputData = data.toString().trim().toLowerCase();
  if (inputData === 'exit') {
    stdout.write('\nThank you! The work is complete.');
    process.exit();
  } else {
    // Write the entered text to a file
    writeStream.write(`${data}\n`);
    stdout.write(
      'The text is recorded. Enter the following text or "exit" to exit.\n',
    );
  }
});

process.on('SIGINT', () => {
  stdout.write('\nFarewell! The work is completed.');
  process.exit();
});
