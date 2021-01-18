const KMeans = require('./k-means');

const config = {
	x: [1, 3, 5, 25, 45, 65],
	y: [2, 4, 6, 35, 55, 75],
	groups: 2
};

const kmeans = new KMeans();
kmeans.train(config);

const result = kmeans.predict();
console.log(result);
