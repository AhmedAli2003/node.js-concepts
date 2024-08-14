const { Writable } = require('node:stream');
const fs = require('node:fs');

class WritableStream extends Writable {
    constructor({ writableHighWaterMark, writeFileName }) {
        super({ writableHighWaterMark });
        this.writeFileName = writeFileName;
        this.writeFd = null;
        this.chunks = [];
        this.chunksSize = 0;
    }

    _construct(callback) {
        fs.open(this.writeFileName, 'w', (err, writeFd) => {
            if (err) return callback(err);
            this.writeFd = writeFd;
            callback();
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
        if (this.writeFd) fs.close(this.writeFd, () => {});
        callback(error);
    }
}

module.exports = WritableStream;
