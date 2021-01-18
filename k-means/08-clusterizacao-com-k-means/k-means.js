module.exports = class KMeans {
	// retorna a média dos eixos x de um determinado grupo
	mediaGrupoX(IDs=[], grupoIDs=0) {
		// IDs: array onde o índice corresponde ao ID e o valor do índice corresponde ao grupo
		// grupoIDs: número correspondente ao grupo que terá a média calculada
		let soma = 0;
		let qtdGrupo = 0;
		for(let i=0; i<IDs.length; i++) {
			if(IDs[i] == grupoIDs) {
				soma += this.eixoX[i];
				qtdGrupo++;		
			}
		}
		return soma / qtdGrupo;
	}

	// retorna a média dos eixos y de um determinado grupo
	mediaGrupoY(IDs=[], grupoIDs=0) {
		// IDs: array onde o índice corresponde ao ID e o valor do índice corresponde ao grupo
		// grupoIDs: número correspondente ao grupo que terá a média calculada
		let soma = 0;
		let qtdGrupo = 0;
		for(let i=0; i<IDs.length; i++) {
			if(IDs[i] == grupoIDs) {
				soma += this.eixoY[i];
				qtdGrupo++;		
			}
		}
		return soma / qtdGrupo;
	}

	// atualiza os centroides dos eixos x
	atualizaCentroideX() {
		if(this.centroidesX.length <= 0) {
			this.centroidesX[0] = this.eixoX[0];
			for(let i=1; i<this.grupos; i++) {
				this.centroidesX[i] = this.eixoX[(this.eixoX.length-1)-i];
			}
		}else {
			for(let i=0; i<this.grupos; i++) {
				this.centroidesX[i] = this.mediaGrupoX(this.grupoID_Anterior, i);
			}
		}
	}

	// atualiza os centroides dos eixos y
	atualizaCentroideY() {
		if(this.centroidesY.length <= 0) {
			this.centroidesY[0] = this.eixoY[0];
			for(let i=1; i<this.grupos; i++) {
				this.centroidesY[i] = this.eixoY[(this.eixoY.length-1)-i];
			}
		}else {
			for(let i=0; i<this.grupos; i++) {
				this.centroidesY[i] = this.mediaGrupoY(this.grupoID_Anterior, i);
			}
		}
	}

	// retorna o menor valor de um array
	minimo(arr=[]) {
		Array.prototype.min = function() {
			return Math.min.apply(null, this);
		}
		return arr.min();
	}

	// retorna o índice de um valor em um array
	// o índice retornado corresponde ao grupo que determinada linha pertence
	grupo(distancias=[], menorDistancia=0) {
		return distancias.indexOf(menorDistancia);
	}

	// verifica se dois arrays possuem todos os valores iguais
	comparaGrupos(arr1=[], arr2=[]) {
		let retorno = true;
		for(let i=0; i<arr1.length; i++) {
			if(arr1[i] != arr2[i]) {
				retorno = false;
			}
		}
		return retorno;
	}

	// atualiza os centroides e os grupos das linhas
	atualizaGrupo() {
		this.atualizaCentroideX();
		this.atualizaCentroideY();

		let retorno = true;
		let grupoID = [];
		let distancias = [];
		let distanciasMenores = [];

		for(let i=0; i<this.eixoX.length; i++) {

			for(let j=0; j<this.grupos; j++) {
				distancias[j] = 
				Math.sqrt(Math.pow(this.eixoX[i] - this.centroidesX[j], 2) + 
					      Math.pow(this.eixoY[i] - this.centroidesY[j], 2));
			}

			distanciasMenores[i] = this.minimo(distancias);
			// o ID é o índice e o valor é o grupo
			grupoID[i] = this.grupo(distancias, distanciasMenores[i]);
		}

		if(this.grupoID_Anterior.length <= 0) {
			this.grupoID_Anterior = grupoID;
		}else {
			if(this.comparaGrupos(this.grupoID_Anterior, grupoID)) {
				retorno = false;
			}else {
				this.grupoID_Anterior = grupoID;
				retorno = true;
			}
		}
		return retorno;
	}

	// retorna os grupos formatados como arrays de uma matriz
	retornaElementosGrupo(arrGrupos=[]) {
		let matrizGrupos = [];
		for(let i=0; i<this.grupos; i++) {
			let divisaoGrupos = [];
			for(let j=0; j<arrGrupos.length; j++) {
				if(arrGrupos[j] == i) {
					divisaoGrupos.push([this.eixoX[j], this.eixoY[j]]);
				}
			}

			matrizGrupos.push(divisaoGrupos);
		}
		return matrizGrupos;
	}

	// inicia treinamento
	train(config={}) {
		this._config = {};
		if(config.x) this.eixoX = config.x; else this.eixoX = [];
		if(config.y) this.eixoY = config.y; else this.eixoY = [];
		if(config.groups) this.grupos = config.groups; else this.grupos = 2;
		this._config.x = this.eixoX;
		this._config.y = this.eixoY;
		this._config.groups = this.grupos;
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

	// inicia a clusterização
	predict() {
		this.centroidesX = [];
		this.centroidesY = [];
		this.grupoID_Anterior = [];

		if((this.grupos > 1)&&(this.grupos < this.eixoX.length)) {
			if(this.eixoX.length > 2) {
				while(this.atualizaGrupo()) {}
				const matriz = this.retornaElementosGrupo(this.grupoID_Anterior);
				return matriz;
			}else {
				return [];
			}
		}else {
			return [];
		}
	}
}
