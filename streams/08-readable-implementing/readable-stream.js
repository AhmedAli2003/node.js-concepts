const { Readable } = require('node:stream');
const fs = require('node:fs');

class ReadableStream extends Readable {
    constructor({ readableHighWaterMark, readFileName }) {
        super({ readableHighWaterMark });
        this.readFileName = readFileName;
        this.readFd = null;
    }

    _construct(callback) {
        fs.open(this.readFileName, 'r', (err, readFd) => {
            if (err) return callback(err);
            this.readFd = readFd;
            callback();
        });
    }

    _read(size) {
        const buffer = Buffer.allocUnsafe(size);
        fs.read(this.readFd, buffer, 0, size, null, (err, bytesRead) => {
            if (err) return this.destroy(err); // Destroy the stream on error
            this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null); // Push data or signal EOF
        });
    }

    _destroy(error, callback) {
        if (this.readFd) fs.close(this.readFd, () => {});
        callback(error);
    }
}

module.exports = ReadableStream;
