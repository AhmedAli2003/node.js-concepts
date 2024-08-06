const fs = require('node:fs/promises');

// In this way, writing is very fast, because we read the stream in 64 Kb chunks, then we
// write on the file in little times.

(async () => {
    const fileHandlerRead = await fs.open('test.txt', 'r');
    const fileHandlerWrite = await fs.open('dest.txt', 'w');

    const streamRead = fileHandlerRead.createReadStream();
    const streamWrite = fileHandlerWrite.createWriteStream();

    let counter = 0;
    
    streamRead.on('data', (chunk) => {
        counter++;
        streamWrite.write(chunk);
    });

    streamRead.on('close', () => {
        console.log(`Read and written ${counter} chunks`);
        fileHandlerRead.close();
        fileHandlerWrite.close();
    });
})();
