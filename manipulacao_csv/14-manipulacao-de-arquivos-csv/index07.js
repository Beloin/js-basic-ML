const Perceptron = require('./perceptron');
const CSV = require('./csv');
const csv = new CSV();

const train = csv.csvToArray('./perceptron.csv');

const config = {
	Epochs: 100,
	Activation: 'tanh',
	hiddenLayers: 2,
	hiddenNodes: 4,
	bias: 1
};

const rna = new Perceptron(config);

rna.train(train);

console.log(`0 xor 0: ${rna.predict([0, 0])}`);
console.log(`0 xor 1: ${rna.predict([0, 1])}`);
console.log(`1 xor 0: ${rna.predict([1, 0])}`);
console.log(`1 xor 1: ${rna.predict([1, 1])}`);
