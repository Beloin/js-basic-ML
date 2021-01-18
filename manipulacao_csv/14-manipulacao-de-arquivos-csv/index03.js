const naiveBayes = require('./naive-bayes');
const CSV = require('./csv');
const csv = new CSV();

const config = csv.csvToJSONInputOutput('./naive-bayes.csv');

const bayes = new naiveBayes();
bayes.train(config);

const result = bayes.predict('indiferente');
console.log(result);
