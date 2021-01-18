const CSV = require('./csv');
const csv = new CSV();

//const result = csv.csvToJSONXY('./decision-tree.csv');
//const result = csv.csvToJSONXY('./k-means.csv');
//const result = csv.csvToJSONXY('./k-nearest-neighbors.csv');
//const result = csv.csvToJSONInputOutput('./naive-bayes.csv');
const result = csv.csvToArray('./perceptron.csv');
//const result = csv.csvToJSONInputOutput('./regressao-multivariada.csv');
//const result = csv.csvToJSONInputOutput('./regressao-simples.csv');

console.log(result);
