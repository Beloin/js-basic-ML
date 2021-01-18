const KMeans = require('./k-means');

const config = {
	x: [1, 2, 3, 4, 5, 10, 20, 30],
	y: [2, 3, 4, 5, 6, 20, 30, 40]
};

const kmeans = new KMeans();
kmeans.train(config);

kmeans.predict();
