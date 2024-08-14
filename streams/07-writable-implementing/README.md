# WritableStream

`WritableStream` is a custom implementation of a writable stream using Node.js. This stream writes data to a specified file and is designed for educational purposes, demonstrating how to create custom writable streams.

## Features

- **Custom Writable Stream**: Writes data to a specified file.
- **High Watermark Control**: Manages the high-water mark for controlling backpressure during writing operations.
- **Error Handling**: Ensures proper error handling and resource cleanup.

## Installation

To use this class, you need to have Node.js installed on your machine. You can include this class in your project by copying the `WritableStream.js` file to your project directory.

## Usage

Here's an example of how to use the `WritableStream` class in a Node.js application:

```javascript
const WritableStream = require('./WritableStream');

const writableStream = new WritableStream({
    writableHighWaterMark: 1024,
    writeFileName: 'output.txt',
});

writableStream.on('error', (err) => {
    console.error('Stream encountered an error:', err);
});

writableStream.on('finish', () => {
    console.log('Stream finished writing.');
});

// Write some data to the stream
writableStream.write('Hello, this is a test!');
writableStream.write('This is another chunk of data.');
writableStream.end('Final chunk of data.');
```

## Methods

### _construct(callback)
Initializes the file descriptor for writing to the specified file.

### _write(chunk, encoding, callback)
Handles the writing of data chunks to the output file. It buffers chunks in memory and writes them to the file when the buffer size exceeds the high-water mark.

### _final(callback)
Finalizes the writing process, ensuring any remaining buffered data is written to the file before closing the file descriptor.

### _destroy(error, callback)
Cleans up resources and closes the file descriptor on error or when the stream is destroyed.