﻿# Matching Bytes
a library that takes two files as an input and finds any matching patterns of bytes between them 

# Usage

Install

```bash
npm i matching-bytes --save
```

Use

```javascript
const matchingBytes = require('matching-bytes');

const data = await matchingBytes.getMatchingBytes('./path/to/file1.webp', './path/to/file2.webp', {minimumCount: 4, ignoreAllZeroes: true, ignoreAllOnes: true, ignoreAllJustZeroesAndOnes: true});

console.log(data);
/*
Looking for matching bytes in ./file1.webp and ./file2.webp...
======================================== 100% 0.0s
[
  { sequence: [ '52', '49', '46', '46' ], index1: 0, index2: 0 },
  { sequence: [45', '42', '50', '56', '50', '38', '4C'], index1: 9, index2: 9 },
  { sequence: [ '2E', '82', '8B', '0', '8D', '48' ], index1: 21, index2: 21 }
]
*/
```

# License
MIT