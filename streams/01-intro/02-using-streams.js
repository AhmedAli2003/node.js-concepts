const fs = require('fs/promises');

(async () => {
    console.time('writeMany');
    const fildHandler = await fs.open('test.txt', 'w');
    const stream = fildHandler.createWriteStream();

    for (let i = 0; i < 1000000; i++) {
        stream.write(`Line ${i + 1}\n`);
    }
    console.timeEnd('writeMany');
})();
