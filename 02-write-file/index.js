const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create a path to the file where we will write the text
const filePath = path.join(__dirname, 'output.txt');

// Create a stream of writing to the file
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

// Create an interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  'Welcome! Enter the text you want to write to the file. To exit, enter "exit" or press Ctrl+C.',
);

// Listen to user input
rl.on('line', (input) => {
  if (input.trim().toLocaleLowerCase() === 'exit') {
    console.log('Thank you! The work is complete.');
    rl.close();
  } else {
    // Write the entered text to a file
    writeStream.write(`${input}\n`);
    console.log(
      'The text is recorded. Enter the following text or "exit" to exit.',
    );
  }
});

process.on('SIGINT', () => {
  console.log('\nFarewell! The work is completed.');
  rl.close();
});
