const Perceptron = require('./perceptron');

const rna = new Perceptron();
rna.loadModel();

console.log(`0 xor 0: ${rna.predict([0, 0])}`);
console.log(`0 xor 1: ${rna.predict([0, 1])}`);
console.log(`1 xor 0: ${rna.predict([1, 0])}`);
console.log(`1 xor 1: ${rna.predict([1, 1])}`);
