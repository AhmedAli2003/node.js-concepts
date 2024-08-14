const { Transform } = require('node:stream');

class Encrypt extends Transform {
    _transform(chunk, encoding, callback) {
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 255) {
                chunk[i] = chunk[i] + 1;
            }
        }
        this.push(chunk);
        callback();
    }
}

module.exports = Encrypt;
