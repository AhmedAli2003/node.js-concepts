const { Transform } = require('node:stream');

class Decrypt extends Transform {
    _transform(chunk, encoding, callback) {
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 0) {  // To avoid underflow for the byte value
                chunk[i] = chunk[i] - 1;
            }
        }
        this.push(chunk);
        callback();
    }
}

module.exports = Decrypt;
