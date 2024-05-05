const fs = require('fs');
const path = require('path');

// Source file path (original .env file)
const sourceFilePath = path.resolve(__dirname, '.env');

// Destination file path (public folder)
const destinationFilePath = path.resolve(__dirname, 'public', '.env');

// Copy the .env file to the public folder
fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
  if (err) {
    console.error('Error copying .env file:', err);
    return;
  }
  console.log('.env file copied successfully to public folder.');
});
