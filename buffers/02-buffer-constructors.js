// Buffer.alloc(BYTES, DEFAULT_VALUE_TO_FILL = 0)
// This method is not the fastest way, because filling the buffer takes a time
const buff1 = Buffer.alloc(10);
console.log(buff1);

// Buffer.from(FROM)
const buff2 = Buffer.from([0x65, 0x22, 0xda]);
console.log(buff2);

const buff3 = Buffer.from("6522da", "hex");
console.log(buff3); // buff2 and buff3 are the same

const buff4 = Buffer.from("Ahmed!", "utf8");
console.log(buff4); // <Buffer 41 68 6d 65 64 21>

// Fast, becuase it doesn't care about filling with zeros
// This way is unsafe because the buffer that allocated may have some existing data
// and there is no guarantee that it will be filled with zeros.
// If someone get access to the buffer, he will be able to read the existing data which may be important.
// After running this code, you may find a lot of things are printed
const unsafeBuffer = Buffer.allocUnsafe(10000);
for (let i = 0; i < unsafeBuffer.length; i++) {
    if (unsafeBuffer[i] !== 0) {
        console.log(`Element at position ${i} has value: ${unsafeBuffer[i].toString(2)}`);
    }
}

// Buffer.from and Buffer.concat are using Buffer.allocUnsafe behind the scenes
// But they are fill the buffer with the values as soon as possible

// You can use allocUnsafe when you are sure you want to fill the buffer
// DON'T allocate a buffer using allocUnsafe and then let it without filling.

Buffer.allocUnsafeSlow(10); // We will take about it in buffer-and-node file
