const decisionTree = require('./decision-tree');
const CSV = require('./csv');
const csv = new CSV();

const config = csv.csvToJSONXY('./decision-tree.csv');

const tree = new decisionTree();
tree.train(config);

const result = tree.predict('sol', 'anormal');
console.log(result);
