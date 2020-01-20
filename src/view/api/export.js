const { createReadStream, createWriteStream } = require('fs');
const { AsyncParser } = require('json2csv');

const fields = ['ean', 'prices.sanpablo'];
const opts = { fields };
const transformOpts = { highWaterMark: 8192 };

const input = createReadStream(__dirname + "/../../../files/sample.json", { encoding: 'utf8' });

const output = createWriteStream(__dirname + "/../../../files/export.csv", { encoding: 'utf8' });
const asyncParser = new AsyncParser(opts, transformOpts);
asyncParser.fromInput(input).toOutput(output).promise()
    .then(csv => console.log(csv));