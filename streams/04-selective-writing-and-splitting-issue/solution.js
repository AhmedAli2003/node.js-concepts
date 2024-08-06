const fs = require('node:fs/promises');

function isPrime(n) {
    // Check for edge cases
    if (n <= 1) return false; // 0 and 1 are not prime
    if (n <= 3) return true;  // 2 and 3 are prime

    // Eliminate multiples of 2 and 3
    if (n % 2 === 0 || n % 3 === 0) return false;

    // Check for factors from 5 to the square root of n
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
}

(async () => {
    const fileHandlerRead = await fs.open('test.txt', 'r');
    const fileHandlerWrite = await fs.open('dest.txt', 'w');

    const streamRead = fileHandlerRead.createReadStream();
    const streamWrite = fileHandlerWrite.createWriteStream();

    let split = '';
    streamRead.on('data', (chunk) => {
        const str = chunk.toString('utf-8').replace(/^\n+|\n+$/g, '');

        const numbers = str.split('\n');

        const length = numbers.length;

        if (split) {
            numbers[0] = split + numbers[0];
            split = '';
        }

        if (Number(numbers[length - 2]) + 1 !== Number(numbers[length - 1])) {
            split = numbers.pop(); // remove and get the last damaged number
        }

        for (const n of numbers) {
            if (isPrime(n)) {
                if (!streamWrite.write(`${n}\n`)) {
                    streamRead.pause();
                }
            }
        }
    });

    streamWrite.on('drain', () => {
        streamRead.resume();
    });

    streamRead.on('close', () => {
        fileHandlerRead.close();
        fileHandlerWrite.close();
    });
})();
