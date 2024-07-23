const { Buffer } = require('buffer');

// Node implicitly allocate a buffer for you when it start running
// You can use this buffer, it is fast
console.log(Buffer.poolSize); // 8KB = 8192 bytes
// You only use this buffer if you use Buffer.allocUnsafe(...)
// If you use Buffer.alloc(), then you don't use the node buffer

console.log(Buffer.poolSize >>> 1); // 4KB = 4192 bytes (half of the buffer)
// The another condition is that you can only access node buffer if you allocate a buffer
// with a size = Buffer.poolSize >>> 1
// If the buffer you are allocating is bigger than that, then you will not access the node buffer.

// Buffer.allocUnsafeSlow is the same as Buffer.allocUnsafe, But it doesn't use the node buffer
