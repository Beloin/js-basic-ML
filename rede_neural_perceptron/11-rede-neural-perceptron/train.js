const Perceptron = require('./perceptron');

const config = {
	Epochs: 100,
	Activation: 'tanh',
	hiddenLayers: 2,
	hiddenNodes: 4,
	bias: 1
};

const rna = new Perceptron(config);

rna.train([
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [1]},
	{input: [1, 0], output: [1]},
	{input: [1, 1], output: [0]}
]);
rna.saveModel();
