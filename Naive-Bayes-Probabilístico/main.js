const NaiveBayes = require('./naive-bayes');

const config = {
    input: ['bom', 'mau', 'indiferente', 'indiferente'],
    output: ['positivo', 'negativo', 'positivo', 'negativo'],
};

const bayes = new NaiveBayes();

bayes.train(config);

console.log(bayes.predict('indiferente'));
