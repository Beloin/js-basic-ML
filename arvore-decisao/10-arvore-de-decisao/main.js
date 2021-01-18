const decisionTree = require('./decision-tree');

const config = {
	x: ['sol', 'nublado', 'chuva', 'chuva', 'sol', 'nublado'],
	y: ['anormal', 'normal', 'anormal', 'normal', 'normal', 'anormal'],
	class: ['não', 'sim', 'não', 'não', 'sim', 'sim']
};

const tree = new decisionTree();
tree.train(config);

const result = tree.predict('sol', 'anormal');
console.log(result);
