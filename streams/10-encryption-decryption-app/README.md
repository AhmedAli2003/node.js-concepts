# Encrypt/Decrypt Stream App

This Node.js application demonstrates how to implement simple encryption and decryption using custom Transform streams. The application reads data from a file, encrypts it, writes the encrypted data to another file, and then decrypts it back to the original content.

## Features

- **Custom Encrypt Stream**: Increments each byte in the input data by 1 (except for 255) and writes the result to an output file.
- **Custom Decrypt Stream**: Decrements each byte in the encrypted data by 1 (except for 0) and writes the original data back to another file.
- **File Handling**: Uses Node.js's built-in `fs` module with promises to handle file operations asynchronously.

## Installation

1. Ensure you have Node.js installed on your machine.
2. Clone this repository or download the files.
3. Run `npm init` in the project directory to initialize the project (if not already done).
4. Install any necessary dependencies using `npm install`.

## Usage

### 1. Prepare Your Files

- Create a `read.txt` file with the content you want to encrypt. This file will serve as the input for the encryption process.
- Ensure the `write.txt` and `decrypted.txt` files are empty or do not exist yet; they will be created and populated by the app.

### 2. Run the Application

```bash
node app.js
```

### 3. Verify the Output
After running the app, you should see:
`write.txt` containing the encrypted version of `read.txt`.
decrypted.txt containing the decrypted version of write.txt, which should match the original content of `read.txt`.

Example Workflow
Original File (read.txt): `Hello, this is a test!`
Encrypted File (write.txt): `Ifmmp-!uijt!jt!b!uftu"`
Decrypted File (decrypted.txt): `Hello, this is a test!`

## Code Structure
crypt Stream (`encrypt-stream.js`)
```javascript
const { Transform } = require('node:stream');

class Encrypt extends Transform {
    _transform(chunk, encoding, callback) {
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 255) {
                chunk[i] = chunk[i] + 1;
            }
        }
        this.push(chunk);
        callback();
    }
}

module.exports = Encrypt;
```

Decrypt Stream (`decrypt-stream.js`)
```javascript
const { Transform } = require('node:stream');

class Decrypt extends Transform {
    _transform(chunk, encoding, callback) {
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 0) {
                chunk[i] = chunk[i] - 1;
            }
        }
        this.push(chunk);
        callback();
    }
}

module.exports = Decrypt;
```

Main Application (`app.js`)
Here you can test the streams, you can see `app.js` file in the project.