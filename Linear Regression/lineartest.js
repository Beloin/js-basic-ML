const LinearRegression = require('./linear-regressionOO');

const config = {
    input: [1200, 1300, 1400, 1500],
    output: [1300, 1430, 1500, 1630],
};

const regression = new LinearRegression();
regression.train(config);

console.log(regression.predict([1700]));
