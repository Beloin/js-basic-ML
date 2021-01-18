const multivariateRegression = require('./multivariate-regression');
const CSV = require('./csv');
const csv = new CSV();

const config = csv.csvToJSONInputOutput('./regressao-multivariada.csv');

const regression = new multivariateRegression();
regression.train(config);

const result = regression.predict([[5, 6, 1], [6, 7, 1]]);
console.log(result);
