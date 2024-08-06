# Understanding Readable Streams in Node.js

## Internal Buffer

Similar to Writable Streams, Readable Streams have an internal buffer with a default size of 16384 bytes. The stream object includes several events, properties, and methods to manage its operations.

A method is used to push data into the buffer. For example:
2000 bytes -> 2000 bytes -> 2000 bytes -> 2000 bytes -> 2000 bytes -> 2000 bytes 2000 bytes -> 2384 bytes.
This continues until the buffer is completely filled.

Default internal buffer size is 64 KB and it could be changed to another size.
Example on changing the internal buffer size to 400 bytes:
`const stream = fileHanlder.createReadStream({highWaterMark: 400});`

## Handling Data Events

When the buffer is fully filled, the stream object emits a 'data' event.
You keep listening for these 'data' events to process incoming chunks of data.
You can handle this event by running code like:

```javascript
stream.on('data', (chunk) => {
    // Process the chunk
});
```

If you don't listen to `data` event, then the stream will not start reading any data.

## Bad Approach

The bad approach that may be used is to read data using a readable stream and write it using a writable stream in this way:
```javascript
streamRead.on('data', (chunk) => {
    counter++;
    streamWrite.write(chunk);
});
```
This way is bad because the writable stream will not be able to drain the data, so the internal buffer will increase it size and will use a huge amount of memory if the file we are writing is large.
Also we should consider that the hard-drive reading is faster than writing, so we have a huge amount of data and no chance to writing them, so nodejs will start buffering the data like we saw previously (backpressure).

## Good Approache

This is the approach that should be used, it can handle very large files without any backpressure.

```javascript
  streamRead.on('data', (chunk) => {
        if (!streamWrite.write(chunk)) {
            streamRead.pause();
        }
    });

    streamWrite.on('drain', () => {
        streamRead.resume();
    });
```

In this way, we let the writable stream to be drained, so it can accept data without buffering it.
In some situations, we may need to make readable stream chunks size = 16 KB, and we may make more conditions when we need to write into a database or a card network, but this is the base idea.