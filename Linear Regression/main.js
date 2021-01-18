const LinearRegression = require('./linear-regressionOO');

const regression = new LinearRegression();
//regression.train(config);
regression.loadModel('./model/model-regression.json');

const result = regression.predict([5, 6, 78, 8]);

console.log(result);
