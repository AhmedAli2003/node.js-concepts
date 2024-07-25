// File content is a buffer
const fs = require('fs');

const file = fs.readFileSync('./text.txt');
console.log(file); // <Buffer 54 68 69 73 20 69 73 20 61 20 66 69 6c 65 21>
console.log(file.toString("utf8")); // This is a file!
