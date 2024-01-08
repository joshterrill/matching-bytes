# Matching Bytes
a library that takes two files as an input and finds any matching patterns of bytes between them (Can be very very slow)

# Global usage

```bash
npm i -g matching-bytes
matching-bytes ./test/sample-images/midjourney1.webp ./test/sample-images/midjourney2.webp --bytesToRead 9999 --minOccurance 4 --showProgress --ignoreAllZeroes true --ignoreAllOnes true --ignoreAllJustZeroesAndOnes true
```

# API usage

Install

```bash
npm i matching-bytes --save
```

Usage

```javascript
const matchingBytes = require('matching-bytes');

const data = await matchingBytes.findBytes(
    './test/sample-images/midjourney1.webp',
    'test/sample-images/midjourney2.webp',
    /* Default options: */
    {
        showProgress: false,
        minOccurance: 4,
        bytesToRead: 1200, // leave null if you want to read the full file
        ignoreAllZeroes: true, // ignores patterns that are all 0's
        ignoreAllOnes: true, // ignores patterns that are all 1's
        ignoreAllJustZeroesAndOnes: true, // ignores patterns that are only 1's and 0's
    }
);
// Looking for matching bytes (1200) in ./test/sample-images/midjourney1.webp and ./test/sample-images/midjourney1.webp...
// ======================================== 100% 0.0s
console.log(data);
/*
======================================== 100% 0.0s
[
  { sequence: [ '52', '49', '46', '46' ], index1: 0, index2: 0 },
  { sequence: [45', '42', '50', '56', '50', '38', '4C'], index1: 9, index2: 9 },
  { sequence: [ '2E', '82', '8B', '0', '8D', '48' ], index1: 21, index2: 21 }
]
*/
```

In the example above, we see the first two sequence occurrances correspond to the WEBP magic number, but the third one seems to occur in all upscaled images from midjourney.

# License
MIT