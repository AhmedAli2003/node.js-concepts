# ReadableStream

`ReadableStream` is a custom implementation of a readable stream using Node.js. This stream reads data from a specified file and is designed for educational purposes, demonstrating how to create custom readable streams.

## Features

- **Custom Readable Stream**: Reads data from a specified file.
- **High Watermark Control**: Manages the high-water mark for controlling the flow of data during reading operations.
- **Error Handling**: Ensures proper error handling and resource cleanup.

## Installation

To use this class, you need to have Node.js installed on your machine. You can include this class in your project by copying the `ReadableStream.js` file to your project directory.

## Usage

Here's an example of how to use the `ReadableStream` class in a Node.js application:

```javascript
const ReadableStream = require('./ReadableStream');

const readableStream = new ReadableStream({
    readableHighWaterMark: 1024,
    readFileName: 'input.txt',
});

readableStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.toString());
});

readableStream.on('end', () => {
    console.log('No more data to read.');
});

readableStream.on('error', (err) => {
    console.error('Stream encountered an error:', err);
});
```

## Methods

### _construct(callback)
Initializes the file descriptor for reading from the specified file.

### _read(size)
Handles the reading of data from the input file. It reads up to the specified `size` of bytes and pushes the data into the stream. If the end of the file is reached, it signals the end of the stream.

### _destroy(error, callback)
Cleans up resources and closes the file descriptor on error or when the stream is destroyed.

