/**
 * The tree ways are
 * 1 - Promises API (used mostly)
 * 2 - Callbacks API
 * 3 - Synchronous API
 */

// ***************** Promises API ***************** //
const fs = require('fs/promises');
(async () => {
    try {
        await fs.copyFile('text.txt', "copied-promise.txt");
    } catch (error) {
        console.log(error);
    }
})();

// ***************** Callback API ***************** //
const { copyFile } = require('fs');
copyFile('text.txt', 'copied-callback.txt', (error) => {
    if (error) console.log(error);
});

// ***************** Synchronous API ***************** //
const { copyFileSync } = require('fs');
try {
    copyFileSync('text.txt', 'copied-synchronous.txt');
} catch (error) {
    console.log(error);
}
