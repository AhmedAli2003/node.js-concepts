const fs = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');

(async () => {
    console.time('copy');
    
    const srcFile = await fs.open('test.txt', 'r');
    const destFile = await fs.open('dest.txt', 'w');
    
    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();
    
    await pipeline(readStream, writeStream);
    srcFile.close();
    destFile.close();

    console.timeEnd('copy');
})();
