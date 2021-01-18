const CSV = require('./csv');
const csv = new CSV();

// const result = csv.csvToJSONXY(process.argv.slice(2)[0]);

// const result = csv.csvToJSONInputOutput(process.argv.slice(2)[0]);

const result = csv.csvToArray(process.argv.slice(2)[0]);

console.log(result);
