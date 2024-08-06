const fs = require('node:fs/promises');

(async () => {
    const fileHandlerRead = await fs.open('test.txt', 'r');
    const fileHandlerWrite = await fs.open('dest.txt', 'w');

    const streamRead = fileHandlerRead.createReadStream();
    const streamWrite = fileHandlerWrite.createWriteStream();

    let counter = 0;

    streamRead.on('data', (chunk) => {
        counter++;
        // When the writable stream buffer is filled, we will pause the readable stream, to let the
        // writable stream to continue writing on it.
        if (!streamWrite.write(chunk)) {
            streamRead.pause();
        }
    });

    // When the writable stream buffer is empty, we will resume the readable stream, to let it
    // start reading from the file again.
    streamWrite.on('drain', () => {
        streamRead.resume();
    });

    streamRead.on('close', () => {
        console.log(`Read and written ${counter} chunks`);
        fileHandlerRead.close();
        fileHandlerWrite.close();
    });
})();
