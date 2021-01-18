const linearRegression = require('./linear-regression');
const CSV = require('./csv');
const csv = new CSV();

const config = csv.csvToJSONInputOutput('./regressao-simples.csv');

const regression = new linearRegression();
regression.train(config);

const result = regression.predict([5, 6, 7, 8]);
console.log(result);
