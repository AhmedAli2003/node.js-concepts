const ReadableStream = require('./readable-stream');

const readableStream = new ReadableStream({
    readableHighWaterMark: 1024,
    readFileName: 'read.txt',
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
