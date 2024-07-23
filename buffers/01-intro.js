const { Buffer } = require('buffer');

// Create a new Buffer object with 4 bytes of allocated memory
const memoryContainer = Buffer.alloc(4);

console.log(memoryContainer); // <Buffer 00 00 00 00> (the values are desplayed in hex)

console.log(memoryContainer[0]); // 0 (decimal)

// Change the value of bytes allocated
memoryContainer[0] = 0xf4; // 0xf4 = 244
memoryContainer[1] = 0x34; // 0x34 = 52
memoryContainer[2] = 0xb6; // 0xb6 = 182
memoryContainer[3] = 0xff; // 0xff = 255

// The buffer now is completely filled
console.log(memoryContainer); // <Buffer f4 34 b6 ff>
console.log(memoryContainer[0]); // 244
console.log(memoryContainer[1]); // 52
console.log(memoryContainer[2]); // 182
console.log(memoryContainer[3]); // 255

// Note about negative numbers
memoryContainer[0] = 0xf4; // 0xf4 = 244
memoryContainer[1] = -34; // 11011110 (binary)
memoryContainer[2] = 0xb6; // 0xb6 = 182
memoryContainer[3] = 0xff; // 0xff = 255

// The buffer here takes the binary representation of negative numbers
// as they are represented as positive numbers (without 1st and 2nd compliments)
console.log(memoryContainer); // <Buffer f4 de b6 ff>
console.log(memoryContainer[0]); // 244
// the 2nd compliment of 222 is -34
// 222 and -34 have the same binary representation, the buffer understands it as positive
console.log(memoryContainer[1].toString(2)); // 222 (11011110)
console.log(memoryContainer[2]); // 182
console.log(memoryContainer[3]); // 255

// To store negative integers or any value you can use write and read methods
// Using methods in safer than the basic assignment way that we have used above
memoryContainer.writeInt8(-34, 2); // at index 2
console.log(memoryContainer.readInt8(2)); // -34

console.log(memoryContainer.toString("hex")); // f4dedeff
