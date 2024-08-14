const { Duplex } = require('node:stream');
const fs = require('node:fs');

class DuplexStream extends Duplex {

    constructor({
        writableHighWaterMark,
        readableHighWaterMark,
        readFileName,
        writeFileName,
    }) {
        super({ readableHighWaterMark, writableHighWaterMark });
        this.readFileName = readFileName;
        this.writeFileName = writeFileName;
        this.readFd = null;
        this.writeFd = null;
        this.chunks = [];
        this.chunksSize = 0;
    }

    _construct(callback) {
        fs.open(this.readFileName, 'r', (err, readFd) => {
            if (err) return callback(err);
            this.readFd = readFd;
            fs.open(this.writeFileName, 'w', (err, writeFd) => {
                if (err) return callback(err);
                this.writeFd = writeFd;
                callback();
            });
        });
    }

    _write(chunk, encoding, callback) {
        this.chunks.push(chunk);
        this.chunksSize += chunk.length;

        if (this.chunksSize > this.writableHighWaterMark) {
            fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
                if (err) return callback(err);
                this.chunks = [];
                this.chunksSize = 0;
                callback();
            });
        } else {
            callback();
        }
    }

    _read(size) {
        const buffer = Buffer.allocUnsafe(size);
        fs.read(this.readFd, buffer, 0, size, null, (err, bytesRead) => {
            if (err) return this.destroy(err); // Destroy stream on error
            this.push(bytesRead > 0 ? buffer.subarray(0, bytesRead) : null);
        });
    }

    _final(callback) {
        fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
            if (err) return callback(err);
            this.chunks = [];
            fs.close(this.writeFd, (err) => {
                if (err) return callback(err);
                callback();
            });
        });
    }

    _destroy(error, callback) {
        if (this.readFd) fs.close(this.readFd, () => {});
        if (this.writeFd) fs.close(this.writeFd, () => {});
        callback(error);
    }
}

module.exports = DuplexStream;
