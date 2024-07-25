// Disable Auto Save if it is enabled //

const fs = require('fs/promises');

const COMMAND_FILE_PATH = './command.txt';

(async () => {

    // Open the file
    // When you open a file, you don't load the file content into memory
    // you just have a file descriptor which is a unique identifier (number) to access the file
    // FileHandle object: object wrapper for a numeric file descriptor
    // All FileHandle objects are EventEmitter objects
    const commandFileHandler = await fs.open(COMMAND_FILE_PATH, 'r');

    // Add the function for the change event
    commandFileHandler.on('change', () => changeEventHandler(commandFileHandler));

    // Watch the file changes and get an Async Iterable
    const watcher = fs.watch(COMMAND_FILE_PATH);

    // watcher...
    for await (const event of watcher) {
        if (event.eventType === 'change' && event.filename === 'command.txt') {
            // Emit an change event
            commandFileHandler.emit('change');
        }
    }

})();

console.log('Start the app!');

const changeEventHandler = async (commandFileHandler) => {
    // Get the size of file content in bytes
    const size = (await commandFileHandler.stat()).size;

    // Allocate a buffer with the size of the file
    const buffer = Buffer.allocUnsafe(size);

    // The location in the buffer at which to start filling.
    const offset = 0;

    // The location where to begin reading data from the file.
    const position = 0;

    // The number of bytes to read.
    const length = buffer.byteLength;;

    // Put the file content in the buffer
    // We always want to read the whole content
    await commandFileHandler.read(buffer, offset, length, position);

    const content = buffer.toString("utf8");
    if (content.trim().length > 0) {
        console.log(content);
    }
};
