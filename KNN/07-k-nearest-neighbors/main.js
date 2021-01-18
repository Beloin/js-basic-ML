const KNearestNeighbors = require('./k-nearest-neighbors');

const config = {
	x: [1, 2, 30, 40],
	y: [3, 4, 50, 60],
	class: ['menor', 'menor', 'maior', 'maior']
};

const knn = new KNearestNeighbors();
knn.train(config);

const result = knn.predict(55, 37);
console.log(result);
