const Encrypt = require('./encrypt-stream');
const Decrypt = require('./decrypt-stream');  // Import the Decrypt stream
const fs = require('node:fs/promises');

(async () => {
    const readFileHandler = await fs.open('read.txt', 'r');
    const writeFileHandler = await fs.open('write.txt', 'w');

    const readStream = readFileHandler.createReadStream();
    const writeStream = writeFileHandler.createWriteStream();

    const encrypt = new Encrypt();
    const decrypt = new Decrypt();

    // First, encrypt the data and write it to the file
    readStream.pipe(encrypt).pipe(writeStream);

    // Wait for the writeStream to finish before starting decryption
    writeStream.on('finish', async () => {
        // Close the current file handlers
        await readFileHandler.close();
        await writeFileHandler.close();

        // Open the encrypted file for reading and the output file for writing the decrypted data
        const encryptedFileHandler = await fs.open('write.txt', 'r');
        const decryptedFileHandler = await fs.open('decrypted.txt', 'w');

        const encryptedReadStream = encryptedFileHandler.createReadStream();
        const decryptedWriteStream = decryptedFileHandler.createWriteStream();

        // Pipe the encrypted file through the Decrypt stream to decrypt it
        encryptedReadStream.pipe(decrypt).pipe(decryptedWriteStream);

        // Close file handlers after decryption is complete
        decryptedWriteStream.on('finish', async () => {
            await encryptedFileHandler.close();
            await decryptedFileHandler.close();
            console.log('Decryption complete.');
        });
    });
})();
