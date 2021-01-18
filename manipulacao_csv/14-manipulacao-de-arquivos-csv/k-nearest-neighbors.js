module.exports = class KNearestNeighbors {
	subtracoesX() {
		if(this.eixoX.length<=0) this.eixoX = [];
		if(this.eixoY.length<=0) this.eixoY = [];
		if(this.classe.length<=0) this.classe = [];
		if(this.entradaX.length<=0) this.entradaX = 0;
		if(this.entradaY.length<=0) this.entradaY = 0;

		let subtracoes = [];
		for(let i=0; i<this.eixoX.length; i++) {
			subtracoes[i] = this.eixoX[i] - this.entradaX;
		}
		return subtracoes;
	}

	subtracoesY() {
		if(this.eixoX.length<=0) this.eixoX = [];
		if(this.eixoY.length<=0) this.eixoY = [];
		if(this.classe.length<=0) this.classe = [];
		if(this.entradaX.length<=0) this.entradaX = 0;
		if(this.entradaY.length<=0) this.entradaY = 0;

		let subtracoes = [];
		for(let i=0; i<this.eixoY.length; i++) {
			subtracoes[i] = this.eixoY[i] - this.entradaY;
		}
		return subtracoes;	
	}

	quadradosX() {
		const subtracoes = this.subtracoesX();
		let quadrados = [];
		for(let i=0; i<subtracoes.length; i++) {
			quadrados[i] = subtracoes[i] * subtracoes[i];
		}
		return quadrados;
	}

	quadradosY() {
		const subtracoes = this.subtracoesY();
		let quadrados = [];
		for(let i=0; i<subtracoes.length; i++) {
			quadrados[i] = subtracoes[i] * subtracoes[i];
		}
		return quadrados;
	}

	somaQuadrados() {
		const quadradoX = this.quadradosX();
		const quadradoY = this.quadradosY();
		let soma = [];
		for(let i=0; i<quadradoX.length; i++) {
			soma[i] = quadradoX[i] + quadradoY[i];
		}
		return soma;
	}

	raizes() {
		const soma = this.somaQuadrados();
		let raizes = [];
		for(let i=0; i<soma.length; i++) {
			raizes[i] = Math.sqrt(soma[i]);
		}
		return raizes;
	}

	train(config={}) {
		this._config = {};
		if(config.x) this.eixoX = config.x; else this.eixoX = [0];
		if(config.y) this.eixoY = config.y; else this.eixoY = [0];
		if(config.class) this.classe = config.class; else this.classe = [''];
		this._config.x = this.eixoX;
		this._config.y = this.eixoY;
		this._config.class = this.classe;
	}

	saveModel(path='./model.json') {
		const fs = require('fs');
		fs.writeFileSync(path, JSON.stringify(this._config));
	}

	loadModel(path='./model.json') {
		const fs = require('fs');
		const data = fs.readFileSync(path, 'utf8');
		const json = JSON.parse(data);
		this.entradas = json.input;
		this.classes = json.output;
	}

	predict(_entradaX=0, _entradaY=0) {
		this.entradaX = _entradaX;
		this.entradaY = _entradaY;

		let entradaClasse = 0;
		const raiz = this.raizes();

		let indiceMenor = -1;
		let menor = Infinity;
		for(let i=0; i<raiz.length; i++) {
			if(raiz[i] <= menor) {
				menor = raiz[i];
				indiceMenor = i;
			}
		}

		entradaClasse = this.classe[indiceMenor];
		return entradaClasse;
	}
}
