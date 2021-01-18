const Knn = require('./Knn');

const knn = new Knn();

const config = {
    x: [1, 2, 30, 40],
    y: [3, 4, 50, 60],
    class: ['menor', 'menor', 'maior', 'maior'],
};

knn.train(config);

let predicted = knn.predict(3, 4);

console.log(predicted);
