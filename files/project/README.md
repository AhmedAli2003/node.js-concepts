# File Command Processor

This project is a Node.js application that processes a series of file commands from a file called `command.txt`. The application can create, delete, rename, and append content to files based on the commands in `command.txt`.

## Table of Contents

- [File Command Processor](#file-command-processor)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Commands](#commands)
    - [Example](#example)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/file-command-processor.git
    cd file-command-processor
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Usage

1. Create a file named `command.txt` in the project root directory with the commands you want to execute.

2. Start the application:

    ```bash
    node index.js
    ```

## Commands

The `command.txt` file should contain commands separated by semicolons (`;`). Each command should be on a new line or separated by a semicolon.

Supported commands:

- `create file <filename>`: Creates a new file with the specified filename.
- `delete file <filename>`: Deletes the file with the specified filename.
- `rename file <oldfilename> <newfilename>`: Renames the file from `<oldfilename>` to `<newfilename>`.
- `add to file <filename> <content>`: Appends the specified content to the file with the specified filename.

### Example

`command.txt`:

```plaintext
create file job.txt;
rename file job.txt node.txt;
add to file node.txt Hello world from node.js fs module!;
delete file test.txt;
