const fs = require('fs/promises');

const COMMAND_FILE_PATH = './command.txt';

const CREATE_FILE = 'create file';
const DELETE_FILE = 'delete file';
const RENAME_FILE = 'rename file';
const ADD_TO_FILE = 'add to file';
const SEPARATOR = ';';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    // Open the file
    const commandFileHandler = await fs.open(COMMAND_FILE_PATH, 'r');

    // Add the function for the change event
    commandFileHandler.on('change', () => changeEventHandler(commandFileHandler));

    // Watch the file changes and get an Async Iterable
    const watcher = fs.watch(COMMAND_FILE_PATH);

    // watcher...
    for await (const event of watcher) {
        if (event.eventType === 'change' && event.filename === 'command.txt') {
            // Emit a change event
            commandFileHandler.emit('change');
        }
    }
})();

console.log('Start the app!');

const createFile = async (path) => {
    try {
        // Check if the file exists
        // If the file does not exist, it throws an error with the ENOENT code.
        await fs.access(path);
        throw new Error(`The file ${path} already exists`);
    } catch (e) {
        // The file does not exist
        if (e.code === 'ENOENT') {
            await fs.writeFile(path, '');
            console.log(`A new file was created on ${path}`);
        } else {
            throw e;
        }
    }
};

const deleteFile = async (path) => {
    try {
        // Check if the file exists
        await fs.access(path);

        // The file exists, so we can delete it
        await fs.unlink(path);
        console.log(`File ${path} deleted successfully`);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error(`The file ${path} does not exist`);
        } else {
            throw e;
        }
    }
};

const renameFile = async (oldPath, newPath) => {
    try {
        // Check if the file exists
        await fs.access(oldPath);

        // The file exists, so we can rename it
        await fs.rename(oldPath, newPath);
        console.log(`File ${oldPath} renamed to ${newPath}`);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error(`The file ${oldPath} does not exist`);
        } else {
            throw e;
        }
    }
};

const addToFile = async (path, content) => {
    try {
        // Check if the file exists
        await fs.access(path);

        // The file exists, so we can add content to it
        await fs.appendFile(path, content);
        console.log(`Data added successfully to file: ${path}`);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error(`The file ${path} does not exist`);
        } else {
            throw e;
        }
    }
};

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
    const length = buffer.byteLength;

    // Put the file content in the buffer
    // We always want to read the whole content
    await commandFileHandler.read(buffer, offset, length, position);

    const content = buffer.toString("utf8");
    if (content.trim().length > 0) {
        // Replace newlines with a space before splitting by the SEPARATOR
        // Then replace multiple spaces with a single space
        const cleanContent = content.replace(/\n/g, ' ').replace(/\s+/g, ' ');

        // Split by the SEPARATOR and process each command
        const separatedCommands = cleanContent.split(SEPARATOR);

        // Map, trim, and filter commands
        const readyCommands = separatedCommands
            .map((command) => command.trim())
            .filter(command => command !== '' && command !== SEPARATOR);

        // Execute the commands
        for (const command of readyCommands) {
            await delay(10); // Adding a slight delay to ensure commands are processed properly
            if (command.startsWith(CREATE_FILE)) {
                await createFile(command.split(CREATE_FILE)[1].trim());
            } else if (command.startsWith(DELETE_FILE)) {
                await deleteFile(command.split(DELETE_FILE)[1].trim());
            } else if (command.startsWith(RENAME_FILE)) {
                const paths = command.split(RENAME_FILE)[1].trim().split(' ');
                await renameFile(paths[0], paths[1]);
            } else if (command.startsWith(ADD_TO_FILE)) {
                const pathAndContent = command.split(ADD_TO_FILE)[1].trim().split(' ');
                const path = pathAndContent.shift();
                const content = pathAndContent.join(' ');
                await addToFile(path, content);
            } else {
                throw new Error(`Invalid command ${command}`);
            }
        }
    }
};
