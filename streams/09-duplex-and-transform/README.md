# DuplexStream

`DuplexStream` is a custom implementation of a duplex stream using Node.js. This stream reads data from one file and writes data to another file. It is built using the `node:stream` module, and it's a great example of how to create custom duplex streams for learning purposes.

## Features

- **Custom Duplex Stream**: Reads from one file and writes to another.
- **High Watermark Control**: Manages the high-water mark for both reading and writing operations.
- **Error Handling**: Ensures proper error handling and resource cleanup.

## Installation

To use this class, you need to have Node.js installed on your machine. You can include this class in your project by simply copying the `DuplexStream.js` file to your project directory.

## Usage

Here's an example of how to use the `DuplexStream` class in a Node.js application:

```javascript
const DuplexStream = require('./DuplexStream');

const duplexStream = new DuplexStream({
    writableHighWaterMark: 1024,
    readableHighWaterMark: 1024,
    readFileName: 'input.txt',
    writeFileName: 'output.txt',
});

duplexStream.on('error', (err) => {
    console.error('Stream encountered an error:', err);
});

duplexStream.on('finish', () => {
    console.log('Stream finished processing.');
});

// Write some data to the stream
duplexStream.write('Hello, this is a test!');
duplexStream.end();
```

## Methods

### _construct(callback)
Initializes the file descriptors for reading and writing.

### _write(chunk, encoding, callback)
Handles the writing of data chunks to the output file.

### _read(size)
Reads data from the input file and pushes it to the readable side of the stream.

### _final(callback)
Finalizes the writing process and closes the output file.

### _destroy(error, callback)
Cleans up resources and closes file descriptors on error or when the stream is destroyed.