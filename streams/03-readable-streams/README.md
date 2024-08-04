# Understanding Readable Streams in Node.js

## Internal Buffer

Similar to Writable Streams, Readable Streams have an internal buffer with a default size of 16384 bytes. The stream object includes several events, properties, and methods to manage its operations.

## The `stream.push(data)` Method

The `stream.push(data)` method is used to push data into the buffer. For example:
2000 bytes -> 2000 bytes -> 2000 bytes -> 2000 bytes -> 2000 bytes -> 2000 bytes 2000 bytes -> 2384 bytes.
This continues until the buffer is completely filled.

## Handling Data Events

When the buffer is fully filled, the stream object emits a 'data' event.
You keep listening for these 'data' events to process incoming chunks of data.
You can handle this event by running code like:

```javascript
stream.on('data', (chunk) => {
    // Process the chunk
});