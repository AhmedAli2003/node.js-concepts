# Intro to Files in Node.js

## What Exactly is a File?

A file is a unit of digital storage that holds information. Files are used to store data such as text, images, videos, and software code. In most operating systems, files are organized in directories (or folders), which help users and applications find and manage files efficiently.

## How Node.js Deals with Files

Node.js provides built-in modules to handle file operations. The `fs` (file system) module allows you to interact with the file system on your machine. With `fs`, you can perform operations such as reading, writing, updating, and deleting files.

### Reading Files

One common operation is reading the contents of a file. Node.js offers synchronous and asynchronous methods to read files. The synchronous method blocks the execution of the program until the file is read, whereas the asynchronous method does not.

Here is an example of how to read a file synchronously using Node.js:

```javascript
const { readFileSync } = require('fs');

// Read the file content synchronously
const file = readFileSync('./text.txt');

// Display the raw buffer content
console.log(file); // <Buffer 54 68 69 73 20 69 73 20 61 20 66 69 6c 65 21>

// Convert the buffer to a string and display it
console.log(file.toString("utf8")); // This is a file!
