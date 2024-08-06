const fs = require('node:fs/promises');

// Memory Usage: 50 - 55 MB

// We let the buffer drain, and when it drained, we continue writing on it.
(async () => {
    console.time('writeMany');
    const fileHandler = await fs.open('test.txt', 'w');
    const stream = fileHandler.createWriteStream();

    let drainTimes = 0;

    let i = 0;
    const writeData = () => {
        let canWrite = true;
        while (i < 1e6 && canWrite) {
            canWrite = stream.write(`${i}\n`);

            // If the the last writing operation, we will end the stream
            // Writing on the stream after it is ended will cause an error.
            if (i === 999999) {
                i++;
                stream.end();
            }
            i++;
        }
    };

    writeData();

    stream.on('drain', () => {
        drainTimes++;
        // When the stream is drained, we will continue to write
        writeData();
    });

    stream.on('finish', () => {
        // This event will be emitted when the stream is ended
        console.log(`Drained ${drainTimes} times`);
        console.timeEnd('writeMany');
        fileHandler.close();
    });
})();
