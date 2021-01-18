const KMeans = require('./k-means');
const CSV = require('./csv');
const csv = new CSV();

let config = csv.csvToJSONXY('./k-means.csv');
config.groups = 2;

const kmeans = new KMeans();
kmeans.train(config);

const result = kmeans.predict();
console.log(result);
