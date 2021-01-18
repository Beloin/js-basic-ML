const Perceptron = require('./perceptron');

const config = {
	Epochs: 100,
	Activation: 'tanh',
	hiddenLayers: 2,
	hiddenNodes: 4,
	bias: 1
};

const rna = new Perceptron(config);
/*
rna.train([
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [1]},
	{input: [1, 0], output: [1]},
	{input: [1, 1], output: [0]}
]);

console.log(`0 xor 0: ${rna.predict([0, 0])}`);
console.log(`0 xor 1: ${rna.predict([0, 1])}`);
console.log(`1 xor 0: ${rna.predict([1, 0])}`);
console.log(`1 xor 1: ${rna.predict([1, 1])}`);

rna.train([
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [1]},
	{input: [1, 0], output: [1]},
	{input: [1, 1], output: [1]}
]);

console.log(`0 or 0: ${rna.predict([0, 0])}`);
console.log(`0 or 1: ${rna.predict([0, 1])}`);
console.log(`1 or 0: ${rna.predict([1, 0])}`);
console.log(`1 or 1: ${rna.predict([1, 1])}`);
*/
rna.train([
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [0]},
	{input: [1, 0], output: [0]},
	{input: [1, 1], output: [1]}
]);

console.log(`0 and 0: ${rna.predict([0, 0])}`);
console.log(`0 and 1: ${rna.predict([0, 1])}`);
console.log(`1 and 0: ${rna.predict([1, 0])}`);
console.log(`1 and 1: ${rna.predict([1, 1])}`);
