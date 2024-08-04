# Understanding Writable Streams in Node.js

## What Happens Inside a Stream Object?

### Internal Buffer

Inside a writable stream object, there is an internal buffer with a default size of 16384 bytes. The stream object also includes several events, properties, and methods to manage its operations.

### The `stream.write()` Method

stream.write() method does pushing some data to the buffer like this:
300 bytes -> 154 bytes -> 432 bytes -> 2300 bytes -> 6 bytes ....
and you keep writing until the buffer is completely filled.

## Writing Data in Chunks

When the buffer is fully filled, the stream object performs a write operation with these 16384 bytes as one chunk of data. This chunking mechanism is a key reason why streams are faster than normal writing methods. By gathering data into the buffer and then performing a single write operation, the stream reduces the number of write operations, thereby enhancing performance.

## Draining the Buffer

The process of emptying the buffer is known as draining. Once the buffer is drained, it is ready to accept more data.
