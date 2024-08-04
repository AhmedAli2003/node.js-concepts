const fs = require('node:fs/promises');

// Memory usage: 220 MB

(async () => {
    console.time('writeMany');
    const fileHandler = await fs.open('test.txt', 'w');
    const stream = fileHandler.createWriteStream();

    console.log(`Stream's buffer size: ${stream.writableHighWaterMark}`); // 16KiB
    console.log(`Stream's buffer length filled: ${stream.writableLength}`); // 0

    // BAD - You should NOT use.
    // In this way the buffer has 16 Kilo bytes, and we push data on it, but we don't
    // let it drains, so when we exceed the buffer size, it will allocate more bytes from
    // the memory, in this way, there is no value from using streams!
    for (let i = 0; i < 1e6; i++) {
        stream.write(`Line ${i + 1}\n`);
        // console.log(stream.writableLength); // will exceed 16KB
    }

    console.timeEnd('writeMany');
})();
