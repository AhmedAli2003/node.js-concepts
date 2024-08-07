# Simulating Streams

In This Folder, we will see two ways to copy a file without using nodejs streams, in the first way (bad way) we will use the simplest way to copy a file, then we will use a way that simulating streaming (better way).

## Bad Way

```javascript
(async () => {
    const destFile = await fs.open('dest.txt', 'w');
    const result = await fs.readFile('test.txt');
    await destFile.write(result);
})();
```

In This way, when we use `fs.readFile` method, we read the all file and load it into memory, if the file size is more than 2 GB, it will throw an error, else it will load all the file into memory, and return a buffer with all the file content, which make it bad way in terms of memory usage, and also it cannot deal with files large than 2 GB.
But it is fast, wo we still can use it with small files which loading them into memory will is not a big deal.

## Good Way

```javascript
(async () => {
    const srcFile = await fs.open('test.txt', 'r');
    const destFile = await fs.open('dest.txt', 'w');

    let bytesRead = -1;

    while (bytesRead !== 0) {
        const readResult = await srcFile.read();
        bytesRead = readResult.bytesRead;
        if (bytesRead === 16384) {
            destFile.write(readResult.buffer);
        } else {
            const buffer = Buffer.allocUnsafe(bytesRead);
            readResult.buffer.copy(buffer, 0, 0, bytesRead);
            destFile.write(buffer);
            break;
        }
    }
})();
```

In this way, we use `srcFile.read` method to read chunks from the file, it reads only 16 KB chunks, not all the data, it always allocate a 16 KB buffer, and if the remain data in the file is less than 16 KB, it will fill the not filled memory in the buffer with zeros (null), so every loop pass we will check if the data that has been read less than 16 KB, then we will write only the filled memory.

```javascript
if (bytesRead === 16384) {
    destFile.write(readResult.buffer);
} else {
    const buffer = Buffer.allocUnsafe(bytesRead);
    readResult.buffer.copy(buffer, 0, 0, bytesRead);
    destFile.write(buffer);
    break;
}
```

In the `else` block, we will allocate a new buffer, with the `bytesRead` size, and we will copy the filled memory into it, and then write it to the destination file, then we will break the loop.