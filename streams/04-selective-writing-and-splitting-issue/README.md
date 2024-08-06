# Selective Writing And Splitting Issue

In this example, we will try to read the numbers from the file as we done before, and we will write only the prime numbers to the destination file.

The idea is with every chunk, we will create and array and convert the text to real numbers and we will extract the prime numbers only.

This is the code for splitting the chunk and get an array:
```javascript
streamRead.on('data', (chunk) => {
    const numbers = chunk.toString('utf-8').split('\n');
    console.log(numbers[0] === '');
    console.log(numbers[0], numbers[numbers.length - 2], numbers[numbers.length - 1]);
    console.log('--------------------------------');
});
```

## The Splitting Issue

This is a sample of the output of the previous code:
```
false
708682 718043 71
--------------------------------
false
8044 727405 7274
--------------------------------
false
06 736767 736768
--------------------------------
true
 746130 7
--------------------------------
```

Here are some observations:
1 - We have some empty strings in the array as a first or last element.
2 - There is some splitting in the numbers, that happens in the last element of an array and the first element of the another array.

## Understanding The Splitting Issue

The some empty strings is because the chunk may have `\n` in the first or last index, and we split using `split` method according to `\n`, because of this, the `split` method return an empty string.

To slove this we need to ensure removing any `\n` from the start of end of the chunk.
```
const str = chunk.toString('utf-8').replace(/^\n+|\n+$/g, '');
```

To slove the second problem, we need to merge the last element of the chunk with the first element of the next chunk.

```javascript
let split = '';
streamRead.on('data', (chunk) => {
    const str = chunk.toString('utf-8').replace(/^\n+|\n+$/g, '');

    const numbers = str.split('\n');

    const length = numbers.length;

    if (split) {
        numbers[0] = split + numbers[0];
        split = '';
    }

    if (Number(numbers[length - 2]) + 1 !== Number(numbers[length - 1])) {
        split = numbers.pop(); // remove and get the last damaged number
    }

    for (const n of numbers) {
        if (isPrime(n)) {
            if (!streamWrite.write(`${n}\n`)) {
                streamRead.pause();
            }
        }
    }
});
```

The split variable is responsible for holding the splitted value of the previous chunk, and then we will merge it to the first element of the next chunk.

We will remove the last damaged value from the first array, and hold it in the split value, and then merge it back into the next array.

Of course, we will check if the last element is damaged before we remove `pop` the last element, if it's not damaged, then we won't make anything.

And then we will write the number to the destination file if it is prime.

You can see all the code in the files.