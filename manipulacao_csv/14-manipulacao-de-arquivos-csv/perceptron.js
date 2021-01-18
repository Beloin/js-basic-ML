module.exports = class Perceptron {
	constructor(config={}) {
		this.config = {};
		this.Weights = [];
		this.Inputs = [];
		this.Targets = [];
		this.Epochs = 1000;
		this.Activation = 'sigmoid';
		this.hiddenLayers = 1;
		this.hiddenNodes = 2;
		this.bias = 1;
		this.add = [];

		if(config.Epochs) this.Epochs = config.Epochs;
		if(config.Activation) this.Activation = config.Activation;
		if(config.hiddenLayers) this.hiddenLayers = config.hiddenLayers;
		if(config.hiddenNodes) this.hiddenNodes = config.hiddenNodes;
		if(config.bias) this.bias = config.bias;

		this.config.Epochs = this.Epochs;
		this.config.Activation = this.Activation;
		this.config.hiddenLayers = this.hiddenLayers;
		this.config.hiddenNodes = this.hiddenNodes;
		this.config.bias = this.bias;
	}

	funcSum(arr=[]) {
		return arr.reduce((a, b) => a + b);
	}

	gradientDescent(n=0) {
		return n * (1 - n);
	}

	train(fit=[]) {
		for(let i=0; i<fit.length; i++) {
			if(fit[i].input) this.Inputs.push(fit[i].input); else this.Inputs.push([0]);
			if(fit[i].output) this.Targets.push(fit[i].output); else this.Targets.push([0]);
		}

		for(let i=0; i<this.Inputs.length; i++) {
			for(let j=0; j<this.Targets.length; j++) {
				if((this.Inputs[i][j]!=undefined)&&(this.Targets[i][j]!=undefined)) {
					this.feedForward(this.Inputs[i], 
						        	 this.Targets[i][j], 
						        	 this.Epochs, 
						        	 this.Activation, 
						        	 this.hiddenLayers, 
						        	 this.hiddenNodes);
				}
			}
		}
	}

	saveModel(path='./model.json') {
		const fs = require('fs');
		this.config.Weights = this.Weights;
		this.config.Activation = this.Activation;
		this.config.hiddenLayers = this.hiddenLayers;
		this.config.hiddenNodes = this.hiddenNodes;
		fs.writeFileSync(path, JSON.stringify(this.config));
	}

	loadModel(path='./model.json') {
		const fs = require('fs');
		const data = fs.readFileSync(path, 'utf8');
		const json = JSON.parse(data);
		this.Weights = json.Weights;
		this.Activation = json.Activation;
		this.hiddenLayers = json.hiddenLayers;
		this.hiddenNodes = json.hiddenNodes;
	}

	predict(inputs=[]) {
		let Outputs = [];
		// encontra a entrada do treino mais próxima da entrada da predição
		for(let i=0; i<this.Weights.length; i++) {
			let Input = this.Weights[i].input;
			let diff = [];
			for(let j=0; j<inputs.length; j++) {
				diff.push(Math.abs(inputs[j] - Input[j]));
			}
			let reduce = diff.reduce((a, b) => Number(a+''+b));
			this.add.push(reduce);
		}
		let search = inputs.reduce((a, b) => Number(a+''+b));
		let index = this.add.indexOf(search);

		let limit = 1;
		if(this.Targets[0]) limit = this.Targets[0].length;
		for(let i=0; i<limit; i++) {
			// usa os pesos da entrada do treino mais próximo
			let matrixHidden = this.Weights[index].weights;
			// sinapse das entradas com as ocultas
			let multiply = [];
			for(let j=0; j<inputs.length; j++) {
				for(let x=0; x<matrixHidden.length; x++) {
					for(let y=0; y<matrixHidden[x].length; y++) {
						multiply.push(inputs[j] * matrixHidden[x][y]);
					}
				}
			}
			let sum = this.funcSum(multiply);
			let output = 0;
			// função de ativação
			switch(this.Activation) {
				case 'tanh': output = parseFloat(this.tanh(sum)).toFixed(4); break;
				case 'sigmoid': output = parseFloat(this.sigmoid(sum)).toFixed(4); break;
				case 'relu': output = parseFloat(this.relu(sum)).toFixed(4); break;
				case 'leakyRelu': output = parseFloat(this.leakyRelu(sum)).toFixed(4); break;
				case 'binaryStep': output = parseFloat(this.binaryStep(sum)).toFixed(4); break;
				default: output = parseFloat(this.sigmoid(sum)).toFixed(4);
			}
			// constroi o array de saída
			Outputs.push(Number(output));
		}
		return Outputs;
	}

	feedForward(inputs=[], target=0, epochs=1, activation='sigmoid', hidden=1, hiddenNodes=2) {
		// pesos das camadas ocultas
		let matrixHidden = [];
		for(let i=0; i<hidden; i++) {
			let arrHidden = [];
			for(let j=0; j<this.hiddenNodes; j++) {
				arrHidden.push(0);
			}
			matrixHidden.push(arrHidden);
		}

		// backpropagation
		let stop = false;
		let output = 0;
		if(target!=0) {
			for(let i=1; i<=epochs; i++) {
				// sinapse das entradas com as ocultas
				let multiply = [];
				for(let j=0; j<inputs.length; j++) {
					for(let x=0; x<matrixHidden.length; x++) {
						for(let y=0; y<matrixHidden[x].length; y++) {
							multiply.push(inputs[j] * matrixHidden[x][y]);
						}
					}
				}
				let sum = this.funcSum(multiply);
				// função de ativação
				switch(activation) {
					case 'tanh': output = parseFloat(this.tanh(sum)).toFixed(4); break;
					case 'sigmoid': output = parseFloat(this.sigmoid(sum)).toFixed(4); break;
					case 'relu': output = parseFloat(this.relu(sum)).toFixed(4); break;
					case 'leakyRelu': output = parseFloat(this.leakyRelu(sum)).toFixed(4); break;
					case 'binaryStep': output = parseFloat(this.binaryStep(sum)).toFixed(4); break;
					default: output = parseFloat(this.sigmoid(sum)).toFixed(4);
				}
				// taxa de erro
				let error = parseFloat(Math.abs(target - output)).toFixed(4);
				// corta o processamento quando encontra um valor próximo da busca
				if((error<=0.1)&&(stop==false)) {
					this.Weights.push({input: inputs, weights: matrixHidden});
					i=epochs+1;
					stop = true;
				}
				// atualização dos pesos
				for(let j=0; j<inputs.length; j++) {
					for(let x=0; x<matrixHidden.length; x++) {
						for(let y=0; y<matrixHidden[x].length; y++) {
							matrixHidden[x][y] += inputs[j] * this.gradientDescent(error);
						}
					}				
				}
			}
		}
		// usa o bias se não encontrou a busca
		if(stop==false) {
			if(output > target) {
				for(let x=0; x<matrixHidden.length; x++) {
					for(let y=0; y<matrixHidden[x].length; y++) {
						matrixHidden[x][y] -= this.bias;
					}
				}			
			}else if(output < target) {
				for(let x=0; x<matrixHidden.length; x++) {
					for(let y=0; y<matrixHidden[x].length; y++) {
						matrixHidden[x][y] += this.bias;
					}
				}			
			}
			this.Weights.push({input: inputs, weights: matrixHidden});
		}
	}

	// tangente hiperbólica: retorna valores entre -1 e 1
	tanh(n=0) { return Math.sinh(n) / Math.cosh(n); }
	// função sigmóide: retorna valores entre 0 e 1
	sigmoid(n=0) { return 1 / (1 + Math.pow(Math.E, -n)); }
	// unidade linear retificada (relu): retorna somente valores nulos e positivos
	relu(n=0) { return Math.max(n, 0); }
	// unidade linear retificada com vazamento (leaky relu): retorna somente valores maiores que zero
	leakyRelu(n=0) { return Math.max(n, 0.01); }
	// passo binário: retorna somente 0 ou 1
	binaryStep(n=0) { return (n >= 0) ? 1 : 0; }	
}
