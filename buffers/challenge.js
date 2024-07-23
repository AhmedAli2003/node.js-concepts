// Write this to a buffer then print them in utf8 encoding
// 0100 1000 0110 1001 0010 0001

const { Buffer } = require('buffer');

const buff = Buffer.alloc(3); // we need 24 bits which equals 3 bytes

buff[0] = 0b01001000;
buff[1] = 0b01101001;
buff[2] = 0b00100001;

console.log(buff.toString('utf8'));

// Another way
const anotherBuff = Buffer.from([0b01001000, 0b01101001, 0b00100001]);
console.log(buff.toString('utf8'));
