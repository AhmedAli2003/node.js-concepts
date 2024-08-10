const fs = require('node:fs/promises');

// Don't use in production
(async () => {
    console.time('copy');

    const srcFile = await fs.open('test.txt', 'r');
    const destFile = await fs.open('dest.txt', 'w');

    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();

    readStream.pipe(writeStream);

    readStream.on('end', () => {
        srcFile.close();
        destFile.close();
        readStream.close();
        writeStream.close();
        console.timeEnd('copy');
    });
})();
