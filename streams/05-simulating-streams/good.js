const fs = require('node:fs/promises');

(async () => {
    console.time('copy');

    const srcFile = await fs.open('test.txt', 'r');
    const destFile = await fs.open('dest.txt', 'w');

    let bytesRead = -1;

    while (bytesRead !== 0) {
        const readResult = await srcFile.read();
        bytesRead = readResult.bytesRead;
        console.log(readResult);
        console.log(bytesRead);
        if (bytesRead === 16384) {
            destFile.write(readResult.buffer);
        } else {
            const buffer = Buffer.allocUnsafe(bytesRead);
            readResult.buffer.copy(buffer, 0, 0, bytesRead);
            destFile.write(buffer);
            break;
        }
    }

    console.timeEnd('copy');
})();
