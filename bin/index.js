#!/usr/bin/env node

const matchingBytes = require('../');
const args = process.argv.slice(2);

const filePath1 = args[0];
const filePath2 = args[1];
const opts = {
    bytesToRead: args.includes('--bytesToRead') ? parseInt(args[args.indexOf('--bytesToRead') + 1]) : 1200,
    minOccurance: args.includes('--minOccurance') ? parseInt(args[args.indexOf('--minOccurance') + 1]) : 3,
    showProgress: args.includes('--showProgress') ? args[args.indexOf('--showProgress') + 1] === 'true' : true,
    ignoreAllJustZeroesAndOnes: args.includes('--ignoreAllJustZeroesAndOnes') ? args[args.indexOf('--ignoreAllJustZeroesAndOnes') + 1] === 'true' : true,
    ignoreAllZeroes: args.includes('--ignoreAllZeroes') ? args[args.indexOf('--ignoreAllZeroes') + 1] === 'true' : true,
    ignoreAllOnes: args.includes('--ignoreAllOnes') ? args[args.indexOf('--ignoreAllOnes') + 1] === 'true' : true,
};

if (filePath1 && filePath2) {
    matchingBytes.findBytes(filePath1, filePath2, opts).then(results => {
        console.log(results);
    }).catch(err => {
        console.error(err);
    });
} else {
    console.error("Please provide two file paths to compare.");
}