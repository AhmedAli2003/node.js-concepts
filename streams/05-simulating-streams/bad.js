const fs = require('node:fs/promises');

(async () => {
    console.time('copy');

    const destFile = await fs.open('dest.txt', 'w');
    const result = await fs.readFile('test.txt');
    console.log(result);
    await destFile.write(result);

    console.timeEnd('copy');
})();
