const KNearestNeighbors = require('./k-nearest-neighbors');
const CSV = require('./csv');
const csv = new CSV();

const config = csv.csvToJSONXY('./k-nearest-neighbors.csv');

const knn = new KNearestNeighbors();
knn.train(config);

const result = knn.predict(55, 37);
console.log(result);
