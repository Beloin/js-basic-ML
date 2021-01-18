const LinearRegression = require('./linear-regressionOO');

const config = {
    input: [1, 2, 3, 4],
    output: [9, 18, 27, 36],
};

const regression = new LinearRegression();
regression.train(config);

regression.saveModel('./model/model-regression.json');
