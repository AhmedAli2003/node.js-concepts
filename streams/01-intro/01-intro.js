// Benchmarking Writing a Million Times to a File

// Using promises (Asynchronous Programming)
const fs = require('fs/promises');
(async () => {
    console.time('writeMany');

    const fileHandler = await fs.open("test.txt", "w");
    for (let i = 0; i < 1000000; i++) {
        await fileHandler.write(`Line ${i + 1}\n`);
    }

    console.timeEnd('writeMany');
})();
console.time('writeMany');

// Using Synchronous Programming
const fs = require('fs');
console.time('writeMany');
fs.open('test.txt', 'w', (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
        fs.writeSync(fd, `Line ${i + 1}\n`);
    }
    console.timeEnd('writeMany');
});
