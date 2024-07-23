const { Buffer, constants } = require('buffer');

// WARNING: use a size that is sutable with your memory size.
const b = Buffer.alloc(3e9); // 3GB

// After 5 seconds, node will allocate 3GB from RAM, and put values to it
// You can see in the task manager that node has allocated 3GB from RAM
// And it will be on the top of using RAM resources
setTimeout(() => {
    for (let i = 0; i < b.length; i++) {
        b[i] = i % 256; // set each byte to its index modulo 256
    }
    // If you want to fill the buffer with the same value, you can use buffer.fill(VALUE)
    // It is much faster than the for loop.
}, 5000);

console.log(constants.MAX_LENGTH); // 4GB by default, the max buffer you can allocate, you can change it
console.log(constants.MAX_STRING_LENGTH);
