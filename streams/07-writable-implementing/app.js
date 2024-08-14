const WritableStream = require('./writable-stream');

const writableStream = new WritableStream({
    writableHighWaterMark: 1024,
    writeFileName: 'write.txt',
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
