const MultivariateRegression = require('./multivariate-regression');

const regression = new MultivariateRegression();

const config = {
    input: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
    ],
    output: [3, 5, 7, 9],
};

regression.train(config);

const predict = regression.predict([
    [5, 6],
    [6, 7],
    [5, 4],
]);

console.log(predict);
