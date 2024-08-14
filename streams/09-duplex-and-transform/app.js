const DuplexStream = require('./duplex-stream');

const duplex = new DuplexStream({
    readFileName: 'read.txt',
    writeFileName: 'write.txt',
});

duplex.write(Buffer.from('This is a string 0\n'));
duplex.write(Buffer.from('This is a string 1\n'));
duplex.write(Buffer.from('This is a string 2\n'));
duplex.write(Buffer.from('This is a string 3\n'));
duplex.end(Buffer.from('This is a string 4\n'));

duplex.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
});
