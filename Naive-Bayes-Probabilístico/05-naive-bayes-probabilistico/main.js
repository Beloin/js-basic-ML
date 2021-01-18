const naiveBayes = require('./naive-bayes');

const config = {
	input: ['bom', 'mau', 'indiferente', 'indiferente'],
	output: ['positivo', 'negativo', 'positivo', 'negativo']
};

const bayes = new naiveBayes();
bayes.train(config);

const result = bayes.predict('indiferente');
console.log(result);
