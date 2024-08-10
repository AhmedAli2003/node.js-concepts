# Stream Piping

Stream piping in Node.js is a powerful mechanism that allows you to connect the output of one stream to the input of another stream. This is especially useful when you want to perform a series of operations on data without having to store it all in memory, which makes it ideal for handling large files or data flows.

## How Does Piping Work?
Piping is a method that allows you to connect streams so that data flows from one to another. The most common use case is to pipe data from a readable stream to a writable stream.

Here’s an example of piping a readable file stream to a writable file stream:

```javascript
(async () => {
    const srcFile = await fs.open('test.txt', 'r');
    const destFile = await fs.open('dest.txt', 'w');

    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();

    readStream.pipe(writeStream);
})();
```

In this example, data is read from `test.txt` and directly written to `dest.txt` without ever fully loading the entire file into memory. This makes the operation very efficient, especially for large files.

## Chaining Multiple Streams

You can also chain multiple streams together using piping. This is common when you need to perform several operations on the data. For instance, you can read a file, compress it, and then write the compressed data to another file:

```javascript
// Pipe the streams together
readableStream
  .pipe(gzip)
  .pipe(writableStream);
```

In this example, the readableStream is piped into the gzip stream, which compresses the data, and then piped into the writableStream to save the compressed data as `dest.txt.gz`.

## What is the pipeline Function?

The `pipeline` function in the `node:streams` package is a utility in Node.js that simplifies the process of piping streams together. It provides a more robust and error-tolerant way to chain multiple streams, handling errors and ensuring that resources are properly released when the streams are finished.

Basic Usage
The basic usage of the `pipeline` function is as follows:

```javascript
const fs = require('node:fs/promises');
const { pipeline } = require('node:stream');

(async () => {    
    const srcFile = await fs.open('test.txt', 'r');
    const destFile = await fs.open('dest.txt', 'w');
    
    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();
    
    pipeline(readStream, writeStream, (error) => {
        if (error) // Handle the error
    });
})();
```

## Key Features of pipeline

### Automatic Error Handling
One of the main advantages of `pipeline` is its built-in error handling. If any stream in the pipeline encounters an error, the pipeline function ensures that all streams are closed and the error is propagated to the callback.

### Resource Management
`pipeline` ensures that all streams are properly closed when the operation is complete, preventing resource leaks.

### Asynchronous Support
The `pipeline` function works well with both synchronous and asynchronous streams, making it flexible for various use cases.

### Promises Support
Starting from Node.js v15, pipeline can return a Promise if no callback is provided, allowing you to use it with `async/await` syntax

## Advantages of Using `pipeline`
- Simplified Code: It reduces boilerplate code for handling errors and managing resources.
- More Reliable: Since it automatically handles stream closure and error propagation, it's more reliable than manually chaining streams with pipe.
- Compatibility: Works seamlessly with Node.js streams, including those you create or those provided by Node.js core modules.

