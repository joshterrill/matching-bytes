const fs = require('fs');
const ProgressBar = require('progress');
const args = process.argv.slice(2);

async function readFileToBuffer(filePath, bytesToRead) {
    return new Promise((resolve, reject) => {
        fs.open(filePath, 'r', (err, fd) => {
            if (err) {
                reject(err);
                return;
            }

            const buffer = Buffer.alloc(bytesToRead);

            fs.read(fd, buffer, 0, bytesToRead, 0, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }

                fs.close(fd, (err) => {
                    if (err) console.error("Error closing file:", err);
                });
            });
        });
    });
}

async function findCommonSequences(array1, array2, minSequenceLength, showProgress) {
    const commonSequences = [];
    let bar;
    if (showProgress) {
        bar = new ProgressBar(':bar :percent :etas', { total: array1.length, width: 40 });
    }

    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            let sequence = [];
            let index1 = i;
            let index2 = j;

            while (array1[index1] === array2[index2] && index1 < array1.length && index2 < array2.length) {
                sequence.push(array1[index1]);
                index1++;
                index2++;
            }

            if (sequence.length >= minSequenceLength) {
                commonSequences.push({
                    sequence,
                    index1: i,
                    index2: j,
                });
            }
        }
        if (showProgress) {
            bar.tick();
            if (i % 100 === 0) process.stdout.write('\u001b[2K\u001b[G' + bar.render());
        }
    }

    return commonSequences;
}


async function compareBinaries(filePath1, filePath2, opts = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!filePath1 && filePath2) {
                filePath1 = args[0];
                filePath2 = args[1];
            }
            const showProgress = args.includes('--showProgress');
            if (opts.bytesToRead === undefined) opts.bytesToRead = 1200;
            if (opts.minOccurance === undefined) opts.minOccurance = 3;
            if (opts.ignoreAllJustZeroesAndOnes === undefined) {
                opts.ignoreAllJustZeroesAndOnes = true;
            } else {
                if (opts.ignoreAllZeroes === undefined) opts.ignoreAllZeroes = true;
                if (opts.ignoreAllOnes === undefined) opts.ignoreAllOnes = true;
            }
            console.debug(`Comparing ${filePath1} and ${filePath2}...`);
            const buffer1 = await readFileToBuffer(filePath1, opts.bytesToRead);
            const buffer2 = await readFileToBuffer(filePath2, opts.bytesToRead);

            const array1 = Array.from(buffer1);
            const array2 = Array.from(buffer2);

            let commonSequences = await findCommonSequences(array1, array2, opts.minOccurance, showProgress);
            for (let i = 0; i < commonSequences.length; i++) {
                const seq = commonSequences[i];
                const lengthOfSequence = seq.sequence.length;
                commonSequences.splice(i + 1, lengthOfSequence - 1)
            }
            if (opts.minOccurance || opts.ignoreAllZeroes || opts.ignoreAllOnes || opts.ignoreAllJustZeroesAndOnes) {
                commonSequences = commonSequences.filter(seq => {
                    if (opts.minOccurance && seq.sequence.length < opts.minOccurance) return false;
                    if (opts.ignoreAllJustZeroesAndOnes && seq.sequence.every(v => v === 0 || v === 1)) return false;
                    if (opts.ignoreAllZeroes && seq.sequence.every(v => v === 0)) return false;
                    if (opts.ignoreAllOnes && seq.sequence.every(v => v === 1)) return false;
                    return true;
                });

            }
            const convertedToHex = commonSequences.map(seq => {
                const hexString = seq.sequence.map(val => val.toString(16).toUpperCase());
                seq.sequence = hexString;
                return seq;
            });

            resolve(convertedToHex);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    compareBinaries
};
