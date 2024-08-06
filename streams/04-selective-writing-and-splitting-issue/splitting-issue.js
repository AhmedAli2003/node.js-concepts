const fs = require('node:fs/promises');

(async () => {
    const fileHandlerRead = await fs.open('test.txt', 'r');

    const streamRead = fileHandlerRead.createReadStream();

    streamRead.on('data', (chunk) => {
        const numbers = chunk.toString('utf-8').split('\n');
        console.log(numbers[0] === '');
        console.log(numbers[0], numbers[numbers.length - 2], numbers[numbers.length - 1]);
        console.log('--------------------------------');
    });

    streamRead.on('close', () => {
        fileHandlerRead.close();
    });
})();
